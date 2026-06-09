import { createReducer, on } from '@ngrx/store';
import * as MarketActions from './market-data.actions';
import { MarketDataState } from './market-data.models';

const saved = localStorage.getItem('watchlist');

export const initialState: MarketDataState = {
  quotes: {},
  connectionStatus: 'disconnected',
  watchlist: saved ? JSON.parse(saved) : ['AAPL', 'MSFT', 'TSLA'],
  orderPanel: {
    open: false,
    symbol: null
  },
  portfolio: {
  positions: {},
  trades: [],
  cash: 100000, 
  realizedPL: 0
  }
};

export const marketDataReducer = createReducer(
  initialState,

  on(MarketActions.connectMarketData, state => ({
    ...state,
    connectionStatus: 'connecting'
  })),

  on(MarketActions.marketConnectionSuccess, state => ({
    ...state,
    connectionStatus: 'connected'
  })),

  on(MarketActions.marketConnectionError, (state, { error }) => ({
    ...state,
    connectionStatus: 'error'
  })),

  on(MarketActions.quoteReceived, (state, { quote }) => ({
    ...state,
    quotes: {
      ...state.quotes,
      [quote.symbol]: quote
    }
  })),

  on(MarketActions.addSymbolToWatchlist, (state, { symbol }) => ({
    ...state,
    watchlist: state.watchlist.includes(symbol)
      ? state.watchlist
      : [...state.watchlist, symbol]
  })),

  on(MarketActions.removeSymbolFromWatchlist, (state, { symbol }) => ({
    ...state,
    watchlist: state.watchlist.filter(s => s !== symbol)
  })),

  on(MarketActions.openOrderPanel, (state, { symbol }) => ({
    ...state,
    orderPanel: {
      open: true,
      symbol
    }
  })),

  on(MarketActions.closeOrderPanel, state => ({
    ...state,
    orderPanel: {
      open: false,
      symbol: null
    }
  })),

  on(MarketActions.submitOrder, (state, { order }) => {
    console.log('Order submitted:', order);
    return state;
  }),

  on(MarketActions.tradeApplied, (state, { trade, updatedPortfolio }) => ({
    ...state,
    portfolio: updatedPortfolio
  })),
);
