import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appClearObservable]',
  standalone: true
})
export class ClearObservableDirective implements OnDestroy{

  destroy$: Subject<boolean> = new Subject()

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}
