import { Pipe, PipeTransform } from '@angular/core';

/**
 * A custom pipe to transform user roles.
 */
@Pipe({
  name: 'role',
  standalone: true
})
export class RolePipe implements PipeTransform {

  /**
   * Transforms the user roles into human-readable format.
   * 
   * @param value The user roles.
   * @param args Additional arguments (not used).
   * @returns The transformed role.
   */
  transform(value: any[], ...args: unknown[]): unknown {
    let response = '';
    if (value) {
      response = value.includes('ADMIN') ? 'Administrador' : 'Usuario';
    }
    return response;
  }

}
