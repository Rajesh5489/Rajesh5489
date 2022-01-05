import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSpacesComponent } from './add-spaces/add-spaces.component';
import { CountersComponent } from './counters/counters.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomepageComponent} from './homepage/homepage.component'
const routes: Routes = [
  { path: '', component: UserDetailsComponent },
  { path: 'storedetails', component: StoreDetailsComponent },
  { path: 'addSpaces', component: AddSpacesComponent },
  { path: 'counters', component: CountersComponent },
  {path:'homePage',component:HomepageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
