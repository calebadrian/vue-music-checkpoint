<template>
    <div class="itunes">
        <h1>iTunes Search</h1>
        <form @submit.prevent="musicSearch">
            <input type="text" v-model="artist" placeholder="artist">
            <button class="btn-success" type="submit">Search Itunes</button>
            <button class="btn-danger" type="reset">Reset Form</button>
        </form>
        <div class="row">
            <div v-for="result in results" class="col-sm-6 text-center">
                <img :src="result.artworkUrl100">
                <h5>{{result.trackName}}</h5>
                <h6>Artist: {{result.artistName}}</h6>
                <h6>Album: {{result.collectionName}}</h6>
                <h6>Song Price: ${{result.trackPrice}}</h6>
                <button @click="addToMyPlaylist(result)" class="btn-info">Add To Playlist</button>
                <audio controls>
                    <source :src="result.previewUrl">
                </audio>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'iTunes',
    data () {
        return {
            artist: ''
        }
    },
    methods: {
        musicSearch() {
            this.$store.dispatch('getMusicByArtist', this.artist)
        },
        addToMyPlaylist(track) {
            track.playlistId = this.$store.state.activePlaylist._id
            this.$store.dispatch('createSong', {playlist: this.$store.state.activePlaylist, track: track})
        }
    },
    computed: {
        results() {
            return this.$store.state.results
        },
        myPlaylist() {
            return this.$store.state.activePlaylist
        }
    }
}

</script>

<style>


</style>