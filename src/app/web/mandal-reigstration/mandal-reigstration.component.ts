import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { MultipleFileUploadService } from 'src/app/core/services/multiple-file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mandal-reigstration',
  templateUrl: './mandal-reigstration.component.html',
  styleUrls: ['./mandal-reigstration.component.scss']
})
export class MandalReigstrationComponent implements OnInit {

  constructor(
    private apiService: ApiService, public fb: FormBuilder, public multipleFileUploadSe: MultipleFileUploadService,
    public commonService: CommonService,
    public error: ErrorsService, private router: Router,
    public spinner: NgxSpinnerService) { }
  registrationForm: any;
  zpNameArr: any;
  memberArray: any[] = [];
  competitionType: any;
  isSubmmited: boolean = false
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInput1') fileInput1!: ElementRef;
  public href: string = "";
  competitionTypeArray = [{ "id": 1, "competitionName": "सार्वजनिक गणेशोत्सव स्पर्धा " }, { "id": 2, "competitionName": "घरगुती गौरी सजावट स्पर्धा " }]
  ngOnInit(): void {
    this.href = window.location.href;
    this.defulatForm();
    this.getZPName();
  }


  defulatForm() {
    this.registrationForm = this.fb.group({
      "competitionTypeId": [''],
      "zpgatId": ['', Validators.required],
      "clientId": [''],
      "villageName": ['', Validators.required],
      "personName": ['', [Validators.required]],
      "leadername": ['', [Validators.required]],
      "leaderMobileNo": ['', [Validators.required]],
      "vicLeadername": ['', [Validators.required]],
      "vicleadermobileNo": ['', [Validators.required]],
      "memberName": [''],
      "memberMobileNo": [''],
      "amount": 0,
      "paymentScreenPath": [''],
      "videoPath": ['',],
      "paymentId": [''],
      "paymentStatus": [''],
      "remark": [''],
      "marks": [''],
      "moreInfo": ['', Validators.required],
      "selfPersonName": [''],
      'selfPersonMobile': [''],
      "imagePath": [''],
      "videopath": ['']
    })
    this.competitionType = 1;
  }
  get f() {
    return this.registrationForm.controls;
  }

