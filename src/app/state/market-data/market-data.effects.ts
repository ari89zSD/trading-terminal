import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MarketActions from './market-data.actions';
import { map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { MarketDataService } from './market-data-service';
import { Store } from '@ngrx/store';
import { selectQuotes, selectPortfolio } from './market-data.selectors';
import { OrderExecutionService } from '../../core/services/order-execution-service';
import { PortfolioService } from '../../core/services/portfolio-service';

@Injectable()
export class MarketDataEffects {
  connect$: any;
  watchlistChanges$: any;
  executeOrder$: any;

  constructor(
    private actions$: Actions,
    private marketDataService: MarketDataService,
    private store: Store,
    private orderExecution: OrderExecutionService,
    private portfolioService: PortfolioService
  ) {

    this.connect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(MarketActions.connectMarketData),
        switchMap(() =>
          this.marketDataService.connect().pipe(
            map(quote => MarketActions.quoteReceived({ quote }))
          )
        )
      )
    );

    this.watchlistChanges$ = createEffect(() =>
      this.actions$.pipe(
        ofType(MarketActions.addSymbolToWatchlist),
        tap(({ symbol }) => {
          console.log('Subscribing to symbol:', symbol);
        })
      ),
      { dispatch: false }
    );

    this.executeOrder$ = createEffect(() =>
      this.actions$.pipe(
        ofType(MarketActions.submitOrder),
        withLatestFrom(
          this.store.select(selectQuotes),
          this.store.select(selectPortfolio)
        ),
        map(([{ order }, quotes, portfolio]) => {
          const trade = this.orderExecution.simulateExecution(order, quotes);

          if (!trade) {
            return MarketActions.executeOrder({ order });
          }

          const updatedPortfolio =
            this.portfolioService.applyTrade(portfolio, trade);

          return MarketActions.tradeApplied({
            trade,
            updatedPortfolio
          });
        })
      )
    );
  }
}
