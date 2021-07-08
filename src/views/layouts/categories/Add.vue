<template>
  <v-container class="">
    <h1>Create Category</h1>
    <v-btn color="success">
      <router-link class="white--text" to="/categories">List Category </router-link>
    </v-btn>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title>Add</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account"
                name="title"
                label="Title"
                type="text"
                v-model="title"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="register">Create New Category</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapMutations } from "vuex";
import categoriesApi from "../../../apis/categories";
export default {
  name: "Register",

  data: () => {
    return {
      title: "",
    };
  },

  created() {},

  methods: {
    // ...mapMutations({
    //   setUserInfo: "SET_USER_INFO",
    // }),
    register: async function() {
      const result = await categoriesApi.createCategory({
        title: this.title
      });
      if (result.data.success === true) {
        alert(result.data.message);
        this.$router.push("/categories");
      } else {
        alert(result.data.message);
      }
    },
  },
};
</script>
