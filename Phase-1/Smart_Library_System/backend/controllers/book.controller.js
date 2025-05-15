import Book from "../models/book.model.js";

async function AddBook(req, res) {
    try {
        const { title, author, isbn, copies } = req.body;

        if (!title || !author || !isbn || !copies) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const book = new Book({
            title,
            author,
            isbn,
            copies,
            available_copies: copies
        });

        await book.save();

        if (book) {
            res.status(201).json({
                id: book._id,
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                copies: book.copies,
                available_copies: book.available_copies,
            })
        }
        else {
            res.status(400).json({
                message: "Error saving new book"
            })
        }
    }
    catch (error) {
        console.log('Error on book controller', error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

async function SearchBook(req, res) {
    try {
        const searchQuery = req.query.search;

        let filter = {};

        if (searchQuery) {
            const regex = new RegExp(searchQuery, 'i');

            filter = {
                $or: [{ title: regex }, { author: regex }]
            };

            const foundBook = await Book.find(filter);

            if (foundBook.length > 0) {
                res.status(200).json(foundBook)
            }
            else {
                res.status(404).json({
                    message: "No book found"
                })
            }
        }
        else {
            res.status(400).json({
                message: "search query is empty"
            })
        }

    }
    catch (error) {
        console.log('Error on book controller', error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

async function UpdateBook(req, res) {
    try {
        const { id } = req.params;

        const updatedBook = await Book.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true }
        );

        if (updatedBook) {
            res.status(200).json(updatedBook)
        }

        else {
            res.status(404).json({
                message: "Book not found"
            })
        }

    }
    catch (error) {
        console.log('Error on book controller', error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

async function RemoveBook(req, res) {
    try {
        const { id } = req.params;

        const isBookDeleted = await Book.findByIdAndDelete(id);

        if (isBookDeleted) {
            res.sendStatus(204);
        }
        else {
            res.status(404).json({
                message: "Book not found"
            })
        }
    }
    catch (error) {
        console.log('Error on book controller', error);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
}

async function getBook(id) {
    try {
        const book = await Book.findById(id);

        if (book) {
            return book;
        }
        else {
            console.log("Book not found");
            return null;
        }
    }
    catch (error) {
        console.log('Error on book controller', error.message);
        return null;
    }
}

async function updateIssuedBook(id) {
    try {

        const searchedBook = await getBook(id);

        if (!searchedBook) {
            console.log("Book not found");
            return null;
        }

        if (searchedBook.available_copies === 0) {
            console.log("No available Books");
            return null;
        }

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                $inc: { available_copies: -1 }
            }
        )

        if (updatedBook) {
            console.log('Book borrowed Successfully');
        }
        else {
            console.log('Book not found');
        }
    }
    catch (error) {
        console.log('Error on book controller', error.message);
        return null;
    }
}

async function updateReturnedBook(id) {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                $inc: { available_copies: 1 }
            }
        )

        if (updatedBook) {
            console.log('Book Returned Successfully');
        }
        else {
            console.log('Book not found');
        }
    }
    catch (error) {
        console.log('Error on book controller', error.message);
        return null;
    }

}

async function getTotalBookCopies() {
    try {
        const result = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalCopies: { $sum: "$copies" }
                }
            }
        ]);

        if (result.length > 0) {
            return result[0].totalCopies;
        } else {
            console.log('No books found or copies are all zero.');
            return 0;
        }
    } catch (error) {
        console.log('Error occurred in getTotalBookCopies:', error.message);
        return 0;
    }
}

async function getTotalAvailableBookCopies() {
    try {
        const totalAvailableBooks = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalAvailableCopies: { $sum: "$available_copies" }
                }
            }
        ]);

        if (totalAvailableBooks.length > 0) {
            return totalAvailableBooks[0].totalAvailableCopies;
        }
        else {
            console.log('Counld not get totalBooks');
            return;
        }
    }
    catch (error) {
        console.log('Error occured in the getTotalBooks:', error.message);
    }
}

export { AddBook, SearchBook, UpdateBook, RemoveBook, getBook, updateIssuedBook, updateReturnedBook, getTotalBookCopies, getTotalAvailableBookCopies };