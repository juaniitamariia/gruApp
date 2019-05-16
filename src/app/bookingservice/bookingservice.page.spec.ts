import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingservicePage } from './bookingservice.page';

describe('BookingservicePage', () => {
  let component: BookingservicePage;
  let fixture: ComponentFixture<BookingservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingservicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
