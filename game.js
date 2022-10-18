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

const isInGrid = (x, y, grid) => {
  return x < grid.height && x >= 0 && y >= 0 && y < grid.width;
};

// check point is filled or blank
const isFilled = (x, y, grid) => {
  if (!isInGrid(x, y, grid)) {
    return false;
  } else {
    return grid.board[x][y].value !== 0;
  }
};

// check tetromino is movable?
const movable = (tetromino, grid, direction) => {
  let newX = tetromino.x;
  let newY = tetromino.y;

  switch (direction) {
    case DIRECTION.DOWN:
      newX = tetromino.x + 1;
      break;
    case DIRECTION.LEFT:
      newY = tetromino.y - 1;
      break;
    case DIRECTION.RIGHT:
      newY = tetromino.y + 1;
      break;
  }

  return tetromino.block.every((row, i) => {
    return row.every((value, j) => {
      let x = newX + i;
      let y = newY + j;
      return value === 0 || (isInGrid(x, y, grid) && !isFilled(x, y, grid));
    });
  });
};

// move tetromino down
const moveDown = (tetromino, grid) => {
  if (!movable(tetromino, grid, DIRECTION.DOWN)) return;
  clearTetromino(tetromino, grid);
  tetromino.x++;
  drawTetromino(tetromino, grid);
};

// move tetromino left
const moveLeft = (tetromino, grid) => {
  if (!movable(tetromino, grid, DIRECTION.LEFT)) return;
  clearTetromino(tetromino, grid);
  tetromino.y--;
  drawTetromino(tetromino, grid);
};

// move tetromino right
const moveRight = (tetromino, grid) => {
  if (!movable(tetromino, grid, DIRECTION.RIGHT)) return;
  clearTetromino(tetromino, grid);
  tetromino.y++;
  drawTetromino(tetromino, grid);
};

let grid = newGrid(GRID_WIDTH, GRID_HEIGHT);
let tetromino = newTetromino(BLOCKS, COLORS, START_X, START_Y);

drawTetromino(tetromino, grid);

setInterval(() => {
  if (movable(tetromino, grid, DIRECTION.DOWN)) {
    moveDown(tetromino, grid);
  }
}, 500);

// add keyboard event
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  let key = e.which;
  switch (key) {
    case KEY.DOWN:
      moveDown(tetromino, grid);
      break;
    case KEY.LEFT:
      moveLeft(tetromino, grid);
      break;
    case KEY.RIGHT:
      moveRight(tetromino, grid);
      break;
  }
});

let btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach((ele) => {
  let btn_id = ele.getAttribute("id");
  let body = document.querySelector("body");
  ele.addEventListener("click", () => {
    switch (btn_id) {
      case "btn-down":
        moveDown(tetromino, grid);
        break;
      case "btn-left":
        moveLeft(tetromino, grid);
        break;
      case "btn-right":
        moveRight(tetromino, grid);
        break;
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
