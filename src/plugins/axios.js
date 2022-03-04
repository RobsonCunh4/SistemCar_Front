import axios from 'axios';
import Cookie from "@/service/cookie";

//axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.baseURL = 'https://sistemcarback.herokuapp.com/api';
axios.defaults.headers.common['Content-Type'] = 'text/plain';
axios.defaults.headers.common['Accept'] = 'text/plain';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//Vue.prototype.$axios = axios;

axios.interceptors.request.use(function(config){

    const token = Cookie.getToken();

    if(token){
        config.headers.common['Authorization'] = token;
    }

    return config;
});

export default axios;
