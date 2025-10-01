// Cloudflare Workers environment (empty for stateless server)
export interface Env {}

// NBP API response types
export interface NbpCurrencyRateResponse {
    table: string;
    currency: string;
    code: string;
    rates: Array<{
        no: string;
        effectiveDate: string;
        tradingDate?: string;  // Only present in Table C responses
        bid: number;
        ask: number;
    }>;
}

export interface NbpGoldPriceResponse {
    data: string;  // API returns 'data' not 'date'
    cena: number;  // API returns 'cena' (Polish for 'price')
}

// Formatted responses for MCP tools
export interface CurrencyRateResult {
    table: string;
    currency: string;
    code: string;
    bid: number;
    ask: number;
    tradingDate: string;
    effectiveDate: string;
}

export interface GoldPriceResult {
    date: string;
    price: number;
}

export interface CurrencyHistoryResult {
    table: string;
    currency: string;
    code: string;
    rates: Array<{
        tradingDate: string;
        effectiveDate: string;
        bid: number;
        ask: number;
    }>;
}
