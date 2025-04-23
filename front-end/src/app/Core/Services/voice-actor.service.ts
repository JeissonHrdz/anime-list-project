import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { voiceActors, voiceActorsDetails } from '../Model/voice-actor.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoiceActorService {

  private apiUrl = environment.apiUrl
  private http = inject(HttpClient)

  voiceActorById(id: number, page: number): Observable<voiceActorsDetails>{
    return this.http.get<voiceActorsDetails>(`${this.apiUrl}/voice-actor`, { params: { id, page } }).pipe(
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
