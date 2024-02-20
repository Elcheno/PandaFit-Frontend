import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role',
  standalone: true
})
export class RolePipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): unknown {
    let response = '';
    if (value) {
      response = value.includes('ADMIN') ? 'Administrador' : 'Usuario';
    }
    return response;
  }

}
