import { ConstantPool } from '@angular/compiler';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//services
import { AuthService } from "./services/auth.service";
import { UsersService } from "./services/users.service";
import { FilesService } from './services/files.service';
//Ambientes
import { environment } from "../environments/environment";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = "";
  showImg = true;
  imgRta= "";

  constructor(
    private AuthService: AuthService,
    private UsersService: UsersService,
    private fileService: FilesService,
    private http: HttpClient
  ) {

  }


  onLoaded(img: string) {
    console.log("log padre", img);
  }

  toggleImage() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.UsersService.create({
      name: "Maria",
      email: "maria@mail.com",
      password: "12345",
      role: "customer",
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  //descargar archivos de manera programatica
  downLoadPdf(){
    this.fileService.getFile("my pdf", "https://young-sands-07814.herokuapp.com/api/files/dummy.pdf", "aplication/pdf")
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file) {
      this.fileService.uploadFile(file)
      .subscribe(rta => {
      this.imgRta = rta.location;
      });
    }
  }
}
