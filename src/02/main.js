const fs = require('fs');

class AOC {
  part1 = async inputFile => {
    console.log('---------- part1 ----------');
    const inputdata = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    let depth = 0;
    let x = 0;
    const y = 0;

    for (const row of inputdata.split('\n')) {
      const rowArray = row.split(' ');
      const command = rowArray[0];
      const amount = Number(rowArray[1]);

      switch (command) {
        case 'up':
          depth -= amount;
          break;
        case 'down':
          depth += amount;
          break;
        case 'forward':
          x += amount;
      }
    }

    console.log('x', x);
    console.log('y', y);
    console.log('depth', depth);

    const result = x * depth;

    console.log('result = ', result);
  };

  part2 = async inputFile => {
    console.log('');
    console.log('---------- part2 ----------');
    const inputdata = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    let depth = 0;
    let x = 0;
    let aim = 0;

    for (const row of inputdata.split('\n')) {
      const rowArray = row.split(' ');
      const command = rowArray[0];
      const amount = Number(rowArray[1]);

      switch (command) {
        case 'up':
          // depth -= amount;
          aim -= amount;
          break;
        case 'down':
          // depth += amount;
          aim += amount;
          break;
        case 'forward':
          x += amount;
          depth += aim * amount;
      }
    }

    console.log('aim', aim);
    console.log('x', x);
    console.log('depth', depth);

    const result = x * depth;

    console.log('result = ', result);
  };
}

export default AOC;
