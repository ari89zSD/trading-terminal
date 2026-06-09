import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPanel } from './order-panel';

describe('OrderPanel', () => {
  let component: OrderPanel;
  let fixture: ComponentFixture<OrderPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
