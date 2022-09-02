import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  isSubmmited: boolean = false;
  hide: boolean = true

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.defultForm();
  }

  defultForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^[^\\s\\[\\[`&-._@#%*!-+"\'\/\\]\\]{}][a-zA-Z@0-9.\\s]+$')]],
      password: ['', [Validators.required, Validators.pattern('^[^\\s\\[\\[`&-._@#%*!-+"\'\/\\]\\]{}][a-zA-Z@0-9.\\s]+$')]]
    })
  };

  get loginFormControls() { return this.loginForm.controls }

  onSubmit() {
    this.isSubmmited = true;
    let formValue = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.spinner.show();
      this.apiService.setHttp('get', "api/Login/Login_1_0?UserName=" + formValue?.userName + '&Password=' + formValue?.password , false, false, false, 'masterUrl');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode === "200") {
            this.spinner.hide();
            sessionStorage.setItem('loggedIn', 'true');
            let resData = res.responseData;
            // delete resData.password;     //remove password Field userdetails 
            localStorage.setItem('user', JSON.stringify(resData));
            this.toastrService.success('login successfully');
            this.isSubmmited = false;
            this.router.navigate(['../dashboard'], { relativeTo: this.route });
          } else {
            this.spinner.hide();
            this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
          }
        },
        
        error: ((error: any) => { this.errorSerivce.handelError(error.status), this.spinner.hide(); })
      })
    }
  }


}
