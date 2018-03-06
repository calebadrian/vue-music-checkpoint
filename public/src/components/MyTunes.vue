<template>
    <div class="my-tunes">
        <div class="row">
            <div class="col-sm-12 d-flex flex-column align-items-center">
                <h1>Your Playlists</h1>
                <h4>Create a new playlist or choose from the ones below</h4>
                <button class="btn-success mb-2" @click="toggleHidden">Add a Playlist</button>
                <button class="btn-danger mb-2" @click="removePlaylist(myPlaylist)" v-if="removeHidden">Remove {{myPlaylist.name}}</button>
                <form class="mb-3" v-if="!hidden" @submit.prevent="createPlaylist">
                    <input type="text" v-model="toCreate" placeholder="playlist name">
                    <button class="btn-success" type="submit">Create Playlist</button>
                    <button class="btn-danger" type="reset">Reset Form</button>
                </form>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Playlists
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" v-for="playlist in myPlaylists" @click="setActivePlaylist(playlist)">
                            <p @click="setActivePlaylist(playlist)">{{playlist.name}}</p>
                        </a>
                    </div>
                </div>
                <h5>Songs for {{myPlaylist.name}}: </h5>
            </div>
            <div class="col-sm-12 d-flex flex-column" v-for="song in myPlaylist.songs">
                <div class="d-flex justify-content-between align-items-center pb-3 pt-3">
                    <audio class="full-width" :id="song._id">
                        <source :src="song.previewUrl">
                    </audio>
                    <i class="fas fa-2x fa-play-circle play" @click="checkPlay(song)" :id="song.trackId"></i>
                    <i class="fas fa-2x fa-volume-up" @click="mute(song)" :id="song.trackName"></i>
                    <div class="d-flex flex-column text-center">
                        <h5>{{song.trackName}}</h5>
                        <h6>by {{song.artistName}}</h6>
                    </div>
                    <h6>{{song.collectionName}}</h6>
                    <h6>${{song.trackPrice}}</h6>
                    <div class="d-flex flex-column justify-content-between">
                        <i @click="promotePlaylist(song)" class="fas fa-arrow-up"></i>
                        <i @click="removeFromPlaylist(song)" class="fas fa-minus-circle mt-1 mb-1"></i>
                        <i @click="demotePlaylist(song)" class="fas fa-arrow-down"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'My-Tunes',
        mounted() {
            this.$store.dispatch('getMyPlaylists')
        },
        data() {
            return {
                toCreate: '',
                hidden: true,
                removeHidden: false
            }
        },
        methods: {
            removeFromPlaylist(song) {
                this.$store.dispatch('removeFromPlaylist', song)
                this.$store.dispatch('removeFromPlaylistTracks', song)
            },
            promotePlaylist(song) {
                var map = []
                for (var i = 0; i < this.$store.state.activePlaylist.songs.length; i++) {
                    var mySong = this.$store.state.activePlaylist.songs[i]
                    if (mySong._id == song._id) {
                        if (i == 0) {
                            alert(mySong.trackName + " is already at the top of your playlist!")
                            return
                        }
                        this.$store.state.activePlaylist.songs.splice(i, 1)
                        this.$store.state.activePlaylist.songs.splice(i - 1, 0, song)
                    }
                }
                for (var i = 0; i < this.$store.state.activePlaylist.songs.length; i++) {
                    map[i] = this.$store.state.activePlaylist.songs[i]._id
                }
                this.$store.dispatch('setPlaylistOrder', { playlist: this.$store.state.activePlaylist, map: map })
            },
            demotePlaylist(song) {
                var map = []
                for (var i = 0; i < this.$store.state.activePlaylist.songs.length; i++) {
                    var mySong = this.$store.state.activePlaylist.songs[i]
                    if (mySong._id == song._id) {
                        if (i == this.$store.state.activePlaylist.songs.length - 1) {
                            alert(mySong.trackName + " is already at the bottom of your playlist")
                        }
                        this.$store.state.activePlaylist.songs.splice(i, 1)
                        this.$store.state.activePlaylist.songs.splice(i + 1, 0, song)
                        break;
                    }
                }
                for (var i = 0; i < this.$store.state.activePlaylist.songs.length; i++) {
                    map[i] = this.$store.state.activePlaylist.songs[i]._id
                }
                this.$store.dispatch('setPlaylistOrder', { playlist: this.$store.state.activePlaylist, map: map })
            },
            checkPlay(song) {
                for (var i = 0; i < this.$store.state.activePlaylist.songs.length; i++) {
                    var mySong = this.$store.state.activePlaylist.songs[i]
                    if (mySong._id == song._id) {
                        var audioElem = document.getElementById(mySong._id)
                        var playElem = document.getElementById(mySong.trackId)
                        if (audioElem.paused) {
                            audioElem.play()
                            playElem.classList.remove('fa-play-circle')
                            playElem.classList.add('fa-pause-circle')
                        } else {
                            audioElem.pause()
                            playElem.classList.remove('fa-pause-circle')
                            playElem.classList.add('fa-play-circle')
                        }
                    } else {
                        document.getElementById(mySong._id).pause()
                        var pauseElem = document.getElementById(mySong.trackId)
                        if (pauseElem.classList.contains('fa-pause-circle')) {
                            pauseElem.classList.remove('fa-pause-circle')
                            pauseElem.classList.add('fa-play-circle')
                        }
                    }
                }
            },
            mute(song) {
                var muteElem = document.getElementById(song._id)
                var muteSymbol = document.getElementById(song.trackName)
                muteElem.muted = !muteElem.muted
                if (muteSymbol.classList.contains('fa-volume-up')) {
                    muteSymbol.classList.remove('fa-volume-up')
                    muteSymbol.classList.add('fa-volume-off')
                } else {
                    muteSymbol.classList.remove('fa-volume-off')
                    muteSymbol.classList.add('fa-volume-up')
                }
            },
            setActivePlaylist(playlist) {
                this.removeHidden = true
                this.$store.dispatch('getMyPlaylist', playlist)
            },
            createPlaylist() {
                this.hidden = !this.hidden
                this.$store.dispatch('addPlaylist', { name: this.toCreate })
            },
            removePlaylist(playlist) {
                var choice = confirm("Are you sure you would like to remove this playlist?")
                if (choice) {
                    this.removeHidden = false
                    this.$store.dispatch('removePlaylist', playlist)
                } else {
                    return
                }
            },
            toggleHidden() {
                this.hidden = !this.hidden
            }
        },
        computed: {
            myPlaylists() {
                return this.$store.state.myPlaylists
            },
            myPlaylist() {
                return this.$store.state.activePlaylist
            }
        }
    }

</script>

<style>
    .full-width {
        width: 100%;
    }

    .play:hover {
        transition: linear all .3s;
        color: blue
    }
</style>