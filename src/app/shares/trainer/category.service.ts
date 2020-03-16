import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverUrl = environment.baseUrl;
  errorData: {};
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  create(data) {
    
    return this.http.post<any>(this.serverUrl + 'api/trainer/category/create', data)
    .pipe(
      catchError(this.handleError)
    );

  }

  get_parent_categories()
  {
    return this.http.get<any>(this.serverUrl + 'api/trainer/category/show_parent')
    .pipe(
      catchError(this.handleError)
    );

  }
  

  // get_sub_categories(parent_id)
  // {
  //   return this.http.get<any>(this.serverUrl + 'api/trainer/category/show_sub', parent_id)
  //   .pipe(
  //     catchError(this.handleError)
  //   );

  // }
  
  
  
  get_all_categories()
  {
    return this.http.get<any>(this.serverUrl + 'api/trainer/category/listing')
    .pipe(
      catchError(this.handleError)
      );
      
  }
    
  
  
  show_all_categories()
  {
    return this.http.get<any>(this.serverUrl + 'api/trainer/category/show')
    .pipe(
      catchError(this.handleError)
      );
      
  }
    
  
  get_category(category_id)
  {
    // console.log(category_id);
    return this.http.get<any>(this.serverUrl + 'api/trainer/category/get/'+category_id)
    .pipe(
      catchError(this.handleError)
    );
  }


  edit(data) {
    
    // console.log(data);

    return this.http.post<any>(this.serverUrl + 'api/trainer/category/edit', data)
    .pipe(
      catchError(this.handleError)
    );

  }

  delete(data)
  {
    console.log(data);

    return this.http.get<any>(this.serverUrl + 'api/trainer/category/delete/'+data)
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