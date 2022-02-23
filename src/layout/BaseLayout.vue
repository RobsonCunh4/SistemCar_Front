<template>
  <div class="main">
    <div class="content-left">
      <SideBar />
    </div>

    <div class="content-right">
      <div class="navbar">
        <NavBar :title_page="title" />
      </div>

      <div class="pages">
        <slot name="slot-pages"></slot>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

export default {
  name: "Template",
  components: {
    SideBar,
    NavBar,
    Footer,
  },
  props: {
    title: String,
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: calc(100% - 20px);
  display: flex;
}

.main .sidebar {
  width: 220px;
  height: 100vh;
  margin-left: 10px;
  margin-top: 9.5px;
  background-color: #47a3e0;
}
.main .content-right {
  width: calc(100% - 220px);
  height: 100vh;
}

.main .content-right .navbar {
  width: 100%;
  padding: 10px 15px;
}
.main .content-right .pages {
  width: 100%;
  height: auto;
}
</style>
