<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="col-md-6 d-none d-md-flex bg-image"></div>

      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="display-4">SistemCars</h3>
                <p class="text-primary mb-4">
                  Preencha as informações para realizar o seu cadastro.
                </p>
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
                <form>
                  <div class="form-group mb-3">
                    <input
                      type="text"
                      placeholder="Nome completo"
                      v-model.trim="nome"
                      v-on:keyup="validaForm()"
                      :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.nome.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      v-model.trim="email"
                      v-on:keyup="validaForm()"
                      :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.email.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <input
                      type="password"
                      placeholder="Senha"
                      v-model.trim="senha"
                      v-on:keyup="validaForm()"
                      :class="`form-control rounded-pill border-1 shadow-sm px-4
                    ${
                      v$.senha.$error === true
                        ? 'border border-danger'
                        : 'border border-success'
                    }
                  `"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <button
                      type="submit"
                      class="
                        btn btn-primary
                        rounded-pill
                        shadow-sm
                        btn-block
                        w-100
                      "
                      @click.stop.prevent="registro()"
                    >
                      Registrar
                    </button>
                  </div>
                  <div class="d-flex justify-content-end mt-4">
                    <p>
                      Já tem um usuário?
                      <a href="#" class="font-italic text-primary">
                        <u>Realize o login.</u>
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../plugins/axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";

export default {
  name: "Registro",

  data() {
    return {
      v$: useVuelidate(),
      nome: "",
      email: "",
      senha: "",
      response: {
        tipo: "",
        message: "",
      },
      progresso: 100,
      validado: false,
    };
  },

  validations() {
    return {
      nome: {
        required,
        minLength: minLength(4),
        $autoDirty: true,
      },
      email: {
        required,
        minLength: minLength(6),
        email,
        $autoDirty: true,
      },
      senha: {
        required,
        minLength: minLength(6),
        $autoDirty: true,
      },
    };
  },

  methods: {
    async registro() {
      const payload = {
        name: this.nome,
        email: this.email,
        password: this.senha,
      };

      this.validaForm();
      if (this.validado === true) {
        this.ResetResponse();

        axios
          .post("/auth/registro", payload)
          .then(() => {
            this.notificacao(
              "success",
              "Cadastro realizado com sucesso, faça o login para acessar o sistema."
            );

            this.ResetFormulario();
          })
          .catch(() => {
            this.notificacao(
              "danger",
              "As informações inseridas estão inválidas"
            );
          });
      } else {
        this.ResetResponse();
        this.notificacao("danger", "As informações inseridas estão inválidas");
      }
    },

    ResetFormulario() {
      (this.nome = ""), (this.email = ""), (this.senha = "");
    },

    async validaForm() {
      this.v$.$touch();
      const result = await this.v$.$validate();
      this.validado = result;
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

     ResetResponse() {
      this.response.tipo = "";
      this.response.message = "";
    }
  },
};
</script>

<style>
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  background-size: cover;
  background-position: center center;
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



