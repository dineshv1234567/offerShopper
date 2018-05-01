import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterFrontpageComponent } from './login-register-frontpage.component';

describe('LoginRegisterFrontpageComponent', () => {
  let component: LoginRegisterFrontpageComponent;
  let fixture: ComponentFixture<LoginRegisterFrontpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterFrontpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
