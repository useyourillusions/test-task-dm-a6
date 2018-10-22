import { Component, Input } from '@angular/core';
import { BagService } from '../../services/bag/bag.service';

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html'
})
export class ProductsCatalogComponent {

  @Input() products;
  isIconVisible;
  animationDuration = 300;

  constructor(
    private bagService: BagService
  ) {}

  addToBag(product): void {
    const productClone = Object.assign({}, product);

    this.bagService.addProduct(productClone);
    this.animateIconBag();
  }

  animateIconBag(): void {
    this.isIconVisible = true;

    setTimeout(() => {
      this.isIconVisible = false;
    }, this.animationDuration);
  }
}
