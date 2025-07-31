import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyreceivedListPage } from './myreceived-list.page';

describe('MyreceivedListPage', () => {
  let component: MyreceivedListPage;
  let fixture: ComponentFixture<MyreceivedListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyreceivedListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
