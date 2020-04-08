import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './trainer/home/home.component';
import { DashboardComponent } from './trainer/dashboard/dashboard.component';
import { DatatablesComponent } from './trainer/datatables/datatables.component';

import { CategoryComponent } from './trainer/category/category.component';
import { AddCategoryComponent } from './trainer/category/add-category/add-category.component';
import { EditCategoryComponent } from './trainer/category/edit-category/edit-category.component';


import { CoursesComponent } from './trainer/courses/courses.component';
import { AddCourseComponent } from './trainer/courses/add-course/add-course.component';
import { EditCourseComponent } from './trainer/courses/edit-course/edit-course.component';
import { EditLessonsComponent } from './trainer/courses/edit-lessons/edit-lessons.component';
import { AddLessonComponent } from './trainer/courses/add-lesson/add-lesson.component';
import { UsersComponent } from './trainer/users/users.component';


import { InvalidComponent } from './invalid/invalid.component';


const routes: Routes = [

  { path : 'trainer', component:HomeComponent },

  { path : 'trainer/dashboard', component:DashboardComponent },
  { path : 'trainer/datatable', component:DatatablesComponent },
  
  { path : 'trainer/category', component:CategoryComponent },
  { path : 'trainer/category/add', component:AddCategoryComponent },
  { path : 'trainer/category/edit/:id', component:EditCategoryComponent },
  
  { path : 'trainer/course', component:CoursesComponent },
  { path : 'trainer/course/add', component:AddCourseComponent },
  { path : 'trainer/course/edit/:id', component:EditCourseComponent },
  { path : 'trainer/course/edit-lesson/:id', component:EditLessonsComponent },
  { path : 'trainer/course/add-lesson/:id', component:AddLessonComponent },
  
  { path : 'trainer/users', component:UsersComponent },

  { path: '', component:HomeComponent },
  { path : '**', component:InvalidComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
