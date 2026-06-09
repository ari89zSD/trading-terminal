import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as MarketActions from '../../../../state/market-data/market-data.actions';
import { selectOrderPanel } from '../../../../state/market-data/market-data.selectors';
import { Observable } from 'rxjs';
import { OrderPanelState } from '../../../../state/market-data/market-data.models';

@Component({
  selector: 'app-order-panel',
  standalone: false,
  templateUrl: './order-panel.html',
  styleUrl: './order-panel.scss',
})
export class OrderPanel {

  panel$: Observable<OrderPanelState>;

  // UI state (local)
  side: 'BUY' | 'SELL' = 'BUY';
  orderType: 'MARKET' | 'LIMIT' = 'MARKET';
  qty: number = 1;
  limitPrice: number | null = null;

  constructor(private store: Store) {
    this.panel$ = this.store.select(selectOrderPanel);
  }

  submit(symbol: string | null) {
    if (!symbol) return;

    const order = {
      symbol,
      side: this.side,
      qty: this.qty,
      type: this.orderType,
      limitPrice: this.orderType === 'LIMIT' ? this.limitPrice : null,
      timestamp: Date.now()
    };

    this.store.dispatch(MarketActions.submitOrder({ order }));
  }

  close() {
    this.store.dispatch(MarketActions.closeOrderPanel());
  }
}
