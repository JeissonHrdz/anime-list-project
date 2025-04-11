import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { voiceActors } from '../Model/voice-actor.model';

@Injectable({
  providedIn: 'root'
})
export class VoiceActorService {

  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient)

  voiceActorById(id: number): Observable<voiceActors>{
    return this.http.get<voiceActors>(`${this.apiUrl}/voice-actor`, { params: { id } }).pipe(
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
