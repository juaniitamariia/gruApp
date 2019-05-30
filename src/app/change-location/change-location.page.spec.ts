import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLocationPage } from './change-location.page';

describe('ChangeLocationPage', () => {
  let component: ChangeLocationPage;
  let fixture: ComponentFixture<ChangeLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
