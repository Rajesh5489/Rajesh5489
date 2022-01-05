import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent{
  constructor(private route : Router){ }
  states :any =["telangana","AndhraPradesh","Orissa"];
  areaInSfts :any =["1000sft","2000sft","300sft"];
  projectedFootballs:any=["Projected Football per Month","Projected Football per Month2","Projected Football per Month3"]
  estimatedFootballs:any=["Estimated Football per Month","Estimated Football per Month","Estimated Football per Month"]
  url="./assets/plus.png"
  storeDetails = new FormGroup({
    storeName: new FormControl(''),
    fullAddress: new FormControl(''),
    geoTag: new FormControl(''),
    location: new FormControl(''),
    city: new FormControl(''),
    pinCode: new FormControl(''),
    areaInSft: new FormControl(''),
    gstin: new FormControl(''),
    projectedFootball: new FormControl(''),
    estimatedFootball: new FormControl(''),
    state:new FormControl(''),
    
  });
  onSelectFile(event:any){
        if(event.target.files){
          var reader= new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload=(event:any)=>{
            this.url=event.target.result;
          }

        }
  }
  addSpaces(){
    this.route.navigate(["/addSpaces"])
  }
}
