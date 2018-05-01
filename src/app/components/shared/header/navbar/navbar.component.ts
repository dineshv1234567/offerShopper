import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../../../services/authorization.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import{Location} from '@angular/common';
import { LoginService } from '../../../../services/login.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
	providers:[ AuthorizationService, LoginService ]
})

export class NavbarComponent implements OnInit {

	private login:boolean = false;
	private token:any;
	private userId: string;
	private user: string;
	private active;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authorizationService: AuthorizationService,
		private location:Location,
		private loginService: LoginService
		) { 
		console.log(this.router.url);

		console.log(location.prepareExternalUrl(location.path()));
	}


	ngOnInit() {
		this.loginService.isLoggedin.subscribe(status => {
			console.log(status+"worked")
		});
		this.isLogin();
	}

	isLogin(){
		// this.loginService.isLoggedin.subscribe(status => console.log(status+"worked"));
		this.login = this.authorizationService.isLogin();
		this.getUserId();
	}

	logout(){
		this.authorizationService.logout();
		this.isLogin();
		this.loginService.logout();
	}

	getUserId() {
		this.authorizationService.getUserId().subscribe((res:any) =>{
			this.userId = (res.text().split(','))[2];
			this.user = (this.userId.split('@'))[0];
			console.log(this.user);
		}, (error) =>{
		})
	}

}
