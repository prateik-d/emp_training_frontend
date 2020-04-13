import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HrmsUserService } from 'src/app/shares/trainer/hrms-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  user_details = [];
  userError:any;

  constructor(
    private router: Router,
    private hrmsUserService: HrmsUserService) 
  { 

  }

  ngOnInit() 
  {
    this.hrmsUserService.get_all_users().subscribe((result) => {
      
      this.users = result.data;
      
      //  console.log(result);
      //  console.log(this.users);
       
      });
    }
    
    add_user(user_id)
    {
      this.hrmsUserService.get_user_details(user_id).subscribe((result) => {
        
        
        this.user_details = result.data[0];

        var hrms_id = this.user_details['user_id'];
        var first_name = this.user_details['first_name'];
        var last_name = this.user_details['last_name'];
        var email = this.user_details['email'];
        

        const formData = new FormData();

        formData.append('hrms_id', hrms_id);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('usertype', 'user');

        this.hrmsUserService.add_user(formData).subscribe((data) => 
        {

          console.log(data);

          if (data.status === '400') 
          {
            this.userError = data.message;
          } 
          else 
          {
            this.router.navigate(['/trainer/users/']);
          }
        });

      });
    
    }

    add_supervisor(user_id)
    {
      this.hrmsUserService.get_user_details(user_id).subscribe((result) => {
        
        
        this.user_details = result.data[0];

        var hrms_id = this.user_details['user_id'];
        var first_name = this.user_details['first_name'];
        var last_name = this.user_details['last_name'];
        var email = this.user_details['email'];
        

        const formData = new FormData();

        formData.append('hrms_id', hrms_id);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('email', email);
        formData.append('usertype', 'supervisor');

        this.hrmsUserService.add_user(formData).subscribe((data) => 
        {

          console.log(data);

          if (data.status === '400') 
          {
            this.userError = data.message;
          } 
          else 
          {
            this.router.navigate(['/trainer/users/']);
          }
        });

      });
    
    }

}
