import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from "./details/details.component";
import { AddCardComponent } from "./add-card/add-card.component";
// login
// signup

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/city', component: DetailsComponent },
  { path: 'add', component: AddCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
