game1 = new Game(
  8,
  8,
  {
    black: {
      topRight: [-1, 1],
      topLeft: [-1, -1],
    },
    red: {
      topRight: [1, 1],
      topLeft: [1, -1],
    },
    blackJump: {
      jumpRight: [-2, 2],
      jumpLeft: [-2, -2],
    },
    redJump: {
      jumpRight: [2, 2],
      jumpLeft: [2, -2],
    },
  },
  "calc(100vh/12)",
  "calc(100vh/12)"
);
