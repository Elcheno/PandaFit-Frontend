import { type Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { authGuard } from './guards/auth-guard.guard';
import { roleGuard } from './guards/role.guard';
import { loginGuard } from './guards/login.guard';
import { AnswersInstitutionsComponent } from './answers-institutions/answers-institutions.component';
import { AnswersSchoolYearComponent } from './answers-school-year/answers-school-year.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'institutions',
        loadComponent: () => import('./pages/institutions/institutions.component').then(m => m.InstitutionsComponent),
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
        loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
        canActivate: [authGuard, roleGuard]
      },
      {
        path: 'form/input',
        loadComponent: () => import('./pages/inputs/inputs.component').then(m => m.InputsComponent),
        canActivate: [authGuard, roleGuard]
      },
      {
        path: 'formulary',
        loadComponent: () => import('./pages/formulary/formulary.component').then(m => m.FormularyComponent),
        canActivate: [authGuard, roleGuard],
        children: [
          {
            path: 'inputs',
            loadComponent: () => import('./pages/inputs/inputs.component').then(m => m.InputsComponent),
            canActivate: [authGuard, roleGuard]
          },
          {
            path: 'outputs',
            loadComponent: () => import('./pages/output/output.component').then(m => m.OutputComponent),
            canActivate: [authGuard, roleGuard]
          },
          {
            path: 'forms',
            loadComponent: () => import('./pages/form/form.component').then(m => m.FormComponent),
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
        loadComponent: () => import('./components/output/create-output/create-output.component').then(m => m.CreateOutputComponent),
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
        path: 'answers',
        canActivate: [authGuard],
        children: [
          {
            path: 'institutions',
            component: AnswersInstitutionsComponent,
            canActivate: [authGuard],
            children: [ 
              {
                path: 'schoolyear',
                component: AnswersSchoolYearComponent,
                canActivate: [authGuard]
              }
            ]
          },
          {
            path: 'schoolyears',
            component: AnswersSchoolYearComponent,
            canActivate: [authGuard]
          },
          {
            path: ':schoolyear',
            loadComponent: () => import('./pages/answers/answers.component').then(m => m.AnswersComponent),
            canActivate: [authGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: 'institutions',
        pathMatch: 'full'
      }
    ]
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
    path: '',
    redirectTo: 'Landing',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: ErrorComponent,
    pathMatch: 'full'
  }
];
