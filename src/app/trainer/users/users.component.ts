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

}
