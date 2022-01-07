import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { AddSpacesService } from './add-spacesService';
@Component({
  selector: 'app-add-spaces',
  templateUrl: './add-spaces.component.html',
  styleUrls: ['./add-spaces.component.scss']
})
export class AddSpacesComponent {
  public groups = [1];
  states: any = ["telangana", "AndhraPradesh", "Orissa"];
  url = "./assets/plus.png"
  addSpaces = new FormGroup({
    shelf: new FormControl(''),
    category: new FormControl(''),
    state: new FormControl('')
  })
  shelfTypes: any;
  productCategories: any;
  constructor(
    public addSpacesService: AddSpacesService
  ) { }
  ngOnInit() {
    this.getShelfTypes();
    this.getProductCategories();
  }
  getShelfTypes() {
    this.addSpacesService.getShelfTypes(
      (res: any) => {
        this.shelfTypes = res;
      },
      (err: any) => { })
  }
  getProductCategories() {
    this.addSpacesService.getProductCategories(
      (res: any) => {
        this.productCategories = res;
      },
      (err: any) => { })
  }
  onSelectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
  addNewSpace() {
    this.groups.push(this.groups.length);
  }
  removeSpace(index: any) {
    var currentElement = this.groups[index];
    this.groups.splice(index, 1);
  }
}
