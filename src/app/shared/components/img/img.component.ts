import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  img: string = "";

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input("img")
    set changeImg(newImg: string) {
      this.img = newImg;
      // console.log("change just img =>", this.img);
    }

  //para la imagen si no se encuentra
  @Output() loaded = new EventEmitter<string>();
  imageDefault = "../../../assets/notfound.png"

  //contador
  // counter: number = 0;

  // counterFn: number | undefined;

  //ciclo de vida del componente y todos sus eventos
  constructor() {
    //antes del render
    //no correr peticiones o un fetch -- esto solo correra una vez
    // console.log("constructor", "imgValue =>", this.img);

   }

  // ngOnChanges(changes: SimpleChanges): void {
    //antes del render y durante
    //lee cambios en inputs - esto corre muchas veces (cade vez que actualicemos el input)
    // console.log("ngOnChanges", "imgValue =>", this.img);
    //para leer los cambios
    // console.log("changes" ,changes)
  // }

  // ngOnInit(): void {
    //antes del render
    //peticiones async - fetch - peticiones a API - una sola vez
    // console.log("ngOnInit", "imgValue =>", this.img);

  // this.counterFn = window.setInterval(() => {
  //     this.counter += 1;
  //     console.log("run counter");
  //   }, 1000);
  // }

  // ngAfterViewInit() {
    //despues de que todo se este renderizando
    //aqui se manejan o manipulan los hijos
    // console.log("ngAfterViewInit");
  // }

  // ngOnDestroy(){
    //este solo aparece cuando se elimina el componente
    // console.log("OnDestroy");
    //destuir el evento de intervalo del contador
    // window.clearInterval(this.counterFn);
  // }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    // console.log("log hijo");
    this.loaded.emit(this.img);
  }
}
