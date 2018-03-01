var router = require("express").Router()
var Tracks = require("../models/track")

router.get("/api/playlist", (req, res, next) => {
    Tracks.find(req.query)
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



module.exports = router