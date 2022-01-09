import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AddSpacesService } from './add-spacesService';
@Component({
  selector: 'app-add-spaces',
  templateUrl: './add-spaces.component.html',
  styleUrls: ['./add-spaces.component.scss']
})
export class AddSpacesComponent {
  states: any = ["telangana", "AndhraPradesh", "Orissa"];
  url = "./assets/plus.png"
  spaceFormArray: Array<FormGroup> = [];
  shelfTypes: any;
  productCategories: any;
  formBuilder: any;

  constructor(
    private router: Router,
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
    this.spaceFormArray.push(
      this.createItem());
  }

  removeSpace(space: any, index: any) {
    let i = this.spaceFormArray.findIndex(
      x => x.value.shelfId === space.value.shelfId
    );
    this.spaceFormArray.splice(i, 1);
  }

  saveSpaces() {
    this.router.navigate(["/storelist"]);
  }

  createItem(): FormGroup {
    return new FormGroup({
      shelfId: new FormControl(1),
      shelf: new FormControl(''),
      category: new FormControl(''),
      state: new FormControl('')
    });
  }
}
