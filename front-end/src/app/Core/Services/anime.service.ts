import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, EventEmitter } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Anime, AnimeFilters, AnimeSeason } from '../Model/anime.model';
import { Character } from '../Model/character.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl = environment.apiUrl
  private http = inject(HttpClient)

  constructor() { }

  searchAnime(title: string): Observable<Array<Anime>> {

    return this.http.get<Array<Anime>>(`${this.apiUrl}/anime`, { params: { title } }).pipe(
      catchError(this.handleError)
    )
  }

  searchAnimeById(id: string): Observable<Anime> {
    return this.http.get<Anime>(`${this.apiUrl}/anime-details`, { params: { id } }).pipe(
      catchError(this.handleError)
    )
  }

  getAnimeTrending(): Observable<Array<Anime>> {
    return this.http.get<Array<Anime>>(`${this.apiUrl}/anime/trending`).pipe(
      catchError(this.handleError)
    )
  }

  getAllCharacterByAnime(id: number): Observable<Array<Character>> {
    return this.http.get<Array<Character>>(`${this.apiUrl}/anime/characters`, { params: { id } }).pipe(
      catchError(this.handleError)
    )
  }

  getAnimesActualSeason(page: number, perPage: number): Observable<Array<Anime>> {
    return this.http.get<Array<Anime>>(`${this.apiUrl}/anime/season`, { params: { page, perPage } }).pipe(
      catchError(this.handleError)
    )
  }

  getAnimesUpcoming(page: number, perPage: number): Observable<Array<Anime>> {
    return this.http.get<Array<Anime>>(`${this.apiUrl}/anime/upcoming-season`, { params: { page, perPage } }).pipe(
      catchError(this.handleError)
    )
  }

  getAllAnimesActualSeason(page: number, perPage: number): Observable<Array<Anime>> {
    return this.http.get<Array<Anime>>(`${this.apiUrl}/anime/season`, { params: { page, perPage } }).pipe(
      catchError(this.handleError)
    )
  }

  getAnimeByFilters(params: {
    page: number,
    perPage: number,
    type: any,
    season: any,
    search: any,
    genreIn: any[],
    tagIn: any[],
    seasonYear: any,
    formatIn: any[]
  }): Observable<AnimeFilters> {   
    const options = { params: new HttpParams({ fromObject: params }) };
    return this.http.get<AnimeFilters>(`${this.apiUrl}/anime/filters`, options).pipe(
      catchError(this.handleError)
    )
  }



  dataFoundEmitter = new EventEmitter<any>();
  dataFound(data: any) {
    this.dataFoundEmitter.emit(data);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

}
