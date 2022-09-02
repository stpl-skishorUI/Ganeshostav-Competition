import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CommonService } from './common.service';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class MultipleFileUploadService {

  multipleFileArray: any[] = [];

  constructor(private apiService: ApiService,
    private error: ErrorsService, private commonService: CommonService,) { }
    // private toastrService: ToastrService

  uploadDocuments(event: any, folderName?: any, allowedDocTypes?: any) {

    let docTypeCheckFlag = true;
    return new Observable(obj => {
      const formData = new FormData();
      if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          formData.append("files", event.target.files[i]);

          let nameText = event.target.files[i].name;
          console.log(nameText,'444')
          const selResult = nameText.split('.');
          const docExt = selResult.pop();
          const docExtLowerCase =  docExt.toLowerCase();
          if (allowedDocTypes.match(docExtLowerCase)) { }
          else {
            docTypeCheckFlag = false;
          }
        }
      }

      if (docTypeCheckFlag == true) {
        this.apiService.setHttp('post', 'api/UploadDocument/UploadMultipleFiles_v1?FolderName=' + folderName, false, formData, false, 'masterUrl');
        this.apiService.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode === "200") {
              obj.next(res);
            }
            else {
              this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) :''// this.toastrService.error(res.statusMessage);
            }
          },
          error: ((error: any) => {
            this.error.handelError(error.status);
          })
        })
      }
      else {
        obj.error("Only " + allowedDocTypes + " file format allowed.");
        this.commonService.showError("Only " + allowedDocTypes + " file format allowed.");
      }
    })
  }
}
