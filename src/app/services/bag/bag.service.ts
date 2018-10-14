import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Product from '../../interfaces/product.interface';
import ProductInBag from '../../interfaces/product-in-bag.interface';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  productsQty = 0;
  productsInBag: Array<ProductInBag> = [];

  private productsQtySource = new BehaviorSubject<number>(this.productsQty);
  private productsInBagSource = new BehaviorSubject<Array<ProductInBag>>(this.productsInBag);
  productsQtyObs = this.productsQtySource.asObservable();
  productsInBagObs = this.productsInBagSource.asObservable();

  addProduct(product: Product) {
    let isAlreadyIn = false,
      productsInBagClone;

    if (this.productsInBag.length) {
      for (let i = 0; i < this.productsInBag.length; i++) {
        if (this.productsInBag[i].product['productId'] === product['productId']) {
          this.productsInBag[i].quantity++;
          isAlreadyIn = true;
          break;
        }
      }
    }

    !isAlreadyIn && this.productsInBag.push({
      product,
      quantity: 1
    });

    productsInBagClone = this.productsInBag.slice();
    this.productsQty++;
    this.productsInBagSource.next(productsInBagClone);
    this.productsQtySource.next(this.productsQty);
  }

  removeProduct(id) {
    let idToDelete,
      productsInBagClone;

    for (let i = 0; i < this.productsInBag.length; i++) {
      if (this.productsInBag[i].product['productId'] === id) {
        if (this.productsInBag[i].quantity > 1) {
          this.productsInBag[i].quantity--;
        } else {
          idToDelete = i;
        }
        break;
      }
    }

    idToDelete !== undefined && this.productsInBag.splice(idToDelete, 1);

    productsInBagClone = this.productsInBag.slice();
    this.productsQty--;
    this.productsInBagSource.next(productsInBagClone);
    this.productsQtySource.next(this.productsQty);
  }
}
