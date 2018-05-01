import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';
import { Wishlist } from './../configs/wishlist.config';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class WishlistService {


    private header;
    options:RequestOptions;

  constructor(
    private http: Http,
private authorizationService: AuthorizationService
  ) {
    this.header = new Headers();
    this.header.append('Authorization',localStorage.getItem("application-token"));
    this.options = new RequestOptions({headers: this.header});
  }

  getWishlist(userId){
    return this.http.get(Wishlist.getWishlistUrl+userId, this.options)
    .map(data => data.json(),
    (error: any)=>console.log("error in getting data from database"));
  }

  addToWishlist(offer){
    console.log(offer);
    return this.http.post(Wishlist.postWishlistUrl, offer, this.options)
     .map(data => data.status,
   (error: any)=>console.log("error in adding wishlist"));
  }


  deleteRestaurant(offerId,userId) {
  	return this.http.delete(Wishlist.deleteWishlistUrl+offerId+"/"+userId, this.options)
    .map(data => data.status,
      (error: any)=>console.log(error + "error in deleting offer"));
  }
}
