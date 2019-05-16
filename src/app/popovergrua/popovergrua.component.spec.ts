import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopovergruaComponent } from './popovergrua.component';

describe('PopovergruaComponent', () => {
  let component: PopovergruaComponent;
  let fixture: ComponentFixture<PopovergruaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopovergruaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopovergruaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
