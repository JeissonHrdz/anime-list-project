import { EventEmitter, Injectable } from '@angular/core';
import { Character } from '../Model/character.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimeDetailsService {

  private animeCharactersEmit = new BehaviorSubject<Character[]>([]);
  characters = this.animeCharactersEmit.asObservable();

  animeCharacters(data: Character[]) {       
      this.animeCharactersEmit.next(data);
  }
}
