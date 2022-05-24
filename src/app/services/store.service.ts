import { Injectable } from '@angular/core';
//libreria para los observables en angular (forms,http...)
import { BehaviorSubject } from 'rxjs';

import { Product } from "../models/product.model";

//decorador que sirve para inyectarse
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //array para guardar la lista del usuario (debe ser privado)
  private myShopppingCart: Product[] = [];

  //                                                 //
  //para el carrito de compras objetos agregados a este
  private myCart = new BehaviorSubject<Product[]>([]);

  //observable
  myCart$ = this.myCart.asObservable();
  //                                                //

  constructor() { }

  addProduct(product: Product) {
    this.myShopppingCart.push(product);
    // para notificar al observable que se agregaron productos
    this.myCart.next(this.myShopppingCart);
  };

  getShoppingCart() {
    return this.myShopppingCart;
  }

  getTotal() {
    return this.myShopppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
