import { Component, OnInit, Input } from '@angular/core';
import { BagService } from "../../services/bag/bag.service";

@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html'
})
export class ProductsCatalogComponent implements OnInit {

  constructor(
    private bagService: BagService
  ) {}

  @Input() products;

  ngOnInit() {
    console.log(this.products);
  }

  addToBag(product) {
    const productClone = Object.assign({}, product);

    this.bagService.addProduct(productClone);
  }
}
