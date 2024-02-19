import { type Routes } from '@angular/router';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { UsersComponent } from './pages/users/users.component';
import { ErrorComponent } from './pages/error/error.component';
import { InputsComponent } from './pages/inputs/inputs.component';
import { FormComponent } from './pages/form/form.component';
import { OutputComponent } from './pages/output/output.component';
import { FormularyComponent } from './pages/formulary/formulary.component';
import { CreateOutputComponent } from './components/output/create-output/create-output.component';
import { LoginComponent } from './pages/login/login.component';



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
    path: 'form/input',
    component: InputsComponent
  },
  {
    path: 'formulary',
    component: FormularyComponent,
    children: [
      {
        path: 'inputs',
        component: InputsComponent
      },
      {
        path: 'outputs',
        component: OutputComponent,
      },
      {
        path: 'outputs/create',
        component: CreateOutputComponent
      },
      {
        path: 'forms',
        component: FormComponent
      },
      {
        path: 'forms/create',
        loadComponent: () => import('./pages/create-form/create-form.component').then(m => m.CreateFormComponent)
      },
      {
        path: 'forms/view/:formId',
        loadComponent: () => import('./components/form/view-form/view-form.component').then(m => m.ViewFormComponent)
      },
      {
        path: '',
        redirectTo: 'inputs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
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
