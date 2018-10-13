import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor() {}

  @Input() products;

  ngOnInit() {
    console.log(this.products);
  }

  addToBag(product) {
    console.log(product);
  }
}
