import { Component, inject } from '@angular/core';
import { AnimeDetailsService } from '../../../Core/Services/anime-details.service';
import { CommonModule } from '@angular/common';
import { Character } from '../../../Core/Model/character.model';
import { Router } from '@angular/router';
import { Anime } from '../../../Core/Model/anime.model';
import { AnimeSearchService } from '../../../Core/Services/anime-search.service';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronRightSolid, heroXMarkSolid  } from '@ng-icons/heroicons/solid';
import $ from 'jquery';
import { AnimeAllCharactersComponent } from "../anime-all-characters/anime-all-characters.component";

@Component({
  selector: 'app-anime-characters',
  imports: [CommonModule, NgIcon, AnimeAllCharactersComponent,AnimeAllCharactersComponent],
  providers: [provideIcons({ heroChevronRightSolid, heroXMarkSolid })],
  templateUrl: './anime-characters.component.html',
  styleUrl: './anime-characters.component.css',
})
export class AnimeCharactersComponent {
  private destroy$ = new Subject<void>();
  private animeDetailsService = inject(AnimeDetailsService);
  private animeSearchService = inject(AnimeSearchService);
  private router = inject(Router);

  animeData?: Anime;
  animeCharacters?: Character[];
  animeId: number = 0;
  statusModal: boolean = false;

  animeCharacters$ = this.animeDetailsService.characters.pipe(
    catchError((error) => {
      console.error('Error loading data:', error);
      return of([]);
    })
  );

  ngOnInit() {
    this.animeSearchService.id
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: number) => {
        this.animeId = data;
      });
  }

    modalAllCharacters() {    
    if (!this.statusModal) { 
      $('#modal-characters').show("fast"); 
     
      this.statusModal = true;
    } else {
      $('#modal-characters').hide("fast");
      this.statusModal = false;
    }    
  }  
  showCharacterDetails(characterId: number) {
    this.router.navigate(['/character', characterId]);
  }

   showVoiceActorDetails(voiceActorId: number) {         
    this.router.navigate(['/voice-actor', voiceActorId]);  

}
  showAllCharacters() {
    $("#topBar").addClass("bg-neutral-800");
    this.router.navigate(['/anime', this.animeId, 'characters']);
  
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
