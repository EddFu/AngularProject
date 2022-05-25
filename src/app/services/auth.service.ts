import { Injectable } from '@angular/core';

//necesario para este servicio
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { switchMap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

//solo para desarrollo
// import { environment } from 'src/environments/environment';
//models
import { Auth } from "../models/auth.model";
import { User } from "../models/user.model";

//servicios
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://young-sands-07814.herokuapp.com/api/auth";
  // para CORDS
  // private apiUrl = `${environment.API_URL}/api/auth`;


  //para el usuario logeado
  private user = new BehaviorSubject<User | null>(null);

  //observable
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {  }

  login(email:string, password:string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      //esto guarda el token en localstorage
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => this.user.next(user))
    );
  }


  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe (
      switchMap(() => this.getProfile()),
    )
  }

  logOut() {
    this.tokenService.removeToken();
  }
}
