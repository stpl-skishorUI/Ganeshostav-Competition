import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getLoggedInLocalstorageData() {
    if(this.checkUserIsLoggedIn() == true)
   {  let data = JSON.parse(localStorage['user']);
   return data;}
  }

  checkUserIsLoggedIn() { // check user isLoggedIn or not  
    let sessionData: any = sessionStorage.getItem('loggedIn');
    sessionData == null || sessionData == '' ? localStorage.clear() : '';
    if (localStorage.getItem('user') && sessionData == 'true') return true;
    else return false;
  }


  userId() {
    let userId = this.getLoggedInLocalstorageData();
    return userId?.responseData?.id;
  }

  checkDataType(val: any) {
    let value: any;
    if (val == "" || val == null || val == "null" || val == undefined || val == "undefined" || val == 'string' || val == null || val == 0) {
      value = false;
    } else {
      value = true;
    }
    return value;
  }

}
