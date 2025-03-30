import { Component, inject } from '@angular/core';
import { AnimeDetailsService } from '../../../Services/anime-details.service';
import { CommonModule } from '@angular/common';
import { Character } from '../../../Model/character.model';
import { Router } from '@angular/router';
import { Anime } from '../../../Model/anime.model';
import { AnimeSearchService } from '../../../Services/anime-search.service';

@Component({
  selector: 'app-anime-characters',
  imports: [CommonModule],
  templateUrl: './anime-characters.component.html',
  styleUrl: './anime-characters.component.css'
})
export class AnimeCharactersComponent {

   private animeDetailsService = inject(AnimeDetailsService)
   private animeSearchService = inject(AnimeSearchService )
   private router = inject(Router)

   animeData?: Anime
   animeCharacters?:Character[];
   animeId: number = 0;

  ngOnInit() {       
    this.animeSearchService.id.subscribe((data: number) => {
      this.animeId = data;
    })
    this.animeDetailsService.characters.subscribe((data:Character[]) => {       
      this.animeCharacters = data;
    }) 
  }

  showAllCharacters() {
    this.router.navigate(['/anime', this.animeId, 'characters']); 
  }
 

}
