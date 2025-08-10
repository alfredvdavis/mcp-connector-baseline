export function checkAuth(url: URL): boolean {
  const expected = process.env.MCP_TOKEN || "";
  const token = url.searchParams.get("token") || "";
  return expected.length > 0 && token === expected;
}
