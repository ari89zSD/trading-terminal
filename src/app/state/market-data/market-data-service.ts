import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Quote } from './market-data.models';

@Injectable({ providedIn: 'root' })
export class MarketDataService {

  private symbols = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'AMZN'];

  // Initial prices
  private prices: Record<string, number> = {
    AAPL: 180,
    MSFT: 420,
    TSLA: 190,
    NVDA: 900,
    AMZN: 180
  };

  // Random walk generator
  private updatePrice(symbol: string): Quote {
    const last = this.prices[symbol];

    // Random walk step
    const change = (Math.random() - 0.5) * 2; // -1 to +1
    const newPrice = last + change;

    this.prices[symbol] = newPrice;

    return {
      symbol,
      last: parseFloat(newPrice.toFixed(2)),
      bid: parseFloat((newPrice - 0.05).toFixed(2)),
      ask: parseFloat((newPrice + 0.05).toFixed(2)),
      time: new Date().toISOString()
    };
  }

  // Stream of quotes
  connect(): Observable<Quote> {
    return interval(500).pipe(
      map(() => {
        const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
        return this.updatePrice(symbol);
      })
    );
  }
}
