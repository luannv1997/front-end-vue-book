<template>
  <v-container class="">
    <h1>Create User</h1>
    <v-btn color="success">
      <router-link class="white--text" to="/users">List User </router-link>
    </v-btn>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title class="white--text">Add</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="username"
                label="Username"
                type="text"
                v-model="username"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                name="firstName"
                label="First Name"
                type="text"
                v-model="firstName"
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                name="lastName"
                label="Last Name"
                type="text"
                v-model="lastName"
              ></v-text-field>
              <v-select
                v-model="role"
                label="Role"
                prepend-icon="mdi-account"
                :items="['ADMIN', 'USER', 'CONTRIBUTOR']"
              >
              </v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="register">Create New User</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapMutations } from "vuex";
const { usersApi } = require("../../../apis/");
export default {
  name: "Register",

  data: () => {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "",
    };
  },

  created() {},

  methods: {
    // ...mapMutations({
    //   setUserInfo: "SET_USER_INFO",
    // }),
    register: async function() {
      const result = await usersApi.createUser({
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
      });
      if (result.data.success === true) {
        alert(result.data.message);
        this.$router.push("/users");
      } else {
        alert(result.data.message);
      }
    },
  },
};
</script>
