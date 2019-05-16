import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassInputPage } from './pass-input.page';

describe('PassInputPage', () => {
  let component: PassInputPage;
  let fixture: ComponentFixture<PassInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassInputPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
