import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormGroupDirective, NgForm } from '@angular/forms';

@Directive({
  selector: '[appRedaktorKeys]',
  standalone: true
})
export class RedaktorKeysDirective {

  private keyPressed: Set<string> = new Set()
  
  @Output() newTask = new EventEmitter<void>()
  @Output() chekBox = new EventEmitter<void>()
  // @Output() ngSubmit = new EventEmitter<void>()
  
  @Input('form') form: FormGroupDirective  | undefined;


  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log(event.code)
    this.keyPressed.add(event.code)
    if (this.keyPressed.has('ControlLeft') && this.keyPressed.has('ShiftLeft') && this.keyPressed.has('KeyN')) {
      this.newTask.emit()
    }
    if (this.keyPressed.has('ControlLeft') && this.keyPressed.has('KeyC')) {
      this.chekBox.emit()
    }
    if (this.keyPressed.has('AltRight') && this.keyPressed.has('Enter')) {
      if (this.form) {
        this.form.ngSubmit.emit()
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyup(event: KeyboardEvent) {
    this.keyPressed.delete(event.code)
  }
}
