<template>
    <div class="my-tunes">
        <h1>List of MyTunes</h1>
        <div class="row">
            <div class="col-sm-12 d-flex flex-column" v-for="song in myPlaylist">
                <div class="d-flex justify-content-between align-items-center pb-3 pt-3">
                    <audio class="full-width" :id="song._id">
                        <source :src="song.previewUrl">
                    </audio>
                    <i class="fas fa-2x fa-play-circle" @click="checkPlay(song)" :id="song.trackId"></i>
                    <i class="fas fa-2x fa-volume-up" @click="mute(song)" :id="song.trackName"></i>
                    <h5>{{song.trackName}}</h5>
                    <h6>{{song.artistName}}</h6>
                    <h6>{{song.collectionName}}</h6>
                    <h6>{{song.trackPrice}}</h6>
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
            this.$store.dispatch('getMyPlaylist')
        },
        data() {
            return {
                playing: false
            }
        },
        methods: {
            removeFromPlaylist(song) {
                this.$store.dispatch('removeFromPlaylist', song)
            },
            promotePlaylist(song) {
                for (var i = 0; i < this.$store.state.myPlaylist.length; i++) {
                    var mySong = this.$store.state.myPlaylist[i]
                    if (mySong._id == song._id) {
                        for (var prop in this.$store.state.myPlaylist[i]) {
                            if (prop != '_id') {
                                var temp = this.$store.state.myPlaylist[i - 1][prop]
                                this.$store.state.myPlaylist[i - 1][prop] = this.$store.state.myPlaylist[i][prop]
                                this.$store.state.myPlaylist[i][prop] = temp
                            }
                        }
                        break
                    }
                }
                this.$store.dispatch('setPlaylist', this.$store.state.myPlaylist)
            },
            demotePlaylist(song) {
                for (var i = 0; i < this.$store.state.myPlaylist.length; i++) {
                    var mySong = this.$store.state.myPlaylist[i]
                    if (mySong._id == song._id) {
                        for (var prop in this.$store.state.myPlaylist[i]) {
                            if (prop != '_id') {
                                var temp = this.$store.state.myPlaylist[i + 1][prop]
                                this.$store.state.myPlaylist[i + 1][prop] = this.$store.state.myPlaylist[i][prop]
                                this.$store.state.myPlaylist[i][prop] = temp
                            }
                        }
                        break
                    }
                }
                this.$store.dispatch('setPlaylist', this.$store.state.myPlaylist)
            },
            checkPlay(song) {
                for (var i = 0; i < this.$store.state.myPlaylist.length; i++){
                    var mySong = this.$store.state.myPlaylist[i]
                    if (mySong._id == song._id){
                        var audioElem = document.getElementById(mySong._id)
                        var playElem = document.getElementById(mySong.trackId)
                        if (audioElem.paused){
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
                        if (pauseElem.classList.contains('fa-pause-circle')){
                            pauseElem.classList.remove('fa-pause-circle')
                            pauseElem.classList.add('fa-play-circle')
                        }
                    }
                }
            },
            mute(song){
                var muteElem = document.getElementById(song._id)
                var muteSymbol = document.getElementById(song.trackName)
                muteElem.muted = !muteElem.muted
                if (muteSymbol.classList.contains('fa-volume-up')){
                    muteSymbol.classList.remove('fa-volume-up')
                    muteSymbol.classList.add('fa-volume-off')
                } else {
                    muteSymbol.classList.remove('fa-volume-off')
                    muteSymbol.classList.add('fa-volume-up')
                }
            }
        },
        computed: {
            myPlaylist() {
                return this.$store.state.myPlaylist
            },

        }
    }

</script>

<style>
    .full-width {
        width: 100%;
    }
</style>