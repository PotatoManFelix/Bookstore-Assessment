const Express = require('express');
const bookRoute = Express();
const bookController = require('../controller/bookController');

bookRoute.put('/add-books', bookController.addBooks);
// book
bookRoute.get('/all-Books', bookController.getAllBooks);

module.exports = bookRoute;