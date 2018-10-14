import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagSectionComponent } from './bag-section.component';

describe('BagSectionComponent', () => {
  let component: BagSectionComponent;
  let fixture: ComponentFixture<BagSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
