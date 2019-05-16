import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumVerificationPage } from './num-verification.page';

describe('NumVerificationPage', () => {
  let component: NumVerificationPage;
  let fixture: ComponentFixture<NumVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumVerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
