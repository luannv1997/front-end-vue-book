<template>
  <v-container>
    <h1>List Category</h1>

    <v-btn color="success">
      <router-link class="white--text" to="/categories/add"
        ><v-icon fab x-large class="text-left" small v-text="'mdi-plus'" /> Add
        new
      </router-link>
    </v-btn>

    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          @keyup.enter="paging"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :page="page"
        :pageCount="numberOfPages"
        :server-items-length="totalPassengers"
        :loading="loading"
        :options.sync="options"
        :headers="headers"
        :items="items"
        :items-per-page="limit"
        class="elevation-1"
      >
        <template v-slot:item="row">
          <tr class="text-left">
            <td>{{ row.item._id }}</td>
            <td>{{ row.item.title }}</td>
            <td>
              <router-link
                class="white--text"
                :to="{ path: `/categories/update/${row.item._id}`}"
                ><v-btn fab x-small color="success" class="px-2 ml-1">
                  <v-icon small v-text="'mdi-pencil'" />
                </v-btn>
              </router-link>
              <v-btn
                @click="
                  confirmDeleteId = row.item._id;
                  dialog = true;
                "
                fab
                x-small
                color="error"
                class="px-2 ml-1"
              >
                <v-icon small v-text="'mdi-close'" />
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h4">
          Do you want to Delete this category??
        </v-card-title>

        <v-card-text class="black--text">
          All category deleted never comeback...
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click.stop="fDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import categoriesApi from "../../../apis/categories";
export default {
  data() {
    return {
      dialog: false,
      page: 1,
      numberOfPages: 0,
      confirmDeleteId: null,
      totalPassengers: 0,
      loading: true,
      limit: 5,
      options: {},
      sortBy: "",
      sortDesc: "",
      search: "",
      headers: [
        {
          text: "#",
        },
        {
          sortable: true,
          text: "Title",
          value: "title",
        },
        {
          text: "Action",
        },
      ],
      items: [],
    };
  },
  watch: {
    options: {
      handler(newValue) {
        this.page = newValue.page;
        this.limit = newValue.itemsPerPage;
        this.sortBy = newValue.sortBy[0];
        this.sortDesc = newValue.sortDesc[0] === true ? "-" : "";
        this.paging()
      },
    },
    deep: true,
  },
  methods: {
    async paging() {
      this.loading = true;
      const condition = {
        page: this.page,
        limit: this.limit,
        sort_column: this.sortBy,
        sort_direction: this.sortDesc,
        search: this.search,
      };
      const result = await categoriesApi.paging(condition);
      this.loading = false;
      if (result.data.success === true) {
        const { docs: categories, limit, page, totalDocs } = result.data.categories;
        this.page = page;
        this.numberOfPages = limit;
        this.limit = limit;
        this.totalPassengers = totalDocs;
        this.items = categories;
      } else {
        alert(result.data.message);
      }
    },
    fDelete: async function() {
      if (this.confirmDeleteId) {
        const result = await categoriesApi.deleteCategory(this.confirmDeleteId);
        if (result.data.success === true) {
          alert(result.data.message);
          this.items = this.items.filter((item) => {
            return item._id !== this.confirmDeleteId;
          });
        } else alert(result.data.message);
        this.confirmDeleteId = null;
        this.dialog = false;
      }
    },
  },
};
</script>
