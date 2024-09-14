#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../src/parse.js';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'output usage information')

    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>', 'first file')
    .argument('<filepath2>', 'second file')
    .action((filepath1, filepath2) => {
        console.log(parseFile(filepath1));
        console.log(parseFile(filepath2));
    })
    .parse(process.arvg);