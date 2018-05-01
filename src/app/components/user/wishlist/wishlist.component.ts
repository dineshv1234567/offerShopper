import { Component, OnInit} from '@angular/core';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthorizationService } from '../../../services/authorization.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  providers:[WishlistService, AuthorizationService]
})
export class WishlistComponent implements OnInit {

  constructor(
    private wishlistService: WishlistService,
    private authorizationService: AuthorizationService
  ) { }

  priceAfterDiscount: any;

  ngOnInit() {
    this.getUserId();
  }
  public wishlistOffers=[];
  public userInfo;
  public userId;

  productPrice(offerOriginalPrice,offerDiscount){
  	this.priceAfterDiscount = (offerOriginalPrice)*(1-(offerDiscount)/100);
  }
  getUserId() {
		this.authorizationService.getUserId().subscribe((res) =>{
			this.userInfo = res.text().split(',');
      this.userId = this.userInfo[2];
      this.getWishlist();
		}, (error) =>{
      console.log(error);
		})
	}
  getWishlist() {
    this.wishlistService.getWishlist(this.userId).subscribe((res) =>{
      this.wishlistOffers = res;
      console.log(this.wishlistOffers);
      }, (error) =>{
      })
  }
  deleteOffer(offerId,userId){
      this.wishlistService.deleteRestaurant(offerId,userId).subscribe((res) =>{
    	this.getWishlist();
       }, (error) =>{
         alert(error + "deleting restaurant does not works");
       })
   }
}
