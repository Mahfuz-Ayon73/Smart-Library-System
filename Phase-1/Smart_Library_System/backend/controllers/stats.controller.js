import { getBook } from "./book.controller.js";
import { getAllLoans } from "./loan.controllers.js";

async function getPopularBooks(req, res) {
    try {
        const allLoans = await getAllLoans();

        console.log(allLoans);

        const borrowMap = new Map();

        for (const loan of allLoans) {
            const bookId = loan.book_id.toString();

            if (borrowMap.has(bookId)) {
                borrowMap.set(bookId, borrowMap.get(bookId) + 1);
            } else {
                borrowMap.set(bookId, 1);
            }
        }

        const sortedBorrowArray = [...borrowMap.entries()]
            .sort((a, b) => b[1] - a[1]) // descending
            .slice(0, 3); // top 3

        const popularBooks = await Promise.all(
            sortedBorrowArray.map(async ([bookId, borrow_count]) => {
                const book = await getBook(bookId);

                if (!book) return null;

                return {
                    book_id: book._id,
                    title: book.title,
                    author: book.author,
                    borrow_count,
                };
            })
        );

        const response = popularBooks.filter((book) => book !== null);

        res.json(response);

    }
    catch (error) {
        console.log("Error in Loan Controller");
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

export default getPopularBooks;