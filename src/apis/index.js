const auth = require('./auth');
const users = require('./users');
const home = require('./home');
const categories = require('./categories')
const books = require('./books')


module.exports = { authApi: auth, usersApi: users, homeApi: home , categoriesApi: categories, bookApi: books};