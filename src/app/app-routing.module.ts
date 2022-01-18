import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreDetailsComponent } from './retailer/store-details/store-details.component';
import { HomepageComponent } from './brand/homepage/homepage.component'
import { StoreListComponent } from './retailer/store-list/store-list.component';
import { BankDetailsComponent } from './common/bank-details/bank-details.component';
import { LoginComponent } from './common/login/login.component';
import { BookingsComponent } from './retailer/bookings/bookings.component';
import { RegistrationComponent } from './retailer/registration/registration.component';
import { ShelvesComponent } from './retailer/shelves/shelves.component';
import { LandingPageComponent } from './common/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'storedetails', component: StoreDetailsComponent },
  { path: 'shelves', component: ShelvesComponent },
  { path: 'brand-home', component: HomepageComponent },
  { path: 'storelist', component: StoreListComponent },
  { path: 'bankdetails', component: BankDetailsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'retailer-registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
