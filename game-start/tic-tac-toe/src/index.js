let squares = [null, null, null, null, null, null, null, null, null];
let xIsNext = true;

/* All the possible ways to win, each element contains the indicies of squares to check */
/* If squares[0], squares[1], squares[2] all contain the same value, that player has won, for each set of 3 numbers in the list */
const winningSquaresArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let winningSquares of winningSquaresArr) {
    let [first, second, third] = winningSquares; // turns a list of numbers ([1,2,3]) into variables for each number (first = 1, second = 2, third = 3)
    if (
      squares[first] &&
      squares[first] == squares[second] &&
      squares[second] == squares[third]
    ) {
      return true;
    }
  }

  return false;
}

function renderBoard() {
  $('.square').each(function(ind, elem) {
    let index = +elem.dataset.index; // converts index to a number ('3' is different than 3 in javascript)
    elem.innerText = squares[index];
  });

  let status = $(".status");
  let playerStatus = 'Next Player: ';
  let winningStatus;

  if (xIsNext) {
    playerStatus = playerStatus + 'X'
  } else {
    playerStatus = playerStatus + 'O'
  }

  if (checkWinner()) {
    winningStatus = 'Winner is '
    if (xIsNext) {
      winningStatus = winningStatus + 'O'
    } else {
      winningStatus = winningStatus + 'X'
    }
    status.text(winningStatus);
  } else {
    status.text(playerStatus);
  }
}

$(document).click((event) => {
  const target = event.target;
  // Check if click on sqaure
  if (target.className == "square") {
    // Check if the square has no value
    let index = +target.dataset.index;
    if (squares[index] || checkWinner()) return;
    if (xIsNext) {
      squares[index] = 'X';
    } else {
      squares[index] = 'O';
    }
    target.innerText = squares[index];
    xIsNext = !xIsNext;
    renderBoard();
  }
});

renderBoard();
