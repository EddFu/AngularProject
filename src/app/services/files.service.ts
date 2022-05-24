import { Injectable } from '@angular/core';
//para el servicio
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';
//Ambientes
import { environment } from "../../environments/environment";

interface File {
  originalname: string;
  filename: string;
  location: string
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url:string, type: string) {
    //peticion
    return this.http.get(url, {responseType: "blob"})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob){
    //formdata es nativo de html para este tipo de archivos
    const dto = new FormData();
    dto.append("file", file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto
    // , { esto dependiendo del backend
    //   headers: {
    //     "content-type": "multipart/form-data"
    //   }
    // }
    )}
}
