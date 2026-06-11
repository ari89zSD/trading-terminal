import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolChart } from './symbol-chart';

describe('SymbolChart', () => {
  let component: SymbolChart;
  let fixture: ComponentFixture<SymbolChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SymbolChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymbolChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
