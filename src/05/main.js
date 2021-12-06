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

    //     const inputData = `0,9 -> 5,9
    // 8,0 -> 0,8
    // 9,4 -> 3,4
    // 2,2 -> 2,1
    // 7,0 -> 7,4
    // 6,4 -> 2,0
    // 0,9 -> 2,9
    // 3,4 -> 1,4
    // 0,0 -> 8,8
    // 5,5 -> 8,2`;

    const dataRows = inputData.split('\n');

    const usefulData = [];

    let xMax = 0;
    let yMax = 0;
    for (const dataRow of dataRows) {
      const dataRowArray = dataRow.split(' -> ');
      if (dataRowArray.length === 0) {
        // console.log('found empty row');
        continue;
      }
      // console.log('found good row', dataRowArray);
      const coord1 = new Coordinate(dataRowArray[0]);
      const coord2 = new Coordinate(dataRowArray[1]);

      const row = new Row(coord1, coord2);

      if (row.isOrizontalRow() || row.isVerticalRow()) {
        // console.log('found useful row', row);
        if (coord1.x > xMax) {
          xMax = coord1.x;
        }
        if (coord1.y > yMax) {
          yMax = coord1.y;
        }
        if (coord2.x > xMax) {
          xMax = coord2.x;
        }
        if (coord2.y > yMax) {
          yMax = coord2.y;
        }
        usefulData.push(row);
      }
    }

    // console.log('usefulData', usefulData);
    console.log('xMax', xMax);
    console.log('yMax', yMax);

    const seaMap = new SeaMap(xMax, yMax);
    // seaMap.print();

    // const coord1 = new Coordinate([0, 0]);
    // const coord2 = new Coordinate([0, 9]);
    // const coord3 = new Coordinate([9, 0]);
    // const row1 = new Row(coord1, coord2);
    // const row2 = new Row(coord1, coord3);
    // const myData = [row1, row2];
    for (const row of usefulData) {
      seaMap.addRow(row);
      // seaMap.print();
    }
    // seaMap.print();
    const overlaps = seaMap.getOverlaps();

    console.log(`Found ${overlaps} overlaps`);
  };

  // eslint-disable-next-line complexity
  part2 = async inputFile => {
    console.log('---------- part2 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    //     const inputData = `0,9 -> 5,9
    // 8,0 -> 0,8
    // 9,4 -> 3,4
    // 2,2 -> 2,1
    // 7,0 -> 7,4
    // 6,4 -> 2,0
    // 0,9 -> 2,9
    // 3,4 -> 1,4
    // 0,0 -> 8,8
    // 5,5 -> 8,2`;

    const dataRows = inputData.split('\n');

    const usefulData = [];

    let xMax = 0;
    let yMax = 0;
    for (const dataRow of dataRows) {
      const dataRowArray = dataRow.split(' -> ');
      if (dataRowArray.length === 0) {
        // console.log('found empty row');
        continue;
      }
      // console.log('found good row', dataRowArray);
      const coord1 = new Coordinate(dataRowArray[0]);
      const coord2 = new Coordinate(dataRowArray[1]);

      const row = new Row(coord1, coord2);

      if (coord1.x > xMax) {
        xMax = coord1.x;
      }
      if (coord1.y > yMax) {
        yMax = coord1.y;
      }
      if (coord2.x > xMax) {
        xMax = coord2.x;
      }
      if (coord2.y > yMax) {
        yMax = coord2.y;
      }

      usefulData.push(row);
    }

    // console.log('usefulData', usefulData);
    console.log('xMax', xMax);
    console.log('yMax', yMax);

    const seaMap = new SeaMap(xMax, yMax);
    // seaMap.print();

    for (const row of usefulData) {
      seaMap.addRow(row);
      // seaMap.print();
    }

    // seaMap.print();
    const overlaps = seaMap.getOverlaps();

    console.log(`Found ${overlaps} overlaps`);
  };
}

class Coordinate {
  x = 0;
  y = 0;

  constructor(coord) {
    if (coord instanceof Array) {
      // console.log('Constucting coord using array', coord);
      this.x = coord[0];
      this.y = coord[1];
    } else {
      // console.log('Constucting coord using string', coord);
      this.x = parseInt(coord.split(',')[0]);
      this.y = parseInt(coord.split(',')[1]);
    }
  }
}

