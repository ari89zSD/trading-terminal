import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsList } from './positions-list';

describe('PositionsList', () => {
  let component: PositionsList;
  let fixture: ComponentFixture<PositionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
