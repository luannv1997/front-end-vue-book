const axios = require('axios')
const store = require('../store').default
const router = require('../router')

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

store.subscribe((mutation) => {
    if (mutation.type === 'SET_USER_INFO' || mutation.type === 'SET_NEW_TOKEN') {
        instance.defaults.headers.common['auth-token'] = mutation.payload.accessToken;
        // instance.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload.accessToken}`
        // router.addRoutes(getRouters('role'))
    }
})

store.subscribe((mutation) => {
    if (mutation.type === 'CLEAR_USER_INFO') {
        delete instance.defaults.headers.common['auth-token']
        // delete instance.defaults.headers.common['Authorization']
    }
})

// Alter defaults after instance has been created
instance.defaults.headers.common['auth-token'] = store.getters.userToken;
// instance.defaults.headers.common['Authorization'] = `Bearer ${store.getters.userToken}`;

instance.interceptors.request.use((config) => {
    console.log('Redirect to', config.url);
    return config;
});

instance.interceptors.response.use((response) => {
    console.log(response)
    console.log(router)
    switch (response.data.code) {
        case 401: {
            store.commit('CLEAR_USER_INFO');
            return router.default.push("/login");
        }
        case 403: {
            return router.default.push("/forbidden");
        }
        default: break;
    }
    return response;
});

module.exports = instance;
