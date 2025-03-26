import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimeSearchService {

  animeDataStatus = signal<Object>({});

signalAnimeData(data: any){
  this.animeDataStatus.set(data);
}
  

  constructor() { }
}
