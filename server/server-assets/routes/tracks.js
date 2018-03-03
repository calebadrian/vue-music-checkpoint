var router = require("express").Router()
var Tracks = require("../models/track")

router.get("/api/playlist", (req, res, next) => {
    Tracks.find(req.body)
        .then(tracks => {
            return res.send(tracks)
        })
        .catch(next)
})

router.post("/api/playlist", (req, res, next) => {
    Tracks.create(req.body)
        .then(track => {
            res.send(track)
        })
        .catch(next)
})

router.put("/api/playlist", (req, res, next) => {
    
})

router.delete("/api/playlist/:songid", (req, res, next) => {
    Tracks.findByIdAndRemove(req.params.songid)
        .then(track => {
            res.send({message: "Successfully removed track"})
        })
        .catch(next)
})



module.exports = router