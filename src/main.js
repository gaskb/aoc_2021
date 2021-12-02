import './appenv';
import AOC from './02/main';

async function startAoc() {
  const aoc = new AOC();
  await aoc.part1('input/02/input_01.txt');
  await aoc.part2('input/02/input_01.txt');
}

startAoc();
