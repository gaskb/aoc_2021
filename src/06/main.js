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

    // const inputData = '3, 4, 3, 1, 2';

    const startingLanternfish = inputData.split(',').map(x => new Lanternfish(x));

    const lanternfishes = [...startingLanternfish];

    const counter = 80;

    for (let i = 0; i < counter; i++) {
      console.log('checking day ', i);
      for (const lanternfish of lanternfishes) {
        lanternfish.grow();
        if (lanternfish.internalTimer < 0) {
          lanternfish.resetInternalTimer();
          lanternfishes.push(new Lanternfish(9));
        }
      }
    }

    console.log('lanternfishes.length', lanternfishes.length);
  };

  part2 = async inputFile => {
    console.log('');
    console.log('---------- part2 ----------');
    const inputData = await fs.readFileSync(inputFile, 'utf8', async function (err, data) {
      if (err) {
        return console.log(err);
      }
    });

    // const inputData = '3, 4, 3, 1, 2';

    const startingLanternfish = inputData.split(',').map(x => new Lanternfish(x));

    const lanternfishes = [...startingLanternfish];

    const lanternfishesGroups = [];

    for (let i = 0; i < 10; i++) {
      const lanternfishesGroup = new LanternfishGroup(i);
      lanternfishesGroups.push(lanternfishesGroup);
    }

    for (const rawLanternfish of lanternfishes) {
      const lanternfish = new Lanternfish(parseInt(rawLanternfish.internalTimer));
      for (const lanternfishesGroup of lanternfishesGroups) {
        console.log('lanternfishesGroup.internalTimer', lanternfishesGroup.internalTimer);
        console.log('lanternfish.internalTimer', lanternfish.internalTimer);
        console.log(
          'lanternfishesGroup.internalTimer === lanternfish.internalTimer',
          lanternfishesGroup.internalTimer === lanternfish.internalTimer
        );
        if (lanternfishesGroup.internalTimer === lanternfish.internalTimer) {
          lanternfishesGroup.addLanternfish();
        }
      }
    }

    console.log(lanternfishesGroups);

    const counter = 256;

    for (let i = 1; i <= counter; i++) {
      let lfToAdd = 0;
      let lfToReset = 0;
      let total = 0;
      for (let lfg = 0; lfg <= 8; lfg++) {
        if (lfg === 0) {
          lfToReset = lanternfishesGroups[lfg].howMany;
          lfToAdd = lanternfishesGroups[lfg].howMany;
          total += lanternfishesGroups[lfg].howMany;
        } else {
          lanternfishesGroups[lfg - 1].howMany = lanternfishesGroups[lfg].howMany;
          total += lanternfishesGroups[lfg].howMany;
          lanternfishesGroups[lfg].howMany = 0;
        }
      }

      lanternfishesGroups[6].addLanternfish(lfToReset);
      lanternfishesGroups[8].addLanternfish(lfToAdd);

      total += lfToAdd;

      for (let lfg = 0; lfg <= 8; lfg++) {
        console.log(`${lanternfishesGroups[lfg].howMany} with internalTimer ${lanternfishesGroups[lfg].internalTimer}`);
      }

      console.log(`${total} fishes at day ${i}`);
    }

    console.log('lanternfishes.length', lanternfishes.length);

    let totLF = 0;
    for (let lfg = 0; lfg <= 9; lfg++) {
      totLF += lanternfishesGroups[lfg].howMany;
    }

    console.log('totLF', totLF);
  };
}

class Lanternfish {
  internalTimer = 0;

  constructor(internalTimer) {
    this.internalTimer = internalTimer;
  }

  grow = () => {
    this.internalTimer--;
  };

  resetInternalTimer = () => {
    this.internalTimer = 6;
  };
}

class LanternfishGroup {
  internalTimer = 0;
  howMany = 0;

  constructor(internalTimer) {
    this.internalTimer = internalTimer;
  }

  addLanternfish = (num = 1) => {
    this.howMany += num;
  };

  removeLanternfish = () => {
    this.howMany--;
  };

  getHowMany = () => {
    return this.howMany;
  };

  setinternalTimer = timer => {
    this.internalTimer = timer;
  };

  grow = () => {
    this.internalTimer--;
  };

  resetInternalTimer = () => {
    this.internalTimer = 6;
  };
}

export default AOC;
