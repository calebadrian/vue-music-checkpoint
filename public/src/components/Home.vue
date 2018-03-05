<template>
  <div class="home">
    <div class="col-sm-12 d-flex flex-column align-items-center justify-content-center head">
        <h1>iTunes Search</h1>
        <form @submit.prevent="musicSearch">
            <input type="text" v-model="artist" placeholder="artist">
            <button class="btn-success" type="submit">Search Itunes</button>
            <button class="btn-danger" type="reset">Reset Form</button>
        </form>
    </div>
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <itunes class="col-sm-6"></itunes>
    <!-- <i class="fas fa-2x fa-arrow-left" @click="toggleHidden"></i> -->
    <my-tunes class="col-sm-6"></my-tunes>
  </div>
</template>

<script>
  import MyTunes from './MyTunes.vue'
  import Itunes from './Itunes.vue'
  export default {
    name: 'home',
    data() {
      return {
        artist: ''
      }
    },
    components: {
      Itunes,
      MyTunes
    },
    methods: {
      toggleHidden() {
        this.hidden = !this.hidden
      },
      musicSearch() {
            this.$store.dispatch('getMusicByArtist', this.artist)
        },
    }
  }
</script>


<style>
  .head{
    background-color: rgb(200, 200, 200);
    min-height: 9rem
  }
</style>