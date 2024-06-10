import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  //TODO: not implemented
  // let currentUser = authService.currentUserValue; // Accès à la valeur de l'utilisateur actuel
  // if (currentUser && currentUser.jwt) {
  //   // Si l'utilisateur est connecté et possède un token(jwt), on clone la requête pour ajouter le header Authorization
  //   let request = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${currentUser.jwt}` // Ajout du jwt dans le header Authorization
  //     }
  //   });

    //return next(request);
  // }

  return next(req);
};
