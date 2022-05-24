import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  //salvar en localstorage
  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  //obtener el token
  getToken(){
    const token = localStorage.getItem("token");
    return token;
  }

}

