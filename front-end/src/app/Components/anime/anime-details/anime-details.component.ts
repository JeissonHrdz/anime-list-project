import { Component, inject, Renderer2 } from '@angular/core';
import { AnimeService } from '../../../Core/Services/anime.service';
import { ActivatedRoute } from '@angular/router';
import { Anime } from '../../../Core/Model/anime.model';
import { AnimeCharactersComponent } from '../anime-characters/anime-characters.component';
import { AnimeDetailsService } from '../../../Core/Services/anime-details.service';
import { Character } from '../../../Core/Model/character.model';
import $ from 'jquery';
import { SafePipe } from '../../shared/pipes/safe-pipe';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { NgIcon,   provideIcons } from '@ng-icons/core';
import { heroCalendarSolid } from '@ng-icons/heroicons/solid';
import { AnimeSearchService } from '../../../Core/Services/anime-search.service';
;


@Component({
  selector: 'app-anime-details',
  imports: [AnimeCharactersComponent, SafePipe, NgIcon],  
  providers: [provideIcons({ heroCalendarSolid })],  
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.css',
})
export class AnimeDetailsComponent {

  private destroy$ = new Subject<void>();
  private animeService = inject(AnimeService);
  private animeSearchService = inject(AnimeSearchService );
  private animeDetailsService = inject(AnimeDetailsService);
  private route = inject(ActivatedRoute);


  animeData?: Anime;
  animeId: number = 0;
  animeCharacters?: Character[];
  trailerId?: string;
  statusModal: boolean = false;
  ngOnInit() {  
    this.route.paramMap.pipe(
      switchMap(params => {
        this.animeId = Number(params.get('id'));
        return this.animeService.searchAnimeById(this.animeId.toString()).pipe(
          catchError(error => {
            console.error('Error loading data:', error);
            return of(undefined);
          })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data) {
        this.animeData = data;
        this.animeDetailsService.animeCharacters(this.animeData?.characters.edges);   
        this.animeSearchService.getAnimeId(this.animeData.id);    
        const animeInfo = {
          title: this.animeData.title.romaji,
          image: this.animeData.coverImage.large,
          year: this.animeData.startDate.year
        }

        this.animeDetailsService.animeNameAndImage(animeInfo);
      
      }
    });
    $("#topBar").removeClass("bg-neutral-800");
    localStorage.removeItem('animeInfo'); 
  }
  modalTrailer() {    
    if (!this.statusModal) { 
      $('#modal-trailer').show("fast"); 
      this.trailerId = this.animeData?.trailer?.id;
      this.statusModal = true;
    } else {
      $('#modal-trailer').hide("fast");
      this.trailerId = '';
      this.statusModal = false;
    }    
  }  

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete(); 
  }
}
