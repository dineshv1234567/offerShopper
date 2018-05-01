import { Component, OnInit,Inject } from '@angular/core';
import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {loginDetails} from './loginDetails';
import {registerDetails} from './registerDetails';
import {LoginService} from '../../services/login.service';
import {RegisterService} from '../../services/register.service';
import {vendorDetails} from './vendorDetails';

@Component({
  selector: 'app-login-register-frontpage',
  templateUrl: './login-register-frontpage.component.html',
  styleUrls: ['./login-register-frontpage.component.css'],
  providers:[
  LoginService,
  RegisterService
  ]
})
export class LoginRegisterFrontpageComponent implements OnInit {

  registerUsername:String;
  registerPassword:String;
  registerAddress:String;
  registerCity:String;
  registerState:String;
  registerZip:number;
  loginDetails:loginDetails;
  loginForm:FormGroup;
  addressProxy:FormGroup;
  registerForm:FormGroup;
  fb: FormBuilder;
  vendorDetails:vendorDetails;
  form:FormGroup;
  tempPassword:String;
  isAlredyExist:boolean=false;
  status: boolean = false;

  constructor(
    @Inject(FormBuilder)  fb: FormBuilder,
    private loginService:LoginService,
    private registerService:RegisterService,
    private router:Router
    ) {
    this.fb=fb;
    this.registerForm=this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      rePassword: ['',[Validators.required]]
    },{validator: this.checkIfMatchingPasswords});
    this.onChanges();
  }

  ngOnInit() {
    this.loginForm=new FormGroup({
      username : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required]),
    });
    this.form=new FormGroup({
      firstName : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      lastName : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('',Validators.required),
      contact : new FormControl('', [Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(11)]),
      DOB : new FormControl(''),
      gender : new FormControl(''),
      address : new FormControl(''),
      city : new FormControl('',Validators.pattern('[a-zA-Z][a-zA-Z]+')),
      state : new FormControl('',Validators.pattern('[a-zA-Z][a-zA-Z]+')),
      zip : new FormControl('', [Validators.pattern('[0-9]*')]),
      vendorAddress : new FormControl('', [Validators.required]),
      vendorCity : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      vendorState : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      vendorZip : new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
      vendorContact : new FormControl('', [Validators.required, Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(11)])
    });

  }

  onChanges(): void {
    this.registerForm.get('username').valueChanges.subscribe(val => {
      this.isAlredyExist=false;
    });
  }

  validateUsername(){
    let body= {
      "email": this.registerForm.get('username').value
    };
    this.registerService.register(body).subscribe((res) => {
    },
    (res:Response) => {
      if(res.status==409) {
        this.isAlredyExist=true;
      }
    });
  }


  login(){
    let username=this.loginForm.get('username').value;
    let	password = this.loginForm.get('password').value;
    var xorKey = 129;
    var result = "";

    for (let i = 0; i < password.length; i++) {
      result += String.fromCharCode(xorKey ^ password.charCodeAt(i));
    }

    this.loginService.loginWithEmailId(username,result).subscribe((res) =>{
      this.loginService.isLoggedin.subscribe(status => {this.status = status;console.log(status+"In loggin component")});
      if(this.status==true){
        this.router.navigate(['/homepage']);
      }
    }, (res:Response) =>{
      if(res.status==401){
        alert("Unauthorized User");
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

registerVendor(){
  let tempPassword="";

  tempPassword=this.form.get('password').value;
  var xorKey = 129;
  var resultPassword = "";

  for (let i = 0; i < tempPassword.length; i++) {
    resultPassword += String.fromCharCode(xorKey ^ tempPassword.charCodeAt(i));
  }

  let body={
    "address": {
      "city": this.form.get('city').value,
      "state": this.form.get('state').value,
      "street": this.form.get('address').value,
      "zipCode": this.form.get('zip').value
    },
    "dob": this.form.get('DOB').value,
    "email": this.form.get('email').value,
    "firstName": this.form.get('firstName').value,
    "gender":    this.form.get('gender').value,
    "lastName":  this.form.get('lastName').value,
    "mobileNo":  this.form.get('contact').value,
    "password":  resultPassword,
    "role":      "vendor",
    "shopAddress": {
      "city": this.form.get('vendorCity').value,
      "state": this.form.get('vendorState').value,
      "street": this.form.get('vendorAddress').value,
      "zipCode": this.form.get('vendorZip').value
    },
    "vendorMobileNo": this.form.get('vendorContact').value
  };
  console.log(this.form.value);

  this.registerService.register(body).subscribe((res) =>{
    alert("Link sent to your account for verification");
  }, (res:Response) =>{
    console.log(res);
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

registerUser(){
  let tempPassword="";

  tempPassword=this.registerForm.get('password').value;
  var xorKey = 129;
  var resultPassword = "";

  for (let i = 0; i < tempPassword.length; i++) {
    resultPassword += String.fromCharCode(xorKey ^ tempPassword.charCodeAt(i));
  }

  let body={
    "email": this.registerForm.get('username').value,
    "password":  resultPassword,
    "role":      "customer"
  };

  this.registerService.register(body).subscribe((res) =>{
      alert("Link sent to your account for verification");
      console.log(res);
  }, (res:Response) =>{
    console.log("In Error");
    console.log(res);
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

// onKeydown(event) {
//    this.validateUsername();
// }

IsHidden= true;
IsNotHidden=false;
onSelect(){
  this.registerUsername = this.registerForm.get('username').value;
  this.registerPassword = this.registerForm.get('password').value;


  this.form.patchValue({
    email:  this.registerUsername,
    password: this.registerPassword
  });

  this.IsHidden= !this.IsHidden;
  this.IsNotHidden= !this.IsNotHidden;
}

setAddress(){
  this.registerAddress=this.form.get('address').value;
  this.registerCity=this.form.get('city').value;
  this.registerState=this.form.get('state').value;
  this.registerZip=this.form.get('zip').value;

  this.form.patchValue({
    vendorAddress:  this.registerAddress,
    vendorCity: this.registerCity,
    vendorState:  this.registerState,
    vendorZip: this.registerZip
  });
};

}

// ^                 # start-of-string
// (?=.*[0-9])       # a digit must occur at least once
// (?=.*[a-z])       # a lower case letter must occur at least once
// (?=.*[A-Z])       # an upper case letter must occur at least once
// (?=.*[@#$%^&+=])  # a special character must occur at least once
// (?=\S+$)          # no whitespace allowed in the entire string
// .{8,}             # anything, at least eight places though
// $                 # end-of-string
