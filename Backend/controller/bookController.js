const Book = require('../model/bookModel')

const addBook = async (bookData) => {
    const {
        name,
        description,
        image,
        author,
        year,
        price,
        lang,
        format,
    } = bookData;

    if (!name || !description || !image || !author || !year || !price || !lang || !format) {
        throw new Error('Please provide valid input for all fields.');
    }

    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(image)) {
        throw new Error('Invalid image URL format.');
    }

    const imageExtensionRegex = /\.(jpeg|jpg|png|gif|bmp)$/i;
    if (!imageExtensionRegex.test(image)) {
        throw new Error('Invalid image file extension. Supported formats: jpeg, jpg, png, gif, bmp.');
    }

    const book = new Book({
        name,
        description,
        image,
        author,
        year,
        price,
        lang,
        format,
    });

    await book.save();

    return {
        name: book.name,
        message: 'Book added successfully.',
    };
};

const addBooks = async (req, res) => {
    try {
        const booksData = req.body;

        if (!Array.isArray(booksData)) {
            return res.status(400).json({
                message: 'Invalid data format. Expected an array of books.',
            });
        }

        const addedBooks = [];
        const errors = [];

        for (const bookData of booksData) {
            try {
                const result = await addBook(bookData);
                addedBooks.push(result);
            } catch (error) {
                errors.push({
                    name: bookData.name,
                    error: error.message,
                });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Errors occurred while adding some books.',
                errors,
            });
        }

        return res.status(201).json({
            message: 'Books added successfully.',
            addedBooks,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error.',
        });
    }
};
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }
        
        return res.status(200).json({ data: books });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
};
//EXPORT THESE ONLY WHEN LOTS OF BOOKS
const featureBook = async (req, res) =>{
    try{
        const { name, author } = req.body;
        const book = await Book.findOne({ name : name, author : author});

        if (!book) {
        return res.status(404).json({ error: 'Book not found.'});
        }

        book.featured = true;
        await book.save();
        res.json({ message: 'Book set as featured successfully.' });

    } catch (error) {
    res.status(500).json({ error: 'An error occurred while setting the book as featured.' });
    }
};
const getfeaturedbooks = async(req,res) => {
    try {
        const featuredBooks = await Book.find({ featured: true });
        res.json({ data: featuredBooks });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "Internal Server Error"
        });
    }
};
const getBookDetails = async (req, res) => {
    const bookId = req.params.id;

    try {
    const book = await Book.findById(bookId);

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json({ data: book });
} catch (error) {
    console.error('Error fetching book by _id:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
}
};

const search = async(req,res) =>{
    try {
        const { query, filter, lang, format } = req.query;
    
        // Construct your query based on the filter, language, and format
        const searchQuery = { [filter.toLowerCase()]: query, lang, format };
    
        const books = await Book.find(searchQuery); // Assuming Book model has 'language' and 'format' properties
    
        res.json({ data: books });
        } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching for books.' });
    }
};

module.exports = {
    addBooks,
    getAllBooks
}