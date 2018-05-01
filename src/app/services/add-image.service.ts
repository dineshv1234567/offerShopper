import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

import {UploadImage} from '../configs/uploadImage.config';


@Injectable()
export class AddImageService {
	private header;

  constructor(private http: Http) {
    this.header = new Headers();
    this.header.append('Content-Type', 'multipart/form-data');
    this.header.append('Authorization',localStorage.getItem("application-token"));
   }

   addingImage(image){
   	 const options = new RequestOptions({headers: this.header});
   	     return this.http.post(UploadImage.getURL, image, options)
    .map((res:Response) => {
      console.log("Uploaded");
      console.log(res);
    },
    (error: any)=>{console.log("error in calling register service");
    console.log(error)});
  }
   }


