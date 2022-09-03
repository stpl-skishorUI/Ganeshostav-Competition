import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { MultipleFileUploadService } from 'src/app/core/services/multiple-file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var bolt: any;
declare var $: any;

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

  registrationForm!: FormGroup | any;
  zpNameArr: any[] = [];
  memberArray: any[] = [];
  competitionType: any;
  isSubmmited: boolean = false
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInput1') fileInput1!: ElementRef;
  public href: string = "";
  competitionTypeArray:any=[] ;
  sendPayObj: any;
  hashObj: any;
  amount: string = '100';
  videopath: any;
  hidevillage: any;
  villageHide: any;
  @ViewChild('openSuccessModel') openSuccessModel: any;

  ngOnInit(): void {
    this.href = window.location.href;
    this.defulatForm();
    this.getZPName();
    this.getCompetitionType();
  }


  defulatForm() {
    this.registrationForm = this.fb.group({
      "competitionTypeId": [''],
      "zpgatId": ['', Validators.required],
      "clientId": [''],
      "villageName": [''],
      "personName": ['', [Validators.required]],
      "leadername": ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
      "leaderMobileNo": ['', [Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      "vicLeadername": ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
      "vicleadermobileNo": ['', [Validators.required,Validators.pattern('[6-9]\\d{9}')]],
      "memberName": [''],
      "memberMobileNo": [''],
      "amount": 0,
      "paymentScreenPath": [''],
      "videoPath": ['',],
      "paymentId": [''],
      "paymentStatus": [''],
      "remark": [''],
      "marks": [''],
      "moreInfo": ['', Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
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
          dataArray.map((ele: any) => { (id == ele.clientId) ? this.zpNameArr.push(ele):''})
          this.zpNameArr.unshift({ "id": '', "zpgatName": "जिल्हा परिषद गट निवडा ", "isCity": '', "clientId": 1 })         
        } else {
          this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => {
        this.error.handelError(error.status)
      })
    })
  }

  getCompetitionType(){
    this.apiService.setHttp('get', "api/Competition/GetCompetitionName", false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
        this.competitionTypeArray = res.responseData;                
        } else {
          this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => {
        this.error.handelError(error.status)
      })
    })
  }

  addRemoveValidationVillage() {
    let ZpNameid = this.registrationForm.value.zpgatId;
    this.zpNameArr.find((ele: any) => {
      (ZpNameid == ele.id) ? this.villageHide = ele.isCity : ''
    })

    if (this.villageHide == 1) {
      this.registrationForm.controls["villageName"].setValue('');
      this.registrationForm.controls["villageName"].clearValidators();
      this.registrationForm.controls["villageName"].updateValueAndValidity();
    } else {
      this.registrationForm.get('villageName')?.setValidators([Validators.required]);
      this.registrationForm.controls["villageName"].updateValueAndValidity();
    }
  }

  addMember() {
   
  this.addMemberValidation();

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
      this.removeMemberValidation();
    }
 
  }

  addMemberValidation(){
    this.registrationForm.get('memberName')?.setValidators([Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]);
    this.registrationForm.controls["memberName"].updateValueAndValidity();
    this.registrationForm.get('memberMobileNo')?.setValidators([Validators.required,Validators.pattern('[6-9]\\d{9}')]);
    this.registrationForm.controls["memberMobileNo"].updateValueAndValidity();
  }

  removeMemberValidation(){
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
      this.registrationForm.get('leadername')?.setValidators([Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]);
      this.registrationForm.controls["leadername"].updateValueAndValidity();
      this.registrationForm.get('leaderMobileNo')?.setValidators([Validators.required,Validators.pattern('[6-9]\\d{9}')]);
      this.registrationForm.controls["leaderMobileNo"].updateValueAndValidity();
      this.registrationForm.get('vicLeadername')?.setValidators([Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]);
      this.registrationForm.controls["vicLeadername"].updateValueAndValidity();
      this.registrationForm.get('vicleadermobileNo')?.setValidators([Validators.required,Validators.pattern('[6-9]\\d{9}')]);
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
      this.registrationForm.get('selfPersonMobile')?.setValidators([Validators.required,Validators.pattern('[6-9]\\d{9}')]);
      this.registrationForm.controls["selfPersonMobile"].updateValueAndValidity();
    }
  }

  submitData() {

    this.isSubmmited = true;
    let formData = this.registrationForm.value;
    this.removeMemberValidation();
    if (this.registrationForm.invalid) {
      return
    }

    if (this.memberArray?.length < 5 && this.competitionType == 1) {
      this.commonService.showError("Please Add Minimun 5 Member");
      return;
    }
    
    if(this.galleryImagArray?.length == 0){
      this.commonService.showError("Please Add Images");
      return;
    }

    if(this.galleryImagArray?.length > 3){
      this.commonService.showError("Please Add Minimun 3 Images");
      return;
    }

    if(this.commonService.checkDataType(this.videopath) == false){
      this.commonService.showError("Please Upload Video");
      return;
    }
    
    if (this.competitionType == 1) {
      let temp = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": 0,
        "competitionId": 1,
        "designationId": 1,
        "personName": formData.leadername,
        "mobileNo": formData.leaderMobileNo.toString()
      }
      this.memberArray.push(temp);
      let temp1 = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": 0,
        "competitionId": 1,
        "designationId": 2,
        "personName": formData.vicLeadername,
        "mobileNo": formData.vicleadermobileNo.toString()
      }
      this.memberArray.push(temp1);
    }

    // if (this.competitionType == 2)  {
    //   temp['competitionId'] = 2;
    // }
    let clientId = this.href.includes('maan.erpguru.in') ? 1 : 2;
    let obj = {
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": 0,
      "competitionTypeId": this.competitionType,
      "zpgatId": formData.zpgatId,
      "clientId": clientId,
      "villageName": formData.villageName,
      "personName": this.competitionType == 1 ? formData.personName : formData.selfPersonName,
      "amount": +this.amount,
      "paymentScreenPath": "string",
      "videoPath": this.videopath,
      "paymentId": "string",
      "paymentStatus": "string",
      "remark": "string",
      "marks": 0,
      "moreInfo": formData.moreInfo,
      "competitionMembers": this.memberArray,
      "mobileNo": this.competitionType == 1 ? formData.leaderMobileNo.toString() : formData.selfPersonMobile.toString(),
      "compettionImage": this.galleryImagArray
    }
    this.spinner.show();
    this.sendPayObj = obj;
    this.apiService.setHttp('post', "api/Competition", false, obj, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          //  this.commonService.showError(res.showSuccess);
          this.spinner.hide();
          this.createHashPayment(res.responseData);

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


  videoPath(event: any) { //multiple Image Upload
    let documentUrl: any = this.multipleFileUploadSe.uploadDocuments(event, "uploads", "mp4,FLV,F4V,AVI,MKV,m4v,mov,WAV");
    this.spinner.show();
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
    this.spinner.hide();
    this.registrationForm.controls['videopath'].setValue('');
  }

  deleteVideo() {
    this.videopath = ''
    this.fileInput1.nativeElement.value = '';
  }

  createHashPayment(userId: any) {
    let obj = {
      "amount": this.amount,
      "firstname": this.sendPayObj.personName,
      "email": 'stplact@gmail.com',
      "phone": this.sendPayObj.mobileNo,
      "productinfo": "vtsamc",
      "service_provider": "payu_paisa",
      "lastname": "",
      "address1": "",
      "address2": "",
      "city": "",
      "state": "",
      "country": "",
      "zipcode": "",
      "udf1": "2", // for web
      "udf2": userId.toString(), // login Userid
      "udf3": '',
      "udf4": '',
      "udf5": '',
      "udf6": "",
      "udf7": "",
      "pg": "1"
    }
    this.apiService.setHttp('post', 'api/CompetitionPayment/generate-hash-sequence', false, obj, false, 'masterUrl');
    this.apiService.getHttp().subscribe((res: any) => {
      if (res.statusCode === "200") {
        let result = res.responseData;
        this.hashObj = {
          'hash': result.hash,
          'tranId': result.transactionId,
        }
        if (this.hashObj.hash != null && this.hashObj.tranId != null) {
          this.launchBoltPayment(userId);
        }
      }
    },
    );
  }

  launchBoltPayment(userId: any) {
    let obj = {
      "key": 'WEaXaZfK',
      "txnid": this.hashObj.tranId,
      "amount": this.amount,
      "firstname": this.sendPayObj.personName,
      "email": 'stplact@gmail.com',
      "phone": this.sendPayObj.mobileNo,
      "productinfo": "vtsamc",
      "hash": this.hashObj.hash,
      "udf1": "2",
      "udf2": userId.toString(), // login Userid
      "udf3": '',
      "udf4": '',
      "udf5": '',
      "surl": 'https://mahakhanij.maharashtra.gov.in/ResponseHandlingVTS.aspx',
      "furl": 'https://mahakhanij.maharashtra.gov.in/ResponseHandlingVTS.aspx',
    }
    if (Object.keys(obj).length !== 0) {
      bolt.launch(obj, {
        responseHandler: (BOLT: any) => {
          if (BOLT.response.txnStatus != "CANCEL") {
            let boltResponse = BOLT.response;
            if (boltResponse.status == "success") {
              this.commonService.showSuccess("Payment Success.");
              this.openSuccessModel.nativeElement.click();
              this.resetForm();
              //API Calling
              this.updatePaymentStatus(userId, boltResponse);
            } else {
              this.commonService.showError("Payment Failed");
              this.resetForm();
              //API Calling
              this.updatePaymentStatus(userId, boltResponse);
            }
          } else {
            let boltResponse = BOLT.response;
            this.commonService.showError("Payment cancelled by user");
            ////API Calling
            BOLT.response.txnStatus != "CANCEL" ? this.updatePaymentStatus(userId, boltResponse) : '';
          }
          return BOLT.response;
        },
        catchException: (BOLT: any) => {
          // this.toastrService.error(BOLT.message);
        }
      });
    } else {
      // this.toastrService.error('Something went wrong please try again. Try again');
    }
  }
  
  updatePaymentStatus(userId: any, boltResponse: any) {
    let obj = {
      "competitionId": +userId,
      "paymentId": userId.toString(),
      "paymentStatus": boltResponse?.status,
      "payuMoneyId": boltResponse?.txnid,
      "amount": this.amount,
      "responseStr": ''//boltResponse  
    }
    this.apiService.setHttp('post', "api/CompetitionPayment/UpdatePaymentStatus", false, obj, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {

        } else {
          this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => {
        this.error.handelError(error.status)
      })
    })
  }
  resetForm() {
    this.registrationForm.reset();
    this.registrationForm.controls["zpgatId"].setValue('');
    this.competitionType = 1;
    this.videopath = '';
    this.galleryImagArray = [];
    this.isSubmmited = false;
    this.memberArray = [];
    this.sendPayObj = '';
  }


}
