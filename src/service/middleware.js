import Cookie from "@/service/cookie";
import axios from 'axios'

export default{

    async redirectIfNotAuthenticated(to, from, next){
        const token = Cookie.getToken();

        if(!token){
            next({name: 'login'});
        }

        await axios.post('/auth/me').then(()=>{
            //store.commit('user/store')
        }).catch(()=>{
            Cookie.deleteToken();
            next({name: 'login'});
        });

        next();
    },

    redirectIfAuthenticated(to, from, next){
        const token = Cookie.getToken();

        if(token){
            next({name: 'dashboard'});
        }

        next();
    }   
}