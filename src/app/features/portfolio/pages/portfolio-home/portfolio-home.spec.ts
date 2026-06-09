import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioHome } from './portfolio-home';

describe('PortfolioHome', () => {
  let component: PortfolioHome;
  let fixture: ComponentFixture<PortfolioHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
