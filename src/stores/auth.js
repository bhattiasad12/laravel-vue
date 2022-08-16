import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: "",
    id: "",
    email: "",
    name: "",
  }),
  getters: {
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async signIn(email, password) {
      await axios
        .post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);

          localStorage.setItem("email", response.data.users.email);
          localStorage.setItem("token", response.data.users.token);
          localStorage.setItem("id", response.data.users.id);
          localStorage.setItem("name", response.data.users.name);

          this.token = response.data.token;
          this.id = response.data.users.id;
          this.email = response.data.users.email;
          this.name = response.data.users.name;
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async signUp(name, email, password, password_confirmation) {
      await axios
        .post("http://127.0.0.1:8000/api/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tryLogin() {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");

      this.token = token;
      this.id = id;
      this.email = email;
      this.name = name;
    },
    signOut() {
      localStorage.clear();

      this.token = "";
      this.id = "";
      this.email = "";
      this.name = "";

      router.replace("/");
    },
  },
});
