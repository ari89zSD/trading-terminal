import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { connectMarketData } from '../../../../state/market-data/market-data.actions';
import { selectWatchlist } from '../../../../state/market-data/market-data.selectors';
import * as MarketActions from '../../../../state/market-data/market-data.actions';

@Component({
  selector: 'app-main-dashboard',
  standalone: false,
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.scss',
})
export class MainDashboard implements OnInit {

  watchlist$: any;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(connectMarketData());
    this.watchlist$ = this.store.select(selectWatchlist);
  }

  addSymbol(symbol: string) {
    if (!symbol) return;
    this.store.dispatch(MarketActions.addSymbolToWatchlist({ symbol: symbol.toUpperCase() }));
  }

  removeSymbol(symbol: string) {
    this.store.dispatch(MarketActions.removeSymbolFromWatchlist({ symbol }));
  }
}
