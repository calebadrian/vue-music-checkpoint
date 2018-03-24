<template>
  <div class="home">
    <div class="col-sm-12 d-flex flex-column align-items-center justify-content-center head">
        <h1>iTunes Search</h1>
        <button class="btn btn-info mb-3" @click="hideForm = !hideForm">Search For Music</button>
        <form @submit.prevent="musicSearch" v-if="!hideForm" class="d-flex flex-column">
            <input type="text" v-model="artist" placeholder="artist" class="mb-2">
            <div>
              <button class="btn-success" type="submit">Search Itunes</button>
              <button class="btn-danger" type="reset">Reset Form</button>
            </div>
        </form>
    </div>
    <!-- YOU WILL PROBABLY END UP WITH SOMETHING LIKE THIS -->
    <div class="col-sm-12 content">
      <div class="row justify-content-between">
        <itunes class="col-sm-6 mt-4"></itunes>
        <my-tunes class="col-sm-5 mt-4"></my-tunes>
      </div>
    </div>
    <!-- <i class="fas fa-2x fa-arrow-left" @click="toggleHidden"></i> -->
  </div>
</template>

<script>
  import MyTunes from './MyTunes.vue'
  import Itunes from './Itunes.vue'
  export default {
    name: 'home',
    data() {
      return {
        artist: '',
        hideForm: true
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
            this.artist = '';
            this.hideForm = true;
        },
    }
  }
</script>


<style>
  .head{
    background: url('../assets/header-bg.jpeg') center center no-repeat;
    background-size: cover;
    min-height: 70vh;
  }
  .content{
    min-height: 30vh;
    background-image: url('../assets/content-bg.png');
    background-color: black;
    color: rgba(240, 240, 240, .8)
  }
</style>