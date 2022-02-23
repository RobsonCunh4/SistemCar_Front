<template>
  <BaseLayout :title="'Dashboard'">
    <template v-slot:slot-pages>
      <div class="content-pages bg-light">
        <div class="container mb-5">
          <div class="row">
            <Cards
              :cor="'bg-danger'"
              :titulo="'Carros'"
              :icon="'fa-car'"
              :qtd="`${qtdCarros}`"
            />
            <Cards
              :cor="'bg-success'"
              :titulo="'Clientes'"
              :icon="'fa-users'"
              :qtd="`${qtdClientes}`"
            />
            <Cards
              :cor="'bg-info'"
              :titulo="'Usuários'"
              :icon="'fa-users'"
              :qtd="`${qtdUsuarios}`"
            />
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layout/BaseLayout";
import Cards from "@/components/Cards";
import axios from "../../plugins/axios";

export default {
  components: {
    BaseLayout,
    Cards,
  },

  data() {
    return {
      qtdCarros: 0,
      qtdClientes: 0,
      qtdUsuarios: 0,
    };
  },

  mounted() {
    this.carregarCards();
  },

  methods: {
    carregarCards() {
      this.carregaQtdCarros();
      this.carregaQtdClientes();
      this.carregaQtdUsuarios();
    },

    async carregaQtdCarros() {
      axios
        .get("/carro_dashboard")
        .then((response) => {
          this.qtdCarros = response.data;
        })
        .catch(() => {});
    },

    async carregaQtdClientes() {
      axios
        .get("/cliente_dashboard")
        .then((response) => {
          this.qtdClientes = response.data;
        })
        .catch(() => {});
    },

    async carregaQtdUsuarios() {
      axios
        .get("/auth/usuario_dashboard")
        .then((response) => {
          this.qtdUsuarios = response.data;
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
</style>
