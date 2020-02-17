import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerSelectorItemComponent } from './layer-selector-item.component';

describe('LayerSelectorItemComponent', () => {
  let component: LayerSelectorItemComponent;
  let fixture: ComponentFixture<LayerSelectorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerSelectorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerSelectorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
