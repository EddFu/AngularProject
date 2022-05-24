import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
//se trae el HTTP_INTERCEPTORS para el uso de interceptores
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightDirective } from './directives/highlight.directive';
import { TimeInterceptor } from './interceptors/time.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
