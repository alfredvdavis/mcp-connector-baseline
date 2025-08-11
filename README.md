# MCP Connector Baseline

This project implements a minimal Model Context Protocol (MCP) server exposing two tools (`search` and `fetch`). It runs over a WebSocket transport and is intended to be deployed behind an Nginx reverse proxy.

## Setup

Install dependencies and build the project:

```bash
npm install
npm run build
```
Run the server:

```bash
PORT=8080 MCP_TOKEN=<your-token> node dist/server.js
```
Register the resulting WebSocket endpoint (`wss://your-host/mcp?token=<your-token>`) in ChatGPT’s Connectors settings.
