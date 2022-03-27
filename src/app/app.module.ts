import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './brand/homepage/homepage.component';
import { MyprofileComponent } from './brand/myprofile/myprofile.component';
import { SearchComponent } from './brand/search/search.component';
import { MapsComponent } from './brand/maps/maps.component';
import { OverviewComponent } from './brand/overview/overview.component'
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { AppInitService } from './app-init.service';
import { BankDetailsComponent } from './common/bank-details/bank-details.component';
import { StoreListComponent } from './retailer/store-list/store-list.component';
import { StoreDetailsComponent } from './retailer/store-details/store-details.component';
import { LoginComponent } from './common/login/login.component';
import { LandingPageComponent } from './common/landing-page/landing-page.component';
import { BookingsComponent } from './retailer/bookings/bookings.component';
import { ShelvesComponent } from './retailer/shelves/shelves.component';
import { RetailHomeComponent } from './retailer/retail-home/retail-home.component';
import { StoreHomeComponent } from './brand/store-home/store-home.component';
import { StoreBookingsComponent } from './brand/store-bookings/store-bookings.component';
import { AllBookingsComponent } from './brand/all-bookings/all-bookings.component';
import { StoreCartComponent } from './brand/store-cart/store-cart.component';
import { RetailerRegistrationComponent } from './retailer/retailer-registration/retailer-registration.component';
import { BrandRegistrationComponent } from './brand/brand-registration/brand-registration.component';
import { RetailSubHomeComponent } from './retailer/retail-sub-home/retail-sub-home.component';
import { ConfirmedBookingsComponent } from './retailer/confirmed-bookings/confirmed-bookings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FinalCheckoutComponent } from './brand/final-checkout/final-checkout.component';
import { ImageViewerComponent } from './common/image-viewer/image-viewer.component';
import { StoreDetailsViewComponent } from './brand/store-details-view/store-details-view.component';
import { ShelfDetailsViewComponent } from './brand/shelf-details-view/shelf-details-view.component';
import { CampaignsComponent } from './brand/campaigns/campaigns.component';

@NgModule({
  declarations: [
    AppComponent,
    RetailerRegistrationComponent,
    StoreDetailsComponent,
    ShelvesComponent,
    HomepageComponent,
    MyprofileComponent,
    SearchComponent,
    MapsComponent,
    OverviewComponent,
    HeaderComponent,
    BankDetailsComponent,
    StoreListComponent,
    BookingsComponent,
    LoginComponent,
    LandingPageComponent,
    RetailHomeComponent,
    StoreHomeComponent,
    StoreBookingsComponent,
    AllBookingsComponent,
    StoreCartComponent,
    BrandRegistrationComponent,
    RetailSubHomeComponent,
    ConfirmedBookingsComponent,
    FinalCheckoutComponent,
    ImageViewerComponent,
    StoreDetailsViewComponent,
    ShelfDetailsViewComponent,
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NgbModule
  ],
  providers: [BsDatepickerConfig, AppInitService, DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [AppInitService],
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function init(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.load();
  }
}