  getZPName() {
    let id = this.href.includes('maan.erpguru.in') ? 1 : 2;
    this.apiService.setHttp('get', "api/Competition/GetZPGATName", false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          let dataArray = res.responseData;
          dataArray.map((ele: any, ind: any) => {
            if (id == ele.clientId) {
              this.zpNameArr.push(ele);
            }
          })
          this.zpNameArr.unshift({ "id": '', "zpgatName": "जिल्हा परिषद गट निवडा ", "clientId": 1 })
        } else {
          this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => {
        this.error.handelError(error.status)
      })
    })
  }

  addMember() {
    this.registrationForm.get('memberName')?.setValidators([Validators.required]);
    this.registrationForm.controls["memberName"].updateValueAndValidity();
    this.registrationForm.get('memberMobileNo')?.setValidators([Validators.required]);
    this.registrationForm.controls["memberMobileNo"].updateValueAndValidity();
    if (this.f.memberName.status == 'VALID' && this.f.memberMobileNo.status == 'VALID') {
      let obj = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": 0,
        "competitionId": 2,
        "designationId": 3,
        "personName": this.registrationForm.value.memberName,
        "mobileNo": this.registrationForm.value.memberMobileNo.toString()
      }
      this.memberArray.push(obj);
    }
    this.registrationForm.controls["memberName"].clearValidators();
    this.registrationForm.controls["memberName"].updateValueAndValidity();
    this.registrationForm.controls["memberMobileNo"].clearValidators();
    this.registrationForm.controls["memberMobileNo"].updateValueAndValidity();
    this.registrationForm.controls['memberName'].setValue('');
    this.registrationForm.controls['memberMobileNo'].setValue('');
  }


  deleteMember(ind: number, obj: any) {
    if (confirm("Do you want Delete") == true) {
      this.memberArray.map((ele: any, index: number) => {
        if (ind == index) {
          this.memberArray.splice(ind, 1);
        }
      })
    }
  }

  checkCompetitionType(data: any) {
    this.competitionType = data.id;
    if (this.competitionType == 1) {
      this.registrationForm.controls["selfPersonName"].setValue('');
      this.registrationForm.controls["selfPersonMobile"].setValue('');
      this.registrationForm.controls["selfPersonName"].clearValidators();
      this.registrationForm.controls["selfPersonName"].updateValueAndValidity();
      this.registrationForm.controls["selfPersonMobile"].clearValidators();
      this.registrationForm.controls["selfPersonMobile"].updateValueAndValidity();

      this.registrationForm.get('personName')?.setValidators([Validators.required]);
      this.registrationForm.controls["personName"].updateValueAndValidity();
      this.registrationForm.get('leadername')?.setValidators([Validators.required]);
      this.registrationForm.controls["leadername"].updateValueAndValidity();
      this.registrationForm.get('leaderMobileNo')?.setValidators([Validators.required]);
      this.registrationForm.controls["leaderMobileNo"].updateValueAndValidity();
      this.registrationForm.get('vicLeadername')?.setValidators([Validators.required]);
      this.registrationForm.controls["vicLeadername"].updateValueAndValidity();
      this.registrationForm.get('vicleadermobileNo')?.setValidators([Validators.required]);
      this.registrationForm.controls["vicleadermobileNo"].updateValueAndValidity();

    } else if (this.competitionType == 2) {
      this.memberArray = [];
      this.registrationForm.controls["personName"].setValue('');
      this.registrationForm.controls["personName"].clearValidators();
      this.registrationForm.controls["personName"].updateValueAndValidity();
      this.registrationForm.controls["leadername"].setValue('');
      this.registrationForm.controls["leadername"].clearValidators();
      this.registrationForm.controls["leadername"].updateValueAndValidity();
      this.registrationForm.controls["leaderMobileNo"].setValue('');
      this.registrationForm.controls["leaderMobileNo"].clearValidators();
      this.registrationForm.controls["leaderMobileNo"].updateValueAndValidity();
      this.registrationForm.controls["vicLeadername"].setValue('');
      this.registrationForm.controls["vicLeadername"].clearValidators();
      this.registrationForm.controls["vicLeadername"].updateValueAndValidity();
      this.registrationForm.controls["vicleadermobileNo"].setValue('');
      this.registrationForm.controls["vicleadermobileNo"].clearValidators();
      this.registrationForm.controls["vicleadermobileNo"].updateValueAndValidity();

      this.registrationForm.get('selfPersonName')?.setValidators([Validators.required]);
      this.registrationForm.controls["selfPersonName"].updateValueAndValidity();
      this.registrationForm.get('selfPersonMobile')?.setValidators([Validators.required]);
      this.registrationForm.controls["selfPersonMobile"].updateValueAndValidity();


    }

  }

  submitData() {
    this.isSubmmited = true;
    if (this.registrationForm.invalid) {
      return
    }
    this.spinner.show();
    let formData = this.registrationForm.value;
    let temp = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": "2022-09-01T12:46:21.663Z",
      "modifiedDate": "2022-09-01T12:46:21.663Z",
      "isDeleted": false,
      "id": 0,
      "competitionId": 0,
      "designationId": 0,
      "personName": "",
      "mobileNo": ""
    }
    if (this.competitionType == 1) {
      for (let i = 0; i <= 1; i++) {
        temp['competitionId'] = 1;
        temp['designationId'] = i == 0 ? 1 : 2;
        temp['personName'] = i == 0 ? formData.leadername : formData.vicLeadername;
        temp['mobileNo'] = i == 0 ? formData.leaderMobileNo.toString() : formData.vicleadermobileNo.toString();
        this.memberArray.push(temp)
      }
    } else {
      temp['competitionId'] = 2;
    }
    let obj = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": 0,
      "competitionTypeId": this.competitionType,
      "zpgatId": formData.zpgatId,
      "clientId": 0,
      "villageName": formData.villageName,
      "personName": this.competitionType == 1 ? formData.personName : formData.selfPersonName,
      "amount": 0,
      "paymentScreenPath": "string",
      "videoPath": this.videopath,
      "paymentId": "string",
      "paymentStatus": "string",
      "remark": "string",
      "marks": 0,
      "moreInfo": formData.moreInfo,
      "competitionMembers": this.memberArray,
      "mobileNo": "",
      "compettionImage": this.galleryImagArray
    }
    this.apiService.setHttp('post', "api/Competition", false, obj, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.commonService.showError(res.showSuccess);
          this.spinner.hide();
          this.registrationForm.reset();
          this.registrationForm.controls["zpgatId"].setValue('');
          this.competitionType = 1;
          this.videopath = '';
          this.galleryImagArray = [];
        } else {
          this.spinner.hide()
          this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => {
        this.error.handelError(error.status)
      })
    })

  }


  galleryImagArray: any[] = [];
  imageUpload(event: any) { //multiple Image Upload
    let documentUrl: any = this.multipleFileUploadSe.uploadDocuments(event, "uploads", "png,jpg,jpeg");
    documentUrl.subscribe({
      next: (ele: any) => {
        if (ele.responseData != null) {
          ele.responseData.forEach((element: any) => {
            let obj =
            {
              "createdBy": 0,
              "modifiedBy": 0,
              "createdDate": new Date(),
              "modifiedDate": new Date(),
              "isDeleted": false,
              "id": 0,
              "competitionId": 0,
              "imagePath": element.filePath,
              "isMainImage": true,
              "isImage": 1
            }
            this.galleryImagArray.push(obj);
          });
        }
      },
    })
    this.registrationForm.controls['imagePath'].setValue('');
  }

  deleteImage(index: any) {
    this.galleryImagArray.splice(index, 1);
    this.fileInput.nativeElement.value = '';
  }

  videopath: any;
  videoPath(event: any) { //multiple Image Upload
    this.spinner.show();
    let documentUrl: any = this.multipleFileUploadSe.uploadDocuments(event, "uploads", "mp4,FLV,F4V,AVI,MKV");
    documentUrl.subscribe({
      next: (ele: any) => {
        if (ele.responseData != null) {
          ele.responseData.forEach((element: any) => {
            this.videopath = element.filePath;
            this.spinner.hide();
            this.commonService.showSuccess('Video uploaded successfully');
          });
        } else {
          // this.commonService.showSuccess('image uploaded successfully');
        }

      },
    })
    this.registrationForm.controls['videopath'].setValue('');
  }

  deleteVideo() {
    this.videopath = ''
    this.fileInput1.nativeElement.value = '';
  }
}
