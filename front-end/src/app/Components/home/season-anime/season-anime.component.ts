import { Component, inject, signal } from '@angular/core';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Anime } from '../../../Core/Model/anime.model';
import { Subject, takeUntil } from 'rxjs';
import  $ from 'jquery';

@Component({
  selector: 'app-season-anime',
  imports: [],
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

  rotateAnimes(){
    
    $('#season-anime-slider').animate({scrollLeft: "+=215"}, "slow");
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
