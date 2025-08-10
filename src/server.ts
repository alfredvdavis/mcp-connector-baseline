import "dotenv/config";
import { WebSocketServer } from "ws";
import { URL } from "node:url";
import { checkAuth } from "./auth.js";
import { tools } from "./tools.js";
importServerver } from "@modelcontextprotocol/sdk/server/index.js";
import { WebSocketServerTransport } from "@modelcontextprotocol/sdk/server/websocket.js";

// Create MCP server and register tools
const mcp = new Server({
  name: "tsucava-mcp-baseline",
  version: "0.1.0",
});

for (const t of tools) mcp.tool(t);

const port = Number(process.env.PORT || 8080);
const wss = new WebSocketServer({ port });

wss.on("connection", async (ws, req) => {
  try {
    const host = req.headers.host || "";
    const url = new URL(req.url || "/", "http://" + host);
    if (!checkAuth(url)) {
      ws.close(1008, "unauthorized");
      return;
    }

    const transport = new WebSocketServerTransport(ws);
    // Start serving MCP over this websocket
    await mcp.connect(transport);
  } catch (err) {
    try { ws.close(1011, "server error"); } catch {}
  }
});

console.log("MCP WebSocket listening on ws://0.0.0.0:" + port + "/mcp");
