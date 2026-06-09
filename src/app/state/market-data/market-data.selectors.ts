import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MarketDataState, OrderPanelState } from './market-data.models';

export const selectMarketDataState =
  createFeatureSelector<MarketDataState>('marketData');

export const selectConnectionStatus = createSelector(
  selectMarketDataState,
  state => state.connectionStatus
);

export const selectQuotes = createSelector(
  selectMarketDataState,
  state => state.quotes
);

export const selectQuoteForSymbol = (symbol: string) =>
  createSelector(selectQuotes, quotes => quotes[symbol]);

export const selectWatchlist = createSelector(
  selectMarketDataState,
  state => state.watchlist
);

export const selectOrderPanel = createSelector(
  selectMarketDataState,
  (state): OrderPanelState => state.orderPanel
);

export const selectTrades = createSelector(
  selectMarketDataState,
  state => state.portfolio.trades
);

export const selectPortfolio = createSelector(
  selectMarketDataState,
  state => state.portfolio
);

export const selectPositions = createSelector(
  selectPortfolio,
  portfolio => Object.values(portfolio.positions)
);

export const selectPortfolioSummary = createSelector(
  selectPortfolio,
  selectQuotes,
  (portfolio, quotes) => {
    let unrealized = 0;
    let marketValue = 0;

    for (const pos of Object.values(portfolio.positions)) {
      const quote = quotes[pos.symbol];
      const current = quote?.last ?? pos.avgPrice;

      unrealized += (current - pos.avgPrice) * pos.qty;
      marketValue += current * pos.qty;
    }

    const totalValue = portfolio.cash + marketValue;

    return {
      cash: portfolio.cash,
      realizedPL: portfolio.realizedPL,
      unrealizedPL: unrealized,
      totalValue,
      marketValue
    };
  }
);
