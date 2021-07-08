<template>
  <v-container class="fluid fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title class="white--text">Login Now</v-toolbar-title>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="login">Login</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <SnackBar />
  </v-container>
</template>

<script>
import SnackBar from "../component/SnackBar.vue";
import { mapMutations } from "vuex";
const { authApi } = require("../../apis");
export default {
  name: "Login",

  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  components: {
    SnackBar,
  },
  created() {},
  methods: {
    ...mapMutations({
      setUserInfo: "SET_USER_INFO",
    }),
    login: async function() {
      const result = await authApi.login({
        username: this.username,
        password: this.password,
      });
      if (result.data.success === true) {
        this.setUserInfo(result.data);
        this.$router.push("/");
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
