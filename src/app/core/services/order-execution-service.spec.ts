import { TestBed } from '@angular/core/testing';

import { OrderExecutionService } from './order-execution-service';

describe('OrderExecutionService', () => {
  let service: OrderExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
