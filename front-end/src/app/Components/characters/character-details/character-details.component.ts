import { Component, inject } from '@angular/core';
import { AnimeDetailsService } from '../../../Core/Services/anime-details.service';
import { Character } from '../../../Core/Model/character.model';
import { Subject, takeUntil } from 'rxjs';
import { Anime } from '../../../Core/Model/anime.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimeSearchService } from '../../../Core/Services/anime-search.service';

@Component({
  selector: 'app-character-details',
  imports: [ CommonModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent {

  private destroy$ = new Subject<void>();
  private animeDetailsService = inject(AnimeDetailsService);
  private animeSearchService = inject(AnimeSearchService);
  private router = inject(Router);
  character?: Character;

  ngOnInit() {
    this.animeDetailsService.character.pipe( takeUntil(this.destroy$)).subscribe((data: Character) => { 
      this.character = data;    
    });
  }

  goToDetails(id: number) {
    this.animeSearchService.getAnimeId(id);
    this.router.navigate(['/anime', id]);    
    this.animeSearchService.statusCloseComponent(false);
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
