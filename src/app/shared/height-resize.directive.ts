import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appHeightResize]',
  standalone: true
})
export class HeightResizeDirective implements OnInit{

  private textaria: HTMLTextAreaElement

  constructor(private el: ElementRef<HTMLTextAreaElement>) {
    this.textaria = this.el.nativeElement
  }
  ngOnInit(): void {
    this.adjustHeight()
  }

  @HostListener('input')
  onInput(): void {
    this.adjustHeight()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.adjustHeight()
  }

  private adjustHeight(): void {
    this.textaria.style.height = 'auto'
    this.textaria.style.height = `${this.textaria.scrollHeight}px`
  }
}
