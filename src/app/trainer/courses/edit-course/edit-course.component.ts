import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shares/trainer/course.service';
import { CategoryService } from 'src/app/shares/trainer/category.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit 
{

  cat = [];
  sub_cat = [];
  selectedCat:any;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  cke_data : any;
  courseForm: FormGroup;
  course_provider_value:any;
  video_uploader:any;
  course_url:any;
  trainer_id:any;
  course_id:any;
  course = [];
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private http: HttpClient,
    private route: ActivatedRoute

  ) {

  }

  ngOnInit() 
  {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      short_desc: [''],
      category: ['', Validators.required],
      level: [''],
      language: [''],
      course_provider: [''],
      course_url: [''],
      video_upload: [''],
      desc: [''],
      thumbnail: ['']
    });

    this.course_id = this.route.snapshot.paramMap.get("id");

    console.log(this.course_id);

    // this.course_id = ;

    this.categoryService.get_all_categories().subscribe((data) => 
    {
      this.cat = data.result;
      
    });
    this.courseService.get_course_details(this.course_id).subscribe((data) => 
    {
      this.course = data.course;
      console.log(data.course)
    });
    
    this.video_uploader = '0';
    this.course_url = '1';

    let user = localStorage.getItem('currentUser');
    var trainer_data = JSON.parse(user);

    // console.log(trainer_data['result'].trainer_id);

    this.trainer_id = trainer_data['result'].trainer_id;

  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();


    if (fileInput.target.files.length > 0) {
      const file = fileInput.target.files[0];
      // console.log(file);
      this.courseForm.get('thumbnail').setValue(file);
    }

  }

  video_upload(fileInput: any) {
    
    if (fileInput.target.files.length > 0) {

      

      const file = fileInput.target.files[0];
      // console.log(file);
      // console.log(file.size);
      // console.log(file.type);

      if(!(file.type.includes('video')))
      {
        console.log('not video');
      }
      else if(file.size > 10000000)
      {
        console.log('file is too large');
      }
      else
      {
        this.courseForm.get('video_upload').setValue(file);
      }

    }

  }

  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }


  ckeditor_data(event)
  {
    this.cke_data = event.editor.getData();
    // console.log(this.cke_data);

    localStorage.setItem('desc', this.cke_data);
  }
  
  course_provider(event)
  {
    // console.log(event);
    this.course_provider_value = event.target.value;
    console.log(this.course_provider_value);

    if(this.course_provider_value === 'video_upload')
    {
      this.course_url = '0';
      this.video_uploader = '1';
    }
    else
    {
      this.course_url = '1';
      this.video_uploader = '0';
    }
  }

}
