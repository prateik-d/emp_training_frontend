import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { 

    let loginTime = localStorage.getItem('loginTime');
    
    var currentDate = new Date();
    
    let converted_loginTime = new Date(loginTime);

    var log_diff = ((currentDate.getTime() - converted_loginTime.getTime())/60000);

    if(log_diff > 60)             // 60 = 1 min
    {
      this.logout();
    }

    if(localStorage.getItem('currentUser'))
    {
      let user = localStorage.getItem('currentUser');
      var json = JSON.parse(user);

      if(json["user"] != 'trainer')
      {
        this.router.navigate(['/trainer/']);
      }
      // console.log(localStorage.getItem('currentUser'));
    }
    else
    {
      this.router.navigate(['/trainer/']);
    }

  }

  ngOnInit() {
   
  }

  logout()
  {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/trainer/']);
  }
}
