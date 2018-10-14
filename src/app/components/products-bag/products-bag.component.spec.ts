import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBagComponent } from './products-bag.component';

describe('ProductsBagComponent', () => {
  let component: ProductsBagComponent;
  let fixture: ComponentFixture<ProductsBagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsBagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
