import { Component } from '@angular/core';
import { selectPortfolioSummary } from '../../../../state/market-data/market-data.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio-summary',
  standalone: false,
  templateUrl: './portfolio-summary.html',
  styleUrl: './portfolio-summary.scss',
})
export class PortfolioSummary {
  summary$!: Observable<any>;

  constructor(private store: Store) {
    this.summary$ = this.store.select(selectPortfolioSummary);
  }
}
