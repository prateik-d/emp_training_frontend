import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  serverUrl = environment.baseUrl;
  errorData: {};
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  get_all_courses()
  {
    return this.http.get<any>(this.serverUrl + 'api/trainer/courses/show')
      .pipe(
        catchError(this.handleError)
      );
  }


  create(data) {
    
    return this.http.post<any>(this.serverUrl + 'api/trainer/courses/create', data)
      .pipe(
        catchError(this.handleError)
      );
  }


  get_course_details(course_id)
  {
    // console.log(course_id);
    return this.http.get<any>(this.serverUrl + 'api/trainer/courses/get/'+course_id)
      .pipe(
        catchError(this.handleError)
      );
  }



  get_all_sections(course_id)
  {
    // console.log(course_id);
    return this.http.get<any>(this.serverUrl + 'api/trainer/courses/show_section/'+course_id)
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
