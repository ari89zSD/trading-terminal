import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  connectMarketData,
  addSymbolToWatchlist,
  removeSymbolFromWatchlist
} from '../../../../state/market-data/market-data.actions';
import {
  selectWatchlist,
  selectQuoteForSymbol
} from '../../../../state/market-data/market-data.selectors';
import { Observable, map } from 'rxjs';
import { CandlestickData, Time } from 'lightweight-charts';

@Component({
  selector: 'app-main-dashboard',
  standalone: false,
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.scss'
})
export class MainDashboard implements OnInit {

  watchlist$!: Observable<string[]>;
  selectedSymbol: string | null = null;
  candles$!: Observable<CandlestickData<Time>[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(connectMarketData());
    this.watchlist$ = this.store.select(selectWatchlist);
  }

  addSymbol(symbol: string) {
    if (!symbol) return;
    this.store.dispatch(
      addSymbolToWatchlist({ symbol: symbol.toUpperCase() })
    );
  }

  removeSymbol(symbol: string) {
    this.store.dispatch(removeSymbolFromWatchlist({ symbol }));
  }

  selectSymbol(symbol: string) {
    this.selectedSymbol = symbol;

    this.candles$ = this.store.select(selectQuoteForSymbol(symbol)).pipe(
      map(quote => {
        if (!quote) return [];

        const now: Time = Math.floor(Date.now() / 1000) as Time;

        const candle: CandlestickData<Time> = {
          time: now,
          open: quote.last,
          high: quote.last * 1.01,
          low: quote.last * 0.99,
          close: quote.last
        };

        return [candle];
      })
    );
  }
}
