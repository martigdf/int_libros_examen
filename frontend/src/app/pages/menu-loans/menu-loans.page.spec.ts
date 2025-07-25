import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuLoansPage } from './menu-loans.page';

describe('MenuLoansPage', () => {
  let component: MenuLoansPage;
  let fixture: ComponentFixture<MenuLoansPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLoansPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
