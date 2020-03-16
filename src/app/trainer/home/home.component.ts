import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from "../../shares/trainer/login.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  loginForm: FormGroup;
  submitted = false;
  error: {errorTitle: '', errorDesc: ''};
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit() 
  {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if(localStorage.getItem('currentUser'))
    {
      let user = localStorage.getItem('currentUser');
      var json = JSON.parse(user);

      if(json["user"] != 'trainer')
      {
        localStorage.removeItem('currentUser');
        
      }
      else
      {
        this.router.navigate(['/trainer/dashboard']);
      }
    }
    else
    {
      localStorage.removeItem('currentUser');
    }

    // console.log(localStorage.getItem('currentUser'));
    // localStorage.removeItem('currentUser');
    // this.loginService.logout();
  }

  login()
  {
    var email = ((document.getElementById("email") as HTMLInputElement).value);
    var password = ((document.getElementById("password") as HTMLInputElement).value);

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);
  
    localStorage.removeItem('currentUser');
    this.loginService.login(email, password).subscribe((data) => {

        console.log(localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser') == null) {
        // if (this.loginService.isLoggedIn) {
          console.log('error');
          this.loginError = 'Username or password is incorrect.';
        } else {
          // console.log('login');
          const redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl : '/trainer/dashboard';
          this.router.navigate([redirect]);
        }
      },
      error => this.error = error
    );
    this.submitted = true;
  }

}
