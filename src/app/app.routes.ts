import { type Routes } from '@angular/router';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { UsersComponent } from './pages/users/users.component';
import { SchoolYearComponent } from './pages/school-year/school-year.component';

export const routes: Routes = [
  {
    path: 'institutions',
    component: SchoolYearComponent
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
