import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    state: new FormControl('')
  })
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
  removeSpace(index:any) {
    var currentElement = this.groups[index];
    this.groups.splice(index, 1);
  }
}
