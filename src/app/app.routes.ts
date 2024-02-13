import { type Routes } from '@angular/router';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { UsersComponent } from './pages/users/users.component';
import { ErrorComponent } from './pages/error/error.component';
import { FormComponent } from './pages/form/form.component';
import { OutputComponent } from './pages/output/output.component';
import { FormularyComponent } from './pages/formulary/formulary.component';



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
    path: 'institutions/:institutionId/schoolyear',
    loadComponent: () => import('./pages/school-year/school-year.component').then(m => m.SchoolYearComponent)
  },
  {
    path: 'forms',
    component: FormComponent
  },
  {
    path: 'outputs',
    component: OutputComponent
  },
  {
    path: 'formulary',
    component: FormularyComponent
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
