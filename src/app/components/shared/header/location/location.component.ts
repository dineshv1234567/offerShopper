import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../../services/location.service';
import { Cities}  from '../../../../configs/cities.config'
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
   providers:[LocationService]
})
export class LocationComponent implements OnInit {
 


constructor(private locationService: LocationService) { }
// array of Cities
cities = Cities.citiesName;
selected:any="Gurgaon";
obj ={a:"Delhi"}
fav(selected){
   this.obj.a=selected;
}

getlocation(){
var varobj=this.obj;
let locationService=this.locationService;
if (!navigator.geolocation){
  return;
}  
function error() {
   console.log("error");
}  
function get(varobj){
    navigator.geolocation.getCurrentPosition((position)=>{
    var Latitude  = position.coords.latitude;
    var Longitude = position.coords.longitude;

    locationService.getLocation(position.coords.latitude, position.coords.longitude).subscribe((res) =>{

         console.log(res.results[0].formatted_address);
         var result = res.results[0].formatted_address.toString().split(",");
         var a = result.length;
         console.log(result[a-3]);
         if(result[a-3].trim()=="Gurugram".trim())
           varobj.a="Gurgaon";
         else
           varobj.a=result[a-3];
         console.log(Latitude+" "+Longitude+" "+varobj.a);
         localStorage.setItem("loc",varobj.a);


   }, (error) =>{ console.log("error")    
   })

}, error);
 }
//function call to callback
get(varobj);

}


 ngOnInit(){
    this.cities.sort(function(a,b){
    return a.localeCompare(b);
   });

    var value:String=localStorage.getItem("loc");
      if(value){
        if(value.trim()=="Gurugram".trim())
          this.obj.a="Gurgaon";
        else
           this.obj.a=value.trim();
      }
      else
        this.getlocation();

 }



}

