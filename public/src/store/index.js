import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

vue.use(vuex)
var url = '//bcw-getter.herokuapp.com/?url=';
var url2 = 'https://itunes.apple.com/search?term='

let itunesDB = axios.create({
  baseURL: url + encodeURIComponent(url2),
  timeout: 5000
})

let myDB = axios.create({
  baseURL: '//localhost:3000/api/',
  timeout: 5000
})

var store = new vuex.Store({
  state: {
    myPlaylists: [],
    results: [],
    activePlaylist: {},
    activeSongs: []
  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },
    setMyPlaylists(state, payload){
      state.myPlaylists = payload
    },
    addToMyPlaylist(state, payload){
      state.activePlaylist.push(payload)
    },
    setActivePlaylist(state, payload){
      state.activePlaylist = payload
    },
    setActivePlaylistSongs(state, payload){
      state.activeSongs = payload
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      itunesDB
        .get(artist)
        .then(res => {
          commit('setResults', res.data.results)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getMyPlaylists({commit, dispatch}){
      myDB
        .get('playlists/')
          .then(res => {
            commit('setMyPlaylists', res.data)
          })
          .catch(err => {
            console.error(err)
          })
    },
    getMyPlaylist({ commit, dispatch }, payload) {
      myDB
        .get('playlists/' + payload._id)
        .then(res => {
          commit('setMyPlaylist', res.data)
        })
        .catch(err => {
          console.error(err)
        })
      //this should send a get request to your server to return the list of saved tunes
    },
    getPlaylistSongs({commit, dispatch}, payload){
      myDB
        .get('playlists/' + payload._id + '/tracks/')
          .then(res => {
            commit('setActivePlaylistSongs', res.data)
          }) 
          .catch(err => {
            console.error(err)
          })
    },
    createSong({ commit, dispatch }, payload) {
      myDB
        .post('playlists/' + payload.playlist._id + '/tracks', payload.track)
        .then(res => {
          dispatch('addToPlaylist', {playlist: payload.playlist, track: res.data})
        })
        .catch(err => {
          console.error(err)
        })
      //this will post to your server adding a new track to your tunes
    },
    addToPlaylist({commit, dispatch}, payload){
      myDB
        .post('playlists/' + payload.playlist._id, payload.track)
        .then(res => {
          commit('setActivePlaylistSongs', res.data.songs)
        })
        .catch(err => {
          console.error(err)
        })
    },
    removeFromPlaylistTracks({ commit, dispatch }, track) {
      myDB
        .delete('playlists/' + track.playlistId + '/tracks/' + track._id)
        .then(res => {
          
        })
        .catch(err => {
          console.error(err)
        })
      //Removes track from the database with delete
    },
    removeFromPlaylist({commit, dispatch}, track){
      myDB
        .put('playlists/' + track.playlistId, track)
        .then(res => {
          dispatch('getPlaylistSongs', res.data)
        })
        .catch(err => {
          console.error(err)
        })
    },
    setActivePlaylist({commit, dispatch}, payload){
      commit('setActivePlaylist', payload)
      dispatch('getPlaylistSongs', payload)
    },
    demoteTrack({ commit, dispatch }, track) {
      //this should decrease the position / upvotes and downvotes on the track
    }

  }
})

export default store
