import { Component, OnInit,Inject } from '@angular/core';
import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {UpdatePasswordService} from '../../services/update-password.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
  providers:[UpdatePasswordService]
})
export class UpdatePasswordComponent implements OnInit {

	token;

    up: FormBuilder;
     updatePass:FormGroup;
  constructor(@Inject(FormBuilder)  up: FormBuilder,
  	private updatePasswordService:UpdatePasswordService,
  	private route: ActivatedRoute
  	) {
    this.up=up; 
     this.updatePass=this.up.group({
            password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
            rePassword: ['',[Validators.required]]
        },{validator: this.checkIfMatchingPasswords});
}
  //password match validator
 checkIfMatchingPasswords(group: FormGroup) {
     let passwordField= group.controls.password,
     confirmPasswordField = group.controls.rePassword;
     if(passwordField.value !== confirmPasswordField.value ) {
         return confirmPasswordField.setErrors({notEquivalent: true})
     }else {
         return confirmPasswordField.setErrors(null);
     }
 }

  ngOnInit() {
  	this.token=this.route.snapshot.params.id;
  }

    updatePassword(){
    let password=this.updatePass.get('password').value;
    var xorKey = 129;
    var result = "";

    for (let i = 0; i < password.length; i++) {
      result += String.fromCharCode(xorKey ^ password.charCodeAt(i));
    }
      let body={
                    "jwe": this.token,
                    "password": result
                };
     this.updatePasswordService.updatePassWithEmail(body).subscribe((res) =>{
      alert("Updated");  
      console.log(res);
      }, (res:Response) =>{
       if(res.status==401 || res.status==409){
          alert("Username already exists");
        }
        else if(res.status==500){
          alert("Internal server error");
        }
        else if(res.status==201){
          alert("Successfully registered");
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
