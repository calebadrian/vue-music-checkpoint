<template>
    <div class="my-tunes">
        <h1>List of MyTunes</h1>
        <div class="row">
            <div class="col-sm-12 d-flex flex-column" v-for="song in myPlaylist">
                <div class="d-flex justify-content-between align-items-center pb-3 pt-3">
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
                <audio class="full-width" @play="checkPlay(song._id)" :id="song._id" controls>
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
        data() {
            return {

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
            checkPlay(songid) {
                for (var i = 0; i < this.$store.state.myPlaylist.length; i++){
                    var mySong = this.$store.state.myPlaylist[i]
                    if (mySong._id == songid){
                        document.getElementById(mySong._id).play()
                    } else {
                        document.getElementById(mySong._id).pause()
                    }
                }
            }
        },
        computed: {
            myPlaylist() {
                return this.$store.state.myPlaylist
            }
        }
    }

</script>

<style>
    .full-width {
        width: 100%;
    }
</style>