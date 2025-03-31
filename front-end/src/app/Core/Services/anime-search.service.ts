import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeSearchService {

  private closeComponent = new BehaviorSubject <Boolean>(false);
  status = this.closeComponent.asObservable();

statusCloseComponent(data: boolean){
  this.closeComponent.next(data);
}

private animeId = new BehaviorSubject<number>(0)
id = this.animeId.asObservable();
  
getAnimeId(data: number){ 
  this.animeId.next(data);
}
 
}
