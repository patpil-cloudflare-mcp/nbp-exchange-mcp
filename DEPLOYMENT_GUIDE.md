# NBP Exchange MCP - Deployment Guide

## Important: Local Development Limitation

⚠️ **The MCP server uses Durable Objects (required by McpAgent) which cannot make external API calls in local development mode.**

This means you **must deploy** the Worker to Cloudflare to test it with real NBP API calls.

## Quick Deploy

```bash
cd "/Users/patpil/Documents/ai-projects/Cloudflare_mcp's/projects/NBP/nbp-exchange-mcp"
npm run deploy
```

## After Deployment

1. **Get your Worker URL** from the deployment output:
   ```
   https://nbp-exchange-mcp.YOUR-ACCOUNT.workers.dev
   ```

2. **Update Claude Desktop config** at `~/.config/claude/config.json` (Mac) or `%APPDATA%\Claude\config.json` (Windows):

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

3. **Restart Claude Desktop** (Cmd/Ctrl + R)

## Testing Your Deployed Server

### With MCP Inspector

```bash
npx @modelcontextprotocol/inspector

# Open browser: http://localhost:5173
# Connect to: https://nbp-exchange-mcp.YOUR-ACCOUNT.workers.dev/sse
```

### With Claude Desktop

Ask Claude:
- "What's the current USD to PLN exchange rate?"
- "Get the gold price for today"
- "Show me EUR exchange rates for the last week"

## Why Deploy Instead of Local Dev?

From Cloudflare docs:

> **Durable Objects**: Enabling remote connections for Durable Objects may be supported in the future, but currently will always run locally.

Since `McpAgent` requires Durable Objects for MCP protocol handling, and Durable Objects in local mode cannot make external fetch() calls to https://api.nbp.pl, the server must run on Cloudflare's infrastructure.

## View Logs

```bash
# Watch real-time logs from deployed Worker
npx wrangler tail
```

## Update Deployed Worker

Make code changes, then:

```bash
npm run deploy
```

No need to restart Claude Desktop - it will reconnect automatically.
