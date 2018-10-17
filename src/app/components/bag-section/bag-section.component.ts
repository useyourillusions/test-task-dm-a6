import { Component, OnInit, OnDestroy } from '@angular/core';
import { BagService } from '../../services/bag/bag.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bag-section',
  templateUrl: './bag-section.component.html'
})
export class BagSectionComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();
  orderTotalInfo;

  constructor(
    private bagService: BagService
  ) {}

  ngOnInit() {
    this.bagService.productsInBagObs
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(this.reduceProducts.bind(this));
  }

  reduceProducts(res) {
    this.orderTotalInfo = res.reduce(
      this.calculateTotalPrices.bind(this),
      {
        total: 0,
        subtotal: 0,
        gst: 0
      });
  }

  calculateTotalPrices(totalPrices: {total: number, subtotal: number, gst: number}, product) {
    const productPrice = product.product.productPrice * product.quantity;

    totalPrices.subtotal += productPrice;
    totalPrices.gst += (productPrice * 0.05);
    totalPrices.gst = Number(totalPrices.gst.toFixed(2));
    totalPrices.total = totalPrices.subtotal + totalPrices.gst;
    return totalPrices;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
