import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/shares/trainer/course.service';
import { CategoryService } from 'src/app/shares/trainer/category.service';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit 
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
  courseError:any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private http: HttpClient
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

    this.categoryService.get_all_categories().subscribe((data) => 
    {
      this.cat = data.result;

      // console.log(this.cat)

    });
    // localStorage.removeItem('desc');

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

  create(event)
  {
    var title = ((document.getElementById("title") as HTMLInputElement).value);
    var short_desc = ((document.getElementById("short_desc") as HTMLInputElement).value);
    var sub_category_id = ((document.getElementById("sub_category_id") as HTMLInputElement).value);
    var level = ((document.getElementById("level") as HTMLInputElement).value);
    var language = ((document.getElementById("language") as HTMLInputElement).value);
    var course_provider = ((document.getElementById("course_provider") as HTMLInputElement).value);
    let desc = localStorage.getItem('desc');
    var outcomes = ((document.getElementById("outcomes") as HTMLInputElement).value);
    var requirements = ((document.getElementById("requirements") as HTMLInputElement).value);
    
    const formData = new FormData();

    
    // console.log(title);
    // console.log(short_desc);
    // console.log(sub_category_id);
    // console.log(level);
    // console.log(language);
    // console.log(course_provider);
    // console.log(course_url);
    // console.log(desc);
    // return;
    // if(title === '')
    // {
      //   console.log('no title')
      // }
      // else if(short_desc === '')
      // {
        //   console.log('no short desc')
        // }
        // else if(category === '0')
        // {
          //   console.log('no category')
    // }
    // else if(level === '0')
    // {
      //   console.log('no level')
      // }
      // else if(language === '0')
      // {
        //   console.log('no language')
        // }
        // else if(course_provider === '0')
        // {
          //   console.log('no course provider')
          // }
          // else if(course_url === '')
          // {
            //   console.log('no course url')
            // }
            // else if(desc === null)
            // {
              //   console.log('no desc')
              // }
              
              formData.append('title', title);
              formData.append('outcomes', outcomes);
              formData.append('requirements', requirements);
              formData.append('short_desc', short_desc);
              formData.append('sub_category_id', sub_category_id);
              formData.append('level', level);
              formData.append('language_made_in', language);
              formData.append('course_provider', course_provider);
              formData.append('desc', desc);
              formData.append('thumbnail', this.courseForm.get('thumbnail').value);
              formData.append('trainer_id', this.trainer_id);
              
    if(this.course_url === '1' )
    {
      var course_url = ((document.getElementById("course_url") as HTMLInputElement).value);
      formData.append('course_url', course_url);
    }
    else if(this.video_uploader === '1')
    {
      var video_upload = ((document.getElementById("video_upload") as HTMLInputElement).value);
      formData.append('video_upload',  this.courseForm.get('video_upload').value);
    }
    
    
    this.courseService.create(formData).subscribe((data) => {
      
      console.log(data);
      if (data.status === '400') 
      {
        this.courseError = 'something went wrong...';
      } 
      else 
      {
        this.router.navigate(['/trainer/course/']);
      }
      
      
    });

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
