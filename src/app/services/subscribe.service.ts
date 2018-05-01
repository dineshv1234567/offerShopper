import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Subscribe} from '../configs/subscribe.config';

@Injectable()
export class SubscribeService {

  private header;
  options:RequestOptions;

  constructor(private http: Http) {
    this.header = new Headers();
    this.header.append('Authorization',localStorage.getItem("application-token"));
    this.options = new RequestOptions({headers: this.header});
  }

  getAllDetails(userId){
    console.log(userId);
    return this.http.get(Subscribe.getSubscriptionUrl+userId, this.options)
    .map(data => data.json(),
    (error: any)=>console.log("error in getting data from database"));

  }
  
  deleteSubscriptionsById(userId,vendorId) {
  	return this.http.delete(Subscribe.deleteCarryBagUrl+userId+"/"+vendorId, this.options)
    .map(data => data.status,
    (error: any)=>console.log(error + "error in deleting offer"));
  }

  addToSubscriptionList(subscribeBean){
        return this.http.post(Subscribe.addSubscriptionUrl,subscribeBean, this.options)
    .map(data => data.status,
    (error: any)=>console.log(error + "error in adding offer"));
  }

}
