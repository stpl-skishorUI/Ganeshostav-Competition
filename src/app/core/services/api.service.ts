import { TitleCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  stateId = 1 // default sel state id
  modalSize = ['320px', '400px', '700px', '1024px']; // modal size
  disableCloseFlag:boolean = true//modal disableCloseFlag
  UserLoginDetails: any;
  userObj: any;
  tokanExpiredFlag: boolean = false;
  pagesize:Number= 100 // admin add page pagintion length

  constructor(private http: HttpClient, 
     private titleCasePipe: TitleCasePipe,
     private commonService:CommonService) { }
//-------------------------------------------web configuration var -------------------------//

  getBaseurl(url: string) {
    switch (url) {
      case 'bidderUrl': return 'https://awseauction-bidder.mahamining.com/bidder/'; break;
      case 'masterUrl': return 'https://awseauction-master.mahamining.com/master/'; break;
      case 'mineralUrl': return 'https://awsmineral-project.mahamining.com/mineral-project/'; break;
      case 'bidding': return 'https://awseauction-bidding.mahamining.com/bidding/'; break;
      default: return ''; break;
    }
  }

  private httpObj: any = {
    type: '',
    url: '',
    options: Object
  };

  clearHttp() {
    this.httpObj.type = '';
    this.httpObj.url = '';
    this.httpObj.options = {};
  }



  getHttp(): any {
    !this.httpObj.options.body && (delete this.httpObj.options.body)
    !this.httpObj.options.params && (delete this.httpObj.options.params)
    return this.http.request(this.httpObj.type, this.httpObj.url, this.httpObj.options);
  }

  setHttp(type: string, url: string, isHeader: Boolean, obj: any, params: any, baseUrl: any, passHeaderData?: any) {
    isHeader = true;
    passHeaderData = true;

    this.clearHttp();
    this.httpObj.type = type;
    this.httpObj.url = this.getBaseurl(baseUrl) + url;
    let checkObjDataType = obj instanceof FormData
    if (isHeader && this.titleCasePipe.transform(type) != 'Get' && checkObjDataType == false) {
      let tempObj: any = {
        // "Authorization": "Bearer " 
        'Content-Type': 'application/json',
        // 'Accept': 'application/json'
      };
      this.httpObj.options.headers = new HttpHeaders(tempObj);
    }
    
    if (passHeaderData && this.titleCasePipe.transform(type) == 'Get' ) {
      if(this.commonService.checkUserIsLoggedIn() == true){
        let tempObj: any = {
          "UserId": "" + this.commonService.userId(),
        };
        this.httpObj.options.headers = new HttpHeaders(tempObj);
      }
   
    }


    if (obj !== false) {
      this.httpObj.options.body = obj;
    }
    else {
      this.httpObj.options.body = false;
    }
    if (params !== false) {
      this.httpObj.options.params = params;
    }
    else {
      this.httpObj.options.params = false;
    }
  }
}
