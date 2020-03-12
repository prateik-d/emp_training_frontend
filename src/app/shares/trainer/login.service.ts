import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {formatDate} from '@angular/common';

// formatDate(new Date(), 'yyyy/MM/dd', 'en');



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  

  serverUrl = environment.baseUrl;
  errorData: {};
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    return this.http.post<any>(`${this.serverUrl}api/trainer/user`, {email:email, password:password})
    .pipe(map(user => {
        if (user && user.token) {

          var currentDate = new Date();
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          // localStorage.setItem('loginTime', Date.parse(currentDate));
          localStorage.setItem('loginTime', currentDate.toString())


          // console.log(this.date);


        }
      }),
      catchError(this.handleError)
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
