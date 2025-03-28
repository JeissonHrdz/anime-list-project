import { Component, inject } from '@angular/core';
import { AnimeDetailsService } from '../../../Services/anime-details.service';
import { CommonModule } from '@angular/common';
import { Character } from '../../../Model/character.model';

@Component({
  selector: 'app-anime-characters',
  imports: [CommonModule],
  templateUrl: './anime-characters.component.html',
  styleUrl: './anime-characters.component.css'
})
export class AnimeCharactersComponent {

   private animeDetailsService = inject(AnimeDetailsService)
   animeCharacters?:Character[];

  ngOnInit() {       
    this.animeDetailsService.characters.subscribe((data:Character[]) => {           
      this.animeCharacters = data;
    }) 
  }
 

}
