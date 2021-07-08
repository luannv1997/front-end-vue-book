const axios = require('./apiHandler');

const categoryApi = {
    paging: (payload) => axios.post('/apis/categories/categoryPaging', { condition: payload }),
    deleteCategory: (id) => axios.delete(`/apis/categories/${id}`),
    createCategory: (payload) => axios.post('/apis/categories', payload),
    getCategoryById: (id) => axios.get(`/apis/categories/${id}`),
    updateCategoryById: (id, payload) => axios.patch(`/apis/categories/${id}`, payload),
    getCategories: () => axios.get(`/apis/categories`)
}

module.exports = categoryApi;