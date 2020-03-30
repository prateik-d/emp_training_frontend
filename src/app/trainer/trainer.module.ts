import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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



@NgModule({
  declarations: [HomeComponent, HeaderComponent, DashboardComponent, DatatablesComponent, CategoryComponent, EditCategoryComponent, AddCategoryComponent, CoursesComponent, AddCourseComponent, EditCourseComponent, EditLessonsComponent, AddLessonComponent],
  imports: [
    CommonModule
  ]
})
export class TrainerModule { }
