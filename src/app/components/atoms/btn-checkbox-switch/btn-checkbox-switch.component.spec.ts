import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCheckboxSwitchComponent } from './btn-checkbox-switch.component';

describe('BtnCheckboxSwitchComponent', () => {
  let component: BtnCheckboxSwitchComponent;
  let fixture: ComponentFixture<BtnCheckboxSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnCheckboxSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCheckboxSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
