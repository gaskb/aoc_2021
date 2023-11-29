import Utils from '../utils/utils';

const fs = require('fs');

class AOC {
  // eslint-disable-next-line complexity
  part1 = async inputFile => {
    console.log('---------- part1 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    //     const inputData = `5483143223
    // 2745854711
    // 5264556173
    // 6141336146
    // 6357385478
    // 4167524645
    // 2176841721
    // 6882881134
    // 4846848554
    // 5283751526`;

    const dataRows = inputData.split('\n');

    const myMap = new SeaMap(dataRows[0].length, dataRows.length);

    // myMap.print();

    for (const x in dataRows) {
      const row = dataRows[x];
      console.log('x', x);
      for (const y in row) {
        const energy = parseInt(dataRows[x][y]);
        myMap.map[x][y].energy = energy;
      }
    }

    console.log('starting');
    // myMap.print();
    for (let i = 1; i <= 101; i++) {
      console.log(`-------------- turn ${i} --------------`);
      myMap.nextTurn();
      myMap.print();
      console.log('myMap.flashes', myMap.flashes);
    }

    // 1853 too low ?
    // 1854 no
    // 1858 too high
  };

  // eslint-disable-next-line complexity
  part2 = async inputFile => {
    console.log('---------- part2 ----------');
    // const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
    //   if (err) {
    //     return console.log(err);
    //   }
    // });

    const inputData = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
  };
}

class SeaMap {
  map = [];
  xMax = 0;
  yMax = 0;
  flashes = 0;

  constructor(xMax, yMax) {
    this.xMax = xMax;
    this.yMax = yMax;
    for (let x = 0; x < xMax; x++) {
      if (!this.map[x]) {
        this.map[x] = [];
      }
      for (let y = 0; y < yMax; y++) {
        if (!this.map[x][y]) {
          this.map[x][y] = {};
        }
        this.map[x][y].energy = 0;
        this.map[x][y].flashed = false;
      }
    }
  }

  print = () => {
    for (let x = 0; x < this.xMax; x++) {
      console.log(JSON.stringify(this.map[x].map(x => x.energy)));
    }
  };

  nextTurn = () => {
    for (let x = 0; x < this.xMax; x++) {
      for (let y = 0; y < this.yMax; y++) {
        this.map[x][y].energy++;
        this.map[x][y].flashed = false;
      }
    }
    let flashed = true;
    while (flashed) {
      flashed = false;
      for (let x = 0; x < this.xMax; x++) {
        for (let y = 0; y < this.yMax; y++) {
          if (this.flashed(x, y)) {
            flashed = true;
          }
        }
      }
    }

    this.reset();
  };

  flashed = (x, y) => {
    let flashed = false;
    if (this.map[x][y].energy > 9 && this.map[x][y].flashed === false) {
      for (let tmpx = x - 1; tmpx <= x + 1; tmpx++) {
        for (let tmpy = y - 1; tmpy <= y + 1; tmpy++) {
          if (tmpx < 0 || tmpx >= this.xMax || tmpy < 0 || tmpy >= this.yMax) {
            continue;
          }
          // console.log(`tmpx ${tmpx}, tmpy ${tmpy}`);
          this.map[tmpx][tmpy].energy++;
          flashed = true;
        }
      }
      console.log(`${x} - ${y} flashed !`);
      // this.print();
      this.map[x][y].flashed = true;
      this.flashes++;
    }

    return flashed;
  };

  reset = () => {
    for (let x = 0; x < this.xMax; x++) {
      for (let y = 0; y < this.yMax; y++) {
        if (this.map[x][y].flashed) {
          this.map[x][y].energy = 0;
          this.map[x][y].flashed = false;
        }
      }
    }
  };
}

export default AOC;
