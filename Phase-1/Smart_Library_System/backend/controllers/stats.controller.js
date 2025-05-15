import { getBook } from "./book.controller.js";
import { getAllLoans } from "./loan.controllers.js";
import { getUser } from "./user.controller.js";

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

async function getAllActiveUsers(req,res) {
    try {
        const allLoans = await getAllLoans();
    
        const userStats = new Map();
    
        for (const loan of allLoans) {
          const userId = loan.user_id.toString();
    
          if (!userStats.has(userId)) {
            userStats.set(userId, {
              books_borrowed: 0,
              current_borrows: 0,
            });
          }
    
          const stats = userStats.get(userId);
          stats.books_borrowed += 1;
    
          if (loan.status === "ACTIVE") {
            stats.current_borrows += 1;
          }
        }
    
        const sortedUsers = [...userStats.entries()]
          .sort((a, b) => b[1].books_borrowed - a[1].books_borrowed)
          .slice(0, 5); //top 5 user
    
        const activeUsers = await Promise.all(
          sortedUsers.map(async ([userId, stats]) => {
            const user = await getUser(userId);
    
            if (!user) return null;
    
            return {
              user_id: user._id,
              name: user.name,
              books_borrowed: stats.books_borrowed,
              current_borrows: stats.current_borrows,
            };
          })
        );
    
        const response = activeUsers.filter((user) => user !== null);
    
        res.json(response);
      } catch (error) {
        console.error("Error in getActiveUsers:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

export {getPopularBooks , getAllActiveUsers};