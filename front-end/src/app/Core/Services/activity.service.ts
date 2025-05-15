import { inject, Injectable } from '@angular/core';

import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivityResponse } from '../Model/activity.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private apiUrl = environment.apiUrl
  private http = inject(HttpClient)

  constructor() { }

   getGlobalActivity(page: number): Observable<ActivityResponse>{  
      return this.http.get<ActivityResponse>(`${this.apiUrl}/activity`, {params:{page} }).pipe(       
        catchError(this.handleError)
      )
    }


     private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('An error occurred:', error.error);
    }else{
      console.error(`Backend returned code ${error.status}, body was: `, error.error); 
    }
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }
}
