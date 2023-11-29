import Utils from '../utils/utils';

const fs = require('fs');

class AOC {
  part1 = async inputFile => {
    console.log('---------- part1 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    const rows = inputData.split('\n');

    const numbersToDraw = rows[0].split(',').map(function (x) {
      return parseInt(x);
    });
    const boards = Utils.getBingoBoardsFromInput(rows);

    // console.log('boards', boards);
    try {
      for (const extractedNumber of numbersToDraw) {
        console.log('extract num. ', extractedNumber);

        for (const board of boards) {
          // console.log('board', board);

          board.markNumber(extractedNumber);
          // board.printBoard();
          if (board.isWinning()) {
            console.log('found winner!');
            // board.printBoard();
            board.calculateresult(extractedNumber);
            throw new Error('Found winning board');
          }
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  part2 = async inputFile => {
    console.log('');
    console.log('---------- part2 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    const rows = inputData.split('\n');

    const numbersToDraw = rows[0].split(',').map(function (x) {
      return parseInt(x);
    });
    const boards = Utils.getBingoBoardsFromInput(rows);

    const numBoards = boards.length;
    let numBoardsWon = 0;

    console.log('numBoards', numBoards);

    // console.log('boards', boards);
    try {
      for (const extractedNumber of numbersToDraw) {
        console.log('extract num. ', extractedNumber);

        for (const board of boards) {
          // console.log('board', board);

          board.markNumber(extractedNumber);
          // board.printBoard();
          if (board.isWinning()) {
            console.log('found winner!');
            // board.printBoard();
            board.calculateresult(extractedNumber);
            numBoardsWon++;
            if (numBoardsWon === numBoards) {
              console.log('finished !');

              throw new Error('Found last winning board');
            }
          }
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };
}

export default AOC;
