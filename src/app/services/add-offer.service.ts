import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AddOfferConfig} from '../configs/add-offer-config';

@Injectable()
export class AddOfferService {

	private header;
  options:RequestOptions;
  public userInfo;
  public userId;

  constructor(private http: Http) {
		this.header = new Headers();
		this.header.append('Authorization', localStorage.getItem("application-token"));
    this.options = new RequestOptions({headers: this.header});
  }
  
  getOffersList(userId){
    return this.http.get(AddOfferConfig.getURL+userId+"/offers", this.options)
    .map(data => data.json(),
     (error: any)=>console.log("error in getting data from database")); 
  }

  deleteOffer(offerId) {
  	return this.http.delete(AddOfferConfig.deleteOfferURL+offerId,this.options)
    .map(data => data.status,
    (error: any)=>console.log(error + "error in deleting offer"));
  }

  updateOffer(offerId) {
  	return this.http.put(AddOfferConfig.updateOfferURL+offerId, this.options)
    .map(data => data.status,
    (error: any)=>console.log(error + "error in deleting offer"));
  }

  putOffer(obj){

   return this.http.put(AddOfferConfig.updateOfferURL+obj.userId,obj, this.options)
    .map(data => data.json(),
  (error: any)=>console.log("error"));
 }

  addNewOffer(obj){

   return this.http.post(AddOfferConfig.addOfferURL,obj, this.options)
    .map(data => data.json(),
  (error: any)=>console.log("error"));
}

couponValidateService(coupon,vendorId){
  return this.http.get(AddOfferConfig.validateCouponUrl+coupon+"/vendorId/"+vendorId, this.options)
  .map(data => data.json(),
  (error: any)=>console.log("error in getting data from database"));
}

changeFlag(obj) {
  return this.http.post(AddOfferConfig.couponFlagChangedUrl,obj, this.options)
    .map(data => data.json(),
  (error: any)=>console.log("error"));
}

putOffersInCarryBag(obj){
  return this.http.put(AddOfferConfig.updateOffersInCarryBag,obj, this.options)
  .map(data => data.json(),
(error: any)=>console.log("error"));
}


getShopAddress(userId) {
  return this.http.get(AddOfferConfig.getVendorDetailURL+userId, this.options)
  .map(data => data.json(),
  (error: any)=>console.log("error in getting data from database"));
}


}
