<template>
  <v-container class="">
    <h1>Update Category</h1>
    <v-btn color="success">
      <router-link class="white--text" to="/categories">List Category </router-link>
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
                name="title"
                label="Title"
                type="text"
                v-model="title"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="update">Update Category</v-btn>
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
  name: "Update",

  data: () => {
    return {
      title: '',
    };
  },

  created() {
    console.log(this.$route.meta);
    this.id = this.$route.params.id;
  },
  mounted: async function() {
    const result = await categoriesApi.getCategoryById(this.id);
    this.title = result.data.category.title;
  },
  methods: {
    // ...mapMutations({
    //   setUserInfo: "SET_USER_INFO",
    // }),
    update: async function() {
      const result = await categoriesApi.updateCategoryById(this.id, {
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
