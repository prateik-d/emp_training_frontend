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
      desc: [''],
      thumbnail: ['']
    });

    this.categoryService.get_all_categories().subscribe((data) => {
    // this.categoryService.show_all_categories().subscribe((data) => {
        
      this.cat = data.result;

      console.log(this.cat)

    });
    // localStorage.removeItem('desc');


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
    var category = ((document.getElementById("category") as HTMLInputElement).value);
    var level = ((document.getElementById("level") as HTMLInputElement).value);
    var language = ((document.getElementById("language") as HTMLInputElement).value);
    var course_provider = ((document.getElementById("course_provider") as HTMLInputElement).value);
    var course_url = ((document.getElementById("course_url") as HTMLInputElement).value);
    let desc = localStorage.getItem('desc');

    
    // console.log(title);
    // console.log(short_desc);
    // console.log(category);
    // console.log(level);
    // console.log(language);
    // console.log(course_provider);
    // console.log(course_url);
    // console.log(desc);

    if(title === '')
    {
      console.log('no title')
    }
    else if(short_desc === '')
    {
      console.log('no short desc')
    }
    else if(category === '0')
    {
      console.log('no category')
    }
    else if(level === '0')
    {
      console.log('no level')
    }
    else if(language === '0')
    {
      console.log('no language')
    }
    else if(course_provider === '0')
    {
      console.log('no course provider')
    }
    else if(course_url === '')
    {
      console.log('no course url')
    }
    else if(desc === null)
    {
      console.log('no desc')
    }



  }

  ckeditor_data(event)
  {
    // console.log( event.editor.getData() );
    this.cke_data = event.editor.getData();
    // console.log(this.cke_data);

    localStorage.setItem('desc', this.cke_data);


  }
}
