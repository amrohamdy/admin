import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  showError = false;

  constructor (private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let request = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${ localStorage.getItem('accessToken') || '' }`,
        'Accept-Language': `en`,
      },

    });
    this.spinner.show();
    return next.handle(request).pipe(
      catchError((err, caught: Observable<HttpEvent<any>>) => {
        if (err instanceof HttpErrorResponse && err.status == 401) {
          this.toastr.error(err.error.message)
          // this.router.navigate(['/error']);
        }
        else if (err instanceof HttpErrorResponse && err.status == 500) {
          this.spinner.hide();
          this.toastr.error()
        }
        else if (err instanceof HttpErrorResponse && err.status == 400) {
          // this.toastr.error(err.error.message)
        }
        else if (err instanceof HttpErrorResponse && err.status == 402 && !this.showError) {
          // this.toastr.error(err.error.message)
          this.toastr.error(err.error.message)
          this.showError = true;
          this.router.navigate(['/error']);
        }
        if (err instanceof HttpErrorResponse && err.status == 403 && !this.showError) {

          this.showError = true;
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

          this.spinner.hide();
        }
        else {
          this.spinner.hide();
        }
        throw err;
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}
