import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {VerifyEmailService} from '../../services/verify-email.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  providers:[VerifyEmailService]
})
export class VerifyEmailComponent implements OnInit {

token;
  constructor(public router: Router, private route: ActivatedRoute,
  	private verifyEmailService:VerifyEmailService,) { }

  ngOnInit() {
  	this.token=this.route.snapshot.params.id;
     this.verifyEmailService.verifyEmailWithEmail(this.token).subscribe((res) =>{
      alert("Verified");  
      console.log(res);
      }, (res:Response) =>{
        if(res.status==500){
          alert("Internal server error");
        }
        else if(res.status==404){
          alert("Service Not Found");
        }
        else if(res.status==403){
          alert("403 Forbidden");
        }
        else if(res.status==406){
          alert("Not verified");
        }
        else {
           alert("Connection error");

        }
        console.log(res);
  });
      this.router.navigate(['login']);

  }

}
