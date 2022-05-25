import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private categoriesService: CategoriesService,
    //
    private router: Router
  ) { }

  ngOnInit(): void {
    //suscribimos al nav para que reciba los datos
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });

    this.getAllCategories();
    //vigilar el estado del login
    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
  }


  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet("maria@mail.com", "12345")
    // this.authService.loginAndGet("admin@mail.com", "admin123")
    .subscribe(user => {
      this.router.navigate(['/profile']);
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(data => {
      this.categories = data;
    })
  }

  logOut() {
    this.authService.logOut();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
