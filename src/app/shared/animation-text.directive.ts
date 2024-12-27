import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimationText]',
  standalone: true
})
export class AnimationTextDirective implements OnInit {

  @Input() text!: string
  @Input() startDelay!: number

  constructor(private el: ElementRef) { }

  ngOnInit(): void {

    setTimeout(() => {
      for (let i = 0; i < this.text.length; i++) {
        let span = document.createElement('span')
        span.style.display = 'inline-block'
        span.style.transform = 'translateY(25px)'
        span.style.transition = '0.5s'
        span.innerText = this.text[i]
        this.el.nativeElement.append(span)
        setTimeout(() => {
          span.style.transform = 'translateY(0px)'
        }, 200 * i)
  
      }
    },this.startDelay)
  }

}
