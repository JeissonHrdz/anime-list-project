import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Character, CharacterDetail } from '../Model/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  
  private apiUrl = 'https://anime-list-project-production.up.railway.app/api';
  private http = inject(HttpClient)

  searchCharacterById(id: number): Observable<CharacterDetail>{
    return this.http.get<CharacterDetail>(`${this.apiUrl}/character`,{params:{id}}).pipe(
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

  constructor() { }
}
