<template>
    <div class="my-tunes">
        <div class="row">
            <div class="col-sm-12 d-flex flex-column align-items-center">
                <h3>Your Playlists:</h3>
                <div>
                    <button class="btn-success mb-2" @click="toggleHidden">Add a Playlist</button>
                    <button class="btn-danger mb-2" @click="removePlaylist(myPlaylist)" v-if="myPlaylist.name">Remove {{myPlaylist.name}}</button>
                </div>
                <form class="mb-3 d-flex flex-column" v-if="!hidden" @submit.prevent="createPlaylist">
                    <input type="text" v-model="toCreate" placeholder="playlist name" class="mb-1">
                    <div>
                        <button class="btn-success" type="submit">Create Playlist</button>
                        <button class="btn-danger" type="reset">Reset Form</button>
                    </div>
                </form>
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle mb-4" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
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
                <song :song="song"></song>
            </div>
        </div>
    </div>
</template>

<script>
    import Song from './Song.vue'
    export default {
        name: 'My-Tunes',
        mounted() {
            this.$store.dispatch('getMyPlaylists')
        },
        data() {
            return {
                toCreate: '',
                hidden: true
            }
        },
        methods: {
            orderSongs(event) {
                console.log(event)
                var song = JSON.parse(event.dataTransfer.getData('text/javascript'))
                if (event.target.parentElement.className != "song") {
                    alert("You can't drop that there!")
                } else {
                    var toPut = event.target.parentElement.innerHTML.substring(84, 108)
                    this.$store.dispatch('putSong', {toPutId: toPut, song: song})
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
        },
        components: {
            Song
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