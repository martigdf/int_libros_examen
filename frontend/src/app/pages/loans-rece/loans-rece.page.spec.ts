import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoansRecePage } from './loans-rece.page';

describe('LoansRecePage', () => {
  let component: LoansRecePage;
  let fixture: ComponentFixture<LoansRecePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansRecePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
