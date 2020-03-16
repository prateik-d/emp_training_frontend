import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { CategoryService } from 'src/app/shares/trainer/category.service';
import { CourseService } from 'src/app/shares/trainer/course.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses = [];
  constructor(
    private router: Router,
    private courseService: CourseService
  ) 
  { 

    this.courseService.get_all_courses().subscribe((data) => {
        
      this.courses = data.result;

      console.log(data);
      
    });
  }


  ngOnInit() 
  {

  }

  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }
}
