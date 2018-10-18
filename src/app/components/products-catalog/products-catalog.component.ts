import { Component, Input } from '@angular/core';
import { BagService } from '../../services/bag/bag.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html'
})
export class ProductsCatalogComponent {

  @Input() products;

  constructor(
    private bagService: BagService
  ) {}

  addToBag(product): void {
    const productClone = Object.assign({}, product);

    this.bagService.addProduct(productClone);
  }
}
