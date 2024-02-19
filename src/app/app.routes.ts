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
import { authGuard } from './guards/auth-guard.guard';
import { roleGuard } from './guards/role.guard';



export const routes: Routes = [
  {
    path: 'institutions',
    component: InstitutionsComponent,
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'institutions',
    loadComponent: () => import('./pages/institutions/info-institution/info-institution.component').then(m => m.InfoInstitutionComponent),
    canActivate: [authGuard, roleGuard],
    children: [
      {
        path: 'schoolyear',
        loadComponent: () => import('./pages/school-year/school-year.component').then(m => m.SchoolYearComponent),
        canActivate: [authGuard, roleGuard]
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
        canActivate: [authGuard, roleGuard]
      }
    ]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'form/input',
    component: InputsComponent,
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'formulary',
    component: FormularyComponent,
    canActivate: [authGuard, roleGuard],
    children: [
      {
        path: 'inputs',
        component: InputsComponent,
        canActivate: [authGuard, roleGuard]
      },
      {
        path: 'outputs',
        component: OutputComponent,
        canActivate: [authGuard, roleGuard]
      },
      {
        path: 'outputs/create',
        component: CreateOutputComponent,
        canActivate: [authGuard, roleGuard]
      },
      {
        path: 'forms',
        component: FormComponent,
        canActivate: [authGuard, roleGuard]
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
