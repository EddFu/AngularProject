import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';

import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  //para el routing
  {
    path: "",
    component: LayoutComponent,
    children: [

      {
        //para redireccionar
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
      },

      {
        //dejando el path sin nada renderiza de manera automatica este componente
        // path: "",
        path: "home",
        component: HomeComponent
      },

      {
        //se pone el /:id para indicarle que se recibira un parametro por url
        path: "category",
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data: {
          preload: true,
        }
      },

      {
        //se pone el /:id para indicarle que se recibira un parametro por url
        path: "product/:id",
        component: ProductDetailComponent
      },

      {
        path: "my-cart",
        component: MyCartComponent
      },

      {
        path: "login",
        component: LoginComponent
      },

      {
        path: "register",
        component: RegisterComponent
      },

      {
        path: "recovery",
        component: RecoveryComponent
      },

      {
        path: "profile",
        component: ProfileComponent
      },

    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
