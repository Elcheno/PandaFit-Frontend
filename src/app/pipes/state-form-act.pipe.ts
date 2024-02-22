import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateFormAct',
  standalone: true
})
export class StateFormActPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    const expirationDate: Date = new Date(value.expirationDate);

    if (expirationDate < new Date(Date.now())) {
      return 'Cerrado';
    } else {
      return 'Abierto';
    }
  }

}
