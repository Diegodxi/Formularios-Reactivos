
import { Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login';
import { Dashboard } from './componentes/dashboard/dashboard';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario';
import { authGuard } from './guardias/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'registro',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'registro',
    component: RegistroUsuarioComponent
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
