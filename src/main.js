import './appenv';
import AOC from './08/main';

async function startAoc() {
  const aoc = new AOC();
  await aoc.part1('input/08/input_01.txt');
  await aoc.part2('input/08/input_01.txt');
}

startAoc();
