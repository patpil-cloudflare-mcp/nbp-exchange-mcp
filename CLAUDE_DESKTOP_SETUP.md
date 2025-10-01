# Claude Desktop Setup Guide

## Step 1: Ensure Server is Running

```bash
cd "/Users/patpil/Documents/ai-projects/Cloudflare_mcp's/projects/NBP/nbp-exchange-mcp"
npm run dev
```

Verify server is running at `http://localhost:8787`

## Step 2: Configure Claude Desktop

### Location of Config File:
- **macOS**: `~/.config/claude/config.json`
- **Windows**: `%APPDATA%\Claude\config.json`

### Configuration:

Copy this into your Claude Desktop config file:

```json
{
  "mcpServers": {
    "nbp-exchange-local": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    }
  }
}
```

## Step 3: Restart Claude Desktop

Press `Cmd + R` (Mac) or `Ctrl + R` (Windows) to reload Claude Desktop.

## Step 4: Verify Connection

In Claude Desktop, you should see the NBP Exchange MCP server connected in the bottom-right corner (tools icon).

## Troubleshooting

### Error: "Network error: internal error"

This can happen due to several reasons:

1. **Server not running**: Make sure `npm run dev` is running
2. **Port conflict**: Check if port 8787 is in use
3. **mcp-remote not installed**: Run `npx mcp-remote --version` to verify

### Check Server Status

```bash
# Test if server is responding
curl http://localhost:8787/

# Expected response:
# NBP Exchange MCP Server
# A Model Context Protocol (MCP) server...
```

### Check MCP Inspector (Alternative Testing)

```bash
# Terminal 1: Server running
npm run dev

# Terminal 2: Start inspector
npx @modelcontextprotocol/inspector

# Open browser: http://localhost:5173
# Connect to: http://localhost:8787/sse
```

### View Server Logs

Watch the terminal where `npm run dev` is running for connection logs:
- `GET /sse 200 OK` - Successful connection
- `POST /sse/message 202 Accepted` - Tool invocation

## After Deployment

Once you deploy to Cloudflare Workers:

```bash
npm run deploy
```

Update your config to use the production URL:

```json
{
  "mcpServers": {
    "nbp-exchange": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://nbp-exchange-mcp.YOUR-ACCOUNT.workers.dev/sse"
      ]
    }
  }
}
```

## Available Tools

Once connected, you can ask Claude:
- "What's the current USD to PLN exchange rate?"
- "Get the gold price for September 15, 2025"
- "Show me EUR exchange rates for the first week of September"
