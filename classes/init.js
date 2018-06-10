game1 = new Game(
  8, 8, {
    black: {
      top: [-1, 0],
      topRight: [-1, 1],
      topLeft: [-1, -1],
    },
    red: {
      top: [1, 0],
      topRight: [1, 1],
      topLeft: [1, -1],
    },
  },
  'calc(100vh/12)', 'calc(100vh/12)'
);