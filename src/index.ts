import { NbpMCP } from "./server";
import type { Env } from "./types";

// Export the McpAgent class for Cloudflare Workers
export { NbpMCP };

/**
 * Worker fetch handler with dual transport support
 *
 * Supports both SSE (Server-Sent Events) and Streamable HTTP transport methods
 * to ensure compatibility with all MCP clients.
 */
export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext): Response | Promise<Response> {
        const { pathname } = new URL(request.url);

        // SSE transport (legacy, but widely supported by current MCP clients)
        if (pathname.startsWith('/sse')) {
            return NbpMCP.serveSSE('/sse').fetch(request, env, ctx);
        }

        // Streamable HTTP transport (new standard, introduced March 2025)
        if (pathname.startsWith('/mcp')) {
            return NbpMCP.serve('/mcp').fetch(request, env, ctx);
        }

        // Root endpoint - informational response
        if (pathname === '/') {
            return new Response(
                'NBP Exchange MCP Server\n\n' +
                'A Model Context Protocol (MCP) server for querying Polish National Bank exchange rates.\n\n' +
                'Available endpoints:\n' +
                '  /sse - Server-Sent Events transport\n' +
                '  /mcp - Streamable HTTP transport\n\n' +
                'Available tools:\n' +
                '  - getCurrencyRate: Get buy/sell rates for a currency\n' +
                '  - getGoldPrice: Get NBP gold price\n' +
                '  - getCurrencyHistory: Get historical rate series\n',
                {
                    status: 200,
                    headers: { 'Content-Type': 'text/plain' }
                }
            );
        }

        return new Response('Not found', { status: 404 });
    },
};
