import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUUID',
  standalone: true
})
export class FormatUUIDPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let response = String(value);

    let name = response.split('-')[0];
    let surname1 = response.split('-')[1];
    let surname2 = response.split('-')[2];

    name = name[0].toUpperCase() + name.slice(1);
    surname1 = surname1[0].toUpperCase() + surname1.slice(1);
    surname2 = surname2[0].toUpperCase() + surname2.slice(1);

    return `${name} ${surname1} ${surname2}`;
  }

}
