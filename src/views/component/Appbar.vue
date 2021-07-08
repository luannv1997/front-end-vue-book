<template>
  <v-container>
    <v-toolbar flat class="mainHeader">
      <v-toolbar-title class="pt-2">
        <router-link class="white--text" to="/">Home</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title
        v-if="userIsAuthenticated && userRole !== 'USER'"
        class="pt-2"
      >
        <router-link class="white--text" to="/admin">Dashboard</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="userIsAuthenticated" class="hidden-xs-only">
        <v-btn text class="white--text">Welcome {{ userFullName }},</v-btn>
        <v-btn text>
          <router-link class="white--text" to="/changePassword">
            Change Password
          </router-link>
        </v-btn>
        <v-btn @click.stop="dialog = true" text class="white--text"
          >Log out</v-btn
        >
        <v-btn text>
          <router-link class="white--text" to="/about">About</router-link>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-xs-only">
        <v-btn text>
          <router-link class="white--text" to="/register">Register</router-link>
        </v-btn>
        <v-btn text>
          <router-link class="white--text" to="/login">Log in</router-link>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h4">
          Do you want to log out??
        </v-card-title>

        <v-card-text class="black--text">
          We will miss you!!!!
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn color="green darken-1" text @click="logout">
            Log Out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
const { authApi } = require("../../apis");
export default {
  name: "Header",
  data() {
    return {
      dialog: false,
    };
  },
  computed: mapGetters(["userIsAuthenticated", "userFullName", "userRole"]),
  methods: {
    ...mapMutations({
      clearUserInfo: "CLEAR_USER_INFO",
    }),
    logout: async function() {
      const result = await authApi.logout();
      if (result.data.success === true) {
        this.dialog = false;
        this.clearUserInfo();
        this.$router.push("/login");
      } else {
        alert(result.data.message);
      }
    },
  },
};
</script>
