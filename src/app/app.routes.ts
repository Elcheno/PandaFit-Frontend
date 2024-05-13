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
import { loginGuard } from './guards/login.guard';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
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
        canActivate: [authGuard, roleGuard],
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
        path: 'forms',
        component: FormComponent,
        canActivate: [authGuard, roleGuard]
      },
      {
        path: '',
        redirectTo: 'inputs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'formulary/forms/create',
    loadComponent: () => import('./pages/create-form/create-form.component').then(m => m.CreateFormComponent),
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'formulary/forms/view/:formId',
    loadComponent: () => import('./components/form/view-form/view-form.component').then(m => m.ViewFormComponent),
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'formulary/outputs/create',
    component: CreateOutputComponent,
    canActivate: [authGuard, roleGuard]
  },
  {
    path: 'formactive',
    loadComponent: () => import('./pages/form-act/form-act.component').then(m => m.FormActComponent),
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'formactive/:id/responses',
    loadComponent: () => import('./pages/form-act-responses/form-act-responses.component').then(m => m.FormActResponsesComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'active/:id',
    loadComponent: () => import('./pages/formulary-dinamic-active/formulary-dinamic-active.component').then(m => m.FormularyDinamicActiveComponent)
  },
  {
    path: 'active/success/:id',
    loadComponent: () => import('./pages/formulary-dinamic-active/formulary-dynamic-active-success/formulary-dynamic-active-success.component').then(m => m.FormularyDynamicActiveSuccessComponent)
  },
  {
    path: '**',
    component: ErrorComponent,
    pathMatch: 'full'
  }
];
