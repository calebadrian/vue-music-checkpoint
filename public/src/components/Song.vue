<template>
    <div class="song row d-flex align-items-center mb-3">
        <audio class="full-width" :id="song._id">
            <source :src="song.previewUrl">
        </audio>
        <div class="col-sm-2 text-center">
            <i class="fas fa-2x fa-play-circle play" @click="checkPlay(song)" :id="song.trackId"></i>
        </div>
        <div class="col-sm-2 text-center">
            <i class="fas fa-2x fa-volume-up" @click="mute(song)" :id="song.trackName"></i>
        </div>
        <div class="col-sm-6 d-flex justify-content-center align-items-center">
            <div class="d-flex flex-column align-items-center">
                <p>{{song.trackName}}</p>
                <p>by</p>
                <p>{{song.artistName}}</p>
            </div>
        </div>
        <div class="col-sm-2 text-center">
            <div class="d-flex flex-column justify-content-between">
                <i @click="promotePlaylist(song)" class="fas fa-arrow-up"></i>
                <i @click="removeFromPlaylist(song)" class="fas fa-minus-circle mt-1 mb-1"></i>
                <i @click="demotePlaylist(song)" class="fas fa-arrow-down"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Song",
        props: ['song'],
        data() {
            return {

            }
        },
        methods: {
            // moving() {
            //     event.dataTransfer.setData('text/javascript', JSON.stringify(this.song))
            // },
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
        }
    }

</script>

<style>
    .full-width {
        width: 100%;
    }

    .play:hover {
        transition: linear all .3s;
        color: green
    }
    p{
        margin-bottom: 0;
    }
</style>