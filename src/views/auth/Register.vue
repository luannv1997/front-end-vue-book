<template>
  <v-container class="fluid fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title class="white--text">Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="username"
                label="Username"
                type="text"
                v-model="username"
                autocomplete="new-username"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                autocomplete="new-username"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                name="firstName"
                label="First Name"
                type="text"
                v-model="firstName"
                autocomplete="new-firstName"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                name="lastName"
                label="Last Name"
                type="text"
                v-model="lastName"
                autocomplete="new-lastName"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="register">Register</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <SnackBar />
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import SnackBar from "../component/SnackBar.vue";
const { authApi } = require("../../apis");
export default {
  name: "Register",
  components: {
    SnackBar,
  },
  data: () => {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  },

  created() {},

  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER_INFO",
    }),
    register: async function() {
      const result = await authApi.register({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      });
      if (result.data.success === true) {
        alert(result.data.message);
        const resultlogin = await authApi.login({
          username: this.username,
          password: this.password,
        });
        if (resultlogin.data) {
          this.setUserInfo(resultlogin.data);
          this.$router.push("/");
        } else {
          this.$notificate.showMessage({
            content: resultlogin.data.message,
            color: "error",
          });
        }
      } else {
        this.$notificate.showMessage({
          content: result.data.message,
          color: "error",
        });
      }
    },
  },
};
</script>
