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

    /**
    const inputData = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

 */

    // const inputRows = inputData.split('\n').map(x => parseInt(x));
    const inputRows = inputData.split('\n');

    let knownDigitsAppears = 0;
    for (const inputRow of inputRows) {
      const rawOutput = inputRow.split(' | ')[1];
      if (!rawOutput) {
        continue;
      }
      console.log('rawOutput', rawOutput);

      for (const rawDigits of rawOutput.split(' ')) {
        console.log('rawDigits', rawDigits);

        if (firstTranslateDigit(rawDigits) > -1) {
          knownDigitsAppears++;
        }
      }
    }

    console.log('knownDigitsAppears ', knownDigitsAppears);
  };

  part2 = async inputFile => {
    console.log('');
    console.log('---------- part2 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    /** 
    const inputData = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

    */

    const inputRows = inputData.split('\n');

    let result = 0;
    for (const inputRow of inputRows) {
      const output = advancedTranslateOutput(inputRow);
      result += parseInt(output);
    }

    console.log('result ', result);
  };
}

const firstTranslateDigit = mixedDigit => {
  let result = -1;

  // console.log('mixedDigit = ', mixedDigit);
  // console.log('mixedDigit.length = ', mixedDigit.length);

  switch (mixedDigit.length) {
    case 2:
      result = 1;
      console.log('found 1');
      break;
    case 3:
      result = 7;
      console.log('found 7');
      break;
    case 4:
      result = 4;
      console.log('found 4');
      break;
    case 7:
      result = 8;
      console.log('found 8');
      break;
    default:
    // console.log('Not found');
  }

  // console.log('result = ', result);

  return result;
};

const advancedTranslateOutput = mixedDigitRow => {
  const resultArray = [];

  const mixedDigitInput = mixedDigitRow.split(' | ')[0];
  const mixedDigitOutput = mixedDigitRow.split(' | ')[1];
  if (!mixedDigitOutput) {
    return 0;
  }

  console.log('mixedDigit = ', mixedDigitRow);

  let myDict = {};

  for (const mixedDigitEntry of mixedDigitInput.split(' ')) {
    myDict = makeMyDict(mixedDigitEntry, myDict);
  }
  for (const mixedDigitEntry of mixedDigitOutput.split(' ')) {
    myDict = makeMyDict(mixedDigitEntry, myDict);
  }

  for (const mixedDigitEntry of mixedDigitInput.split(' ')) {
    myDict = guessDigitAndUpdateDict(mixedDigitEntry, myDict);
  }
  for (const mixedDigitEntry of mixedDigitOutput.split(' ')) {
    myDict = guessDigitAndUpdateDict(mixedDigitEntry, myDict);
  }

  console.log('Object.keys(myDict).length', Object.keys(myDict).length);
  if (Object.keys(myDict).length < 10) {
    console.log('again');
    for (const mixedDigitEntry of mixedDigitInput.split(' ')) {
      myDict = guessDigitAndUpdateDict(mixedDigitEntry, myDict);
    }
    for (const mixedDigitEntry of mixedDigitOutput.split(' ')) {
      myDict = guessDigitAndUpdateDict(mixedDigitEntry, myDict);
    }
  }

  // console.log('myDict = ', myDict);

  console.log('mixedDigitOutput -> ', mixedDigitOutput);

  for (const mixedDigitEntry of mixedDigitOutput.split(' ')) {
    const digit = guessDigit(mixedDigitEntry, myDict);
    console.log('digit - ');
    resultArray.push(digit);
  }

  const result = resultArray.join('');
  console.log('result = ', result);

  return result;
};

const makeMyDict = (mixedDigitEntry, myDict) => {
  const digit = firstTranslateDigit(mixedDigitEntry);
  if (digit > 0) {
    if (!myDict[digit]) {
      myDict[digit] = [];
      for (const segment of mixedDigitEntry) {
        myDict[digit].push(segment);
      }
    }
  }
  return myDict;
};

const guessDigit = (mixedDigitEntry, myDict) => {
  const firtAttempt = firstTranslateDigit(mixedDigitEntry);
  if (firtAttempt > -1) {
    return firtAttempt;
  }

  if (mixedDigitEntry.length === 6) {
    // if contains all segment of "1" it's a "9"
    if (containsAllSegment(mixedDigitEntry, myDict['1'])) {
      // it's 9 or 0 ?
      if (containsAllSegment(mixedDigitEntry, myDict['4'])) {
        console.log('found 9');
        return 9;
      } else {
        console.log('found 0');
        return 0;
      }
    } else {
      // it's 6
      console.log('found 6');
      return 6;
    }
  }

  // if length === 5 it's 2 or 3 or 5
  if (mixedDigitEntry.length === 5) {
    // if contains all segment of "1" it's a "3"
    if (containsAllSegment(mixedDigitEntry, myDict['1'])) {
      // it's 3
      console.log('found 3');
      return 3;
    } else {
      // 2 or 5 ?

      if (myDict['6']) {
        if (missSameSegment(mixedDigitEntry, myDict['6'])) {
          // it's 5
          console.log('found 5');
          return 5;
        } else {
          // it's 2
          console.log('found 2');
          return 2;
        }
      }
    }
  }

  return -1;
};

const guessDigitAndUpdateDict = (mixedDigitEntry, myDict) => {
  const digit = guessDigit(mixedDigitEntry, myDict);

  if (digit > -1) {
    myDict = updateMyDict(digit, mixedDigitEntry, myDict);
  }

  return myDict;
};

const updateMyDict = (digit, mixedDigitEntry, myDict) => {
  if (!myDict[digit]) {
    myDict[digit] = [];
    for (const segment of mixedDigitEntry) {
      myDict[digit].push(segment);
    }
  }

  return myDict;
};

const containsAllSegment = (mixedDigitEntry, knownDigitArray) => {
  let found = 0;

  for (const knownDigitSegment of knownDigitArray) {
    if (mixedDigitEntry.includes(knownDigitSegment)) {
      found++;
    }
  }

  return found === knownDigitArray.length;
};

const missSameSegment = (mixedDigitEntry, knownDigitArray) => {
  let missingSegment = '';
  const allSegments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  for (const segment of allSegments) {
    if (!knownDigitArray.includes(segment)) {
      missingSegment = segment;
    }
  }

  if (mixedDigitEntry.includes(missingSegment)) {
    return false;
  }
  return true;
};
export default AOC;
