import { Pipe, PipeTransform } from '@angular/core';

/**
 * A custom pipe to transform the state of a form activity.
 */
@Pipe({
  name: 'stateFormAct',
  standalone: true
})
export class StateFormActPipe implements PipeTransform {

  /**
   * Transforms the state of a form activity into a human-readable format.
   * 
   * @param value The form activity object containing expiration date.
   * @param args Additional arguments (not used).
   * @returns The transformed state of the form activity.
   */
  transform(value: any, ...args: unknown[]): unknown {

    const expirationDate: Date = new Date(value.expirationDate);

    if (expirationDate < new Date(Date.now())) {
      return 'Cerrado';
    } else {
      return 'Abierto';
    }
  }

}
