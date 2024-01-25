import { Component } from '@angular/core';

@Component({
  selector: 'app-table-institution',
  standalone: true,
  imports: [],
  templateUrl: './table-institution.component.html',
  styleUrl: './table-institution.component.scss'
})
export class TableInstitutionComponent {

  public data: any[] = [
    {
      id: 1,
      name: 'test',
      userList: []
    },
    {
      id: 2,
      name: 'test2',
      userList: []
    },
    {
      id: 3,
      name: 'test3',
      userList: []
    }
  ]
}
