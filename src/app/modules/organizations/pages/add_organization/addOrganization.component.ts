import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomErrorValidationComponent } from '../../../../shared/components/custom-error-validation/custom-error-validation.component';
import { Patterns } from '../../../../shared/models/patterns';
import { RequestsService } from '../../../../shared/services/requests.service';

@Component({
  selector: 'app-addOrganization',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule, CustomErrorValidationComponent],
  templateUrl: './addOrganization.component.html',
  styleUrl: './addOrganization.component.scss'
})
export class AddOrganizationComponent implements OnInit {
  files: any = []
  fileName: string = ''
  formSumitted: boolean = false
  showPasswordOld = false;
  showPasswordNew = false;
  showPasswordRetry = false;
  checking = false;
  lessThanEight = false;
  letters = false;
  specialChar = false
  passwordForm: boolean = false
  showEyeIcon: boolean = false
  showSpinner: boolean = false
  editMood: boolean = false
  LoadshowSpinner: boolean = false
  editId: any
  passValidation = ' Must include one symbol at least (!@#$&*(),?:) '

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    number_of_emps: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
    user_name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(Patterns.Email)]),

  })

  ngOnInit(): void {
    this.form.get("password")?.valueChanges.subscribe((res: any) => {
      this.checking = true
      // check for number
      const hasNumber = /\d/.test(res);

      if (hasNumber && res.length >= 8) {
        this.lessThanEight = false;
      }
      else {
        this.lessThanEight = true;
      }
      // check letters
      const password = res; // Assuming res is the password value

      // Regular expression to check for at least one capital letter
      const capitalRegex = /[A-Z]/;

      // Regular expression to check for at least one small letter
      const smallRegex = /[a-z]/;

      const hasCapitalLetter = capitalRegex.test(password);
      const hasSmallLetter = smallRegex.test(password);

      if (hasCapitalLetter && hasSmallLetter) {
        this.letters = true
      } else {
        this.letters = false
      }

      // check special Char
      const specialCharRegex = /[!@#$%^&*(),?":]/;
      const hasSpecialChar = specialCharRegex.test(password);

      if (hasSpecialChar) {
        this.specialChar = true
      } else {
        this.specialChar = false

      }

    })
  }

  constructor (private router: Router, private requestsService: RequestsService, private activeRoute: ActivatedRoute, private ToastService: ToastrService) {

    this.activeRoute.params.subscribe((params: any) => {
      this.editId = params.id
      if (params.id) {
        this.editMood = true

        this.LoadshowSpinner = true
        this.requestsService.get(`admins/organizations/${ params.id }`).subscribe((res: any) => {
          this.LoadshowSpinner = false

          this.form.patchValue(
            {
              name: res.body.name,
              address: res.body.address,
              number_of_emps: res.body.number_of_emps
            }
          )
        })
      }
    })

  }




  async onFileSelected(event: any) {
    this.files = event.target.files;
    this.fileName = this.files && this.files[0] ? this.files[0].name : '';

    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const base64String = await this.requestsService.fileToBase64(file);
      this.form.patchValue({
        logo: base64String
      })
    }
  }

  showpassword() {
    this.showEyeIcon = !this.showEyeIcon;
  }

  add() {
    this.formSumitted = true

    if (this.editMood) {
      this.form.get("logo")?.clearValidators()
      this.form.get("logo")?.updateValueAndValidity()

      this.form.get("user_name")?.clearValidators()
      this.form.get("user_name")?.updateValueAndValidity()

      this.form.get("password")?.clearValidators()
      this.form.get("password")?.updateValueAndValidity()
      this.form.get("email")?.clearValidators()
      this.form.get("email")?.updateValueAndValidity()

    }


    if (this.form.valid) {
      this.showSpinner = true;
      this.formSumitted = false;

      let editedData = {
        name: this.form.get("name")?.value,
        address: this.form.get("address")?.value,
        number_of_emps: Number(this.form.get("number_of_emps")?.value)
      }

      const url = this.editId ? `admins/organizations/${ this.editId }` : 'admins/organizations';
      const httpMethod = this.editId ? this.requestsService.put : this.requestsService.post;

      const Values = this.editId ? editedData : this.form.value;


      httpMethod.call(this.requestsService, url, Values).subscribe(
        (res: any) => {
          this.showSpinner = false;
          this.ToastService.success(res.message);
          this.router.navigate(['dashboard/organizations']);
        },
        (err) => {
          this.showSpinner = false;
          this.ToastService.error(err?.error?.message);
        }
      );
    }


  }
}
