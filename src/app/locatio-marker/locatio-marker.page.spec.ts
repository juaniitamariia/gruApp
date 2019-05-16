import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocatioMarkerPage } from './locatio-marker.page';

describe('LocatioMarkerPage', () => {
  let component: LocatioMarkerPage;
  let fixture: ComponentFixture<LocatioMarkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocatioMarkerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocatioMarkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
