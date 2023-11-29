const fs = require('fs');

class AOC {
  part1 = async inputFile => {
    const inputdata = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    const counter = 1;
    let incrCounter = 0;
    let lastdeptVal = 1000;
    for (const row of inputdata.split('\n')) {
      const depth = Number(row);
      // console.log('depth ', counter, ' = ', depth);
      if (depth > lastdeptVal) {
        incrCounter++;
      }
      lastdeptVal = depth;
      // counter++;
    }

    console.log('incrCounter = ', incrCounter);
  };

  part2 = async inputFile => {
    const inputdata = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    let counter = 2;
    let incrCounter = 0;
    let lastdeptVal = 1000;
    const inputDataArray = inputdata.split('\n');

    for (const row of inputdata.split('\n')) {
      const depthValSum =
        Number(inputDataArray[counter]) + Number(inputDataArray[counter - 1]) + Number(inputDataArray[counter - 2]);

      // console.log('depthValSum ', counter, ' = ', depthValSum);
      if (depthValSum > lastdeptVal) {
        incrCounter++;
      }
      lastdeptVal = depthValSum;
      counter++;
    }

    console.log('incrCounter = ', incrCounter);
  };
}

export default AOC;
