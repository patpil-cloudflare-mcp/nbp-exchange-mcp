# NBP Exchange MCP Server

A Model Context Protocol (MCP) server for accessing Polish National Bank (NBP) exchange rates and gold prices.

## Features

- Get current & historical exchange rates for 12 major currencies
- Query official NBP gold prices
- Historical data series (up to 93 days)

## Quick Start

```bash
npm install
npm run dev
```

Server runs at `http://localhost:8787`

## Available Tools

### `getCurrencyRate`
Get buy/sell exchange rates for a currency.

**Parameters:**
- `currencyCode` - USD, EUR, GBP, CHF, AUD, CAD, SEK, NOK, DKK, JPY, CZK, HUF
- `date` - Optional YYYY-MM-DD format

### `getGoldPrice`
Get NBP gold price (1g, 1000 millesimal fineness).

**Parameters:**
- `date` - Optional YYYY-MM-DD format

### `getCurrencyHistory`
Get historical exchange rates over a date range.

**Parameters:**
- `currencyCode` - Currency code
- `startDate` - YYYY-MM-DD format
- `endDate` - YYYY-MM-DD format (max 93 days)

## Endpoints

- `/sse` - Server-Sent Events transport
- `/mcp` - Streamable HTTP transport

## Available Commands

```bash
# Development
npm run dev              # Start local development server
npm run type-check       # Run TypeScript type checking
npm run cf-typegen       # Generate Cloudflare Workers type definitions

# Deployment
npm run deploy           # Deploy to Cloudflare Workers
```

## Usage Examples

### Example 1: Get Current USD Exchange Rate
```json
{
  "tool": "getCurrencyRate",
  "parameters": {
    "currencyCode": "USD"
  }
}
```

**Response:**
```json
{
  "table": "C",
  "currency": "dolar amerykański",
  "code": "USD",
  "bid": 3.6013,
  "ask": 3.6741,
  "tradingDate": "2025-09-30",
  "effectiveDate": "2025-10-01"
}
```

### Example 2: Get Historical EUR Rate
```json
{
  "tool": "getCurrencyRate",
  "parameters": {
    "currencyCode": "EUR",
    "date": "2025-09-15"
  }
}
```

### Example 3: Get Current Gold Price
```json
{
  "tool": "getGoldPrice",
  "parameters": {}
}
```

**Response:**
```json
{
  "date": "2025-10-01",
  "price": 446.64
}
```

### Example 4: Get Currency History (7 days)
```json
{
  "tool": "getCurrencyHistory",
  "parameters": {
    "currencyCode": "GBP",
    "startDate": "2025-09-01",
    "endDate": "2025-09-07"
  }
}
```

**Response:**
```json
{
  "table": "C",
  "currency": "funt szterling",
  "code": "GBP",
  "rates": [
    {
      "tradingDate": "2025-08-30",
      "effectiveDate": "2025-09-02",
      "bid": 4.7234,
      "ask": 4.8188
    },
    {
      "tradingDate": "2025-09-02",
      "effectiveDate": "2025-09-03",
      "bid": 4.7156,
      "ask": 4.8108
    }
  ]
}
```

### Example 5: Analyze Currency Trend (1 month)
```json
{
  "tool": "getCurrencyHistory",
  "parameters": {
    "currencyCode": "CHF",
    "startDate": "2025-09-01",
    "endDate": "2025-09-30"
  }
}
```

## Testing with MCP Inspector

```bash
# Terminal 1: Start the server
npm run dev

# Terminal 2: Start MCP Inspector
npx @modelcontextprotocol/inspector

# Open browser: http://localhost:5173
# Connect to: http://localhost:8787/sse
```

## Notes

- NBP publishes rates only on trading days (Mon-Fri, excluding holidays)
- Historical data: currencies from 2002-01-02, gold from 2013-01-02
- Maximum query range: 93 days
- Bid = bank buy price, Ask = bank sell price
