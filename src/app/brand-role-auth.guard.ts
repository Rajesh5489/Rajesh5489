import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStateService } from './_services/appStateService';

@Injectable({
  providedIn: 'root'
})
export class BrandRoleAuthGuard implements CanActivate {
  constructor(
    private appStateService:AppStateService,
    private router: Router)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
        if(this.appStateService.userType == 'B' || this.appStateService.userType == 'b')
        {
          if(this.appStateService.retailerOrBrandId && this.appStateService.userName)
            return true;
        }
        
        this.router.navigate(["/"]);
        return false;
    }
  
}
