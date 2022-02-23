import Cookie from 'js-cookie'

const TOKEN_NAME = '_token_scar';

export default {

    setToken(token){
        Cookie.set(TOKEN_NAME, token, { expires: 10 });
    },

    getToken(){
        return Cookie.get(TOKEN_NAME);
    },

    deleteToken(){
        Cookie.remove(TOKEN_NAME);
    }
};