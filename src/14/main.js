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

    // NCNBCH
    // NBCCNBBBCB
    // NBBBCNCCNBBNBNBBCH
    // NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCB

    //     const inputData = `NNCB

    // CH -> B
    // HH -> N
    // CB -> H
    // NH -> C
    // HB -> C
    // HC -> B
    // HN -> C
    // NN -> C
    // BH -> H
    // NC -> B
    // NB -> B
    // BN -> B
    // BB -> N
    // BC -> B
    // CC -> N
    // CN -> C`;

    const dataRows = inputData.split('\n');

    const rules = {};

    const template = dataRows[0];

    for (const row of dataRows) {
      if (row.includes('->')) {
        const rule = row.split(' -> ');
        rules[rule[0]] = rule[1];
      }
    }

    const myPolymer = new Polymer(template, rules);

    console.log(`myPolymer ${JSON.stringify(myPolymer)}`);

    let finalSequence = '';
    for (let i = 0; i < 40; i++) {
      console.log('step', i);
      finalSequence = myPolymer.applyRules();
      myPolymer.template = finalSequence;
    }

    const stats = myPolymer.getStats();

    // console.log(`finalSequence`, finalSequence);

    console.log(`stats`, stats);

    const result = stats.max.size - stats.min.size;
    console.log(result);
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
  };
}

class Polymer {
  template = '';
  rules = {};

  constructor(template, rules) {
    this.template = template;
    this.rules = rules;
  }

  applyRules() {
    let tmp = '';
    for (let i = 0; i < this.template.length - 1; i++) {
      const section = this.template.substring(i, i + 2);
      tmp = tmp + this.applyRule(section);
    }
    tmp = tmp + this.template.substring(this.template.length - 1, this.template.length + 1);
    // console.log(`tmp ${tmp}`);
    return tmp;
  }

  applyRule(section) {
    if (section in this.rules) {
      // console.log(`section ${section} found`);

      const result = section.substring(0, 1) + this.rules[section];

      // console.log(`found  ${result} rule`);

      return result;
    } else {
      console.log(`section ${section} not found`);
    }
  }

  getStats() {
    const stats = {};
    const chars = this.template.split('');
    for (const char of chars) {
      if (char in stats) {
        stats[char]++;
      } else {
        stats[char] = 1;
      }
    }

    stats.max = { char: '', size: 0 };
    stats.min = { char: '', size: 9999999999 };

    for (const key in stats) {
      if (key.length === 1) {
        console.log('key', key);
        console.log('value', stats[key]);
        if (stats[key] > stats.max.size) {
          stats.max.size = stats[key];
          stats.max.char = key;
        }
        if (stats[key] < stats.min.size) {
          stats.min.size = stats[key];
          stats.min.char = key;
        }
      }
    }

    return stats;
  }
}

export default AOC;
