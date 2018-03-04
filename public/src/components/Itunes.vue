<template>
    <div class="itunes">
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
        addToMyPlaylist(track) {
            for (var i = 0; i < this.$store.state.activePlaylist.songs.length; i++){
                var inPlaylist = this.$store.state.activePlaylist.songs[i]
                if (inPlaylist.trackId == track.trackId){
                    alert(track.trackName + " is already in this playlist!")
                    return
                }
            }
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