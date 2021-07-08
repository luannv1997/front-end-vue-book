<template>
  <v-container>
    <h1>Create Book</h1>
    <v-btn color="success">
      <router-link class="white--text" to="/books">List Book </router-link>
    </v-btn>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title class="white--text">Add</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col
                  cols="6"
                  class="text-center"
                  align="center"
                  justify="center"
                >
                  <input
                    ref="file"
                    type="file"
                    id="filechooser"
                    class="d-none"
                    @change="onChange"
                  />
                  <v-card
                    :class="image ? 'success--text' : 'grey--text'"
                    class="mx-auto mt-0 d-inline-flex v-card--account"
                    outlined
                    height="250"
                    width="200"
                    @click="$refs.file.click()"
                  >
                    <v-img
                      v-if="image"
                      :src="image"
                      height="100%"
                      width="100%"
                    />
                    <v-icon v-else class="mx-auto" size="150">
                      mdi-image
                    </v-icon>
                  </v-card>

                  <div class="font-weight-bold grey--text">
                    CHOOSE COVER
                  </div>
                </v-col>
                <v-col class="d-flex flex-column">
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="title"
                    label="Title"
                    type="text"
                    v-model="title"
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="author"
                    label="Author"
                    type="text"
                    v-model="author"
                  ></v-text-field>
                  <v-select
                    v-model="category"
                    label="Category"
                    prepend-icon="mdi-account"
                    :items="categoryItem"
                    item-text="title"
                    item-value="title"
                  >
                  </v-select>
                </v-col>
              </v-row>
              <v-row align="center" justify="center">
                <v-col cols="10">
                  <v-textarea
                    prepend-icon="mdi-asterisk"
                    name="description"
                    label="Desctiption"
                    v-model="description"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="register">Create New Book</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { mapMutations } from "vuex";
import bookApi from "../../../apis/books";
import categoryApi from "../../../apis/categories";

export default {
  name: "Register",

  data: () => {
    return {
      title: "",
      author: "",
      category: "",
      image: null,
      description: "",
      categoryItem: [],
      cover: "",
    };
  },

  created() {},
  mounted: async function() {
    const result = await categoryApi.getCategories();
    this.categoryItem = result.data.categories;
  },
  methods: {
    // ...mapMutations({
    //   setUserInfo: "SET_USER_INFO",
    // }),
    register: async function() {
      const formData = new FormData();
      formData.append('cover', this.cover)
      formData.append('title', this.title)
      formData.append('author', this.author)
      formData.append('categoryTitle', this.category)
      formData.append('description', this.description)

      const result = await bookApi.createBook(formData);
      if (result.data.success === true) {
        alert(result.data.message);
        this.$router.push("/books");
      } else {
        alert(result.data.message);
      }
    },
    onChange(val) {
      const value = val.target.files[0];
      if (!value) return (this.image = null);
      this.cover = value
      this.image = URL.createObjectURL(value);
    },
  },
};
</script>
