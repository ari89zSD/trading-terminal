import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersHome } from './orders-home';

describe('OrdersHome', () => {
  let component: OrdersHome;
  let fixture: ComponentFixture<OrdersHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
