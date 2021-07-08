<template>
  <v-container>
    <v-text-field
      class="pt-3"
      hide-details
      append-icon="mdi-magnify"
      placeholder="Search........."
      single-line
      v-model="search"
      @keyup.enter="searchData"
    ></v-text-field>
    <v-select
      v-model="category"
      label="Category"
      :items="categoryItem"
      item-text="title"
      item-value="_id"
      @change="searchData"
    >
    </v-select>
    <v-btn
      v-show="!isEmptyData"
      class="mt-3"
      @click="clearFilter"
      small
      color="warning"
    >
      clear
    </v-btn>
    <v-row no-grutters>
      <v-col sm="4" class="pa-3" v-for="book in listBook" :key="book._id">
        <v-card class="pa-1">
          <router-link :to="{ path: `/bookdetail/${book._id}` }">
            <v-img
              height="350"
              :src="`http://localhost:5000/${book.cover}`"
            ></v-img>
          </router-link>
          <v-btn
            class="ml-4 mt-3"
            @click="selectCategory(book.category._id)"
            small
            outlined
            color="indigo"
          >
            {{ book.category.title }}
          </v-btn>
          <router-link :to="{ path: `/bookdetail/${book._id}` }">
            <v-card-title class="headline">
              {{ book.title }}
            </v-card-title>
          </router-link>
          <v-card-text class="py-0">
            <p>{{ book.description.substring(0, 100) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card-actions v-show="isLoadMore" class="justify-center">
      <v-btn @click="loadMore" color="success">
        <v-icon fab x-large class="text-left" small v-text="'mdi-plus'" /> Load
        More
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
const { homeApi } = require("../../apis");
import categoryApi from "../../apis/categories";

export default {
  name: "ContentCard",
  data() {
    return {
      listBook: [],
      loading: true,
      page: 1,
      limit: 6,
      isLoadMore: true,
      option: {},
      items: [],
      search: "",
      category: "",
      categoryItem: [],
      isEmptyData: true,
    };
  },
  // mounted: async function() {
  //   const result = await categoryApi.getCategories();
  //   this.categoryItem = result.data.categories;
  // },
  watch: {
    search: function(val) {
      this.isEmptyData = val === '' && this.category === ''
    },
    category: function(val) {
      this.isEmptyData = val === '' && this.search === ''
    }
  },
  // mounted: async function() {
  //   this.loadMore();
  // },
  methods: {
    async paging() {
      this.loading = true;
      const condition = {
        page: this.page,
        limit: this.limit,
        filter: {
          search: this.search,
          category: this.category,
        },
      };
      try {
        const result = await homeApi.pagingBooks(condition);
        console.log(result);
        this.listBook = [...this.listBook, ...result.data.books.docs];
        this.isLoadMore = result.data.books.hasNextPage;
      } catch (error) {
        console.log(error);
      }
    },
    loadMore() {
      this.page++;
      this.paging();
    },
    searchData() {
      this.listBook = [];
      this.page = 1;
      console.log(this.category);
      this.paging();
    },
    getCategories: async function() {
      const result = await categoryApi.getCategories();
      // this.categoryItem = result.data.categories;
      this.categoryItem = [
        { title: "All Category", _id: "" },
        ...result.data.categories,
      ];
    },
    selectCategory(value) {
      this.category = value;
      this.searchData();
    },
    clearFilter() {
      this.category = '';
      this.search = '';
      this.searchData();
    }
  },
  mounted() {
    this.paging();
    this.getCategories();
  },
};
</script>

<style></style>
