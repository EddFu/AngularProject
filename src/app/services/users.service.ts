import { Injectable } from '@angular/core';

//necesario para este servicio

import { HttpClient } from '@angular/common/http';
//solo para desarrollo
import { environment } from 'src/environments/environment';
//model
import { CreateUserDTO, User } from "../models/user.model"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private apiUrl = "https://young-sands-07814.herokuapp.com/api/users";
  // para CORDS
  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(
    private http:HttpClient
  ) {  }

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
