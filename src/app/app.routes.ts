/* eslint-disable @typescript-eslint/promise-function-async */
import { type Routes } from '@angular/router';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { UsersComponent } from './pages/users/users.component';
import { ErrorComponent } from './pages/error/error.component';
import { SchoolYearComponent } from './pages/school-year/school-year.component';


export const routes: Routes = [
  {
    path: 'institutions',
    component: InstitutionsComponent,
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'institutions/schoolyear',
    loadComponent: () => import('./pages/school-year/school-year.component').then(m => m.SchoolYearComponent)
  },
  {
    path: '',
    redirectTo: 'institutions',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent,
    pathMatch: 'full'
  }
];
