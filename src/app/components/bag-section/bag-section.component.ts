import { Component, OnInit, OnDestroy } from '@angular/core';
import { BagService } from '../../services/bag/bag.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import OrderPrice from '../../interfaces/order-price.interface';

@Component({
  selector: 'app-bag-section',
  templateUrl: './bag-section.component.html'
})
export class BagSectionComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();
  orderPriceInfo: OrderPrice = {
    total: 0,
    subtotal: 0,
    gst: 0
  };
  gstTax = 0.05;

  constructor(
    private bagService: BagService
  ) {}

  ngOnInit() {
    this.bagService.productsInBagObs
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(this.reduceProducts.bind(this));
  }

  reduceProducts(res): void {
    if (!res) {
      return;
    }

    this.orderPriceInfo = res.reduce(
      this.calculateOrderPrice.bind(this),
      {
        total: 0,
        subtotal: 0,
        gst: 0
      });
  }

  calculateOrderPrice(orderPrice: OrderPrice, product): OrderPrice {
    const productPrice = product.product.productPrice * product.quantity;

    orderPrice.subtotal += productPrice;
    orderPrice.gst += (productPrice * this.gstTax);
    orderPrice.gst = Number(orderPrice.gst.toFixed(2));
    orderPrice.total = orderPrice.subtotal + orderPrice.gst;

    return orderPrice;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
