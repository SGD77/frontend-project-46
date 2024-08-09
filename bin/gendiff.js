#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format', 'output format')
    .parse(process.arvg);