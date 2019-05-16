import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationonPage } from './locationon.page';

describe('LocationonPage', () => {
  let component: LocationonPage;
  let fixture: ComponentFixture<LocationonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
