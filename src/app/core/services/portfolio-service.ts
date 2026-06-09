import { Injectable } from '@angular/core';
import { PortfolioState, Trade } from '../../state/market-data/market-data.models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {

  applyTrade(portfolio: PortfolioState, trade: Trade): PortfolioState {
    const positions = { ...portfolio.positions };
    const existing = positions[trade.symbol];

    let cash = portfolio.cash;
    let realizedPL = portfolio.realizedPL;

    if (trade.side === 'BUY') {
      cash -= trade.qty * trade.price;
    }

    if (trade.side === 'SELL') {
      cash += trade.qty * trade.price;

      if (existing) {
        const pl = (trade.price - existing.avgPrice) * trade.qty;
        realizedPL += pl;
      }
    }

    if (!existing) {
      positions[trade.symbol] = {
        symbol: trade.symbol,
        qty: trade.side === 'BUY' ? trade.qty : -trade.qty,
        avgPrice: trade.price
      };
    } else {
      const newQty =
        trade.side === 'BUY'
          ? existing.qty + trade.qty
          : existing.qty - trade.qty;

      const newAvg =
        trade.side === 'BUY'
          ? (existing.avgPrice * existing.qty + trade.price * trade.qty) /
            (existing.qty + trade.qty)
          : existing.avgPrice;

      positions[trade.symbol] = {
        symbol: trade.symbol,
        qty: newQty,
        avgPrice: newAvg
      };
    }

    return {
      ...portfolio,
      positions,
      trades: [...portfolio.trades, trade],
      cash,
      realizedPL
    };
  }
}
