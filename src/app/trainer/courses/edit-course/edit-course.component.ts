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
  sections = [];
  subcategory_id:any;
  subcategory_title:any;

  edit_section_id: any;
  edit_section_course_id: any;
  edit_section_title: any;

  courseError:any;

  currentSection:any;


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
      id: ['', Validators.required],
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

    // console.log(this.course_id);

    // this.course_id = ;

    this.categoryService.get_all_categories().subscribe((data) => 
    {
      this.cat = data.result;
      
    });
    
    this.courseService.get_course_details(this.course_id).subscribe((data) => 
    {
      this.course = data.course;
      this.course_provider_value = data.course.course_overview_provider;
      this.subcategory_id = data.course.sub_category_id;
      // console.log(data.course);
      this.categoryService.get_category(this.subcategory_id).subscribe((subcat) => 
      {
        this.subcategory_title = subcat.category.name;
        // console.log(this.subcategory_title);
      });

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
    });
    

    this.courseService.get_all_sections(this.course_id).subscribe((data) => 
    {
      this.sections = data.result;
      // console.log(this.sections)
      
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

  add_section(event)
  {
    var course_id = ((document.getElementById("section_course_id") as HTMLInputElement).value);
    var title = ((document.getElementById("section_title") as HTMLInputElement).value);

    // console.log(course_id);
    // console.log(section_id);
    // console.log(section_title);

    const formData = new FormData();

    formData.append('course_id', course_id);
    formData.append('title', title);


    this.courseService.add_section(formData).subscribe((data) => {
      
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
  
  setSectionData(count)
  {
    console.log(count);
    this.currentSection = this.sections[count]
  }
  

  // edit_section()
  edit_section(section_id, section_title)
  {

    const formData = new FormData();

    formData.append('id', section_id);
    formData.append('course_id', this.course_id);
    formData.append('title', section_title);

    this.courseService.edit_section(formData).subscribe((data) => {
      
      console.log(data);
      
      if (data.status === '400') 
      {
        this.courseError = 'something went wrong...';
      } 
      else 
      {
        this.router.navigate(['/trainer/course/edit/'+this.course_id]);
      }
      
    });


  }

  // delete section
  delete_section(section_id)
  {
    this.courseService.delete_section(section_id).subscribe((data) => 
    {
      console.log(data); 

      if (data.status === '400') 
      {
        this.courseError = 'something went wrong...';
      } 
      else 
      {
        this.router.navigate(['/trainer/course/edit/'+this.course_id]);
      }
      
    });
  }

  // delete lesson
  delete_lesson(lesson_id)
  {
    // console.log(lesson_id);

    this.courseService.delete_lesson(lesson_id).subscribe((data) => 
    {
     
      console.log(data);
     
      if (data.status === '400') 
      {
        this.courseError = 'something went wrong...';
      } 
      else 
      {
        this.router.navigate(['/trainer/course/edit/'+this.course_id]);
      } 
        
    });


  }

  // edit course

  edit(event)
  {
    var id = ((document.getElementById("id") as HTMLInputElement).value);
    var title = ((document.getElementById("title") as HTMLInputElement).value);
    var short_desc = ((document.getElementById("short_desc") as HTMLInputElement).value);
    var sub_category_id = ((document.getElementById("sub_category_id") as HTMLInputElement).value);
    var level = ((document.getElementById("level") as HTMLInputElement).value);
    var language = ((document.getElementById("language") as HTMLInputElement).value);
    var course_provider = ((document.getElementById("course_provider") as HTMLInputElement).value);
    let desc = localStorage.getItem('desc');
    // var outcomes = ((document.getElementById("outcomes") as HTMLInputElement).value);
    // var requirements = ((document.getElementById("requirements") as HTMLInputElement).value);
    
    const formData = new FormData();

    formData.append('id', id);
    formData.append('title', title);
    // formData.append('outcomes', outcomes);
    // formData.append('requirements', requirements);
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
    
    
    this.courseService.edit(formData).subscribe((data) => {
      
      console.log(data);
      
      if (data.status === '400') 
      {
        this.courseError = 'something went wrong...';
      } 
      else 
      {
        this.router.navigate(['/trainer/course/edit/'+this.course_id]);
      }
      
      
    });

  }

}
