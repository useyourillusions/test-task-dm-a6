import { Component, OnInit } from '@angular/core';
import { BagService } from "../../services/bag/bag.service";

@Component({
  selector: 'app-products-bag',
  templateUrl: './products-bag.component.html'
})
export class ProductsBagComponent implements OnInit {
  constructor(
    protected bagService: BagService
  ) {}

  ngOnInit() {
  }
}
