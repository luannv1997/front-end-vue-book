const axios = require('./apiHandler');

const bookApi = {
    paging: (payload) => axios.post('/apis/books/bookPaging', { condition: payload }),
    deleteBook: (id) => axios.delete(`/apis/books/${id}`),
    createBook: (payload) => axios.post('/apis/books', payload),
    getBookById: (id) => axios.get(`/apis/books/${id}`),
    updateBookById: (id, payload) => axios.patch(`/apis/books/${id}`, payload)
}

module.exports = bookApi;