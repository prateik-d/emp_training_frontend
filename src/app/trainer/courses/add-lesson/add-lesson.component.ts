import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/shares/trainer/course.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit 
{
  sections = [];
  section_id:any;
  course_id:any;
  lesson_type:any;
  lesson_provider:any;
  lessonForm: FormGroup;
  fileData: File;
  previewUrl: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit() 
  {

    
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      section: ['', Validators.required],
      lesson_type: ['', Validators.required],
      attachment: [''],
      lesson_provider: [''],
      video_url: [''],
      video_thumbnail: [''],
      video_duration: [''],
      video_upload: [''],
      summary: [''],
    });



    this.course_id = this.route.snapshot.paramMap.get("id");

    // console.log(this.course_id);

    this.courseService.get_all_sections(this.course_id).subscribe((data) => 
    {
      this.sections = data.result;
      console.log(this.sections)
    });
    
  }

  create(event)
  {

    const formData = new FormData();

    var title = ((document.getElementById("title") as HTMLInputElement).value);
    var section = ((document.getElementById("section") as HTMLInputElement).value);
    var lesson_type = ((document.getElementById("lesson_type") as HTMLInputElement).value);
    var summary = ((document.getElementById("summary") as HTMLInputElement).value);

    formData.append('title', title);
    formData.append('section_id', section);
    formData.append('course_id', this.course_id);
    formData.append('lesson_type', lesson_type);
    formData.append('summary', summary);
    
    // console.log(title);
    // console.log(section);
    // console.log(lesson_type);
    
    if(lesson_type === 'video')
    {
      var lesson_provider = ((document.getElementById("lesson_provider") as HTMLInputElement).value);
      // console.log(lesson_provider);
      formData.append('lesson_provider', lesson_provider);
      if(lesson_provider === 'youtube' || lesson_provider === 'vimeo' )
      {
        
        var video_url = ((document.getElementById("video_url") as HTMLInputElement).value);
        // console.log(video_url);
        formData.append('video_url', video_url);
      }
      else
      {
        formData.append('video_upload',  this.lessonForm.get('video_upload').value);
        formData.append('thumbnail',  this.lessonForm.get('video_thumbnail').value);
      }
      var video_duration = ((document.getElementById("video_duration") as HTMLInputElement).value);
      // console.log(video_duration);
      formData.append('duration', video_duration);

    }
    
    formData.append('attachment',  this.lessonForm.get('attachment').value);
    // console.log(summary);


    this.courseService.add_lesson(formData).subscribe((data) => {
      
      console.log(data);
      
    });

  }


  getLessonType(event)
  {
    // console.log(event.target.value);
    this.lesson_type = event.target.value;
    if(this.lesson_type != 'video_url')
    {
      this.lesson_provider = '';
    }
  }

  getLessonProvider(event)
  {
    // console.log(event.target.value);
    this.lesson_provider = event.target.value;
  }


  video_upload(fileInput: any) {
    
    if (fileInput.target.files.length > 0) 
    {

      const file = fileInput.target.files[0];
      console.log(file);
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
        this.lessonForm.get('video_upload').setValue(file);
      }

    }

  }


  attachment(fileInput: any) {
    
    if (fileInput.target.files.length > 0) 
    {

      const file = fileInput.target.files[0];
      console.log(file);
      // console.log(file.size);
      // console.log(file.type);

      // if(!(file.type.includes('video')))
      // {
      //   console.log('not video');
      // }
      // else 
      if(file.size > 10000000)
      {
        console.log('file is too large');
      }
      else
      {
        this.lessonForm.get('attachment').setValue(file);
      }

    }

  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();


    if (fileInput.target.files.length > 0) {
      const file = fileInput.target.files[0];
      // console.log(file);
      this.lessonForm.get('video_thumbnail').setValue(file);
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



}
