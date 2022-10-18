let field = document.getElementsByClassName("block");

// initial new game grid
const newGrid = (width, height) => {
  let grid = new Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = new Array(width);
  }

  let index = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      grid[i][j] = {
        index: index++,
        value: 0,
      };
    }
  }

  return {
    board: grid,
    width: width,
    height: height,
  };
};

// reset grid and field color
const resetGrid = (grid) => {
  for (let i = 0; i < grid.height; i++) {
    // row
    for (let j = 0; j < grid.width; j++) {
      // col
      grid.board[i][j].value = 0;
    }
  }

  // reset field background
  Array.from(field).forEach((e) => {
    e.style.background = TRANSPARENT;
  });
};

// create new tetromino
const newTetromino = (blocks, colors, start_x, start_y) => {
  let index = Math.floor(Math.random() * blocks.length);
  return {
    block: JSON.parse(JSON.stringify(blocks[index])),
    color: colors[index],
    x: start_x,
    y: start_y,
  };
};

const drawTetromino = (tetromino, grid) => {
  tetromino.block.forEach((row, i) => {
    row.forEach((value, j) => {
      let x = tetromino.x + i;
      let y = tetromino.y + j;
      if (value > 0) {
        field[grid.board[x][y].index].style.background = tetromino.color;
      }
    });
  });
};

// clear tetronomimp
const clearTetromino = (tetromino, grid) => {
  tetromino.block.forEach((row, i) => {
    row.forEach((value, j) => {
      let x = tetromino.x + i;
      let y = tetromino.y + j;
      if (value > 0) {
        field[grid.board[x][y].index].style.background = TRANSPARENT;
      }
    });
  });
};

// check tetromino is moveable

const moveDown = (tetromino, grid) => {
  clearTetromino(tetromino, grid);
  tetromino.x++;
  drawTetromino(tetromino, grid);
};

let grid = newGrid(GRID_WIDTH, GRID_HEIGHT);
let tetromino = newTetromino(BLOCKS, COLORS, START_X, START_Y);

drawTetromino(tetromino, grid);
setInterval(() => {
  moveDown(tetromino, grid);
}, 500);

let btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach((ele) => {
  let btn_id = ele.getAttribute("id");
  let body = document.querySelector("body");
  ele.addEventListener("click", () => {
    switch (btn_id) {
      case "btn-play":
        body.classList.add("play");
        if (body.classList.contains("pause")) {
          body.classList.remove("pause");
        }
        break;
      case "btn-theme":
        body.classList.toggle("dark");
        break;
      case "btn-pause":
        let btn_play = document.querySelector("#btn-play");
        btn_play.innerHTML = "resume";
        body.classList.remove("play");
        body.classList.add("pause");
        break;
      case "btn-new-game":
        body.classList.add("play");
        body.classList.remove("pause");
        break;
      case "btn-help":
        let how_to = document.querySelector(".how-to");
        how_to.classList.toggle("active");
        break;
    }
  });
});
