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
    myPlaylist: [],
    results: []
  },
  mutations: {
    setResults(state, results) {
      state.results = results
    },
    setMyPlaylist(state, payload){
      state.myPlaylist = payload
    },
    addToMyPlaylist(state, payload){
      state.myPlaylist.push(payload)
    }
  },
  actions: {
    getMusicByArtist({ commit, dispatch }, artist) {
      itunesDB
        .get(artist)
        .then(res => {
          console.log(res.data.results)
          commit('setResults', res.data.results)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getMyPlaylist({ commit, dispatch }) {
      myDB
        .get('playlist')
        .then(res => {
          commit('setMyPlaylist', res.data)
        })
        .catch(err => {
          console.error(err)
        })
      //this should send a get request to your server to return the list of saved tunes
    },
    addToMyPlaylist({ commit, dispatch }, track) {
      myDB
        .post('playlist', track)
        .then(res => {
          commit('addToMyPlaylist', res.data)
        })
        .catch(err => {
          console.error(err)
        })
      //this will post to your server adding a new track to your tunes
    },
    removeTrack({ commit, dispatch }, track) {
      //Removes track from the database with delete
    },
    promoteTrack({ commit, dispatch }, track) {
      //this should increase the position / upvotes and downvotes on the track
    },
    demoteTrack({ commit, dispatch }, track) {
      //this should decrease the position / upvotes and downvotes on the track
    }

  }
})

export default store
