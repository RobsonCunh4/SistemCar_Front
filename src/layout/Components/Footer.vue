<template>
  <footer class="bg-dark text-center text-lg-start">
    <div class="container">
      <p class="p-2 text-center align-middle text-light">
        SistemCar
      </p>
    </div>
  </footer>
</template>

<script scoped>
export default {
  name: "Footer",
  props: {
    title_page: String,
  },
};
</script>

<style scoped>
footer {
  margin: 5px 10px 0px 10px;
}
</style>