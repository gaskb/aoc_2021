import './appenv';
import AOC from './06/main';

async function startAoc() {
  const aoc = new AOC();
  await aoc.part1('input/06/input_01.txt');
  await aoc.part2('input/06/input_01.txt');
}

startAoc();
