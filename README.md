# broadcast-server 🚀

**A simple WebSocket broadcast server** for building quick chat or real-time messaging prototypes.

---

## Features ✅

- Lightweight WebSocket server using `ws`
- CLI for starting a server or connecting a simple terminal client
- Broadcasts messages from any client to all connected clients
- Easy to embed in other Node.js projects

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [CLI](#cli)
- [Programmatic API](#programmatic-api)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

---

## Installation 🔧

Requirements: Node.js

Clone and install dependencies:

```bash
git clone <repo-url>
cd node-broadcast-server
npm install
```

Install globally (optional):

```bash
npm link    # makes `broadcast-server` available globally
# or
npm install -g .
```

---

## Usage 💡

Start the server (default port 8080):

```bash
# via CLI
broadcast-server start
# or
node index.js start -p 8080
```

Start a simple terminal client and connect to the server:

```bash
broadcast-server connect
# or
node index.js connect -h localhost -p 8080
```

Open multiple terminals and run the client in each. Typing a message in one client will broadcast it to all connected clients.

---

## CLI 📟

Commands provided by the CLI (via `index.js`):

- `start` — Start the broadcast server

  - `-p, --port <number>` : Port to listen on (default `8080`)

- `connect` — Run the simple terminal client
  - `-h, --host <string>` : Server host (default `localhost`)
  - `-p, --port <number>` : Server port (default `8080`)

---

## Development & Testing 🔧

There are no tests bundled with the project right now. For local development:

```bash
# install dev deps
npm install
```

If you plan to extend the project, consider adding tests and scripts in `package.json`.

---

## Troubleshooting ⚠️

- "ECONNREFUSED" when connecting: ensure the server is running and the host/port are correct.
- "EADDRINUSE" when starting the server: the port is already in use; pick a different port with `-p`.
