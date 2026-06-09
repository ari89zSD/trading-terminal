import { Injectable } from '@angular/core';
import { Order, Quote, Trade } from '../../state/market-data/market-data.models';

@Injectable({ providedIn: 'root' })
export class OrderExecutionService {

  simulateExecution(order: Order, quotes: { [symbol: string]: Quote }): Trade | null {
    const quote = quotes[order.symbol];
    if (!quote) return null;

    let fillPrice = quote.last;

    if (order.type === 'LIMIT') {
      if (order.side === 'BUY' && order.limitPrice! >= quote.ask) {
        fillPrice = order.limitPrice!;
      } else if (order.side === 'SELL' && order.limitPrice! <= quote.bid) {
        fillPrice = order.limitPrice!;
      } else {
        return null;
      }
    }

    return {
      id: crypto.randomUUID(),
      orderId: order.id,
      symbol: order.symbol,
      side: order.side,
      qty: order.qty,
      price: fillPrice,
      timestamp: Date.now()
    };
  }
}
