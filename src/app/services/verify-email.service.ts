import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/map';

import {VerifyEmail} from '../configs/verifyEmail.config';

@Injectable()
export class VerifyEmailService {

  constructor(private http: Http) { }

     verifyEmailWithEmail(token){
    return this.http.get(VerifyEmail.passEmailId+token)
     .map((res:Response) => {
 },
	(error: any)=>console.log("error in calling register service"));
}

}
