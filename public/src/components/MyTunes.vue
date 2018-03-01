<template>
    <div class="my-tunes">
        <h1>List of MyTunes</h1>
        <div class="row">
            <div class="col-sm-6" v-for="song in myPlaylist">
                <img :src="song.artworkUrl100">
                <h5>{{song.trackName}}</h5>
                <h6>{{song.artistName}}</h6>
                <h6>{{song.collectionName}}</h6>
                <h6>{{song.trackPrice}}</h6>
                <button class="btn-danger">Remove from Playlist</button>
                <button class="btn-success">Promote</button>
                <button class="btn-warning">Demote</button>
                <audio controls>
                    <source :src="song.previewUrl">
                </audio>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'My-Tunes',
    mounted() {
        this.$store.dispatch('getMyPlaylist')
    },
    data () {
        return {
            
        }
    },
    methods: {

    },
    computed: {
        myPlaylist(){
            return this.$store.state.myPlaylist
        }
    }
}

</script>

<style>


</style>