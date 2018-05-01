import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from '../../services/offers.service';
import { SubscribeService } from '../../services/subscribe.service';
import { AuthorizationService } from './../../services/authorization.service';
import { MessageService } from './../../services/message.service';
import { WishlistService } from './../../services/wishlist.service';

@Component({
  selector: 'app-vendor-page',
  templateUrl: './vendor-page.component.html',
  styleUrls: ['./vendor-page.component.css'],
  providers:[OffersService,AuthorizationService,MessageService,SubscribeService,WishlistService]
})

export class VendorPageComponent implements OnInit {

  lat: number;
  lng: number;
  offersList:Array<{}>=[];
  priceAfterDiscount: any;
  shopName:string;
  address:any;
  data:any;
  street:string;
  city:string;
  zip:number;
  state:string;
  vendorId:string;
  public userInfo : any;
  public user : any;

  constructor(
    private offersService: OffersService,
    private subscribeService:SubscribeService,
    private wishlistService:WishlistService,
    private route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private messageService:MessageService,
    private _vcr:ViewContainerRef
    ) { }

  ngOnInit() {
    this.getUserId();
    this.vendorId=this.route.snapshot.params.id;
    this.getOfferlist();
  }

  getUserId() {
    this.authorizationService.getUserId().subscribe((res) =>{
      this.userInfo = res.text().split(',');
      this.user = this.userInfo[2];
    }, (error) =>{
    })
  }

  productPrice(offerOriginalPrice,offerDiscount){
    this.priceAfterDiscount = (offerOriginalPrice)*(1-(offerDiscount)/100);
  }
  getOfferlist() {
    this.offersService.getOffers(this.vendorId).subscribe((res) =>{
      this.offersList = res;
      this.data = res;
      console.log(this.data);
      this.shopName=this.data[0].address.name.toUpperCase()
      this.street=this.data[0].address.street.toUpperCase();
      this.city=this.data[0].address.city.toUpperCase();
      this.zip=this.data[0].address.zipCode;
      this.state=this.data[0].address.state.toUpperCase();
      this.initMap();
    }, (error) =>{
    })
  }
  initMap(){
    this.offersService.getAddress(this.street,this.city,this.state,this.zip).subscribe((res) =>{
      this.address = res;
      this.lat=(this.address.results[0].geometry.location.lat);
      this.lng=(this.address.results[0].geometry.location.lng);
    }, (error) =>{
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
    })
  }

  notLogin(){
    this.messageService.showErrorToast(this._vcr,"Please Login");
  }

  subscribe(){
    let subscribeBean={
      "userId":this.user,
      "vendorId":this.vendorId,
      "shopName":this.shopName,
    }
    console.log(subscribeBean);
    this.subscribeService.addToSubscriptionList(subscribeBean).subscribe((res) =>{
      this.messageService.showSuccessToast(this._vcr,"Added to Subscription List");
    },(error) =>{
      this.messageService.showSuccessToast(this._vcr,"Already in Subscription List");
    })
  }

  addToWishlist(offer1) {
    console.log(offer1);
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

}
