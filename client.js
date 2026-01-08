const WebSocket = require('ws');
const readline = require('readline');

function connectClient(host = 'localhost', port = 8080) {
  // Create a WebSocket connection to the server
  const ws = new WebSocket(`ws://${host}:${port}`);

  // Create an interface to read user input from the terminal
  // This lets us read line by line from stdin (standard input)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // This event fires when we successfully connect to the server
  ws.on('open', () => {
    console.log(`✅ Connected to server at ${host}:${port}`);
    console.log('Type your messages and press Enter to send\n');

    // Set up the prompt to read user input
    rl.prompt();

    // This event fires every time the user types a line and presses Enter
    rl.on('line', (input) => {
      const message = input.trim();

      // Only send non-empty messages
      if (message) {
        // Send the message to the server
        ws.send(message);
        console.log(`📤 Sent: ${message}`);
      }

      // Show the prompt again for the next message
      rl.prompt();
    });
  });

  // This event fires when we receive a message from the server
  ws.on('message', (data) => {
    const message = data.toString();
    // Clear the current line and show the received message
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    console.log(`📥 Received: ${message}`);

    // Show the prompt again
    rl.prompt();
  });

  // This event fires when the connection is closed
  ws.on('close', () => {
    console.log('\n❌ Disconnected from server');
    rl.close();
    process.exit(0);
  });

  // This event fires if there's a connection error
  ws.on('error', (error) => {
    console.error('⚠️  Connection error:', error.message);
    console.log('Make sure the server is running!');
    rl.close();
    process.exit(1);
  });

  // Handle Ctrl+C gracefully
  rl.on('close', () => {
    console.log('\n\n👋 Closing connection...');
    ws.close();
  });
}

module.exports = { connectClient };
