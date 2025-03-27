import { EventEmitter, Injectable } from '@angular/core';
import { Character } from '../Model/character.model';


@Injectable({
  providedIn: 'root'
})
export class AnimeDetailsService {

  animeCharactersEmit = new EventEmitter<any>();

  animeCharacters(data: any) { 
      this.animeCharactersEmit.emit(data);
  }
}
