import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreDetailsComponent } from './retailer/store-details/store-details.component';
import { HomepageComponent } from './brand/homepage/homepage.component'
import { StoreListComponent } from './retailer/store-list/store-list.component';
import { BankDetailsComponent } from './common/bank-details/bank-details.component';
import { LoginComponent } from './common/login/login.component';
import { BookingsComponent } from './retailer/bookings/bookings.component';
import { ShelvesComponent } from './retailer/shelves/shelves.component';
import { LandingPageComponent } from './common/landing-page/landing-page.component';
import { RetailHomeComponent } from './retailer/retail-home/retail-home.component';
import { StoreHomeComponent } from './brand/store-home/store-home.component';
import { RetailerRoleAuthGuard } from './retailer-role-auth.guard';
import { BrandRoleAuthGuard } from './brand-role-auth.guard';
import { RetailerRegistrationComponent } from './retailer/retailer-registration/retailer-registration.component';
import { BrandRegistrationComponent } from './brand/brand-registration/brand-registration.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },

  { path: 'retail-home', component: RetailHomeComponent, canActivate: [RetailerRoleAuthGuard] },
  { path: 'retailer-registration', component: RetailerRegistrationComponent },
 
  { path: 'brand-home', component: HomepageComponent, canActivate: [BrandRoleAuthGuard] },
  { path: 'brand-registration', component: BrandRegistrationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
