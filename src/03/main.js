import Utils from '../utils/utils';

const fs = require('fs');

class AOC {
  part1 = async inputFile => {
    console.log('---------- part1 ----------');
    const inputdata = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    let gammaString = '';
    let epsilonString = '';

    const singlePositionsSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const rows = inputdata.split('\n');
    const rowCounter = rows.length;
    for (const row of rows) {
      let i = 0;
      for (const position of row) {
        singlePositionsSum[i] += Number(position);
        i++;
      }
    }

    console.log('singlePositionsSum', singlePositionsSum);

    for (const sum of singlePositionsSum) {
      if (sum >= rowCounter / 2) {
        gammaString += 1;
        epsilonString += 0;
      } else {
        gammaString += 0;
        epsilonString += 1;
      }
    }
    const gamma = parseInt(gammaString, 2);
    const epsilon = parseInt(epsilonString, 2);

    console.log('gamma', gamma);
    console.log('epsilon', epsilon);

    const result = gamma * epsilon;
    console.log('------------------');
    console.log('result = ', result);
  };

  part2 = async inputFile => {
    console.log('');
    console.log('---------- part2 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    //     const inputData = `00100
    // 11110
    // 10110
    // 10111
    // 10101
    // 01111
    // 00111
    // 11100
    // 10000
    // 11001
    // 00010
    // 01010`;
    const rows = inputData.split('\n');
    const rowLength = rows[0].length;

    console.log('rows[0]', rows[0]);
    console.log('rowLength', rowLength);

    let selectionMost = '';
    let selectionLeast = '';

    let workingArrayMost = [...rows];
    let workingArrayLeast = [...rows];
    for (let i = 0; i < rowLength; i++) {
      const mostCommonValue = Utils.findMostCommonValueInArrayAtPosition(workingArrayMost, i);
      const leastCommonValue = Utils.findLeastCommonValueInArrayAtPosition(workingArrayLeast, i);

      selectionMost += mostCommonValue;
      selectionLeast += leastCommonValue;

      workingArrayMost = Utils.filterArrayStringStarts(workingArrayMost, selectionMost);
      workingArrayLeast = Utils.filterArrayStringStarts(workingArrayLeast, selectionLeast);
    }

    console.log('selectionMost', selectionMost);
    console.log('selectionLeast', selectionLeast);

    const oxygen = parseInt(selectionMost, 2);
    const co2 = parseInt(selectionLeast, 2);

    const lifeSupportRating = oxygen * co2;

    console.log('lifeSupportRating', lifeSupportRating);
  };
}

export default AOC;
