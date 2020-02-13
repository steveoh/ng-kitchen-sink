import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalWrapperComponent } from './conditional-wrapper.component';

describe('ConditionalWrapperComponent', () => {
  let component: ConditionalWrapperComponent;
  let fixture: ComponentFixture<ConditionalWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionalWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
