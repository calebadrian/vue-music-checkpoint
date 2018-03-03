var router = require("express").Router()
var Playlists = require("../models/playlist")
var Tracks = require("../models/track")
var ObjectId = require('mongodb').ObjectId

router.get("/api/playlists", (req, res, next) => {
    Playlists.find(req.query)
        .then(playlists => {
            return res.send(playlists)
        })
        .catch(next)
})

router.get("/api/playlists/:playlistid", (req, res, next) => {
    Playlists.findById(req.params.playlistid)
        .then(playlist => {
            return res.send(playlist)
        })
        .catch(next)
})

router.get('/api/playlists/:playlistid/tracks', (req, res, next) => {
    Tracks.find({ playlistId: req.params.playlistid })
        .then(tracks => {
            res.send(tracks)
        })
        .catch(next)
})

router.post("/api/playlists", (req, res, next) => {
    Playlists.create(req.body)
        .then(playlist => {
            res.send(playlist)
        })
        .catch(next)
})

router.post("/api/playlists/:playlistid/tracks", (req, res, next) => {
    Tracks.create(req.body)
        .then(tracks => {
            return res.send(tracks)
        })
        .catch(next)
})

router.post('/api/playlists/:playlistid', (req, res, next) => {
    Playlists.findById(req.params.playlistid)
        .then(playlist => {
            playlist.songs.set(playlist.songs.length, req.body)
            playlist.markModified('songs')
            playlist.save()
            res.send(playlist)
        })
        .catch(next)
})

router.put('/api/playlists/:playlistid', (req, res, next) => {
    Playlists.findById(req.params.playlistid)
        .then(playlist => {
            for (var i = 0; i < playlist.songs.length; i++){
                if (playlist.songs[i]._id == req.body._id){
                    playlist.songs.splice(i, 1)
                    playlist.markModified('songs')
                    playlist.save()
                    break;
                }
            }
            res.send(playlist)
        })
        .catch(next)
})

router.put('/api/playlists/:playlistid/tracks', (req, res, next) => {
    Playlists.findById(req.params.playlistid)
        .then(playlist => {
            var newArr = req.body.map(elem => {
                return playlist.songs.find(obj => {
                    return obj._id === elem
                })
            })
            for (var i = 0; i < playlist.songs.length; i++){
                playlist.songs.set(i, newArr[i])
                playlist.markModified('songs')
                playlist.save()
            }
            res.send(playlist)
        })
        .catch(next)
})

router.put('/api/playlists/:playlistid', (req, res, next) => {
    Playlists.findById(req.params.playlistid)
        .then(playlist => {
            for (var i = 0; i < req.body.length; i++){
                playlist.songs.set(i, req.body[i])
                playlist.markModified('songs')
                playlist.save()
            }
            res.send(playlist)
        })
        .catch(next)
})
router.delete("/api/playlists/:playlistid/tracks/:trackid", (req, res, next) => {
    Tracks.findByIdAndRemove(req.params.trackid)
        .then(track => {
            res.send({ message: "Successfully deleted track" })
        })
        .catch(next)
})

router.delete('/api/playlists/:playlistid', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.playlistid)
        .then(track => {
            res.send({ message: "Successfully deleted playlist" })
        })
        .catch(next)
})

module.exports = router