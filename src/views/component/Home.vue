<template>
  <v-app>
    <v-app-bar dark max-height="65">
      <Header />
    </v-app-bar>
    <v-content>
      <!-- <Content /> -->
      <router-view />
    </v-content>
    <v-footer>
      <Footer />
    </v-footer>
  </v-app>
</template>

<script>
import Header from "./Appbar.vue";
import Footer from "./Footer.vue";
// import Content from "./Content.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
    // Content,
  },
};
</script>

<style></style>
