<template>
  <div class="col-sm-4">
    <div :class="['card form-control shadow-sm px-4', cor]">
      <div class="card-body">
        <h1 class="card-title">{{ titulo }}</h1>
        <div class="card-text align-items-center mt-4">
          <h3 class="pull-left"
            ><i :class="['fa icon', icon]"></i
          ></h3>
          <h3 class="pull-right">{{ qtd }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cards",
  props: {
    titulo: String,
    icon: String,
    qtd: String,
    cor: String,
  },
};
</script>

<style scope>
.card .card-body {
  opacity: 0.9;
  color: white;  
}

.card-text h3{
  margin-bottom: 0px;
}
</style>
