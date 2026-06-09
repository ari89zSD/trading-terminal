import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { Header } from './core/layout/header/header';
import { Sidebar } from './core/layout/sidebar/sidebar';
import { Shell } from './core/layout/shell/shell';
import { MainDashboard } from './features/dashboard/pages/main-dashboard/main-dashboard';
import { OrdersHome } from './features/orders/pages/orders-home/orders-home';
import { PortfolioHome } from './features/portfolio/pages/portfolio-home/portfolio-home';
import { SettingsHome } from './features/settings/pages/settings-home/settings-home';
import { marketDataReducer } from './state/market-data/market-data.reducer';
import { MarketDataEffects } from './state/market-data/market-data.effects';
import { QuoteList } from './features/dashboard/components/quote-list/quote-list';
import { OrderPanel } from './core/layout/order-panel/order-panel/order-panel';
import { TradeList } from './features/portfolio/components/trade-list/trade-list';
import { PositionsList } from './features/portfolio/components/positions-list/positions-list';
import { PortfolioSummary } from './features/portfolio/components/portfolio-summary/portfolio-summary';

@NgModule({
  declarations: [
    AppComponent,
    Header,
    Sidebar,
    Shell,
    MainDashboard,
    OrdersHome,
    PortfolioHome,
    SettingsHome,
    QuoteList,
    OrderPanel,
    TradeList,
    PositionsList,
    PortfolioSummary
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    AppRoutingModule,
    StoreModule.forRoot({}, { metaReducers: [watchlistStorageMetaReducer] }),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('marketData', marketDataReducer),
    EffectsModule.forFeature([MarketDataEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function watchlistStorageMetaReducer(reducer: any) {
  return function(state: any, action: any) {
    const nextState = reducer(state, action);

    if (nextState?.marketData?.watchlist) {
      localStorage.setItem('watchlist', JSON.stringify(nextState.marketData.watchlist));
    }

    return nextState;
  };
}

