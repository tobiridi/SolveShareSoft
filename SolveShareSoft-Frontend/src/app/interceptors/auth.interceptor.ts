import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  //the JWT token
  const userToken: string | null = authService.currentUserToken;
  
  if (userToken) {
    //clone the request and inject the JWT token in the headers
    let request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userToken}`,
      }
    });

    return next(request);
  }

  return next(req);
};
