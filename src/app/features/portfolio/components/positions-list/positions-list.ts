import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { selectPositions, selectQuotes } from '../../../../state/market-data/market-data.selectors';
import { Position, Quote } from '../../../../state/market-data/market-data.models';

interface EnrichedPosition extends Position {
  currentPrice: number;
  unrealized: number;
}

@Component({
  selector: 'app-positions-list',
  standalone: false,
  templateUrl: './positions-list.html',
  styleUrl: './positions-list.scss',
})
export class PositionsList {

  positions$!: Observable<EnrichedPosition[]>;

  constructor(private store: Store) {
    this.positions$ = combineLatest([
      this.store.select(selectPositions),
      this.store.select(selectQuotes)
    ]).pipe(
      map(([positions, quotes]: [Position[], { [symbol: string]: Quote }]) =>
        positions.map(pos => {
          const quote = quotes[pos.symbol];
          const currentPrice = quote?.last ?? pos.avgPrice;
          const unrealized = (currentPrice - pos.avgPrice) * pos.qty;

          return {
            ...pos,
            currentPrice,
            unrealized
          };
        })
      )
    );
  }
}
