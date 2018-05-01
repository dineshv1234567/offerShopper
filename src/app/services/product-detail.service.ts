import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product } from '../configs/product.config';

@Injectable()
export class ProductDetailService {

  private header;
  options:RequestOptions;

 constructor(private http : Http) {
   this.header = new Headers();
   this.header.append('Authorization',localStorage.getItem("application-token"));
   this.options = new RequestOptions({headers: this.header});
 }


  // Function to get customer name and make service call to get customer name from App
  searchProduct(vendorId) {
    return this.http.get(Product.mapping+vendorId+"/offers", this.options)
     .map(data => data.json(),
   (error: any)=>this.handleError(error));
   }
   private handleError(error: Response){
     return Observable.throw(error.statusText);
   }

   getOfferById(offerId) {
  return this.http.get(Product.getOfferByOfferId+offerId, this.options)
   .map(data => data.json(),
     (error: any)=>console.log("error in getting data from database"));
 }
 }
