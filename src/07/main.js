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

    // const inputData = '16,1,2,0,4,2,7,1,2,14';
    // const inputData = '2,2,2,2,2,2,2,2,2,24,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2';

    const depths = inputData.split(',').map(x => parseInt(x));

    let totalDepth = 0;
    let maxDepth = 0;
    let minDepth = 10000;
    const numDepths = depths.length;
    const depthMap = {};

    for (const depth of depths) {
      totalDepth += depth;
      if (depth > maxDepth) {
        maxDepth = depth;
      }
      if (depth < minDepth) {
        minDepth = depth;
      }

      if (!depthMap[depth]) {
        depthMap[depth] = 0;
      }
      depthMap[depth]++;
    }

    const averageDepth = Math.round(totalDepth / numDepths);

    let modeDepth = 0;
    let modeMaxValue = 0;
    Object.keys(depthMap).forEach(function (key) {
      if (depthMap[key] > modeMaxValue) {
        modeMaxValue = depthMap[key];
        modeDepth = key;
      }
    });

    let minFuelToUse = 1000000;
    let minFuelToUseDepth = 0;

    for (let i = 0; i <= maxDepth; i++) {
      let tmpFuelToUse = 0;
      for (const depth of depths) {
        tmpFuelToUse += Math.abs(depth - i);
      }
      if (tmpFuelToUse < minFuelToUse) {
        minFuelToUse = tmpFuelToUse;
        minFuelToUseDepth = i;
      }
    }

    console.log('totalDepth', totalDepth);
    console.log('numDepths', numDepths);
    console.log('averageDepth', averageDepth);
    console.log('minDepth', minDepth);
    console.log('maxDepth', maxDepth);

    console.log('modeDepth', modeDepth);
    console.log('modeMaxValue', modeMaxValue);

    console.log('minFuelToUse', minFuelToUse);
    console.log('minFuelToUseDepth', minFuelToUseDepth);
  };

  part2 = async inputFile => {
    console.log('');
    console.log('---------- part2 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    const depths = inputData.split(',').map(x => parseInt(x));

    let totalDepth = 0;
    let maxDepth = 0;
    let minDepth = 10000;
    const numDepths = depths.length;
    const depthMap = {};

    for (const depth of depths) {
      totalDepth += depth;
      if (depth > maxDepth) {
        maxDepth = depth;
      }
      if (depth < minDepth) {
        minDepth = depth;
      }

      if (!depthMap[depth]) {
        depthMap[depth] = 0;
      }
      depthMap[depth]++;
    }

    const averageDepth = Math.round(totalDepth / numDepths);

    let modeDepth = 0;
    let modeMaxValue = 0;
    Object.keys(depthMap).forEach(function (key) {
      if (depthMap[key] > modeMaxValue) {
        modeMaxValue = depthMap[key];
        modeDepth = key;
      }
    });

    let minFuelToUse = 100000000000000000;
    let minFuelToUseDepth = 0;

    for (let i = 0; i <= maxDepth; i++) {
      let tmpFuelToUse = 0;
      for (const depth of depths) {
        tmpFuelToUse += moreFuelToUse(Math.abs(depth - i));
      }
      if (tmpFuelToUse < minFuelToUse) {
        minFuelToUse = tmpFuelToUse;
        minFuelToUseDepth = i;
      }
    }

    console.log('totalDepth', totalDepth);
    console.log('numDepths', numDepths);
    console.log('averageDepth', averageDepth);
    console.log('minDepth', minDepth);
    console.log('maxDepth', maxDepth);

    console.log('modeDepth', modeDepth);
    console.log('modeMaxValue', modeMaxValue);

    console.log('minFuelToUse', minFuelToUse);
    console.log('minFuelToUseDepth', minFuelToUseDepth);
  };
}

const moreFuelToUse = movements => {
  let result = 0;
  for (let i = 1; i <= movements; i++) {
    result += i;
  }

  return result;
};

export default AOC;
