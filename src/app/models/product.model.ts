export interface Category {
  id: string;
  name: string
}

export interface Product {
  id: string;
  title:string;
  price:number;
  images: string [];
  description:string;
  category: Category;
  taxes?: number;
}

//el data transfer objet lo utilizamos para la creacion del nuevo producto (este sera el model que segura omitiendo algunos campos del original)

export interface CreateProductDTO extends Omit<Product, "id" | "category">{
  categoryId: number;
}

//el partial de typescript le añade el ? a todos los datos requeridos
export interface UpdateProductDTO extends Partial<CreateProductDTO>{}


