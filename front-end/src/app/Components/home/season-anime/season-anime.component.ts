import { Component, Directive, inject, signal } from '@angular/core';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Anime } from '../../../Core/Model/anime.model';
import { Subject, takeUntil } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronLeftSolid, heroChevronRightSolid, heroStarSolid } from '@ng-icons/heroicons/solid';
import { SafePipe } from '../../shared/pipes/safe-pipe';
import { TippyDirective } from '@ngneat/helipopper';
import $ from 'jquery';



@Component({
  selector: 'app-season-anime',
  imports: [NgIcon , TippyDirective], 
  providers: [provideIcons({ heroChevronLeftSolid, heroChevronRightSolid, heroStarSolid })],
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

    if (direction === 'next') {
      $('#season-anime-slider').animate({ scrollLeft: "+=" + (itemwidth + 25) }, "fast");
    } else {
      $('#season-anime-slider').animate({ scrollLeft: "-=" + (itemwidth + 25) }, "fast");
    }
    console.log(left)
  }

  showDialogAnimeInfo(id: number) {
    $(`#${id}`).show('fast')
  }
    
  


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
