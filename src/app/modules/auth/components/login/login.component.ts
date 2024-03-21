import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../core/environment';
import { CustomErrorValidationComponent } from '../../../../shared/components/custom-error-validation/custom-error-validation.component';
import { Patterns } from '../../../../shared/models/patterns';
import { RequestsService } from '../../../../shared/services/requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule, CustomErrorValidationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  show: boolean = false
  formSumitted: boolean = false
  apiBaseUrl = environment.apiBaseUrl

  showSpinner: boolean = false

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(Patterns.Email)]),
    password: new FormControl('', Validators.required),
  })
  constructor (private router: Router, private requestsService: RequestsService, private toastrService: ToastrService) { }
  // // // appear password chars
  showpassword() {
    this.show = !this.show;
  }

  // toggle language


  login() {
    if (this.form.valid) {
      this.showSpinner = true
      this.requestsService.post(`admins/login`, this.form.value).subscribe((data: any) => {
        this.showSpinner = false
        this.toastrService.success(data.message)
        this.router.navigate(['/dashboard/organizations']);
        localStorage.setItem('accessToken', data?.body.token)
        localStorage.setItem('name', data?.body.name)


      }, err => {
        this.toastrService.error(err?.error?.message)
      })
    }

  }
  toggleLang() {

  }
}
