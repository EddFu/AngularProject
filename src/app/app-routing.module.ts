import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

import { CustomPreloadService } from './services/custom-preload.service';
//libreria para cargar los modulos con un observable
import  { QuicklinkStrategy } from 'ngx-quicklink'


const routes: Routes = [
  //nuevo website
  {
    path: "",
    loadChildren: () => import("./website/website.module").then(m => m.WebsiteModule),
    data: {
      preload: true,
    }
  },

  //modulo cms
  {
    path: "cms",
    loadChildren: () => import("./cms/cms.module").then(m => m.CmsModule)
  },

  {
    path: "**",
    component: NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: CustomPreloadService
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
