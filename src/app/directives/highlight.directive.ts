//ElementRef es para modificar el doom
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostListener("mouseenter") onMouseEnter() {
    // this.element.nativeElement.style.backgroundColor = "red";
    // this.element.nativeElement.style.color = "white";
  }
  @HostListener("mouseleave") onMouseLeave() {
    // this.element.nativeElement.style.backgroundColor = "";
    // this.element.nativeElement.style.color = "";
  }

  constructor(
    private element: ElementRef
  ) {
    // this.element.nativeElement.style.backgroundColor = "red";

   }

}
