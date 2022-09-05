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

}
