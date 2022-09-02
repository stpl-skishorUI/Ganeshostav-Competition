import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }

  getLoggedInLocalstorageData() {
    if (this.checkUserIsLoggedIn() == true) {
      let data = JSON.parse(localStorage['user']);
      return data;
    }
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

  showSuccess(message: any, title?: any) {
    this.toastr.success(message, title)
  }

  showError(message: any, title?: any) {
    this.toastr.error(message, title)
  }

  showInfo(message: any, title?: any) {
    this.toastr.info(message, title)
  }

  showWarning(message: any, title?: any) {
    this.toastr.warning(message, title)
  }

}
