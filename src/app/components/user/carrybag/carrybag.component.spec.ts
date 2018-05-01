import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrybagComponent } from './carrybag.component';

describe('CarrybagOfferComponent', () => {
  let component: CarrybagComponent;
  let fixture: ComponentFixture<CarrybagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrybagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrybagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
