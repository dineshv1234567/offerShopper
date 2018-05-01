import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

  constructor(private http : Http) { }

  getLocation(latitude, longitude){

           return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyAo1T39BeJIQe5CFji9MqvBD-WGudXSXu4")

    .map(data => data.json(),

    (error: any)=>this.handleError(error));  

    }

    private handleError(error: Response){

    return Observable.throw(error.statusText);

  }

}