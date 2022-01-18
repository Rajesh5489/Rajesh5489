import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from '../shared/appStateService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    retailerId: new FormControl(''),
    userType: new FormControl('')
  });

  constructor(private appstateservice: AppStateService, private router: Router) {
  }

  ngOnInit(): void {
  }

  Login() {
    this.appstateservice.userType = this.loginForm.value.userType;
    this.appstateservice.retailerId = this.loginForm.value.retailerId;
    this.router.navigate(["/storelist"]);
  }

  Register()
  {
    this.router.navigate(["/registration"]);
  }

}
