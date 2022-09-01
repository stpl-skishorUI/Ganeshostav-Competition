import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  loginForm !:FormGroup;
  isSubmmited : boolean = false;
  hide : boolean =true
  ngOnInit(): void {
    this.defultForm();
  }

  defultForm(){
    this.loginForm =this.fb.group({
      userName :['',[Validators.required,Validators.pattern('^[^\\s\\[\\[`&-._@#%*!-+"\'\/\\]\\]{}][a-zA-Z@0-9.\\s]+$')]],
      password: ['',[Validators.required,Validators.pattern('^[^\\s\\[\\[`&-._@#%*!-+"\'\/\\]\\]{}][a-zA-Z@0-9.\\s]+$')]]
    })
  };

  get loginFormControls() { return this.loginForm.controls }
  //event-creation/getAll?EventLevel=&DistrictId=0&MineralId=0&pageno=1&pagesize=10&TenderType=Active&IsPublished=1
  onSubmit() {
    this.isSubmmited = true;
    if (this.loginForm.invalid) {

      return;
    }
    console.log(this.loginForm.value);
  }

}
