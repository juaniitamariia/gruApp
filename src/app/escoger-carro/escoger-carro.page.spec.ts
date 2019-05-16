import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscogerCarroPage } from './escoger-carro.page';

describe('EscogerCarroPage', () => {
  let component: EscogerCarroPage;
  let fixture: ComponentFixture<EscogerCarroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscogerCarroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscogerCarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
