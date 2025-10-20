#!/usr/bin/env node

import { Command } from 'commander';
import { genDiff } from '../src/index.js';
import { parseJson, parseYaml } from '../src/parsers.js';
import path from 'node:path';
import fs from 'node:fs';

const program = new Command();

program
  .name('gendiff')
  .version('0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const file1 = fs.readFileSync(filepath1, { encoding: 'utf8', flag: 'r' })
    const file2 = fs.readFileSync(filepath2, { encoding: 'utf8', flag: 'r' })
    const parsedFile1 = path.extname(filepath1) === '.json' ? parseJson(file1) : parseYaml(file1)
    const parsedFile2 = path.extname(filepath2) === '.json' ? parseJson(file2) : parseYaml(file2)
    const diff = genDiff(parsedFile1, parsedFile2)
    console.log(diff)
  })

program.parse()