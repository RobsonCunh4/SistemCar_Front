import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment';

createApp(App)    
    .use(router, axios, moment)    
    .mount('#app')
