#!/usr/bin/env node

import { Command } from 'commander';
import runComparison from '../src/runComparison.js';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format', 'stylish')
    .argument('<filepath1>', 'first file')
    .argument('<filepath2>', 'second file')
    .action((filepath1, filepath2) => {
        const options = program.opts();
        console.log(runComparison(filepath1, filepath2, options.format))
    })
    .parse(process.argv);