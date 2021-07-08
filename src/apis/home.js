const axios = require('./apiHandler');

const homeApi = {
    pagingBooks: (payload) => axios.post('/apis/books/homePaging', { condition: payload }),
}

module.exports = homeApi;