#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program

    .version('0.0.1', '-v, --version', 'output the current version')
    .helpOption('-h, --help', 'output usage information')
    .description('Compares two configuration files and shows a difference.');

program.parse();