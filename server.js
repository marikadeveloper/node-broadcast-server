const WebSocket = require('ws');

function startServer(port = 8080) {
  // Create a WebSocket server that listens on the specified port
  const wss = new WebSocket.Server({ port });

  // This Set will store all connected clients
  // We use a Set because it automatically handles uniqueness
  const clients = new Set();

  console.log(`🚀 Broadcast server started on port ${port}`);
  console.log(`Waiting for clients to connect...\n`);

  // This event fires whenever a new client connects
  wss.on('connection', (ws) => {
    console.log('✅ New client connected');
    // Add the new client to our set of connected clients
    clients.add(ws);
    console.log(`📊 Total clients: ${clients.size}\n`);

    // This event fires when we receive a message from a client
    ws.on('message', (message) => {
      const messageStr = message.toString();
      console.log(`📨 Received: ${messageStr}`);

      // Broadcast the message to ALL connected clients
      clients.forEach((client) => {
        // Check if the client connection is still open
        // WebSocket.OPEN means the connection is ready to send/receive
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageStr);
        }
      });

      console.log(`📢 Broadcasted to ${clients.size} clients\n`);
    });

    // This event fires when a client disconnects
    ws.on('close', () => {
      console.log('❌ Client disconnected');

      // Remove the disconnected client from our set
      clients.delete(ws);
      console.log(`📊 Total clients: ${clients.size}\n`);
    });

    // This event fires if there's an error with a client connection
    ws.on('error', (error) => {
      console.error('⚠️  Client error:', error.message);
      clients.delete(ws);
    });
  });

  // Handle server errors
  wss.on('error', (error) => {
    console.error('❌ Server error:', error.message);
  });

  // Graceful shutdown when the process is terminated (Ctrl+C)
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down server...');

    // Close all client connections
    clients.forEach((client) => {
      client.close();
    });

    // Close the server
    wss.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
}

module.exports = { startServer };
