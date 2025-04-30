import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true
        },
        copies: {
            type: String,
            required: true
        },
        available_copies : {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Book = mongoose.model("Book",bookSchema);

export default Book;