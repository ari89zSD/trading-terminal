import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTrades } from '../../../../state/market-data/market-data.selectors';
import { Observable } from 'rxjs';
import { Trade } from '../../../../state/market-data/market-data.models';

@Component({
  selector: 'app-trade-list',
  standalone: false,
  templateUrl: './trade-list.html',
  styleUrl: './trade-list.scss',
})
export class TradeList {
  trades$: Observable<Trade[]>;

  constructor(private store: Store) {
    this.trades$ = this.store.select(selectTrades);
  }
}
