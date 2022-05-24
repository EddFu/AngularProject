import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';

const CHECK_TIME = new HttpContextToken<boolean>(() => false);

export function checkTime() {
  return new HttpContext().set(CHECK_TIME, true)
}

//nos permite correr un proceso sin modificar la respuesta que devuelva el observable
import { tap } from 'rxjs/operators';

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHECK_TIME)) {
      //para verificar el tiempo que demora
      const start = performance.now();
      return next
      .handle(request)
      .pipe(
        //implementamos el tap
        tap(() => {
          const time = (performance.now() - start) + "ms";
          console.log(request.url, time);
        })
      );
    }
    return next.handle(request);
  }
}
