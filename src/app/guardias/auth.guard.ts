
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion';

export const authGuard: CanActivateFn = () => {

  const auth = inject(AutenticacionService);
  const router = inject(Router);

  return auth.estaAutenticado()
    ? true
    : router.createUrlTree(['/login']);
};
