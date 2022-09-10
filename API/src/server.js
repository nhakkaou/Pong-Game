const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const Game = require("./Game");

class Server {
  constructor() {
    let Players = [];
    let Rooms = [];
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        origin: "*",
        credentials: true,
      })
    );
    this.http = http.Server(this.app);
    var gameInst = new Game();
    var io = require("socket.io")(this.http, {
      pingInterval: 60000,
      cors: {
        origin: "*",
      },
    });
    io.on("connection", function (socket) {
      gameInst.newGame(socket);
      gameInst.ballMove(io, socket);
      gameInst.padlleMove(socket);
      gameInst.gameOver(socket);
    }).on("disconnect", function (socket) {
      socket.emit("disconnect", { message: "Server Down!!" });
    });
  }
  listen() {
    this.http.listen(3001, () => {
      console.log(`Listening on http://localhost:3001`);
    });
  }
}
const server = new Server();
server.listen();
