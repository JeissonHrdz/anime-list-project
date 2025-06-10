import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
private apiUrl = environment.apiUrl
  private http = inject(HttpClient)

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genres`).pipe(
      catchError((error) => {
        console.error('Error fetching genres:', error);
        return of([]); // Return an empty array on error
      })
    );
  }

}
