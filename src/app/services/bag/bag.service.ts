import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Product from '../../interfaces/product.interface';
import ProductInBag from '../../interfaces/product-in-bag.interface';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  productsQty = 0;
  productsInBag: ProductInBag[] = [];

  private productsQtySource = new BehaviorSubject<number>(this.productsQty);
  private productsInBagSource = new BehaviorSubject<ProductInBag[]>(this.productsInBag);
  productsQtyObs = this.productsQtySource.asObservable();
  productsInBagObs = this.productsInBagSource.asObservable();

  addProduct(product: Product): void {
    let isAlreadyIn = false;

    if (this.productsInBag.length) {
      for (let i = 0; i < this.productsInBag.length; i++) {
        if (this.productsInBag[i].product.productId === product.productId) {
          this.productsInBag[i].quantity++;
          isAlreadyIn = true;
          break;
        }
      }
    }

    if (!isAlreadyIn) {
      this.productsInBag.push({
        product,
        quantity: 1
      });
    }

    this.sendData(true);
  }

  removeProduct(id): void {
    let idToDelete;

    for (let i = 0; i < this.productsInBag.length; i++) {
      if (this.productsInBag[i].product.productId === id) {
        if (this.productsInBag[i].quantity > 1) {
          this.productsInBag[i].quantity--;
        } else {
          idToDelete = i;
        }
        break;
      }
    }

    if (idToDelete !== undefined) {
      this.productsInBag.splice(idToDelete, 1);
    }

    this.sendData();
  }

  sendData(isAdding?): void {
    const productsInBagClone = this.productsInBag.slice();

    isAdding ? this.productsQty++ : this.productsQty--;
    this.productsInBagSource.next(productsInBagClone);
    this.productsQtySource.next(this.productsQty);
  }
}
