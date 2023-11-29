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

    //     const inputData = `6,10
    // 0,14
    // 9,10
    // 0,3
    // 10,4
    // 4,11
    // 6,0
    // 6,12
    // 4,1
    // 0,13
    // 10,12
    // 3,4
    // 3,0
    // 8,4
    // 1,10
    // 2,14
    // 8,10
    // 9,0

    // fold along y=7
    // fold along x=5`;

    const dataRows = inputData.split('\n');

    const instructions = [];
    const dots = [];
    let xMax = 0;
    let yMax = 0;
    for (const row of dataRows) {
      if (row.includes('fold')) {
        instructions.push(row);
      } else if (row.length > 1) {
        const tmp = row.split(',');
        const tmpx = parseInt(tmp[0]);
        const tmpy = parseInt(tmp[1]);
        if (tmpx > xMax) {
          xMax = tmpx;
        }
        if (tmpy > yMax) {
          yMax = tmpy;
        }
        dots.push({ x: tmpx, y: tmpy });
      }
    }

    const myPage = new Page(xMax, yMax);

    for (const dot of dots) {
      myPage.addDots(dot.x, dot.y);
    }

    console.log('instructions', instructions);
    console.log('dots', dots);

    console.log('Result 0 = ', myPage.countDots());

    // myPage.print();
    myPage.fold(instructions[0]);
    // myPage.fold(instructions[1]);
    // myPage.print();
    const result = myPage.countDots();
    console.log('Result = ', result);

    // 836 is low
    // 837 IS OK
  };

  // eslint-disable-next-line complexity
  part2 = async inputFile => {
    console.log('---------- part2 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    const dataRows = inputData.split('\n');

    const instructions = [];
    const dots = [];
    let xMax = 0;
    let yMax = 0;
    for (const row of dataRows) {
      if (row.includes('fold')) {
        instructions.push(row);
      } else if (row.length > 1) {
        const tmp = row.split(',');
        const tmpx = parseInt(tmp[0]);
        const tmpy = parseInt(tmp[1]);
        if (tmpx > xMax) {
          xMax = tmpx;
        }
        if (tmpy > yMax) {
          yMax = tmpy;
        }
        dots.push({ x: tmpx, y: tmpy });
      }
    }

    const myPage = new Page(xMax, yMax);

    for (const dot of dots) {
      myPage.addDots(dot.x, dot.y);
    }

    console.log('instructions', instructions);
    console.log('dots', dots);

    console.log('Result 0 = ', myPage.countDots());

    for (const instruction of instructions) {
      myPage.fold(instruction);
    }

    myPage.print();
    const result = myPage.countDots();
    console.log('Result = ', result);
  };
}

class Page {
  page = [];
  xMax = 0;
  yMax = 0;

  constructor(xMax, yMax) {
    this.xMax = xMax;
    this.yMax = yMax;
    for (let x = 0; x <= xMax; x++) {
      this.page[x] = [];
      for (let y = 0; y <= yMax; y++) {
        this.page[x][y] = 0;
      }
    }
  }

  addDots(x, y) {
    this.page[x][y] = 1;
  }

  addDots2(x, y) {
    if (x < 655) {
      this.page[x][y] = 1;
      return;
    }
    x = 655 - (x - 655);
    this.page[x][y] = 1;
  }

  /**
   *
   * 0  1 0 0 0 0 0                1 0 0 0 0 0
   * 1  0 1 0 0 0 0                0 1 0 0 0 1
   * 2  0 0 1 0 0 0                0 0 1 0 1 0
   * 3  0 0 0 0 0 0 -> fold y 3 -> 0 0 0 0 0 0
   * 4  0 0 0 0 1 0                0 0 0 0 0 0
   * 5  0 0 0 0 0 1                0 0 0 0 0 0
   *
   *
   *
   */

  fold(instruction) {
    // fold along y=7
    // fold along x=5

    console.log(`instruction = ${instruction}`);
    if (!instruction.includes('fold along')) {
      console.log('wrong instruction, rejected');
      return;
    }
    instruction = instruction.substring(11).split('=');

    if (instruction[0] === 'x') {
      this.foldAtX(parseInt(instruction[1]));
    }
    if (instruction[0] === 'y') {
      this.foldAtY(parseInt(instruction[1]));
    }
  }

  foldAtY(yLine) {
    console.log(`foldAtY ${yLine}`);
    for (let x = 0; x <= this.xMax; x++) {
      // console.log(`x = ${x}`);
      for (let y = yLine + 1; y <= this.yMax; y++) {
        // console.log(`y = ${y}`);
        if (this.page[x][y] === 1) {
          // console.log(` found 1 at (${x} , ${y})`);
          this.page[x][yLine - (y - yLine)] = 1;
        }
      }
    }

    this.yMax = yLine - 1;
    // console.log('this.yMax', this.yMax);
  }

  foldAtX(xLine) {
    console.log(`foldAtX ${xLine}`);
    for (let x = xLine + 1; x <= this.xMax; x++) {
      // console.log(`x = ${x}`);
      for (let y = 0; y <= this.yMax; y++) {
        // console.log(`y = ${y}`);
        if (this.page[x][y] === 1) {
          // console.log(` found 1 at (${x} , ${y})`);
          this.page[xLine - (x - xLine)][y] = 1;
        }
      }
    }

    this.xMax = xLine - 1;
    // console.log('this.xMax', this.xMax);
  }

  print() {
    const tmpPage = [];
    for (let x = 0; x <= this.yMax; x++) {
      tmpPage[x] = [];
      for (let y = 0; y <= this.xMax; y++) {
        tmpPage[x][y] = 0;
      }
    }

    for (let x = 0; x <= this.xMax; x++) {
      for (let y = 0; y <= this.yMax; y++) {
        // tmpPage[y][x] = this.page[x][y];
        if (this.page[x][y] === 1) {
          tmpPage[y][x] = '#';
        } else {
          tmpPage[y][x] = ' ';
        }
      }
    }
    // console.log('this.xMax', this.xMax);
    // console.log('this.yMax', this.yMax);
    for (let x = 0; x <= this.yMax; x++) {
      const row = tmpPage[x];
      console.log(JSON.stringify(row));
    }
  }

  countDots() {
    let counter = 0;
    for (let x = 0; x <= this.xMax; x++) {
      for (let y = 0; y <= this.yMax; y++) {
        if (this.page[x][y] === 1) {
          counter++;
        }
      }
    }

    return counter;
  }
}

export default AOC;
