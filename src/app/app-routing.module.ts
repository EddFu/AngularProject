import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

import { CustomPreloadService } from './services/custom-preload.service';

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
    preloadingStrategy: CustomPreloadService
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
