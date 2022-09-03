import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, Subject } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { MultipleFileUploadService } from 'src/app/core/services/multiple-file-upload.service';
import { Gallery} from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-participent-list',
  templateUrl: './participent-list.component.html',
  styleUrls: ['./participent-list.component.scss']
})
export class ParticipentListComponent implements OnInit {

  zpNameArr: any[] = [];
  competitionNameArray: any;
  public href: string = "";
  filterForm!: FormGroup;
  getCompetitionListArray: any;
  subject: Subject<any> = new Subject();
  heighLightRow: any;
  hideCompetitionDiv:boolean = false;
  getCompetitionDetailArray: any;
  competitionDetailObj: any;
  @ViewChild("videoPlayer", { static: false }) videoPlayer!: ElementRef;

  constructor(
    private apiService: ApiService,
    public fb: FormBuilder,
    public multipleFileUploadSe: MultipleFileUploadService,
    public commonService: CommonService,
    public error: ErrorsService,
    private router: Router,
    public spinner: NgxSpinnerService,
    private errorSerivce: ErrorsService,
    private localstorageData: LocalstorageService,
    public gallery: Gallery,
    public lightbox: Lightbox,
  ) { }

  ngOnInit(): void {
    this.href = window.location.href;
    this.defaultFilterForm();
    this.defultForm();
    this.getCompetitionName();
    this.getZPName();
    this.getCompetitionListData();
    this.searchCompetitionListData()
  }

  defaultFilterForm() {
    this.filterForm = this.fb.group({
      zpgatName: [0],
      competitionName: [0],
      searchText: [''],
    })
  }

  getZPName() {
    let id = this.localstorageData.clientId();
    this.apiService.setHttp('get', "api/Competition/GetZPGATName", false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          let dataArray = res.responseData;
          dataArray.map((ele: any) => {
            (id == ele.clientId) ? this.zpNameArr.push(ele) : '';
          })
        } else {
          this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => {
        this.error.handelError(error.status)
      })
    })
  }

  getCompetitionName() {
    this.apiService.setHttp('get', "api/Competition/GetCompetitionName", false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.competitionNameArray = res.responseData;
        } else {
          this.competitionNameArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  getCompetitionListData() {
    let obj = this.filterForm.value.competitionName + '&ZPGATId=' + this.filterForm.value.zpgatName + '&SearhchText=' + (this.filterForm.value.searchText.trim()) + '&ClientId=' + this.localstorageData.clientId() + '&PageNo=' + 0 ;
    this.apiService.setHttp('get', "api/Competition/GetCompetitionData?CompetitionTypeId=" + obj, false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.getCompetitionListArray = res.responseData;
        } else {
          this.getCompetitionListArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  onKeyUpSearchData() {
    this.subject.next(true);
  }
  
  searchCompetitionListData() {
    this.subject
      .pipe(debounceTime(700))
      .subscribe(() => {
        this.filterForm.value.searchText;
        // this.paginationNo = 1;
        this.heighLightRow = '';
        this.hideCompetitionDiv = false;
        this.getCompetitionListData();
      }
      );
  }

  clearFilter(flag: any) {
    if (flag == 'zpgatName') {
      this.filterForm.controls['zpgatName'].setValue(0);
    } else if (flag == 'competitionName') {
      this.filterForm.controls['competitionName'].setValue(0);
    } else if(flag == 'search'){
      this.filterForm.controls['searchText'].setValue('');
    }
    this.heighLightRow = '';
    this.hideCompetitionDiv = false;
    this.getCompetitionListData();
  }

  showCompetitionData(obj: any) {
    
    this.heighLightRow = obj.id;
    this.competitionDetailObj = obj;
    this.getOtherCompetitionDetail(obj.id)
    this.hideCompetitionDiv = true;
    this.videoPlayer.nativeElement.src = this.competitionDetailObj.videoPath;
  }

  getOtherCompetitionDetail(competitionId:any) {
  this.apiService.setHttp('get', "api/Competition/GetOtherCompetitionData?CompetitionId=" + competitionId, false, false, false, 'masterUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.getCompetitionDetailArray = res.responseData;
        } else {
          this.getCompetitionDetailArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.commonService.showError(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  showImageLightbox(data: any) {  // Image Gallery Code
    let images = data.map((item: any) =>
    new ImageItem({ src: item.imagePath, thumb: item.imagePath, text: 'programGalleryImg' }));
    this.gallery.ref('lightbox').load(images);
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
      ((formData.marks == '0' || formData.marks > 10)) ? this.commonService.showError("Please Enter Valid Marks"):''
      return;
    }
   
    this.spinner.show();
    let data = "CompetitionId=" + this.heighLightRow + "&Marks=" + formData.marks + "&Remark=" + formData.remarks;
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
