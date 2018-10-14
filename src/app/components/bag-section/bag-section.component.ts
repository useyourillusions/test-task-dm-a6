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
  orderTotal;

  constructor(
    private bagService: BagService
  ) {}

  ngOnInit() {
    this.bagService.productsInBagObs
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        res => {
          this.orderTotal = res.reduce((o, el) => {
            const productPrice = el['product']['productPrice'] * el['quantity'];

            o['subtotal'] += productPrice;
            o['gst'] += productPrice * 0.05;
            o['total'] = o['subtotal'] + o['gst'];

            return o;
          }, {
            total: 0,
            subtotal: 0,
            gst: 0
          });

          console.log(this.orderTotal);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
