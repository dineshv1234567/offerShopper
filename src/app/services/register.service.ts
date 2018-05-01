import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/map';

import {Register} from '../configs/register.config';

@Injectable()
export class RegisterService {


  constructor(private http: Http) {  }

  private headers = new Headers({ 'Content-Type': 'application/json'});

  register(body){
    return this.http.post(Register.registerDetails, body, {headers: this.headers})
     .map(data => {data.toString},
	(error: any)=>console.log("error in calling register service"));
  }

}
//data.toString;console.log(data)
