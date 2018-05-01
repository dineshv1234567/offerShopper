import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/map';

import {updatePassword} from '../configs/updatePassword.config';

@Injectable()
export class UpdatePasswordService {

  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json'});

   updatePassWithEmail(body){
    return this.http.post(updatePassword.updatePassEmailId, body, {headers: this.headers})
     .map((res:Response) => {
     	console.log("Inservice");
     	console.log(res);
     },
	(error: any)=>console.log("error in calling register service"));
}

}
