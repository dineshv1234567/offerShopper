import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeachResultsComponent } from './seach-results.component';

describe('SeachResultsComponent', () => {
  let component: SeachResultsComponent;
  let fixture: ComponentFixture<SeachResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeachResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeachResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
