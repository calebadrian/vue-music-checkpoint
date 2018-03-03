<template>
  <div class="home">
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
      <itunes class="itunes col-sm-6"></itunes>
      <!-- <i class="fas fa-2x fa-arrow-left" @click="toggleHidden"></i> -->
      <my-tunes class="my-tunes col-sm-6"></my-tunes>
  </div>
</template>

<script>
  import MyTunes from './MyTunes.vue'
  import Itunes from './Itunes.vue'
  export default {
    name: 'home',
    data() {
      return {
        hidden: true
      }
    },
    components: {
      Itunes,
      MyTunes
    },
    methods: {
      toggleHidden() {
        this.hidden = !this.hidden
      }
    }
  }
</script>


<style>
  .my-tunes {
    display: inline-block;
    min-height: 500px;
    min-width: 50%;
    background: green;
  }

  .itunes {
    display: inline-block;
    background: red;
    min-height: 500px;
    min-width: 45%;
  }
</style>