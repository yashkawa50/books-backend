const Books = require("../models/Books");

const getBooks = async (_, res) => {
    try {
        const books = await Books.find(); // fetch all books
        res.status(200).json({
            success: true,
            books
        });
    } catch (error) {
        console.error("Error fetching books:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while fetching books"
        });
    }
};


const addBook = async (req, res) => {
    try {
        const newBook = await Books.insertOne(req.body, { new: true });
        res.status(201).json({
            success: true,
            newBook
        })
    } catch (error) {
        console.error("Error adding books:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error while adding books"
        });
    }
}

module.exports = { getBooks, addBook };
