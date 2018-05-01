import { Component, OnInit,Inject } from '@angular/core';

import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {ForgotPasswordService} from '../../services/forgot-password.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers:[ForgotPasswordService]
})
export class ForgotPasswordComponent implements OnInit {



   registerForm:FormGroup;
    fb: FormBuilder;
  constructor(@Inject(FormBuilder)  fb: FormBuilder,
  	private forgotPasswordService:ForgotPasswordService
  	) { 
    this.fb=fb;
    this.registerForm=this.fb.group({
           username: ['',[Validators.required, Validators.email]]
        });


  }



  ngOnInit() {
  }

  forgot(){
  			let username=this.registerForm.get('username').value;	

  	this.forgotPasswordService.forgotPasswordWithEmail(username).subscribe((res) =>{
  	    console.log("Success");
      }, (res:Response) =>{
      	console.log("Failure:");
  		console.log(res);
        if(res.status==204){
          alert("User not registered");
        }
        else if(res.status==500){
          alert("Internal server error");
        }
        else if(res.status==201){
          alert("Successfully logged in");
        }
        else if(res.status==404){
          alert("Service Not Found");
        }
        else if(res.status==403){
          alert("403 Forbidden");
        }
      	else{
           alert("Connection error");

        }
  });
  }

}
