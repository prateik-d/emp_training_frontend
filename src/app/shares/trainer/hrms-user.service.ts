import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HrmsUserService {

  
  serverUrl = environment.baseUrl;
  errorData: {};
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  get_all_users()
  {
    return this.http.get<any>('http://qitstaging.com/hrsale/index.php/api/auth/listuser')
      .pipe(
        catchError(this.handleError)
      );
  }

  

  get_user_details(user_id)
  {
    return this.http.get<any>('http://qitstaging.com/hrsale/index.php/api/auth/userinfo?user_id=' + user_id)
      .pipe(
        catchError(this.handleError)
      );
  }

  add_user(data)
  {
    return this.http.post<any>(this.serverUrl + 'api/trainer/userhrms/add_user', data)
    .pipe(
      catchError(this.handleError)
    );
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
