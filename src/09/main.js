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

    //     const inputData = `1999099991
    // 9999299999
    // 1932123991
    // 9999299999
    // 1999099991`;

    const rows = inputData.split('\n');
    const myMap = [];

    for (const row of rows) {
      myMap.push(row.split('').map(x => parseInt(x)));
    }
    const lowestPoints = getMapsLowestPoints(myMap);

    console.log('lowestPoints', lowestPoints);

    console.log('lowestPoints.length', lowestPoints.length);

    let result = 0;
    for (const lowestPoint of lowestPoints) {
      console.log('Adding ', lowestPoint);
      result += lowestPoint;
      console.log('Adding 1 more');
      result++;

      console.log('result = ', result);
    }

    console.log('result = ', result);
  };

  part2 = async inputFile => {
    console.log('');
    console.log('---------- part2 ----------');
    // const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
    //   if (err) {
    //     return console.log(err);
    //   }
    // });

    const inputData = `2199943210
3987894921
9856789892
8767896789
9899965678`;

    const rows = inputData.split('\n');
    const myMap = [];

    for (const row of rows) {
      myMap.push(row.split('').map(x => parseInt(x)));
    }
    const lowestPoints = getMapsLowestPointsEmproved(myMap);

    let maxSize1 = 0;
    let maxSize2 = 0;
    let maxSize3 = 0;

    for (const lowestPoint of lowestPoints) {
      const size = getBasinSize(myMap, lowestPoint);
      if (size > maxSize1) {
        maxSize3 = maxSize2;
        maxSize2 = maxSize1;
        maxSize1 = size;
      } else {
        if (size > maxSize2) {
          maxSize3 = maxSize2;
          maxSize2 = size;
        } else {
          if (size > maxSize3) {
            maxSize3 = size;
          }
        }
      }
    }
  };
}

const getBasinSize = (myMap, lowestPoint) => {};

const getAdiacentBasinSites = (myMap, x, y) => {
  const sites = [{ x, y, checkedSurround: 1 }];
  if (myMap[x][y - 1] < 9) {
  }
};

const getMapsLowestPoints = myMap => {
  const lowestPoints = [];
  for (const x in myMap) {
    const row = myMap[x];
    for (const y in row) {
      if (isLowerPoint(parseInt(x), parseInt(y), myMap)) {
        const digit = row[y];
        lowestPoints.push(digit);
      }
    }
  }

  return lowestPoints;
};

const getMapsLowestPointsEmproved = myMap => {
  const lowestPoints = [];
  for (const x in myMap) {
    const row = myMap[x];
    for (const y in row) {
      if (isLowerPoint(parseInt(x), parseInt(y), myMap)) {
        const digit = row[y];
        const lowestPoint = { value: digit, coords: { x, y }, size: 0 };
        lowestPoints.push(lowestPoint);
      }
    }
  }

  return lowestPoints;
};

const isLowerPoint = (x, y, myMap) => {
  const upOk = checkUp(x, y, myMap);
  const leftOk = checkLeft(x, y, myMap);
  const rightOk = checkRight(x, y, myMap);
  const downOk = checkDown(x, y, myMap);

  console.log(`(${x} - ${y}) -> ${upOk},${downOk},${leftOk},${rightOk}`);

  // printAround(myMap, x, y);

  if (upOk && downOk && leftOk && rightOk) {
    console.log(`Found one lowest point ${myMap[x][y]}`);
    return true;
  }
};

const printAround = (myMap, x, y) => {
  const maxX = myMap.length - 1;
  const maxY = myMap[0].length - 1;
  // up
  if (x === 0) {
    console.log('  X  ');
  } else {
    console.log(`  ${myMap[x - 1][y]}  `);
  }
  if (y === 0) {
    console.log(`X ${myMap[x][y]} ${myMap[x][y + 1]}`);
  } else {
    if (y === maxY) {
      console.log(`${myMap[x][y - 1]} ${myMap[x][y]} X`);
    } else {
      console.log(`${myMap[x][y - 1]} ${myMap[x][y]} ${myMap[x][y + 1]}`);
    }
  }
  if (x === maxX) {
    console.log('  X  ');
  } else {
    console.log(`  ${myMap[x + 1][y]}  `);
  }
};

const checkUp = (x, y, myMap) => {
  if (x === 0) {
    return true;
  }
  if (parseInt(myMap[x][y]) < parseInt(myMap[x - 1][y])) {
    return true;
  }
  return false;
};

const checkDown = (x, y, myMap) => {
  if (x === myMap.length - 1) {
    return true;
  }

  if (parseInt(myMap[x][y]) < parseInt(myMap[x + 1][y])) {
    return true;
  }

  return false;
};

const checkLeft = (x, y, myMap) => {
  if (y === 0) {
    return true;
  }

  const row = myMap[x];

  if (parseInt(row[y]) < parseInt(row[y - 1])) {
    return true;
  }

  return false;
};

const checkRight = (x, y, myMap) => {
  const row = myMap[x];

  if (y === row.length - 1) {
    return true;
  }

  if (parseInt(row[y]) < parseInt(row[y + 1])) {
    return true;
  }

  return false;
};

export default AOC;
