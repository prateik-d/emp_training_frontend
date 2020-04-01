import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatatablesComponent } from './datatables/datatables.component';
import { CategoryComponent } from './category/category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { EditLessonsComponent } from './courses/edit-lessons/edit-lessons.component';
import { AddLessonComponent } from './courses/add-lesson/add-lesson.component';

import { ReplaceUnderscorePipe } from '../replace-underscore.pipe';

import { CKEditorModule } from 'ckeditor4-angular';
import { DataTablesModule } from 'angular-datatables';






@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    DashboardComponent, 
    DatatablesComponent, 
    CategoryComponent, 
    EditCategoryComponent, 
    AddCategoryComponent, 
    CoursesComponent, 
    AddCourseComponent, 
    EditCourseComponent, 
    EditLessonsComponent, 
    AddLessonComponent,
    ReplaceUnderscorePipe

  ],
  imports: [
    CommonModule,
    RouterModule,

    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    DataTablesModule,
  ]
})
export class TrainerModule { }
