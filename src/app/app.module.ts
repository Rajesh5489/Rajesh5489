import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSpacesComponent } from './add-spaces/add-spaces.component';
import { CountersComponent } from './counters/counters.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { SearchComponent } from './search/search.component';
import { MapsComponent } from './maps/maps.component';
import { OverviewComponent } from './overview/overview.component'
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AppInitService } from './app-init.service';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { RetailerRequestedComponent } from './retailer-requested/retailer-requested.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    StoreDetailsComponent,
    AddSpacesComponent,
    CountersComponent,
    HomepageComponent,
    MyprofileComponent,
    SearchComponent,
    MapsComponent,
    OverviewComponent,
    HeaderComponent,
    BankDetailsComponent,
    StoreListComponent,
    RetailerRequestedComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [BsDatepickerConfig, AppInitService,
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