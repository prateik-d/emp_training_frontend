import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/shares/trainer/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  submitted = false;
  error: {errorTitle: '', errorDesc: ''};
  titleError: string;
  faClassError: string;
  thumbnailError: string;
  parentError: string;
  categoryError: string;

  par = [];
  cats = [];
  cat_id;
  selectedLevel:any;
  // selectedParentData;
  selectedParent;
  parentId: any;
  parentName: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() 
  {
    this.categoryForm = this.fb.group({
      title: ['', Validators.required],
      parent: [''],
      font_awesome_class: [''],
      thumbnail: ['']
    });
    
    this.cat_id = this.route.snapshot.paramMap.get("id");
      
    this.categoryService.get_category(this.cat_id).subscribe((data) => {
      
      this.cats = data.category;



      let categories = data['category'];
      let category_has_parent = categories['parent_list'];

      if(category_has_parent)
      {
        // console.log('in if');
        this.parentId = category_has_parent.id;
        this.parentName = category_has_parent.name;
      
        this.selectedLevel = this.parentId;
      }

    });
        
        
      
    this.categoryService.get_parent_categories().subscribe((data) => {
      
      this.par = data.result;
      // console.log(this.par);
      
    });

    // if(localStorage.getItem('currentUser'))
    // {
    //   let user = localStorage.getItem('currentUser');
    //   var json = JSON.parse(user);

    //   if(json["user"] != 'trainer')
    //   {
    //     this.router.navigate(['/trainer/']);
    //   }
    // }
    // else
    // {
    //   this.router.navigate(['/trainer/']);
    // }
    
  }

  edit(evt)
  {
    
    var id = ((document.getElementById("id") as HTMLInputElement).value);
    var title = ((document.getElementById("title") as HTMLInputElement).value);
    var parent = (this.selectedLevel);
    
    const formData = new FormData();

    console.log(parent);
   

    if(title.length === 0)
    {
      console.log('no title');

      // this.titleError = '';
      this.thumbnailError = '';
      this.parentError = '';
      this.faClassError = '';
      this.titleError = 'No title';
    }
    else
    {
      formData.append('id', id);
      formData.append('title', title);
      
      if(!parent)
      {
        this.titleError = '';
        this.thumbnailError = '';
        this.faClassError = '';


        var font_awesome_class = ((document.getElementById("font_awesome_class") as HTMLInputElement).value);
        // var thumbnail = ((document.getElementById("thumbnail") as HTMLInputElement).value);
          
        
        formData.append('font_awesome_class', font_awesome_class);
        formData.append('thumbnail', this.categoryForm.get('thumbnail').value);

          console.log('no parent');
          formData.append('parent', '0');
      
      }
      else
      {
        formData.append('parent', parent.id);
      }

        this.categoryService.edit(formData).subscribe((data) => {
          
          // if (data.status === '400') 
          // {
            //   this.categoryError = 'something went wrong...';
            // } 
            // else 
            // {
              //   this.router.navigate(['/report-manager/category/']);
              // }
              console.log(data);
              
            });
      }
            
  }

  getBase64(evt)
  {
    if (evt.target.files.length > 0) {
      const file = evt.target.files[0];
      console.log(file);
      this.categoryForm.get('thumbnail').setValue(file);
    }
  }
  
}
