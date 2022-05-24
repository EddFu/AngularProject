import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//servicios
import { ProductsService } from "../../../services/products.service";

//model
import { Product } from "../../../models/product.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private productService : ProductsService,
    private route : ActivatedRoute
  ) { }

//para asincrono (peticiones)
  ngOnInit(): void {
    this.productService.getAllProducts()
    // this.productService.getProductsByPage(10, 0)
    //para obetener los productos utilizamos el observable
    .subscribe(data => {
    // console.log(data);
      this.products = data;
        this.offset += this.limit;
    });

    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

  //esto viene desde el output del products.component con el (emit)
  onLoadMore() {
  this.productService.getProductsByPage(this.limit, this.offset)
  //para obetener los productos utilizamos el observable
    .subscribe(data => {
    // console.log(data);
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }


}
