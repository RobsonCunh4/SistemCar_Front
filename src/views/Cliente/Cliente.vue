<template>
  <BaseLayout :title="'Clientes'">
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
                data-target="#Modalcliente"
                @click="ResetFormulario()"
              >
                Adicionar cliente
              </button>
            </div>
            <div class="col-md-5">
              <div class="input-group mb-3">
                <input
                  type="text"
                  placeholder="Pesquisar por nome"
                  class="form-control border-0 shadow-sm px-4"
                  v-model="filtro"
                  aria-describedby="btnPesquisar"
                  v-on:keyup.enter="filtrarClientes()"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="btnPesquisar"
                    @click="filtrarClientes()"
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
                    <th scope="col-sm-6">Nome</th>
                    <th scope="col-sm-4">Telefone</th>
                    <th scope="col-sm-1" class="gridAcoes">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cliente in clientes" :key="cliente.id">
                    <td class="text-center" scope="row">
                      <strong>{{ cliente.id }}</strong>
                    </td>
                    <td>{{ cliente.nome }}</td>
                    <td>{{ cliente.telefone }}</td>
                    <td class="gridAcoes">
                      <div class="btn-group">
                        <a
                          href="#"
                          class="btn btn-primary"
                          data-toggle="modal"
                          data-target="#Modalcliente"
                          @click="detalharCliente(cliente)"
                          >Detalhes</a
                        >
                        <a
                          type="button"
                          class="btn btn-warning"
                          data-toggle="modal"
                          data-target="#Modalcliente"
                          @click="PreencherForm(cliente)"
                          >Atualizar</a
                        >
                        <button
                          type="button"
                          class="btn btn-danger"
                          @click.stop.prevent="removerCliente(cliente.id)"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="clientes.length < 1" class="text-center mt-5">
                <h1>Não há clientes cadastrados.</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="Modalcliente"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="Modalcliente">{{ tituloModal }}</h5>
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
                  placeholder="Nome"
                  v-model="form.nome"
                  v-on:keyup="validaForm()"
                  :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.form.nome.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  maxlength="14"
                  type="text"
                  placeholder="CPF"
                  v-model.trim="form.cpf"
                  v-on:keyup="validaForm()"
                  :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.form.cpf.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                />
              </div>
              <div class="form-group mb-3">
                <input
                  type="text"
                  name="numbers"
                  placeholder="Telefone"
                  v-model.trim="form.telefone"
                  v-on:keyup="validaForm()"
                  :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.form.telefone.$error === true
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
      clientes: [],
      clientes_data: [],
      form: {
        id: null,
        nome: "",
        cpf: "",
        telefone: "",
      },
      response: {
        tipo: "",
        message: "",
      },
      cadastrar: true,
      tituloModal: "Cadastrar cliente",
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
        nome: {
          required,
          minLength: minLength(6),
          $autoDirty: true,
        },
        cpf: {
          required,
          minLength: minLength(11),
          $autoDirty: true,
        },
        telefone: {
          required,
          minLength: minLength(11),
          $autoDirty: true,
        },
      },
    };
  },

  methods: {
    carregarLista() {
      axios.get("/cliente").then((response) => {
        this.clientes = response.data;
        this.clientes_data = response.data;
      });
    },

    PreencherForm(cliente) {
      this.ResetFormulario();
      this.validaForm();
      this.tituloModal = "Atualizar cliente";
      this.cadastrar = false;
      this.btnSalvar = true;
      this.form.id = cliente.id;
      this.form.nome = cliente.nome;
      this.form.telefone = cliente.telefone;
      this.form.cpf = cliente.cpf;
    },

    async editarCliente() {
      axios
        .put("/cliente/" + this.form.id, this.form)
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

    detalharCliente(cliente) {
      this.PreencherForm(cliente);
      this.btnSalvar = false;
      this.tituloModal = "Detalhes cliente";
    },

    async validaForm() {
      this.v$.$touch();
      const result = await this.v$.$validate();
      this.validado = result;
      console.log(this.validado);
    },

    async CadastrarCliente() {
      axios
        .post("/cliente/", this.form)
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

    async removerCliente(id) {
      axios
        .delete("/cliente/" + id)
        .then(() => {
          this.notificacao("success", "Cadastro removido com sucesso!");
          this.carregarLista();
        })
        .catch(() => {
          this.notificacao("danger", "Erro ao realizar a remoção do cadastro.");
        });
    },

    ResetFormulario() {
      (this.form.id = null),
        (this.form.nome = ""),
        (this.form.cpf = ""),
        (this.form.telefone = ""),
        (this.cadastrar = true);
      this.tituloModal = "Cadastrar cliente";
      this.btnSalvar = true;
    },

    fecharModal() {
      document.getElementById("Modalcliente").click();
    },

    salvarCadastro() {
      this.validaForm();
      if (this.validado) {
        if (this.cadastrar == true) {
          this.CadastrarCliente();
        } else {
          this.editarCliente();
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

    filtrarClientes() {
      this.resetData();
      if (this.filtro) {
        this.clientes = this.clientes.filter((cliente) => {
          return cliente.nome.toLowerCase().includes(this.filtro.toLowerCase());
        });
      }
    },

    resetData() {
      this.clientes = this.clientes_data;
    },
  },
};
</script>

<style scoped>
.gridAcoes {
  width: 15px;
}

.table-wrapper {
  max-height: 465px;
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
