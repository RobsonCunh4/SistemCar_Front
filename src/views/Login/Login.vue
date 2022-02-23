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
                <p class="text-secondary mb-4">
                  Realize o login para ter acesso ao sistema!
                </p>

                <div
                  v-if="response.message"
                  :class="`alert alert-danger alert-dismissible`"
                  role="alert"
                >
                  {{ response.message }}
                  <div
                    class="progress active"
                    role="progressbar"
                    style="height: 5px"
                  >
                    <div
                      :class="`progress-bar bg-danger`"
                      :style="`width: ${progresso}%; opacity: 0.5`"
                    ></div>
                  </div>
                </div>
                <form class="mt-4">
                  <div class="form-group mb-3">
                    <input
                      type="email"
                      placeholder="Email"
                      autofocus=""
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
                      id="inputPassword"
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
                      @click.stop.prevent="login()"
                    >
                      Entrar
                    </button>
                  </div>
                </form>
                <div class="d-flex justify-content-end mt-4">
                  <p>
                    Novo usuário?
                    <router-link :to="{ name: 'registro' }"
                      ><u>Realize o cadastro.</u></router-link
                    >
                  </p>
                </div>
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
import Cookie from "@/service/cookie";
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";

export default {
  name: "Login",

  data() {
    return {
      v$: useVuelidate(),
      email: "",
      senha: "",
      response: {
        message: "",
      },
      progresso: 100,
      validado: false,
    };
  },

  validations() {
    return {
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
    async login() {
      const payload = {
        email: this.email,
        password: this.senha,
      };

      this.validaForm();
      if (this.validado === true) {
        this.ResetResponse();

        axios
          .post("/auth/login", payload)
          .then((response) => {
            const token = `${response.data.token_type} ${response.data.token}`;
            Cookie.setToken(token);
            this.$router.push({ name: "dashboard" });
          })
          .catch(() => {
            this.notificacao("E-mail e/ou senha inválidos");
          });
      } else {
        this.ResetResponse();
        this.notificacao("E-mail e/ou senha inválidos");
      }
    },

    ResetResponse() {
      this.response.message = "";
    },

    async validaForm() {
      this.v$.$touch();
      const result = await this.v$.$validate();
      this.validado = result;
    },

    notificacao(msg) {
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
  },
};
</script>

<style>
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  background-image: url("~@/assets/imagens/login.jpg");
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



