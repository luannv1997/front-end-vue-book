<template>
  <v-container class="">
    <h1>Update User</h1>
    <v-btn color="success">
      <router-link class="white--text" to="/users">List User </router-link>
    </v-btn>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title class="white--text">Update</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="id"
                label="Id"
                type="text"
                v-model="id"
                disabled
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
                name="username"
                label="Username"
                type="text"
                v-model="username"
                disabled
              ></v-text-field>
              <v-text-field
                prepend-icon="mdi-account"
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
            <v-btn color="success" @click="update">Update User</v-btn>
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
      firstName: "",
      lastName: "",
      role: "",
      id: "",
      password: "",
    };
  },

  created() {
    console.log(this.$route.meta);
    this.id = this.$route.params.id;
  },
  mounted: async function() {
    const result = await usersApi.getUserById(this.id);
    this.username = result.data.user.username;
    this.firstName = result.data.user.firstName;
    this.lastName = result.data.user.lastName;
    this.role = result.data.user.role;
  },
  methods: {
    // ...mapMutations({
    //   setUserInfo: "SET_USER_INFO",
    // }),
    update: async function() {
      const result = await usersApi.updateUserById(this.id, {
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        password: this.password
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
