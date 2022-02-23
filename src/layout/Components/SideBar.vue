<template>
  <div class="sidebar">
    <div class="top">
      <div class="LogoIcon">
        <span><i class="fa fa-car"></i></span>
      </div>
      <div class="info">
        <p>Sistem Car</p>
      </div>
    </div>

    <div class="menu">
      <ul>
        <li>
          <router-link :to="{ name: 'dashboard' }"
            ><i class="fa fa-tachometer" /> Dashboard</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'carro' }"
            ><i class="fa fa-car" /> Carros</router-link
          >
        </li>
          <li>
          <router-link :to="{ name: 'cliente' }"
            ><i class="fa fa-user-o" /> Clientes</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
};
</script>

<style scoped>

.sidebar .top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 5px;
}
.sidebar .top .LogoIcon {
  margin-right: 10px;
}
.sidebar .top .LogoIcon span {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
}
.sidebar .top .info .name {
  margin: 0;
}
.sidebar .menu {
  margin-top: 15px;
  padding: 10px;
}
.sidebar .menu ul li {
  margin: 15px 0;
  font-size: 18px;
  list-style: none;
}
.sidebar .menu ul li a {
  color: #fff;
  text-decoration: none;
}

.info {
  color: #fff;
}
</style>