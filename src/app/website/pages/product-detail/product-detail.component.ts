import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";

//modelos
import { Product } from "../../../models/product.model"

//servicios
import { ProductsService } from "../../../services/products.service"

//navegacion en ruta
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    //para obtener el id por un solo producto
    this.route.paramMap
    .pipe(
      switchMap(params => {
        //"id" viene desde el app-routing.module
        this.productId = params.get("id");
          if (this.productId) {
            return this.productService
            .getOne(this.productId);
        }
        return [null];
      })
    )
    .subscribe(data => {
      this.product = data;
    });
  }

  goToBack(){
    this.location.back();
  }
}
