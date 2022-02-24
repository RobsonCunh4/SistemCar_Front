  module.exports = {
  devServer: {
    proxy: {    
        '/api': {
            target: 'https://sistemcarback.herokuapp.com',
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            },
        },
    },
    },
}
