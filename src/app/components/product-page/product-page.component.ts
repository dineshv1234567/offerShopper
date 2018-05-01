import { Component, OnInit, Output, EventEmitter,ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from './../../services/product-detail.service';
import { WishlistService } from './../../services/wishlist.service';
import { CarrybagService } from './../../services/carrybag.service';
import { AuthorizationService } from './../../services/authorization.service';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  providers:[ProductDetailService, WishlistService, AuthorizationService,MessageService]
})

export class ProductPageComponent implements OnInit {

  vendorId: string;
  offerId: string;

  @Output() success = new EventEmitter<any>();
  public searchedProduct: string;
  public productName : string;
  public productDescription : string;
  public productValidity :string;
  public productOriginalPrice :string;
  public productDiscount :string;
  public productSeller :string;
  public offer :any;
  public userInfo : any;
  public user : any;

  constructor(
    private productDetailService : ProductDetailService,
    private route: ActivatedRoute,
    private wishlistService:WishlistService,
    private authorizationService: AuthorizationService,
    private carrybagService: CarrybagService,
    private messageService: MessageService,
    private _vcr: ViewContainerRef
    ) { }

  ngOnInit() {
    this.getUserId();
    this.vendorId=this.route.snapshot.params.id;
    this.offerId = this.route.snapshot.params.offerId;
    if( this.vendorId && this.offerId) {
      this.getOfferById();
    }
    else {
      this.searchProduct();  
    }
  }

 // Function to get customer name and make service call to get customer name from app
 searchProduct(){
   this.productDetailService.searchProduct(this.vendorId)
   .subscribe((res) =>{
     this.offer=res[0];
     this.productName=res[0].offerTitle;
     this.productDescription=res[0].offerDescription;
     this.productValidity=res[0].offerValidity;
     this.productOriginalPrice=res[0].originalPrice;
     this.productDiscount=res[0].offerDiscount;
     this.productSeller=res[0].userId;
     console.log(res[0].offerTitle);
   },(error) =>{

   });
 }

 getOfferById() { 
   this.productDetailService.getOfferById(this.offerId)
   .subscribe((res) =>{
     this.offer=res;
     console.log(res);
     this.productName=res.offerTitle;
     this.productDescription=res.offerDescription;
     this.productValidity=res.offerValidity;
     this.productSeller=res.userId;
     this.productOriginalPrice=res.originalPrice;
     this.productDiscount=res.discount;
   },(error) =>{

   });
 }

 getUserId() {
   this.authorizationService.getUserId().subscribe((res) =>{
     this.userInfo = res.text().split(',');
     this.user = this.userInfo[2];
     console.log(res.text());
   }, (error) =>{
   })
 }


 addToWishlist(offer1) {
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

 addToCarrybag(offer1) {
   let carrybagBean = {
     "userId":this.user,
     "offerId":offer1._id,
     "offerTitle":offer1.offerTitle,
     "offerOriginalPrice":offer1.originalPrice,
     "offerDiscount":offer1.discount,
     "offerImage":"abcd",
     "offerValidity":offer1.offerValidity,
     "vendorId":offer1.userId
   }
   this.carrybagService.addToCarrybag(carrybagBean).subscribe((res) =>{
   },(error) =>{
     this.messageService.showSuccessToast(this._vcr,"Added");
   })
 }
}
