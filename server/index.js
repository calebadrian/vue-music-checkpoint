let express = require("express"),
  bp = require("body-parser"),
  cors = require("cors"),
  server = express(),
  port = 3000;
var trackRoutes = require('./server-assets/routes/tracks')
var playlistRoutes = require('./server-assets/routes/playlists')

require("./server-assets/db/mlab-config");

server.use(cors());
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(trackRoutes)
server.use(playlistRoutes)

//Your routes here


server.use("*", (error, req, res, next) => {
    res.status(400).send(error);
  });
  
server.listen(port, () => {
    console.log("the server is running... Port:", port);
  });