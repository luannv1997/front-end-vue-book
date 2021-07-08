<template>
  <v-container>
    <h1>List Book</h1>

    <v-btn color="success">
      <router-link class="white--text" to="/books/add"
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
            <td>{{ row.item.title }}</td>
            <td>{{ row.item.author }}</td>
            <td>
              {{ row.item.owner.firstName + " " + row.item.owner.lastName }}
            </td>
            <td>
              <v-img
                max-height="150"
                max-width="100"
                :src="`http://localhost:5000/${row.item.cover}`"
              ></v-img>
            </td>
            <td>{{ row.item.category.title }}</td>
            <td>{{ row.item.description.substring(0, 100) + "..." }}</td>
            <td width="120px">
              <router-link
                class="white--text"
                :to="{ path: `/books/update/${row.item._id}` }"
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
          Do you want to Delete this user??
        </v-card-title>

        <v-card-text class="black--text">
          All user deleted never comeback...
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
import bookApi from "../../../apis/books";
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
          sortable: true,
          text: "Title",
          value: "title",
        },
        {
          sortable: true,
          text: "Author",
          value: "author",
        },
        {
          sortable: true,
          text: "Owner",
          value: "owner",
        },
        {
          sortable: true,
          text: "Cover",
          value: "cover",
        },
        {
          sortable: true,
          text: "Category",
          value: "category",
        },
        {
          sortable: true,
          text: "Description",
          value: "description",
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
        this.paging();
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
      const result = await bookApi.paging(condition);
      this.loading = false;
      if (result.data.success === true) {
        const { docs: books, limit, page, totalDocs } = result.data.books;
        this.page = page;
        this.numberOfPages = limit;
        this.limit = limit;
        this.totalPassengers = totalDocs;
        this.items = books;
      } else {
        alert(result.data.message);
      }
    },
    // updateUser(id) {
    //   this.$router.push({ path: "/admin/users/edituser/" + id });
    // },
    fDelete: async function() {
      if (this.confirmDeleteId) {
        const result = await bookApi.deleteBook(this.confirmDeleteId);
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
  // mounted() {
  //   this.paging();
  // },
};
</script>
