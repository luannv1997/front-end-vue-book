<template>
  <v-app id="landing">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            LuanNV15 App
          </v-list-item-title>
          <v-list-item-subtitle>
            Full Stack App
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group color="success">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
            link
            v-show="item.show"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
// import store from '../../store'
// import { mapGetters } from "vuex";
export default {
  name: "Landing",
  // created() {
  //   // this.userRole = mapGetters(["userRole"]);
  //   this.userRole = this.$store.getters.userRole
  //   console.log(this.userRole)
  // },
  // computed() { return this.userRole =  this.$store.getters.userRole },
  data: function () {
    console.log(this.$store.getters.userRole);
    return {
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home", link: "/", show: true},
      {
        title: "Book Manage",
        icon: "mdi-book",
        link: "/books",
        show: this.$store.getters.userRole === 'ADMIN' || this.$store.getters.userRole === 'CONTRIBUTOR',
      },
      {
        title: "User Manage",
        icon: "mdi-account",
        link: "/users",
        show: this.$store.getters.userRole === 'ADMIN',
      },
      {
        title: "Category Manage",
        icon: "mdi-flag",
        link: "/categories",
        show: this.$store.getters.userRole === 'ADMIN',
      },
    ],
  };
  },
};
</script>

<style></style>
