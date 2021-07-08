<template>
  <v-container>
    <h1 align="center" justify="center">{{ book.title }}</h1>
    <v-row align="center" justify="center">
      <v-col cols="6" align="center" justify="center">
        <v-img
          heigh="500px"
          width="350px"
          :src="`http://localhost:5000/${book.cover}`"
        ></v-img>
      </v-col>
      <v-col cols="6">
        <div class="font-weight-bold">
          {{ book.author }}
        </div>
        <div class="font-weight-bold">
          {{ book.category.title }}
        </div>
        <div class="font-weight-light">
          {{ book.description }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import bookApi from "../../apis/books";
// import categoryApi from "../../apis/categories";
export default {
  data: () => {
    return {
      book: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted: async function() {
    const result = await bookApi.getBookById(this.id);
    this.book = result.data.book;
  },
};
</script>

<style></style>
