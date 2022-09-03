import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashbordArray: any
  constructor(
    private apiService: ApiService,
    public commonService: CommonService,
    public error: ErrorsService,
    public spinner: NgxSpinnerService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCompetitionType();
    this.defultForm()
  }

  getCompetitionType() {
    this.apiService.setHttp('get', "api/Competition/GetDashboardCount?ClientId=" + this.commonService.userId(), false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.dashbordArray = res.responseData;
        } else {
          this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => {
        this.error.handelError(error.status)
      })
    })
  }

  remarksForm: any;
  isSubmmited: boolean = false;
  defultForm() {
    this.remarksForm = this.fb.group({
      marks: ['', [Validators.required]],
      remarks: ['', [Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
    })
  }
  get f() {
    return this.remarksForm.controls;
  }

  addMarks() {
    this.isSubmmited = true;
    let formData = this.remarksForm.value;
    if (this.remarksForm.invalid) {
      ((formData.marks == 0)) ? this.commonService.showError("Please Enter Valid Marks"):''
      return;
    }
   
    this.spinner.show();
    let data = "CompetitionId=" + 32 + "&Marks=" + formData.marks + "&Remark=" + formData.remarks;
    this.apiService.setHttp('post', "api/Competition/UpdateMarks?" + data, false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.spinner.hide();
          this.resetForm();
          this.commonService.showSuccess(res.statusMessage);
        } else {
          this.spinner.hide();         
          this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => {
        this.error.handelError(error.status)
      })
    })
  }

resetForm(){
this.remarksForm.reset();
this.isSubmmited = false;
}

}
