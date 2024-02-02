/* eslint-disable @typescript-eslint/promise-function-async */
import { type Routes } from '@angular/router';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: 'institutions',
    component: InstitutionsComponent,
    children: [
      {
        path: 'schoolyear',
        loadComponent: () => import('./pages/school-year/school-year.component').then(m => m.SchoolYearComponent)
      }
    ]
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '',
    redirectTo: 'institutions',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: InstitutionsComponent
  }
];
