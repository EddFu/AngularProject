import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

//para el routing
import { ActivatedRoute } from '@angular/router';

//servicios
import { ProductsService } from "../../../services/products.service"

//modelos
import { Product } from "../../../models/product.model"

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        //"id" viene desde el app-routing.module
        this.categoryId = params.get("id");
          if (this.categoryId) {
            return this.productService
            .getByCategory(this.categoryId, this.limit, this.offset)
        }
        return [];
      })
    )
    .subscribe(data => {
      this.products = data;
    });
  }
};



