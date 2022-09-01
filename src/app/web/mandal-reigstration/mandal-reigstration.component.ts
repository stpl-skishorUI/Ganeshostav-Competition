import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-mandal-reigstration',
  templateUrl: './mandal-reigstration.component.html',
  styleUrls: ['./mandal-reigstration.component.scss']
})
export class MandalReigstrationComponent implements OnInit {

  constructor(
    private apiService: ApiService, public fb: FormBuilder) { }
  registrationForm: any;
  zpNameArr: any;
  competitionTypeArray = [{ "id": 1, "competitionName": "सार्वजनिक गणेशोत्सव स्पर्धा " }, { "id": 2, "competitionName": "घरगुती गौरी सजावट स्पर्धा " }]
  ngOnInit(): void {
    this.defulatForm();
    this.getZPName()
  }


  defulatForm() {
    this.registrationForm = this.fb.group({
      "createdBy": [''],
      "modifiedBy": 0,
      "createdDate": [new Date()],
      "modifiedDate": [new Date()],
      "isDeleted": false,
      "id": 0,
      "competitionTypeId": ['', Validators.required],
      "zpgatId": ['', Validators.required],
      "clientId": ['', Validators.required],
      "villageName": ['', Validators.required],
      "personName": ['', Validators.required],
      "leadername": [''],
      "leaderMobileNo": [''],
      "vicLeadername": [''],
      "vicleadermobileNo": [''],
      "memberName": [''],
      "memberMobileNo": [''],
      "amount": 0,
      "paymentScreenPath": ['', Validators.required],
      "videoPath": ['', Validators.required],
      "paymentId": ['', Validators.required],
      "paymentStatus": ['', Validators.required],
      "remark": ['', Validators.required],
      "marks": ['', Validators.required],
      "moreInfo": ['', Validators.required],
      "selfPersonName":[''],
      'selfPersonMobile':[''],
    })
  }

  getZPName() {
    this.apiService.setHttp('get', "api/Competition/GetZPGATName", false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.zpNameArr = res.responseData;
          this.zpNameArr.unshift({ "id": '', "zpgatName": "जिल्हा परिषद गट निवडा ", "clientId": 1 })
        } else {

        }
      },
      error: ((error: any) => {
        //  this.error.handelError(error.status) 
      })
    })
  }
  memberArray: any[]=[];
  addMember() {
    
    let obj = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": 0,
      "competitionId": 2,
      "designationId": 3,
      "personName":this.registrationForm.value.memberName,
      "mobileNo":this.registrationForm.value.memberMobileNo
    }
    this.memberArray.push(obj);
    this.registrationForm.controls['registrationForm'].setValue('');
    this.registrationForm.controls['memberMobileNo'].setValue('');
  }


  deleteMember(ind:number,obj:any){
    this.memberArray.forEach((ele:any,ind)=>{
      this.memberArray.splice(ind,1);
    })
   
  }
}
