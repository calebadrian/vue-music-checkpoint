<template>
    <div class="itunes">
        <div class="row">
            <div class="col-sm-12 text-center mb-3" v-if="results.length > 0">
                <h3>Songs by {{results[0].artistName}}</h3>
            </div>
            <div class="col-sm-12 text-center" v-else>
                <h3>Search for an artist to see songs here</h3>
            </div>
            <div v-for="(result, i) in results" class="col-sm-6 text-center">
                <div v-if="i < 8 || showMore">
                    <img :src="result.artworkUrl100">
                    <h5>{{result.trackName}}</h5>
                    <h6>Artist: {{result.artistName}}</h6>
                    <h6>Album: {{result.collectionName}}</h6>
                    <div class="btn-group dropright">
                        <button type="button" class="btn btn-secondary dropdown-toggle mb-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add to Playlist
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-for="playlist in myPlaylists">
                                <p @click="addToMyPlaylist(playlist, result)">{{playlist.name}}</p>
                            </a>
                        </div>
                    </div>
                    <audio controls>
                        <source :src="result.previewUrl">
                    </audio>
                </div>
            </div>
            <div class="col-sm-12 d-flex justify-content-center align-items-center" v-if="results.length > 0 && !showMore">
                <button class="btn btn-primary full-width" @click="showMore = !showMore">Show More</button>
            </div>
            <div class="col-sm-12 d-flex justify-content-center align-items-center" v-if="results.length > 0 && showMore">
                <button class="btn btn-primary full-width" @click="showMore = !showMore">Hide</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'iTunes',
        data() {
            return {
                artist: '',
                showMore: false
            }
        },
        mounted() {
            this.$store.dispatch('getMyPlaylists')
        },
        methods: {
            addToMyPlaylist(playlist, track) {
                for (var i = 0; i < playlist.songs.length; i++) {
                    var inPlaylist = playlist.songs[i]
                    if (inPlaylist.trackId == track.trackId) {
                        alert(track.trackName + " is already in this playlist!")
                        return
                    }
                }
                track.playlistId = playlist._id
                this.$store.dispatch('createSong', { playlist: playlist, track: track })
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
    .full-width {
        width: 100%;
    }
</style>