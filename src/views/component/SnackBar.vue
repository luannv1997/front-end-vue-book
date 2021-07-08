<template>
    <v-snackbar v-model="show" :color="color" top timeout="4000">
        {{ message }}
    <v-btn text @click="show = false">Close</v-btn>
    </v-snackbar>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        message: '',
        color: '',
      }
    },
    created () {
      this.$store.subscribe((mutation) => {
        if (mutation.type === 'SHOW_TOASK') {
          this.message = mutation.payload.content
          this.color = mutation.payload.color
          this.show = true
        }
      })
    },
  }
</script>