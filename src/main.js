import './appenv';
import AOC from './10/main';

async function startAoc() {
  const aoc = new AOC();
  await aoc.part1('input/10/input_01.txt');
  await aoc.part2('input/10/input_01.txt');
}

startAoc();
