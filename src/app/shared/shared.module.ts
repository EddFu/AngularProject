import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//para el router link y los params
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';

import { ProductoComponent } from './components/producto/producto.component';
import { ProductsComponent } from './components/products/products.component';
import { ImgComponent } from '../shared/components/img/img.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';


@NgModule({
  declarations: [
    ImgComponent,
    ProductoComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ImgComponent,
    ProductoComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
  ]
})
export class SharedModule { }
