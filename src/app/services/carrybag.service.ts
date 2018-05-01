import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Carrybag} from './../configs/carrybag.config';

@Injectable()
export class CarrybagService {

  private userInfo;
  private header;
  options:RequestOptions;

  constructor(private http: Http) {
   this.header = new Headers();
   this.header.append('Authorization', localStorage.getItem("application-token"));
   this.options = new RequestOptions({headers: this.header});
  }


  getCarrybaglist(userId){
    return this.http.get("http://10.151.61.122:9004/bag/userId/"+userId, this.options)
    .map(data => data.json(),
    (error: any)=>console.log("error in getting data from database"));

  }


  deleteCarrybag(offerId,userId) {
  	return this.http.delete(Carrybag.deleteCarryBagUrl+userId+"/offerId/"+offerId, this.options)
    .map(data => data.status,
    (error: any)=>console.log(error + "error in deleting offer"));
  }


  newCouponGenerate(obj){
    return this.http.post(Carrybag.generateCouponUrl,obj, this.options)
     .map(data => data.json(),
   (error: any)=>console.log("error"));
 }

 checkCouponExistence(userId,offerId){
  return this.http.get(Carrybag.getCouponIdUrl+"userId/"+userId+"/offerId/"+offerId)
  .map(data => data.json(),
  (error: any)=>console.log("error in getting data from database"));
}

updateFeedback(obj){
  return this.http.post(Carrybag.addCommentUrl, obj, this.options)
  .map(data => data.json(),
  (error: any)=>console.log("error in getting data from database"));
}


  addToCarrybag(offer){
    return this.http.post(Carrybag.postCarrybagUrl, offer, this.options)
     .map(data => data.status,
   (error: any)=>console.log("error"));
  }
}
