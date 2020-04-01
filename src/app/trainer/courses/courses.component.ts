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
  courseError: any;
  constructor(
    private router: Router,
    private courseService: CourseService
  ) 
  { 

    this.courseService.get_all_courses().subscribe((data) => {
        
     this.courses = data.result;

      // console.log(data);
      
    });
  }


  ngOnInit() 
  {

  }
  delete(course_id)
  {
    this.courseService.delete(course_id).subscribe((data) => 
    {
      console.log(data); 

      if (data.status === '400') 
      {
        this.courseError = 'something went wrong...';
      } 
      else 
      {
        this.router.navigate(['/trainer/course']);
      }
      
    });
  }
}
