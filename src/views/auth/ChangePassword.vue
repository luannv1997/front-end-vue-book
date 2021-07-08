<template>
  <v-container class="fluid fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="success">
            <v-toolbar-title class="white--text"
              >Change Password</v-toolbar-title
            >
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="oldPssword"
                label="Old Password"
                type="password"
                v-model="oldPassword"
                autocomplete="old-password"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="oldPassword"
                label="New Password"
                type="password"
                v-model="newPassword"
                autocomplete="new-password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="changePassword"
              >Change Password</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <SnackBar />
  </v-container>
</template>

<script>
import SnackBar from "../component/SnackBar.vue";
import { mapMutations } from "vuex";
const { authApi } = require("../../apis");
export default {
  name: "ChangePassword",
  components: {
    SnackBar,
  },
  data: () => {
    return {
      oldPassword: "",
      newPassword: "",
    };
  },

  created() {},

  methods: {
    ...mapMutations({
      setUserToken: "SET_NEW_TOKEN",
    }),
    changePassword: async function() {
      const result = await authApi.changePassword({
        password: this.oldPassword,
        newPassword: this.newPassword,
      });
      if (result.data.success === true) {
        this.setUserToken(result.data);
        this.$router.push("/");
      } else {
        this.$notificate.showMessage({
          content: result.data.message,
          color: "error",
        });
      }
    },
  },
};
</script>
