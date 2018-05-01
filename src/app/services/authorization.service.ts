import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthorizationService {

	constructor(
		private router: Router,
		private http: Http
		) { }

	getToken() {
		let token=localStorage.getItem("application-token");
		if(!token) {
			return this.router.navigate(['/','login']);
		}
		return token;
	}

	isLogin() {
		let token=localStorage.getItem("application-token");
		if(!token) {
			return false;
		}
		return true;
	}

	getUserId(){
		let token=localStorage.getItem("application-token");
		return this.http.get("http://10.151.61.152:8765/api/uaa-server/verifytoken/"+token)
		.map((res:Response) =>res,(error: any)=>error.json());
	}

	logout() {
		localStorage.removeItem("application-token");
	}

	// authorization() {
	// 	   if(!this.isLogin()) {
	// 			 return this.router.navigate(['/','login']);
	// 		 }else {
	// 			 let token=localStorage.getItem("application-token");
  //      	let headers = new Headers({ 'Authorization': token });
  //        return new RequestOptions({ headers: headers});
  //      }
  //      return new RequestOptions({ headers: headers });
  //    }
	 }


/*true, role, emailId*/
