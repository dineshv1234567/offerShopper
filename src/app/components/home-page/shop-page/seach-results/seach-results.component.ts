import { Component, OnInit, Input,ViewContainerRef  } from '@angular/core';
import { AuthorizationService } from '../../../../services/authorization.service';
import { MessageService } from '../../../../services/message.service';
import { WishlistService } from '../../../../services/wishlist.service';
import { OffersService } from '../../../../services/offers.service';
@Component({
	selector: 'app-seach-results',
	templateUrl: './seach-results.component.html',
	styleUrls: ['./seach-results.component.css'],
	providers:[AuthorizationService,MessageService,WishlistService]
})
export class SeachResultsComponent implements OnInit {
	public userInfo : any;
	public user : any;

	@Input() results;

	constructor(private wishlistService:WishlistService,
		private authorizationService: AuthorizationService,
		private messageService:MessageService,
		private _vcr:ViewContainerRef,
		private offersService: OffersService ) { }



	ngOnInit() {
		this.getUserId();
	}

	getUserId() {
		this.authorizationService.getUserId().subscribe((res) =>{
			this.userInfo = res.text().split(',');
			this.user = this.userInfo[2];
		}, (error) =>{
		})
	}

	addToWishlist(offer1) {
		console.log(offer1);
		console.log(offer1.offerId);
    let wishlistBean = {
      "userId":this.user,
      "offerId":offer1.offerId,
      "offerTitle":offer1.offerTitle,
      "offerOriginalPrice":offer1.originalPrice,
      "offerDiscount":offer1.discount,
      "offerImage":"abcd",
      "offerValidity":offer1.offerValidity
    }
    this.wishlistService.addToWishlist(wishlistBean).subscribe((res) =>{
      this.messageService.showSuccessToast(this._vcr,"Added");
    },(error) =>{
    })
  }

	addToCarrybag(offer) {
		let carrybagBean = {
			"userId":this.user,
			"offerId":offer.offerId,
			"offerTitle":offer.offerTitle,
			"offerOriginalPrice":offer.originalPrice,
			"offerDiscount":offer.discount,
			"offerImage":"abcd",
			"offerValidity":offer.offerValidity,
			"vendorId":offer.userId
		}
		this.offersService.addToCarrybag(carrybagBean).subscribe((res) =>{
			this.messageService.showSuccessToast(this._vcr,"Added to CarryBag");
		},(error) =>{
			this.messageService.showSuccessToast(this._vcr,"Already Added");
		})
	}

	notLogin(){
		this.messageService.showErrorToast(this._vcr,"Please Login");
	}

}
