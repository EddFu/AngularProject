import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [

  //nuevo website
  {
    path: "",
    loadChildren: () => import("./website/website.module").then(m => m.WebsiteModule)
  },

  //modulo cms
  {
    path: "cms",
    loadChildren: () => import("./cms/cms.module").then(m => m.CmsModule)
  },

  {
    path: "**",
    component: NotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //para cargar todos los modulos luego de haber hecho el primer render
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
