import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  providers: [SearchService]
})
export class ProductsListComponent implements OnInit {

  public offers : any;
  public priceAfterDiscount: any;

  constructor(private searchService : SearchService) { }

  ngOnInit() {
    this.loadOffers();
  }

  productPrice(offerOriginalPrice,offerDiscount){
    this.priceAfterDiscount = (offerOriginalPrice)*(1-(offerDiscount)/100);
  }

  loadOffers(){
    this.searchService.searchProductsCategoryOnly("clothing")
    .subscribe((res) =>{
      this.offers=res;
      console.log(res);
     },(error) =>{
    });
  }
}
