let ball = {
  position: { x: 3, y: 3, z: 1 },
  args: [1, 100, 100],
};
let stage = {
  w: 40,
  h: 60,
  cLeft: {
    position: [-40 / 2, 0, 0.75],
    args: [1.5, 1.5, 61.5],
  },
  cRight: {
    position: [40 / 2, 0, 0.75],
    args: [1.5, 1.5, 61.5],
  },
  cTop: {
    position: [0, -60 / 2, 0.75],
    args: [1.5, 1.5, 40],
  },
  cBottom: {
    position: [0, 60 / 2, 0.75],
    args: [1.5, 1.5, 40],
  },
};
let player1 = {
  position: { x: 0, y: -60 / 2 + 3, z: 0 },
  size: 40 / 5,
  height: 1.5,
  width: 2,
};
let player2 = {
  position: { x: 0, y: 60 / 2 - 3, z: 0 },
  size: 40 / 5,
  height: 1.5,
  width: 2,
};
class Game {
  constructor() {
    this.gameData = {
      ball: ball.position,
      player1: player1.position,
      player2: player2.position,
      score: {
        player1: 0,
        player2: 0,
      },
    };
    interval: null;
  }
  newGame(socket) {
    socket.on("newGame", () => {
      this.gameData.ball = ball.position;
      // socket.emit("ballMove", this.ball.position);
      console.log("newGame");
    });
  }
  gameOver(socket) {
    socket.on("gameOver", () => {
      console.log("gameOver");
      clearInterval(this.interval);
    });
  }
  ballMove(io, socket) {
    let dx = -1;
    let dy = -1;
    socket.on("startGame", () => {
      this.interval = setInterval(() => {
        if (
          this.gameData.ball.x + dx < -stage.w / 2 ||
          this.gameData.ball.x + dx > stage.w / 2
        )
          dx *= -1;
        if (
          (this.gameData.ball.y + dy == this.gameData.player2.y  ||
          (this.gameData.ball.y + dy == this.gameData.player1.y &&
            this.gameData.ball.x + dx >=
              this.gameData.player1.x - player1.size / 2 &&
            this.gameData.ball.x + dx <=
              this.gameData.player1.x + player1.size / 2)
        )
          dy *= -1;

        if (
          this.gameData.ball.y + dy < -stage.h / 2 ||
          this.gameData.ball.y + dy > stage.h / 2
        ) {
          this.gameData.ball.y + dy < -stage.h / 2
            ? this.gameData.score.player1++
            : this.gameData.score.player2++;
          this.gameData.ball = {
            x: 3,
            y: 3,
            z: 1,
          };
        }

        this.gameData.ball.x += 0.5 * dx;
        this.gameData.ball.y += 0.5 * dy;
        // if (this.score < 5)
        socket.emit("gameData", {
          ...this.gameData,
          ball: {
            x: this.gameData.ball.x,
            y: this.gameData.ball.y,
            z: this.gameData.ball.z,
          },
        });
      }, 1000 / 60);
      // clearInterval(interval);
    });
  }
  padlleMove(socket) {
    socket.on("padlleMove", (data) => {
      if (
        this.gameData.player1.x +
          player1.size / 2 +
          Number(data.right) -
          Number(data.left) <
          stage.w / 2 &&
        this.gameData.player1.x -
          player1.size / 2 +
          Number(data.right) -
          Number(data.left) >
          -stage.w / 2
      )
        this.gameData.player1.x += Number(data.right) - Number(data.left);
      console.log(this.gameData.player1);
      socket.emit("gameData", {
        ...this.gameData,
        player1: this.gameData.player1,
      });
    });
  }
}

module.exports = Game;
