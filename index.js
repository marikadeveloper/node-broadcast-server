#!/usr/bin/env node

const { Command } = require('commander');
const { startServer } = require('./server');
const { connectClient } = require('./client');

// Create a new CLI program
const program = new Command();

program
  .name('broadcast-server')
  .description('A simple WebSocket broadcast server')
  .version('1.0.0');

program
  .command('start')
  .description('Start the broadcast server')
  .option('-p, --port <number>', 'Port to listen on', '8080')
  .action((options) => {
    const port = parseInt(options.port);
    startServer(port);
  });

program
  .command('connect')
  .description('Connect to the broadcast server')
  .option('-h, --host <string>', 'Server host', 'localhost')
  .option('-p, --port <number>', 'Server port', '8080')
  .action((options) => {
    const port = parseInt(options.port);
    connectClient(options.host, port);
  });

// Parse the command-line arguments
program.parse(process.argv);
