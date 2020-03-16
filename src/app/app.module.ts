import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './trainer/home/home.component';
import { HeaderComponent } from './trainer/header/header.component';
import { DashboardComponent } from './trainer/dashboard/dashboard.component';
import { DatatablesComponent } from './trainer/datatables/datatables.component';

import { CategoryComponent } from './trainer/category/category.component';
import { AddCategoryComponent } from './trainer/category/add-category/add-category.component';
import { EditCategoryComponent } from './trainer/category/edit-category/edit-category.component';

import { CoursesComponent } from './trainer/courses/courses.component';
import { AddCourseComponent } from './trainer/courses/add-course/add-course.component';
import { EditCourseComponent } from './trainer/courses/edit-course/edit-course.component';


import { DataTablesModule } from 'angular-datatables';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TrainerModule } from './trainer/trainer.module';
import { InvalidComponent } from './invalid/invalid.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DashboardComponent,
    DatatablesComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CoursesComponent,
    AddCourseComponent,
    EditCourseComponent,
    InvalidComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
