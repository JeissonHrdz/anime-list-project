import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceActorService {

  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient)

  constructor() { }
}
