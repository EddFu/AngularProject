import { Injectable } from '@angular/core';
//servicio de angular para hacer request
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { throwError, zip } from 'rxjs';
//reintentar peticiones
import { retry, catchError, map } from 'rxjs/operators';
//interceptor
import { checkTime } from '../interceptors/time.interceptor';
//Ambientes
import { environment } from "../../environments/environment";


//model
import { Product, CreateProductDTO, UpdateProductDTO  } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = "https://damp-spire-59848.herokuapp.com/api";
  // para CORDS
  // private apiUrl = `${environment.API_URL}/api`;

//para manejo
statusDetail: "loading" | "success" | "error" | "init" = "init";

  constructor(
    private http: HttpClient
  ) { }
  //clase GET
  getAllProducts(limit?: number, offset?: number) {
    //tipamos el get para que sea de tipo Product[] y traiga todos los productos
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set("limit", limit);
      params = params.set("offset", limit);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params,
      //para implementar el interceptador
      context: checkTime()})
    .pipe(
          map(products => products.map(item => {
            return {
              ...item,
              taxes: .10 * item.price
            }
          }))
    );
  }

  //para obtener los productos por categoria

  getByCategory (categoryId: string, limit?: number, offset?:number) {
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set("limit", limit);
      params = params.set("offset", limit);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, {params})
}
  fetchReadAndUpdate(id: string, changes: UpdateProductDTO) {
    //con zip para ejecutar dos respuestas a la vez
    return zip(
      this.getProduct(id),
      this.update(id, {title: "nuevo"})
    );//no se pone el suscribe por que aqui solo se maneja la logica
    // .subscribe(response => {
    //   const read = response[0];
    //   const update = response[1];
    // })
  }


  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    }

  //** PAGINACION **/
  //Url parameters/paginacion (renderizar productos por cada pagina)
  getProductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: { limit, offset }
    })
  }
  //clase POST
  //para crear un nuevo producto con POST
  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  //clase PATCH (enviar solo la informacion del dato que cambiamos) - PUT(enviar toda la informacion aunque se cambie solo 1 valor de lo que modificaremos)
  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  //clase DELETE (en el delete de pone boolean por que la API va a devolver esto y no un producto)
  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError('Algo esta fallando en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salio mal');
      })
    )
  }
}


