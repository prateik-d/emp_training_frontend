import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './trainer/home/home.component';
import { DashboardComponent } from './trainer/dashboard/dashboard.component';
import { DatatablesComponent } from './trainer/datatables/datatables.component';
import { CategoryComponent } from './trainer/category/category.component';
import { AddCategoryComponent } from './trainer/category/add-category/add-category.component';
import { EditCategoryComponent } from './trainer/category/edit-category/edit-category.component';


const routes: Routes = [

  { path : 'trainer', component:HomeComponent },
  { path : 'trainer/dashboard', component:DashboardComponent },
  { path : 'trainer/datatable', component:DatatablesComponent },
  { path : 'trainer/category', component:CategoryComponent },
  { path : 'trainer/category/add', component:AddCategoryComponent },
  { path : 'trainer/category/edit/:id', component:EditCategoryComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
