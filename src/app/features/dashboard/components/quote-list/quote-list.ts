import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectQuotes } from '../../../../state/market-data/market-data.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Quote } from '../../../../state/market-data/market-data.models';
import * as MarketActions from '../../../../state/market-data/market-data.actions';

@Component({
  selector: 'app-quote-list',
  standalone: false,
  templateUrl: './quote-list.html',
  styleUrls: ['./quote-list.scss'],
})
export class QuoteList {

  displayedColumns = ['symbol', 'last', 'bidask', 'change', 'trade'];

  quotes$: Observable<Quote[]>;

  constructor(private store: Store) {
    this.quotes$ = this.store.select(selectQuotes).pipe(
      map(quotesObj => Object.values(quotesObj))
    );
  }

  getChange(quote: Quote) {
    const prev = quote.last - ((quote.ask - quote.bid) / 2);
    const abs = quote.last - prev;
    const pct = (abs / prev) * 100;

    return {
      abs: abs.toFixed(2),
      pct: pct.toFixed(2),
      positive: abs >= 0
    };
  }

  openTrade(symbol: string) {
    this.store.dispatch(MarketActions.openOrderPanel({ symbol }));
  }
}
