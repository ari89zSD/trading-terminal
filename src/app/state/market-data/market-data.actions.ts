import { createAction, props } from '@ngrx/store';
import { Order, PortfolioState, Quote, Trade } from './market-data.models';

export const connectMarketData = createAction('[Market] Connect');
export const disconnectMarketData = createAction('[Market] Disconnect');

export const marketConnectionSuccess = createAction('[Market] Connection Success');
export const marketConnectionError = createAction('[Market] Connection Error', props<{ error: any }>());

export const quoteReceived = createAction('[Market] Quote Received', props<{ quote: Quote }>());

export const addSymbolToWatchlist = createAction(
  '[Market] Add Symbol To Watchlist',
  props<{ symbol: string }>()
);

export const removeSymbolFromWatchlist = createAction(
  '[Market] Remove Symbol From Watchlist',
  props<{ symbol: string }>()
);

export const openOrderPanel = createAction(
  '[Order] Open Order Panel',
  props<{ symbol: string }>()
);

export const closeOrderPanel = createAction('[Order] Close Order Panel');

export const submitOrder = createAction(
  '[Order] Submit Order',
  props<{ order: any }>()
);

export const executeOrder = createAction(
  '[Order] Execute Order',
  props<{ order: Order }>()
);

export const recordTrade = createAction(
  '[Order] Record Trade',
  props<{ trade: Trade }>()
);

export const tradeApplied = createAction(
  '[Market] Trade Applied',
  props<{ trade: Trade; updatedPortfolio: PortfolioState }>()
);


