import Book from "../models/book.model.js";

async function AddBook(req,res){
    try {
        const {title,author,isbn,copies} = req.body;

        const book = new Book({
            title,
            author,
            isbn,
            copies,
            available_copies : copies
        });

        await book.save();

        if(book){
            res.status(201).json({
                id : book._id,
                title : book.title,
                author : book.author,
                isbn : book.isbn,
                copies : book.copies,
                available_copies : book.available_copies,
            })
        }
        else{
            res.status(401).json({
                message : "Error saving new book"
            })
        }
    } 
    catch (error) {
        console.log('Error on book controller' , error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

async function SearchBook(req,res){
    try {
        const searchQuery = req.query.search;

        let filter = {};

        if(searchQuery){
            const regex = new RegExp(searchQuery,'i');

            filter = {
                $or: [{ title: regex }, { author: regex }]
            };

            const foundBook = await Book.find(filter);

            if(foundBook){
                res.status(201).json(foundBook)
            }
            else{
                res.status(401).json({
                    message:"No books found"
                })
            }
        }
        else{
            res.status(401).json({
                message:"search query is empty"
            })
        }
        
    } 
    catch (error) {
        console.log('Error on book controller' , error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

async function UpdateBook(req,res) {
    try {
        const {id} = req.params;

        const updatedBook = await Book.findByIdAndUpdate(id,
            {$set:req.body},
            {new : true }
        );

        if(updatedBook){
            res.status(201).json(updatedBook)
        }

        else{
            res.status(401).json({
                message:"Unable to update book"
            })
        }
        
    } 
    catch (error) {
        console.log('Error on book controller' , error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

async function RemoveBook(req,res) {
    try {
        const {id} = req.params;

        const isBookDeleted = await Book.findByIdAndDelete(id);

        if(isBookDeleted){
            res.status(204).json({
                message:"Book Deleted Successfully"
            })
        }
        else{
            res.status(401).json({
                message : "Book not found"
            })
        }
    } 
    catch (error) {
        console.log('Error on book controller' , error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export {AddBook,SearchBook,UpdateBook,RemoveBook};