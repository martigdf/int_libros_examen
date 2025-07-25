import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoansRequePage } from './loans-reque.page';

describe('LoansRequePage', () => {
  let component: LoansRequePage;
  let fixture: ComponentFixture<LoansRequePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansRequePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
