let ball = {
  position: [3, 3, 1],
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
  position: [0, -60 / 2 + 3, 0],
  size: 40 / 5,
  height: 1.5,
  width: 2,
};
let player2 = {
  position: [0, 60 / 2 - 3, 0],
  size: 40 / 5,
  height: 1.5,
  width: 2,
};
class Game {
  constructor() {
    this.ball = ball;
    this.stage = stage;
    this.player1 = player1;
    this.player2 = player2;
  }
  newGame(socket) {
    socket.on("newGame", () => {
      this.ball.position = [3, 3, 1];
      socket.emit("ballMove", this.ball.position);
    });
  }
  ballMove(socket) {
    let dx = -1;
    let dy = -1;
    socket.on("ballMove", () => {
      if (
        this.ball.position[0] + dx < -this.stage.w / 2 ||
        this.ball.position[0] + dx > this.stage.w / 2
      )
        dx *= -1;

      if (
        this.ball.position[1] + dy < -this.stage.h / 2 ||
        this.ball.position[1] + dy > this.stage.h / 2
      )
        this.ball.position = [3, 3, 1];

      this.ball.position[0] += 0.05 * dx;
      this.ball.position[1] += 0.05 * dy;
      socket.emit("ballMove", this.ball.position);
    });
  }
}

module.exports = Game;
