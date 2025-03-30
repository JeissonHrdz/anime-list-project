import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable,EventEmitter } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Anime } from '../Model/anime.model';
import { Character } from '../Model/character.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient)

  constructor() { }

  searchAnime(title: string): Observable<Array<Anime>>{
  
    return this.http.get<Array<Anime>>(`${this.apiUrl}/anime`,{params:{title}}).pipe(
      catchError(this.handleError)
    )
  }

  searchAnimeById(id: string): Observable<Anime>{
  
    return this.http.get<Anime>(`${this.apiUrl}/anime-details`,{params:{id}}).pipe(
      catchError(this.handleError)
    )
  }

  getAllCharacterByAnime(id: number): Observable<Array<Character>>{
    return this.http.get<Array<Character>>(`${this.apiUrl}/anime/characters`,{params:{id}}).pipe(
      catchError(this.handleError)      
    )     
  }

  dataFoundEmitter  = new EventEmitter<any>();
  dataFound(data: any){
    this.dataFoundEmitter.emit(data);
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
