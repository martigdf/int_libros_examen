import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyrequeListPage } from './myreque-list.page';

describe('MyrequeListPage', () => {
  let component: MyrequeListPage;
  let fixture: ComponentFixture<MyrequeListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyrequeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
