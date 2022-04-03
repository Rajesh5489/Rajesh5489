import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/_services/appStateService';
import { CompanyService } from 'src/app/_services/companyService';

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

  constructor(
    private appStateService: AppStateService, 
    private companyService : CompanyService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  Login() {

     this.companyService.getUserMappings(this.loginForm.value.userName,
      (res: any) => {
        if (res) {
          this.appStateService.userName = this.loginForm.value.userName;
          this.appStateService.retailerOrBrandId = res.retailerOrBrandId;
          this.appStateService.userType = res.userType;

          if(res.userType == 'R' || res.userType == 'r')
          {
            this.router.navigate(["/retail-home"]);
          }
          else if(res.userType == 'B' || res.userType == 'b')
          {
            this.router.navigate(["/brand-home"]);
          }
          else
          {
            this.router.navigate(["/"]);
          }
        }
      },
      (err: any) => {
        this.router.navigate(["/"]);
      });
  }
}
