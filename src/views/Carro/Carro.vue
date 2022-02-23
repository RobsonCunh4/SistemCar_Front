<template>
  <BaseLayout :title="'Carros'">
    <template v-slot:slot-pages>
      <div class="content-pages bg-light">
        <div class="container mb-2">
          <div class="row">
            <div
              v-if="response.message"
              :class="`alert alert-${response.tipo} alert-dismissible`"
              role="alert"
            >
              {{ response.message }}
              <div
                class="progress active"
                role="progressbar"
                style="height: 5px"
              >
                <div
                  :class="`progress-bar bg-${response.tipo}`"
                  :style="`width: ${progresso}%; opacity: 0.5`"
                ></div>
              </div>
            </div>
            <div class="col-md-7">
              <button
                type="button"
                class="btn btn-success"
                data-toggle="modal"
                data-target="#Modalcarro"
                @click="ResetFormulario()"
              >
                Adicionar carro
              </button>
            </div>
            <div class="col-md-5">
              <div class="input-group mb-3">
                <input
                  type="text"
                  placeholder="Pesquisar por placa"
                  class="form-control border-0 shadow-sm px-4"
                  v-model="filtro"
                  aria-describedby="btnPesquisar"
                  v-on:keyup.enter="filtrarCarros()"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="btnPesquisar"
                    @click="filtrarCarros()"
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
                    <th scope="col-sm-1">Código</th>
                    <th scope="col-sm-1">Placa</th>
                    <th scope="col-sm-6">Modelo</th>
                    <th scope="col-sm-4">Marca</th>
                    <th scope="col-sm-1" class="gridAcoes">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="carro in carros" :key="carro.id">
                    <td class="text-center" scope="row">
                      <strong>{{ carro.id }}</strong>
                    </td>
                    <td class="text-center" scope="row">
                      <strong>{{ carro.placa }}</strong>
                    </td>
                    <td>{{ carro.modelo }}</td>
                    <td>{{ carro.marca }}</td>
                    <td class="gridAcoes">
                      <div class="btn-group">
                        <a
                          href="#"
                          class="btn btn-primary"
                          data-toggle="modal"
                          data-target="#Modalcarro"
                          @click="detalharCarro(carro)"
                          >Detalhes</a
                        >
                        <a
                          type="button"
                          class="btn btn-warning"
                          data-toggle="modal"
                          data-target="#Modalcarro"
                          @click="PreencherForm(carro)"
                          >Atualizar</a
                        >
                        <button
                          type="button"
                          class="btn btn-danger"
                          @click.stop.prevent="removerCarro(carro.id)"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="carros.length < 1" class="text-center mt-5">
                <h1>Não há carros cadastrados.</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="Modalcarro"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="Modalcarro">{{ tituloModal }}</h5>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <div
                  v-if="validado == false"
                  class="alert alert-danger alert-dismissible"
                  role="alert"
                >
                  Preencha corretamente o formulário!
                </div>
              </div>
              <div class="form-group mb-3">
                <input
                  type="text"
                  maxlength="7"
                  placeholder="Placa"
                  v-model="form.placa"
                  v-on:keyup="validaForm()"
                  :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.form.placa.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  type="text"
                  placeholder="Modelo"
                  v-model="form.modelo"
                  v-on:keyup="validaForm()"
                  :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.form.modelo.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  type="text"
                  placeholder="Marca"
                  v-model="form.marca"
                  v-on:keyup="validaForm()"
                  :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.form.marca.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  required=""
                  type="number"
                  placeholder="Lugares"
                  v-model.trim="form.lugares"
                  v-on:keyup="validaForm()"
                  :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.form.lugares.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  type="number"
                  placeholder="KM"
                  v-model.trim="form.km"
                  v-on:keyup="validaForm()"
                  :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.form.km.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Fechar
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-show="!btnSalvar"
                @click.stop.prevent="carroHistorico()"
              >
                Historico
              </button>
              <button
                type="button"
                class="btn btn-primary"
                v-show="btnSalvar"
                @click.stop.prevent="salvarCadastro()"
              >
                {{ descBotao }}
              </button>
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
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  components: {
    BaseLayout,
  },

  mounted() {
    this.carregarLista();
  },

  data() {
    return {
      v$: useVuelidate(),
      carros: [],
      carros_data: [],
      form: {
        id: null,
        placa: "",
        modelo: "",
        marca: "",
        lugares: "",
        km: "",
      },
      response: {
        tipo: "",
        message: "",
      },
      cadastrar: true,
      tituloModal: "Cadastrar carro",
      descBotao: "Salvar",
      btnSalvar: true,
      campos: true,
      progresso: 100,
      filtro: "",
      validado: false,
    };
  },

  validations() {
    return {
      form: {
        placa: {
          required,
          minLength: minLength(6),
          $autoDirty: true,
        },
        modelo: {
          required,
          minLength: minLength(3),
          $autoDirty: true,
        },
        marca: {
          required,
          minLength: minLength(3),
          $autoDirty: true,
        },
        lugares: {
          required,
          minLength: minLength(1),
          $autoDirty: true,
        },
        km: {
          required,
          minLength: minLength(1),
          $autoDirty: true,
        },
      },
    };
  },

  methods: {
    async carregarLista() {
      await axios.get("/carro").then((response) => {
        this.carros = response.data;
        this.carros_data = response.data;
      });
    },

    PreencherForm(carro) {
      this.ResetFormulario();
      this.validaForm();
      this.tituloModal = "Atualizar carro";
      this.cadastrar = false;
      this.btnSalvar = true;
      this.form.id = carro.id;
      this.form.placa = carro.placa;
      this.form.modelo = carro.modelo;
      this.form.marca = carro.marca;
      this.form.lugares = carro.lugares;
      this.form.km = carro.km;
    },

    async editarcarro() {
      axios
        .put("/carro/" + this.form.id, this.form)
        .then(() => {
          this.carregarLista();
          this.ResetFormulario();
          this.fecharModal();
          this.notificacao("warning", "Cadastro atualizado com sucesso!");
        })
        .catch(() => {
          this.notificacao("danger", "Erro ao realizar a edição do cadastro.");
          this.fecharModal();
        });
    },

    detalharCarro(carro) {
      this.ResetFormulario();
      this.PreencherForm(carro);
      this.btnSalvar = false;
      this.tituloModal = "Detalhes carro";
    },

    async validaForm() {
      this.v$.$touch();
      const result = await this.v$.$validate();
      this.validado = result;
      console.log(this.validado);
    },

    async CadastrarCarro() {
      await axios
        .post("/carro/", this.form)
        .then(() => {
          this.ResetFormulario();
          this.carregarLista();
          this.fecharModal();
          this.notificacao("success", "Cadastro realizado com sucesso!");
        })
        .catch(() => {
          this.notificacao("danger", "Informações inválidas ao cadastrar.");
          this.fecharModal();
        });
    },

    async removerCarro(id) {
      await axios
        .delete("/carro/" + id)
        .then(() => {
          this.notificacao("success", "Cadastro removido com sucesso!");
          this.carregarLista();
        })
        .catch(() => {
          this.notificacao("danger", "Erro ao realizar a remoção do cadastro.");
        });
    },

    ResetFormulario() {
      (this.form.id = ""),
        (this.form.placa = ""),
        (this.form.marca = ""),
        (this.form.modelo = ""),
        (this.form.lugares = ""),
        (this.form.km = ""),
        (this.cadastrar = true);
      this.tituloModal = "Cadastrar carro";
      this.btnSalvar = true;
    },

    fecharModal() {
      document.getElementById("Modalcarro").click();
    },

    salvarCadastro() {
      this.validaForm();
      if (this.validado) {
        if (this.cadastrar == true) {
          this.CadastrarCarro();
        } else {
          this.editarcarro();
        }
      }
    },

    notificacao(tipo, msg) {
      this.response.tipo = tipo;
      this.response.message = msg;

      const tempo = setInterval(() => {
        this.progresso--;
        if (this.progresso <= 0) {
          this.response.message = null;
          clearInterval(tempo);
          this.progresso = 100;
        }
      }, 50);
    },

    filtrarCarros() {
      this.resetData();
      if (this.filtro) {
        this.carros = this.carros.filter((carro) => {
          return carro.placa.toLowerCase().includes(this.filtro.toLowerCase());
        });
      }
    },

    resetData() {
      this.carros = this.carros_data;
    },

    carroHistorico() {
      let $id = this.form.id;
      this.fecharModal();
      this.$router.push({ name: "carrohistorico", params: { id: $id } });
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
