import { Component, EventEmitter, Input, Output } from '@angular/core';
//para callbacks
import { switchMap } from 'rxjs/operators';

//product model
import { Product, CreateProductDTO, UpdateProductDTO } from "../../../models/product.model";


//servicios
import { StoreService } from "../../../services/store.service"
import { ProductsService } from "../../../services/products.service"

//librerias

import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

    //array para guardar la lista del usuario
    myShopppingCart: Product[] = [];

    //var para total de los productos en cuanto a precio
    total = 0;


    @Input() products: Product[] = [];
    // @Input() productId: string | null = null;
    @Input() set productId(id: string | null) {
      if (id) {
        this.onShowDetail(id);
      }
    }
    @Output() loadMore = new EventEmitter();


    //para el aside
    showProductDetail = false;
    productChosen: Product = {
      id: "",
      title: "",
      price: 0,
      images: [],
      description:"",
      category: {
      id: "",
      name: "",
      }
    }

    //para manejo
    statusDetail: "loading" | "success" | "error" | "init" = "init";


    //pipe de fecha

    today = new Date();
    date = new Date(2022, 4, 18);

    //inyeccion de dependencias (para el servicio)
  constructor(
    private storeService : StoreService,
    private productService : ProductsService
  ) {
    //se puede llamar de manera instantanea al no ser asincrono
    this.myShopppingCart = this.storeService.getShoppingCart();
   }


  //añadido al carrito
  addToShopppingCart(product: Product) {
  //logica para agregar los productos al array de carrito viene desde el service
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

    //para el aside
  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  //evento del aside luego de recibir el id del producto
  //evento de errores con la libreria de swal
  onShowDetail(id: string) {
    this.statusDetail = "loading";
    if (!this.showProductDetail) {
      this.showProductDetail = true;
    }
    this.productService.getProduct(id)
    .subscribe({
      next: (data) => {
        this.productChosen = data;
        this.statusDetail = "success";
      },
      error: () => {
        this.statusDetail = "error";
        Swal.fire({
          title: "Error!",
          text: "ups este articulo no existe",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "Green",
        });
      }
    });
  }

  //para evitar callback hell (creamos el metodo)

  readAndUpdate(id: string) {

    this.productService.getProduct(id)
    //luego de importar el switchmap esto cuando dependan una respuesta de la otra
    .pipe(
      switchMap((product) =>
        this.productService.update(product.id, {title: "change"})),
      switchMap((product) =>
        this.productService.update(product.id, {title: "change2"})),
    )
    .subscribe(data => {
      console.log(data)
    });
    //con zip para ejecutar dos respuestas a la vez traido desde product service
    this.productService.fetchReadAndUpdate(id, {title: "change2"})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  //funcion para crear un nuevo producto
  createNewProduct(){
    const product: CreateProductDTO = {
      title: "Peter nft",
      description: "Nft de peter parker",
      images: ["../../../assets/peter.png"],
      price: 1000,
      categoryId: 2,
    }
    this.productService.create(product)
    .subscribe(data => {
      // console.log("created", data);
      this.products.unshift(data)
    })

  }

  //funcion para editar productos
  updateProduct() {
    const changes: UpdateProductDTO = {
      title: "Aqui va un nuevo titulo",
    }
    const id = this.productChosen.id;
    this.productService.update(id, changes)
    .subscribe(data => {
      // console.log("updated", data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
      this.showProductDetail = false;
    });
  }
  //funcion para eliminar productos
  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  //logica del output
  onLoadMore() {
    this.loadMore.emit();
  }
}
