class Utils {
  static findMostCommonValueInArrayAtPosition = (valueArray, position) => {
    const values = this.findValuesInArrayAtPosition(valueArray, position);

    let mostCommonValue = '';
    let mostCommonValueOccurrencies = 0;

    for (const [key, val] of Object.entries(values)) {
      if (val > mostCommonValueOccurrencies) {
        mostCommonValue = key;
        mostCommonValueOccurrencies = val;
      } else {
        if (val === mostCommonValueOccurrencies) {
          mostCommonValue = '1';
        }
      }
    }

    return mostCommonValue;
  };

  static findLeastCommonValueInArrayAtPosition = (valueArray, position) => {
    console.log(`findLeastCommonValueInArrayAtPosition -> ${position}`);
    console.log(`findLeastCommonValueInArrayAtPosition valueArray -> ${JSON.stringify(valueArray)}`);
    const values = this.findValuesInArrayAtPosition(valueArray, position);

    console.log(`findLeastCommonValueInArrayAtPosition values -> ${JSON.stringify(values)}`);

    let leastCommonValue = '';
    let leastCommonValueOccurrencies = 60000;

    for (const [key, val] of Object.entries(values)) {
      if (val < leastCommonValueOccurrencies) {
        leastCommonValue = key;
        leastCommonValueOccurrencies = val;
      } else {
        if (val === leastCommonValueOccurrencies) {
          leastCommonValue = '0';
        }
      }
    }
    console.log(`findLeastCommonValueInArrayAtPosition leastCommonValue -> ${leastCommonValue}`);
    return leastCommonValue;
  };

  static findValuesInArrayAtPosition = (valueArray, position) => {
    const values = {};
    for (const row of valueArray) {
      if (!row) {
        continue;
      }
      if (!values[row[position]]) {
        values[row[position]] = 1;
      } else {
        values[row[position]] += 1;
      }
    }

    // console.log('values', values);

    return values;
  };

  static filterArrayStringStarts = (startingArray, matchingString) => {
    console.log(`filterArrayStringStarts -> ${matchingString}`);
    if (!matchingString || matchingString === '') {
      return startingArray;
    }

    const result = [];

    for (const row of startingArray) {
      if (!row) {
        continue;
      }

      // const reMatchingString = '/^' + matchingString + '/g';
      const regex = new RegExp('^' + matchingString, 'g');

      if (row.match(regex) && row.match(regex)[0]) {
        result.push(row);
      }
    }

    console.log(`filterArrayStringStarts result -> ${result}`);

    return result;
  };

  static getBingoBoardsFromInput = rows => {
    const boards = [];

    const tmpBoard = [];
    for (const row of rows) {
      if (!row || row === '' || row.length < 14) {
        if (tmpBoard.length > 0) {
          // console.log('tmpBoard', tmpBoard);
          // const board = { numbers: [...tmpBoard], flagged: [...tmpBoard] };
          const board = new BingoBoard([...tmpBoard]);
          boards.push(board);
          tmpBoard.splice(0, tmpBoard.length);

          // console.log('boards', boards);
        }
        continue;
      }
      if (row.length > 14) {
        console.log('Skipping first line');
        continue;
      }

      tmpBoard.push([
        ...row
          .split(' ')
          .filter(val => !!val)
          .map(function (x) {
            return parseInt(x);
          })
      ]);
    }

    return boards;
  };
}

class BingoBoard {
  rowNumbers = [];
  rowMask = [];
  flagged = 0;
  numbersLeft = [];
  won = false;

  constructor(boardArray) {
    if (boardArray.length > 5) {
      throw new Error(`received wron boardArray: ${boardArray}`);
    }
    // console.log('boardArray', boardArray);
    for (const row of boardArray) {
      // console.log('row', row);
      this.rowNumbers.push([...row]);
      this.rowMask.push([...row]);
      this.numbersLeft.push(...row);
    }
  }

  markNumber = num => {
    // if (this.numbersLeft.includes(num)) {

    for (const row of this.rowMask) {
      if (row.includes(num)) {
        let i = 0;
        for (const value of row) {
          if (value === num) {
            row[i] = -1;
          }
          i++;
        }
        this.flagged++;
      }
      // }
    }
  };

  sumRow = row => {
    let result = 0;
    for (const value of row) {
      result += value;
    }

    return result;
  };

  sumColumn = column => {
    let result = 0;
    for (const row of this.rowMask) {
      result += row[column];
    }
    return result;
  };

  isWinning = () => {
    if (this.flagged < 5) {
      return false;
    }
    if (this.won) {
      return false;
    }

    let i = 0;
    for (const row of this.rowMask) {
      if (this.sumRow(row) === -5) {
        this.won = true;
        return true;
      }
      if (this.sumColumn(i) === -5) {
        this.won = true;
        return true;
      }
      i++;
    }

    return false;
  };

  printBoard = () => {
    for (const row of this.rowNumbers) {
      console.log(row);
    }
    for (const row of this.rowMask) {
      console.log(row);
    }
  };

  calculateresult = extractedNumber => {
    let result = 0;
    for (const row of this.rowMask) {
      for (const val of row) {
        if (val > 0) {
          result += val;
        }
      }
    }
    result *= extractedNumber;
    console.log('result = ', result);
  };
}
export default Utils;
