<template>
    <div class="itunes">
        <div class="row">
            <div v-for="result in results" class="col-sm-6 text-center">
                <img :src="result.artworkUrl100">
                <h5>{{result.trackName}}</h5>
                <h6>Artist: {{result.artistName}}</h6>
                <h6>Album: {{result.collectionName}}</h6>
                <h6>Song Price: ${{result.trackPrice}}</h6>
                <div v-for="playlist in myPlaylists">
                    <button class="btn-info" @click="addToMyPlaylist(playlist, result)">Add To {{playlist.name}}</button>
                </div>
                <!-- <button @click="addToMyPlaylist(result)" class="btn-info">Add To Playlist</button> -->
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
    mounted() {
        this.$store.dispatch('getMyPlaylists')
    },
    methods: {
        addToMyPlaylist(playlist, track) {
            for (var i = 0; i < playlist.songs.length; i++){
                var inPlaylist = playlist.songs[i]
                if (inPlaylist.trackId == track.trackId){
                    alert(track.trackName + " is already in this playlist!")
                    return
                }
            }
            track.playlistId = playlist._id
            this.$store.dispatch('createSong', {playlist: playlist, track: track})
        }
    },
    computed: {
        results() {
            return this.$store.state.results
        },
        myPlaylist() {
            return this.$store.state.activePlaylist
        },
        myPlaylists() {
            return this.$store.state.myPlaylists
        }
    }
}

</script>

<style>


</style>