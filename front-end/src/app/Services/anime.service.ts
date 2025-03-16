import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient)

  constructor() { }

  searchAnime(title: string): Observable<any>{
    console.log(this.http.get(`${this.apiUrl}/anime`,{params:{title}}));
    return this.http.get(`${this.apiUrl}/anime`,{params:{title}});
  }

}
