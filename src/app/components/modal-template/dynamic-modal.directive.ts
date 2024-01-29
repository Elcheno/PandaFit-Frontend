import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicModal]',
  standalone: true
})
export class DynamicModalDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
