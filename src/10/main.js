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

    //     const inputData = `[({(<(())[]>[[{[]{<()<>>
    // [(()[<>])]({[<{<<[]>>(
    // {([(<{}[<>[]}>{[]{[(<()>
    // (((({<>}<{<{<>}{[]{[]{}
    // [[<[([]))<([[{}[[()]]]
    // [{[{({}]{}}([{[{{{}}([]
    // {<[[]]>}<{[{[{[]{()[[[]
    // [<(<(<(<{}))><([]([]()
    // <{([([[(<>()){}]>(<<{{
    // <{([{{}}[<[[[<>{}]]]>[]]`;

    const dataRows = inputData.split('\n');

    // const maxLength = getMaxLength(dataRows);

    // const completeRows = getCompleteRows(dataRows, maxLength);

    const chunkValue = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

    let wrongChunksValue = 0;
    for (const row of dataRows) {
      const wrongChunk = getWrongChunk(row);
      if (wrongChunk) {
        console.log('wrongChunk', wrongChunk);
        console.log('chunkValue[wrongChunk]', chunkValue[wrongChunk]);
        wrongChunksValue += parseInt(chunkValue[wrongChunk]);
      }
    }

    console.log('wrongChunksValue', wrongChunksValue);
  };

  // eslint-disable-next-line complexity
  part2 = async inputFile => {
    console.log('---------- part2 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    //     const inputData = `[({(<(())[]>[[{[]{<()<>>
    // [(()[<>])]({[<{<<[]>>(
    // {([(<{}[<>[]}>{[]{[(<()>
    // (((({<>}<{<{<>}{[]{[]{}
    // [[<[([]))<([[{}[[()]]]
    // [{[{({}]{}}([{[{{{}}([]
    // {<[[]]>}<{[{[{[]{()[[[]
    // [<(<(<(<{}))><([]([]()
    // <{([([[(<>()){}]>(<<{{
    // <{([{{}}[<[[[<>{}]]]>[]]`;

    const dataRows = inputData.split('\n');

    const chunksValue = { ')': 1, ']': 2, '}': 3, '>': 4 };

    const missingChunksValues = [];
    for (const row of dataRows) {
      const wrongChunk = getWrongChunk(row);
      if (wrongChunk) {
        continue;
      }
      const chunksToComplete = getMissingChunks(row);
      const missingChunksValue = getMissingChunksValue(chunksToComplete, chunksValue);
      if (missingChunksValue) {
        missingChunksValues.push(missingChunksValue);
      }
    }
    missingChunksValues.sort(function (a, b) {
      return a - b;
    });
    const middlePlace = Math.round(missingChunksValues.length / 2) - 1;
    console.log('middlePlace', middlePlace);
    const middleVal = missingChunksValues[middlePlace];
    console.log('missingChunksValues', missingChunksValues);
    console.log('middleVal', middleVal);
  };
}

const getWrongChunk = row => {
  const openingChunk = ['(', '[', '{', '<'];
  const closingChunk = [')', ']', '}', '>'];
  const expectedClosingOrder = [];

  const rowArray = row.split('');
  console.log('--------------------------------------------------------------', row);
  console.log('checking row', row);

  for (const chunk of rowArray) {
    const openingCharIndex = openingChunk.indexOf(chunk);
    // console.log('checking chunk', chunk);
    // console.log('openingCharIndex', openingCharIndex);
    if (openingCharIndex >= 0) {
      expectedClosingOrder.push(closingChunk[openingCharIndex]);
    } else {
      const expectedClosingChunk = expectedClosingOrder[expectedClosingOrder.length - 1];
      if (chunk !== expectedClosingChunk) {
        // console.log('found chunk', chunk);
        // console.log('expectedClosingChunk', expectedClosingChunk);

        return chunk;
      }
      expectedClosingOrder.splice(-1, 1);
    }
  }
};

const getMissingChunks = row => {
  const openingChunk = ['(', '[', '{', '<'];
  const closingChunk = [')', ']', '}', '>'];
  const expectedClosingOrder = [];

  const rowArray = row.split('');
  console.log('--------------------------------------------------------------', row);
  console.log('checking row', row);

  for (const chunk of rowArray) {
    const openingCharIndex = openingChunk.indexOf(chunk);
    // console.log('checking chunk', chunk);
    // console.log('openingCharIndex', openingCharIndex);
    if (openingCharIndex >= 0) {
      expectedClosingOrder.push(closingChunk[openingCharIndex]);
    } else {
      const expectedClosingChunk = expectedClosingOrder[expectedClosingOrder.length - 1];
      if (chunk !== expectedClosingChunk) {
        return null;
      }
      expectedClosingOrder.splice(-1, 1);
    }
  }
  const result = expectedClosingOrder.reverse();
  console.log('result', result);
  return result;
};

const getMissingChunksValue = (missingChunks, chunksValue) => {
  let result = 0;
  for (const chunk of missingChunks) {
    result = result * 5;
    result += chunksValue[chunk];
  }

  return result;
};

export default AOC;
