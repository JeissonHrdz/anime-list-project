import { Component, inject, signal } from '@angular/core';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Anime } from '../../../Core/Model/anime.model';
import { Subject, takeUntil } from 'rxjs';
import {NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronLeftSolid, heroChevronRightSolid } from '@ng-icons/heroicons/solid';
import {autoPlacement, hide, offset, shift} from '@floating-ui/dom';
import  $ from 'jquery';

@Component({
  selector: 'app-season-anime',
  imports: [ NgIcon],
  providers: [provideIcons({ heroChevronLeftSolid, heroChevronRightSolid })],
  templateUrl: './season-anime.component.html',
  styleUrl: './season-anime.component.css'
})
export class SeasonAnimeComponent {

  private destroy$ = new Subject<void>()
  private animeService = inject(AnimeService)
  seasonAnime = signal<Array<Anime>>([])

  ngOnInit(): void {
    this.animeService.getAnimesActualSeason().pipe(
      takeUntil(this.destroy$)
    ).subscribe((anime) => {
      this.seasonAnime.set(anime)    
    })
  }

  rotateAnimes(direction: string) {
    const itemwidth = $('.item-slide').width() ?? 0;   
    const left = $('#season-anime-slider').scrollLeft() ?? 0
  
    if  (direction === 'next'){
      $('#season-anime-slider').animate({scrollLeft: "+="+(itemwidth+25)}, "fast");
    } else{
      $('#season-anime-slider').animate({scrollLeft: "-="+(itemwidth+25)}, "fast");
    }
    console.log(left) 
  }

  

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
