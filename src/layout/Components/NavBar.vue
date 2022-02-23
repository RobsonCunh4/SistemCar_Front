<template>
  <nav class="navbar navbar-light bg-light justify-content-between ">
    <a class="navbar-brand text-primary">{{title_page}}</a>    
      <button class="btn btn-outline-dark my-2 my-sm-0" @click.prevent="logout">
        Sair
      </button>          
  </nav>
</template>

<script scoped>
import Cookie from "@/service/cookie";
export default {
  name: "NavBar",
  props: {
    title_page: String
  },
  methods: {
    logout() {
      Cookie.deleteToken();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
 .navbar{
    background-color: #dbdbdb !important;
 }

 .navbar-brand{
   opacity: 0.8;
 }
</style>