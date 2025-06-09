import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private genresJsonUrl = 'assets/data/';
  private http = inject(HttpClient); 

  getGenres(): Observable<any> {
    return this.http.get(this.genresJsonUrl).pipe(
      catchError((error) => {
        console.error('Error loading genres:', error);
        return of([]); // Retorna array vacío en caso de error
      })
    );
  }

}
