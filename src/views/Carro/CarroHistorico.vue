<template>
  <BaseLayout :title="'Carro Histórico'">
    <template v-slot:slot-pages>
      <div class="content-pages bg-light">
        <div class="container mb-2">
          <div class="row justify-content-end">
            <div class="col-md-5">
              <div class="input-group mb-3">
                <input
                  type="text"
                  placeholder="Pesquisar por usuário"
                  class="form-control border-0 shadow-sm px-4"
                  v-model="filtro"
                  aria-describedby="btnPesquisar"
                  v-on:keyup.enter="filtrarHistorico()"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="btnPesquisar"
                    @click="filtrarHistorico()"
                  >
                    Pesquisar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container mb-5">
          <div class="row">
            <div class="col-md-12 mb-5 table-wrapper">
              <table class="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col-sm-6">Ação</th>
                    <th scope="col-sm-1">Usuário</th>
                    <th scope="col-sm-1">Email</th>
                    <th scope="col-sm-1">Data criação</th>
                    <th scope="col-sm-4">Data edição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(historico, index) in historicos" :key="index">
                    <td>
                      {{ historico.acao }}
                    </td>
                    <td>
                      {{ historico.usuario.name }}
                    </td>
                     <td>
                      {{ historico.usuario.email }}
                    </td>
                    <td>
                      {{ historico.created_at }}
                    </td>
                    <td>
                      {{ historico.updated_at }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div v-if="historicos.length < 1" class="text-center mt-5">
                <h1>Não há Histórico desse carro.</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layout/BaseLayout";
import axios from "../../plugins/axios";
import moment from "moment";

export default {
  components: {
    BaseLayout,
  },

  mounted() {
    this.carregarHistorico(this.$route.params.id);
  },

  data() {
    return {
      id: null,
      historicos: [],
      historicos_data: [],
      filtro: "",
    };
  },

  methods: {
    async carregarHistorico($id) {
      await axios.get("/carro_historico/" + $id).then((response) => {
        this.historicos_data = response.data;
        this.formatarData(this.historicos_data); 
        this.resetData();       
      });
    },

    filtrarHistorico() {
      this.resetData();
      if (this.filtro) {
        this.historicos = this.historicos.filter((historico) => {
          return historico.usuario.name
            .toLowerCase()
            .includes(this.filtro.toLowerCase());
        });
      }
    },

    resetData() {      
      this.historicos = this.historicos_data;
    },

    formatarData($listagem) {
      $listagem.forEach(function (arrayItem) {
        arrayItem.created_at = moment(arrayItem.created_at).format(
          "DD-MM-YYYY, h:mm:ss a"
        );
        arrayItem.updated_at = moment(arrayItem.updated_at).format(
          "DD-MM-YYYY, h:mm:ss a"
        );
      });
    },
  },
};
</script>

<style scoped>
.gridAcoes {
  width: 15px;
}

.table-wrapper {
  max-height: 600px;
  overflow: auto;
  display: inline-block;
}

.alert {
  position: relative;
}

.progress {
  position: absolute;
  width: 100%;
  bottom: 0px;
  left: 0px;
}
</style>
