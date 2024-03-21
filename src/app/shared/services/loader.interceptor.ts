import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  let request = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${ localStorage.getItem('accessToken') || '' }`,
      'Accept-Language': `en`,
    },

  });


  return next(request).pipe(
    catchError((err, caught: Observable<HttpEvent<any>>) => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        // this.toastr.error(err.error.message)
        // this.router.navigate(['/error']);
      }
      else if (err instanceof HttpErrorResponse && err.status == 500) {
        // this.spinner.hide();
        // this.toastr.error()
        console.error(err)
      }
      else if (err instanceof HttpErrorResponse && err.status == 400) {
        // this.toastr.error(err.error.message)
      }
      else if (err instanceof HttpErrorResponse && err.status == 402) {
        // this.toastr.error(err.error.message)
        // this.toastr.error(err.error.message)
        // this.showError = true;
        // this.router.navigate(['/error']);
      }
      if (err instanceof HttpErrorResponse && err.status == 403) {

        // this.router.navigate(['/auth/login'])
        // localStorage.removeItem("id_token")
        // localStorage.removeItem("accessToken")
        // localStorage.removeItem("email")
        // localStorage.removeItem("refreshToken")
        // localStorage.removeItem("full_name")
        // localStorage.removeItem("pwd")
        // localStorage.removeItem("usr")
        // localStorage.removeItem("time")
        // localStorage.removeItem("sms_temp")

      }
      else if (err instanceof HttpErrorResponse && err.status == 404) {
        // this.toastr.error(err.error.message)

        // this.spinner.hide();
      }
      else {
        // this.spinner.hide();
      }
      throw err;
    }),
    finalize(() => {
      // this.spinner.hide();
    })
  );;
};
