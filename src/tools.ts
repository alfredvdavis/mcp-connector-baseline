import { z } from "zod";
import { request } from "undici";
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

export const tools: Tool[] = [
  {
    name: "search",
    description: "Minimal search tool that returns canned results.",
    inputSchema: {
      type: "object",
      properties: { query: { type: "string" } },
      required: ["query"]
    },
    async* call({ query }: { query: string }) {
      const results = [
        { title: "Result A", url: "https://example.com/a", snippet: "You searched: " + query },
        { title: "Result B", url: "https://example.com/b", snippet: "You searched: " + query }
      ];
      return { content: [{ type: "text", text: JSON.stringify(results) }] };
    }
  },
  {
    name: "fetch",
    description: "Fetches text content from a URL (demo only).",
    inputSchema: {
      type: "object",
      properties: { url: { type: "string" } },
      required: ["url"]
    },
    async* call({ url }: { url: string }) {
      const res = await request(url);
      const text = await res.body.text();
      // keep output small for safety
      const sample = text.slice(0, 2000);
      return { content: [{ type: "text", text: sample }] };
    }
  }
];
