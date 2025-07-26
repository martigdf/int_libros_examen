import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewBooksPage } from './view-books.page';

describe('ViewBooksPage', () => {
  let component: ViewBooksPage;
  let fixture: ComponentFixture<ViewBooksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
