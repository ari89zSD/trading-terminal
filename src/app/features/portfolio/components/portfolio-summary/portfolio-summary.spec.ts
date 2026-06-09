import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSummary } from './portfolio-summary';

describe('PortfolioSummary', () => {
  let component: PortfolioSummary;
  let fixture: ComponentFixture<PortfolioSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