class Row {
  firstPoint = {};
  secondPoint = {};

  constructor(point1, point2) {
    this.firstPoint = point1;
    this.secondPoint = point2;
  }

  isOrizontalRow() {
    if (this.firstPoint.y === this.secondPoint.y) {
      return true;
    }
    return false;
  }

  isVerticalRow() {
    if (this.firstPoint.x === this.secondPoint.x) {
      return true;
    }
    return false;
  }
}

class SeaMap {
  map = [];
  xMax = 0;
  yMax = 0;

  constructor(xMax, yMax) {
    this.xMax = xMax;
    this.yMax = yMax;
    for (let x = 0; x <= xMax; x++) {
      if (!this.map[x]) {
        this.map[x] = [];
      }
      for (let y = 0; y <= yMax; y++) {
        this.map[x][y] = 0;
        // console.log(`x - y ${x} - ${y}`);
      }
    }
  }

  // eslint-disable-next-line complexity
  expandSimpleRowIntoPoints = row => {
    const points = [];
    if (row.isVerticalRow()) {
      const yMax = Math.max(row.firstPoint.y, row.secondPoint.y);
      const yMin = Math.min(row.firstPoint.y, row.secondPoint.y);
      const x = row.firstPoint.x;

      for (let y = yMin; y <= yMax; y++) {
        points.push(new Coordinate([x, y]));
      }
    }
    if (row.isOrizontalRow()) {
      const xMax = Math.max(row.firstPoint.x, row.secondPoint.x);
      const xMin = Math.min(row.firstPoint.x, row.secondPoint.x);
      const y = row.firstPoint.y;
      for (let x = xMin; x <= xMax; x++) {
        points.push(new Coordinate([x, y]));
      }
    }

    if (!row.isOrizontalRow() && !row.isVerticalRow()) {
      if (row.firstPoint.x < row.secondPoint.x) {
        if (row.firstPoint.y < row.secondPoint.y) {
          let y = row.firstPoint.y;
          for (let x = row.firstPoint.x; x <= row.secondPoint.x; x++) {
            points.push(new Coordinate([x, y]));
            y++;
          }
        }

        if (row.firstPoint.y > row.secondPoint.y) {
          let y = row.firstPoint.y;
          for (let x = row.firstPoint.x; x <= row.secondPoint.x; x++) {
            points.push(new Coordinate([x, y]));
            y--;
          }
        }
      }
      if (row.firstPoint.x > row.secondPoint.x) {
        if (row.firstPoint.y < row.secondPoint.y) {
          let y = row.firstPoint.y;
          for (let x = row.firstPoint.x; x >= row.secondPoint.x; x--) {
            points.push(new Coordinate([x, y]));
            y++;
          }
        }
        if (row.firstPoint.y > row.secondPoint.y) {
          let y = row.firstPoint.y;
          for (let x = row.firstPoint.x; x >= row.secondPoint.x; x--) {
            points.push(new Coordinate([x, y]));
            y--;
          }
        }
      }
    }

    return points;
  };

  getOverlaps = () => {
    let result = 0;
    for (let x = 0; x <= this.xMax; x++) {
      for (let y = 0; y <= this.yMax; y++) {
        // console.log('this.map[x][y]', this.map[x][y]);
        if (this.map[x][y] > 1) {
          result++;
        }
      }
    }

    return result;
  };

  addRow = row => {
    // console.log('addRow ', row);
    const points = this.expandSimpleRowIntoPoints(row);

    for (const point of points) {
      const newVal = this.map[point.x][point.y] + 1;
      // console.log('newVal = ', newVal);
      this.map[point.x][point.y] = newVal;
    }
    // console.log('Added row ', row);
  };

  print = () => {
    const myInvertedMap = [];

    for (let x = 0; x <= this.xMax; x++) {
      for (let y = 0; y <= this.yMax; y++) {
        if (!myInvertedMap[y]) {
          myInvertedMap[y] = [];
        }
        myInvertedMap[y][x] = this.map[x][y];
      }
    }

    for (let y = 0; y <= this.yMax; y++) {
      console.log(JSON.stringify(myInvertedMap[y]));
    }
  };
}
export default AOC;
