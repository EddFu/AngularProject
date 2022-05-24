import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { eventNames } from 'process';

import { Product } from "../../../models/product.model";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent
// implements OnInit
{

  @Input() product: Product = {
    id: "",
    title: "",
    price: 0,
    images: [],
    description:"",
    category: {
      id: "",
      name: "",
    }
  };
  //evento para añadir el producto al carrito
  @Output() addedProduct = new EventEmitter<Product>();
  //evento para el aside del producto
  @Output() showProduct = new EventEmitter<string>();

  constructor() { }


  addToCart(){
    //logica para que se emita y añada el producto
    this.addedProduct.emit(this.product);
  }

  //para añadir aside de cada producto
  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }

}
