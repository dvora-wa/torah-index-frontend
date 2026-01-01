// import { HttpInterceptorFn } from '@angular/common/http';

// export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP ERROR:', error);
      return throwError(() => error);
    })
  );
};

