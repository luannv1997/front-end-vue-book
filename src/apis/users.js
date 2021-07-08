const axios = require('./apiHandler');

const usersApi = {
    paging: (payload) => axios.post('/apis/users/userPaging', { condition: payload }),
    deleteUser: (id) => axios.delete(`/apis/users/${id}`),
    createUser: (payload) => axios.post('/apis/users', payload),
    getUserById: (id) => axios.get(`/apis/users/${id}`),
    updateUserById: (id, payload) => axios.patch(`/apis/users/${id}`, payload)
}

module.exports = usersApi;