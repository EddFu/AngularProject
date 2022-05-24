import { Component, OnInit } from '@angular/core';

//services
import { StoreService } from "../../../services/store.service";
import { AuthService } from "../../../services/auth.service";
import { User } from 'src/app/models/user.model';
import { CategoriesService } from '../../../services/categories.service';

// //models
import { Category } from "../../../models/product.model"

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile : User | null = null;
  categories: Category[] = [];

  constructor(
    //importamos el servicio del observable
    private storeService: StoreService,
    //para login de la cuenta
    private authService: AuthService,
    //para render de categorias
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    //suscribimos al nav para que reciba los datos
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });

    this.getAllCategories();
  }


  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet("eduardofu@mail.com", "eduardo")
    .subscribe(user => {
      this.profile = user;
      // console.log(rta.access_token);
      // this.getProfile();
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }

}
