export interface Quote {
  symbol: string;
  bid: number;
  ask: number;
  last: number;
  time: string;
}

export interface OrderPanelState {
  open: boolean;
  symbol: string | null;
}

export interface MarketDataState {
  quotes: { [symbol: string]: Quote };
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error';
  watchlist: string[];
  orderPanel: OrderPanelState;
  portfolio: PortfolioState;
}

export interface Order {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  type: 'MARKET' | 'LIMIT';
  limitPrice: number | null;
  timestamp: number;
}

export interface Trade {
  id: string;
  orderId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price: number;
  timestamp: number;
}

export interface Position {
  symbol: string;
  qty: number;
  avgPrice: number;
}

export interface PortfolioState {
  positions: { [symbol: string]: Position };
  trades: Trade[];
  cash: number;
  realizedPL: number;
}

