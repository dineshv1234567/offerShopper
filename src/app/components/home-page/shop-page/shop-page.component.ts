import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../../services/search.service';
import { Product } from '../../../configs/product.config';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {

  constructor( 
    private route: ActivatedRoute,
    private searchService : SearchService ) { }

  private category: string;
  private searchKey: string;
  //results retrieved from searching
  private results : any = [];  
  
  ngOnInit() {   
    this.route.paramMap.subscribe(params => {
      this.category = params.get('id1');
      this.searchKey = params.get('id2');
      this.loadOffers();
    });
  }

  //to be loaded when it is routed to this component
  loadOffers() {
     //no results shown
  if(this.category=="All" && this.searchKey == "") {
    alert("Please select a category or search for a deal.");
  }

  // category based search
  else if(this.category == "All" && this.searchKey != "") {
    this.searchService.searchProducts(this.searchKey)
    .subscribe(res => {
      this.results = res;
    });
    }  

  else if(this.category != "All" && this.searchKey == "") {
    this.searchService.searchProductsCategoryOnly(this.category)
    .subscribe(res => {
      this.results = res;
    });
  }
  //search by both category and key
  else {
    this.searchService.searchProductsCategoryAndKey(this.category, this.searchKey)
    .subscribe(res => {
      this.results = res;
    });
    
    }
  }

  //function for chosing on which basis to sort from
  sortBy(x) {
    switch (x) {
      case "priceLH":
        this.results.sort(this.sorters.byPrice);
        break;

      case "priceHL":
        this.results.sort(this.sorters.byPrice);
        this.results.reverse();
        break;

      case "discountLH":
        this.results.sort(this.sorters.byDiscount);
        break;

      case "discountHL":
        this.results.sort(this.sorters.byDiscount);
        this.results.reverse();
        break;
    }
  }

 //sorting 
  sorters = {
    byPrice: function(firstProduct, secondProduct) {
      return firstProduct.originalPrice - secondProduct.originalPrice;
    },
    byDiscount: function(firstProduct, secondProduct) {
      return firstProduct.discount - secondProduct.discount;
    }
  };

  //whenever filter is changed
  onMyChange(event) {
    this.results.filter((product)=> product.discount > event.from && product.discount < event.to);
  }

}