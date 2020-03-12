import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/shares/trainer/category.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories = [];
  serverUrl = environment.baseUrl;
  category_id: number;
  categoryMessaage: string;

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) 
  { 
  }

  ngOnInit() 
  {
    
    this.categoryService.get_all_categories().subscribe((data) => {
        
      this.categories = data.result;

      // console.log(this.categories);
      
    });
        
      // if(localStorage.getItem('currentUser'))
      // {
      //   let user = localStorage.getItem('currentUser');
      //   var json = JSON.parse(user);

      //   if(json["user"] != 'trainer')
      //   {
      //     this.router.navigate(['/trainer/']);
      //   }
      //   console.log(localStorage.getItem('currentUser'));
      // }
      // else
      // {
      //   this.router.navigate(['/trainer/']);
      // }
        
    // if(!localStorage.getItem('currentUser'))
    // {
    //   if(json["user"] != 'trainer')
    //   {
    //     this.router.navigate(['/trainer/']);
    //   }
    // }
  }
  openModal(val)
  {
    this.category_id = val;
  }

  delete(val)
  {
    // console.log ('delete id : '+ val)

    this.categoryService.delete(val).subscribe((data) => {
      if (data.status != '400') 
      {
        // this.router.navigate(['/trainer/category/']);
        // this.smoothScrollTop();
        // console.log(data);
        location.reload();
        this.categoryMessaage = 'Deleted successfully. !!!';
      }
    });

  }

  private smoothScrollTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos: number = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
