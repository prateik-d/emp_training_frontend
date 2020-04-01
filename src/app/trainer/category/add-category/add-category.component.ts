import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/shares/trainer/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  submitted = false;
  error: {errorTitle: '', errorDesc: ''};
  titleError: string;
  faClassError: string;
  thumbnailError: string;
  parentError: string;
  categoryError: string;

  par = [];

  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
    ) {

     }

    ngOnInit()
    {  

      this.categoryForm = this.fb.group({
        title: ['', Validators.required],
        parent: [''],
        font_awesome_class: ['', Validators.required],
        thumbnail: ['']
      });

        
      this.categoryService.get_parent_categories().subscribe((data) => {
        
        this.par = data.result;
        
      });

    }

    
  selectedLevel:any = '0';

  create(evt)
  {
    
    var title = ((document.getElementById("title") as HTMLInputElement).value);
    var font_awesome_class = ((document.getElementById("font_awesome_class") as HTMLInputElement).value);
    var thumbnail = ((document.getElementById("thumbnail") as HTMLInputElement).value);
    var parent = (this.selectedLevel);
    
    const formData = new FormData();

    if(title.length === 0)
    {
      console.log('no title');

      // this.titleError = '';
      this.thumbnailError = '';
      this.parentError = '';
      this.faClassError = '';
      this.titleError = 'No title';
    }
   
    else if(font_awesome_class.length === 0 )
    {
      this.titleError = '';
      this.thumbnailError = '';
      this.parentError = '';
      // this.faClassError = '';
      this.faClassError = 'No font awesome class';
    }
    // else if(thumbnail.length === 0)
    // {

    //   this.titleError = '';
    //   this.parentError = '';
    //   this.faClassError = '';
    //   this.thumbnailError = 'No thumbnail';
    //   // console.log('no thumbnail');
    // }
    else
    {
      
      formData.append('title', title);
      formData.append('font_awesome_class', font_awesome_class);
      formData.append('thumbnail', this.categoryForm.get('thumbnail').value);
      
      
      if(!parent)
      {
        this.titleError = '';
        this.thumbnailError = '';
        this.faClassError = '';
        
      
          console.log('no parent');
          formData.append('parent', '0');
       
      }
      else
      {
        formData.append('parent', parent.id);
      }
          this.categoryService.create(formData).subscribe((data) => {

              if (data.status === '400') 
              {
                this.categoryError = 'something went wrong...';
              } 
              else 
              {
                this.router.navigate(['/trainer/course/']);
              }
              console.log(data);

          });
    }
      
  }
 
  getBase64(evt)
  {
    if (evt.target.files.length > 0) {
      const file = evt.target.files[0];
      // console.log(file);
      this.categoryForm.get('thumbnail').setValue(file);
    }
   }
}
