class Utils {
  findMostCommonValueInArray = valueArray => {};

  static findMostCommonValueInArrayAtPosition = (valueArray, position) => {
    const values = this.findValuesInArrayAtPosition(valueArray, position);

    let mostCommonValue = '';
    let mostCommonValueOccurrencies = 0;

    for (const [key, val] of Object.entries(values)) {
      if (val > mostCommonValueOccurrencies) {
        mostCommonValue = key;
        mostCommonValueOccurrencies = val;
      } else {
        if (val === mostCommonValueOccurrencies) {
          mostCommonValue = '1';
        }
      }
    }

    return mostCommonValue;
  };

  static findLeastCommonValueInArrayAtPosition = (valueArray, position) => {
    console.log(`findLeastCommonValueInArrayAtPosition -> ${position}`);
    console.log(`findLeastCommonValueInArrayAtPosition valueArray -> ${JSON.stringify(valueArray)}`);
    const values = this.findValuesInArrayAtPosition(valueArray, position);

    console.log(`findLeastCommonValueInArrayAtPosition values -> ${JSON.stringify(values)}`);

    let leastCommonValue = '';
    let leastCommonValueOccurrencies = 60000;

    for (const [key, val] of Object.entries(values)) {
      if (val < leastCommonValueOccurrencies) {
        leastCommonValue = key;
        leastCommonValueOccurrencies = val;
      } else {
        if (val === leastCommonValueOccurrencies) {
          leastCommonValue = '0';
        }
      }
    }
    console.log(`findLeastCommonValueInArrayAtPosition leastCommonValue -> ${leastCommonValue}`);
    return leastCommonValue;
  };

  static findValuesInArrayAtPosition = (valueArray, position) => {
    const values = {};
    for (const row of valueArray) {
      if (!row) {
        continue;
      }
      if (!values[row[position]]) {
        values[row[position]] = 1;
      } else {
        values[row[position]] += 1;
      }
    }

    // console.log('values', values);

    return values;
  };

  static filterArrayStringStarts = (startingArray, matchingString) => {
    console.log(`filterArrayStringStarts -> ${matchingString}`);
    if (!matchingString || matchingString === '') {
      return startingArray;
    }

    const result = [];

    for (const row of startingArray) {
      if (!row) {
        continue;
      }

      // const reMatchingString = '/^' + matchingString + '/g';
      const regex = new RegExp('^' + matchingString, 'g');

      if (row.match(regex) && row.match(regex)[0]) {
        result.push(row);
      }
    }

    console.log(`filterArrayStringStarts result -> ${result}`);

    return result;
  };
}
export default Utils;
