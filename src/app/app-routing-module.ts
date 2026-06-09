import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Shell } from './core/layout/shell/shell';
import { MainDashboard } from './features/dashboard/pages/main-dashboard/main-dashboard';
import { OrdersHome } from './features/orders/pages/orders-home/orders-home';
import { PortfolioHome } from './features/portfolio/pages/portfolio-home/portfolio-home';
import { SettingsHome } from './features/settings/pages/settings-home/settings-home';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MainDashboard },
  { path: 'orders', component: OrdersHome },
  { path: 'portfolio', component: PortfolioHome },
  { path: 'settings', component: SettingsHome },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
