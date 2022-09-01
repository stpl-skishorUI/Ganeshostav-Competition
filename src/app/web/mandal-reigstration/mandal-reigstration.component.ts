import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-mandal-reigstration',
  templateUrl: './mandal-reigstration.component.html',
  styleUrls: ['./mandal-reigstration.component.scss']
})
export class MandalReigstrationComponent implements OnInit {

  constructor(
    private apiService:ApiService, public fb:FormBuilder) { }
  registrationForm:any
  ngOnInit(): void {

  }


  defulatForm() {
  this.registrationForm = this.fb.group({

  })
  }
 
}
