// import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// @Directive({
//   selector: '[appContentEditable]',
//   standalone: true,
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => ContentEditableDirective),
//       multi: true,
//     },
//   ],
// })
// export class ContentEditableDirective implements ControlValueAccessor{

//   private _onChange: (value: any) => void = () => {};
//   private _onTouched: () => void = () => {};
//   private _defaultValue: string | null = null;
//   constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { }

//   @HostListener('input', ['$event'])
//   onInput(event: Event): void {
//     const value = (event.target as HTMLElement).innerText
//     this._onChange(value)
//   }

//   @HostListener('focus')
//   onFocus(): void {
//     const element = this._elementRef.nativeElement;
//     if (element.innerText === this._defaultValue) {
//       this._renderer.setProperty(element, 'innerText', '');
//     }
//   }

//   @HostListener('paste', ['$event'])
//   onPaste(event: ClipboardEvent) {
//     event.preventDefault()
//     const text = event.clipboardData?.getData('text/plain')
//     document.execCommand('insertText', false, text || '')
//   }

  
//   @HostListener('blur')
//   onBlur(): void {
//     this._onTouched();
//   }

//   writeValue(value: any): void {
//     const element = this._elementRef.nativeElement
//     this._defaultValue = value || ''
//     if (!element.innerText.trim()) {
//       this._renderer.setProperty(element, 'innerText', this._defaultValue)
//     }
    
//   }

//   registerOnChange(fn: (_: any) => void): void {
//     this._onChange = fn
//   }

//   registerOnTouched(fn: any): void {
//     this._onTouched = fn
//   }

//   setDisabledState(isDisabled: boolean): void {
//     this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled)
//   }
// }

import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appContentEditable]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContentEditableDirective),
      multi: true,
    },
  ],
})
export class ContentEditableDirective implements ControlValueAccessor {

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};
  private _defaultValue: string | null = null;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const value = (event.target as HTMLElement).innerText.trim() || null;
    this._onChange(value);
  }

  @HostListener('focus')
  onFocus(): void {
    const element = this._elementRef.nativeElement;
    if (element.innerText === this._defaultValue && this._defaultValue !== '') {
      this._renderer.setProperty(element, 'innerText', '');
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = event.clipboardData?.getData('text/plain') || '';
    const element = this._elementRef.nativeElement;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
    } else {
      this._renderer.setProperty(element, 'innerText', element.innerText + text);
    }
    this._onChange(element.innerText);
  }

  @HostListener('blur')
  onBlur(): void {
    this._onTouched();
  }

  writeValue(value: any): void {
    const element = this._elementRef.nativeElement;
    this._defaultValue = value || '';
    this._renderer.setProperty(element, 'innerText', this._defaultValue);
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}

