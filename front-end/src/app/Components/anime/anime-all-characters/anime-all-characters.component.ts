import { Component, inject } from '@angular/core';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Character } from '../../../Core/Model/character.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { AnimeDetailsService } from '../../../Core/Services/anime-details.service';
import { CharacterDetailsComponent } from "../../characters/character-details/character-details.component";
import $ from 'jquery';
import { Anime } from '../../../Core/Model/anime.model';

@Component({
  selector: 'app-anime-all-characters',
  imports: [CommonModule],
  templateUrl: './anime-all-characters.component.html',
  styleUrl: './anime-all-characters.component.css'
})
export class AnimeAllCharactersComponent {

  private destroy$ = new Subject<void>()
  private animeService = inject(AnimeService)
  private route = inject(ActivatedRoute)
  private animeDetailsService = inject(AnimeDetailsService )
  private router = inject(Router)

  characters?: Array<Character> = []
  animeId: number = 0
  animeTitle: string = ''
  animeImage: string = ''
  animeYear: string = ''
  modalStatus: boolean = false;
  character?: Character;
  animeConnection?: Array<Anime> = []; 


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.animeId = Number(params.get('id'));
        return this.animeService.getAllCharacterByAnime(this.animeId).pipe(
          catchError(error => {
            console.error('Error loading data:', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((data: Array<Character>) => {
      this.characters = data;    
      console.log(this.characters);
    
    }) 

    
    this.animeDetailsService.nameAndImage.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {   
      
      const animeInfo = {
        title: data.title,
        image: data.image,
        year: data.year
      }

      if(localStorage.getItem('animeInfo') === null) {
      localStorage.setItem('animeInfo', JSON.stringify(animeInfo));    
      }
      
      this.animeTitle = localStorage.getItem('animeInfo') ? JSON.parse(localStorage.getItem('animeInfo')!).title : animeInfo.title;
      this.animeImage = localStorage.getItem('animeInfo') ? JSON.parse(localStorage.getItem('animeInfo')!).image : animeInfo.image;
      this.animeYear = localStorage.getItem('animeInfo') ? JSON.parse(localStorage.getItem('animeInfo')!).year : animeInfo.year;
    });  

 

    $("#topBar").addClass("bg-neutral-800");
  }

  showCharacterDetails(characterId: number) {         
          this.router.navigate(['/character', characterId]);  
      
  }
  showVoiceActorDetails(voiceActorId: number) {         
    this.router.navigate(['/voice-actor', voiceActorId]);  

}
 
  
    
  

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

}
