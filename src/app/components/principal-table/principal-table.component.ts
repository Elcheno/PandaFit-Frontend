import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-principal-table',
  standalone: true,
  imports: [],
  templateUrl: './principal-table.component.html',
  styleUrl: './principal-table.component.scss'
})
export class PrincipalTableComponent {

  // @Input () public data: any[] = [];

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

  ngOnInit() {
    
  }
}
