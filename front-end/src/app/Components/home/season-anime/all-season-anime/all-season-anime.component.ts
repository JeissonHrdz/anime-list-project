import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../../../Core/Services/anime.service';
import { Anime } from '../../../../Core/Model/anime.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-season-anime',
  imports: [ ],

  templateUrl: './all-season-anime.component.html',
  styleUrl: './all-season-anime.component.css'
})
export class AllSeasonAnimeComponent {

  private destroy$ = new Subject<void>()
  private animeService = inject(AnimeService)
  private router = inject(Router)
  page: number = 1
  seasonAnimes:Anime[]=[];

  ngOnInit(): void {
    this.animeService.getAllAnimesActualSeason(1,25).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.seasonAnimes = data
    })    
  }


  loadMoreAnimeSeason() {
    this.page++
    this.animeService.getAllAnimesActualSeason(this.page, 25).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.seasonAnimes = this.seasonAnimes.concat(data)
      if (data.length < 25) {
        $("#loadMore").hide()
      }
    })
  }

    goToAnimeSeason(animeId: number) {
    this.router.navigate(['/anime', animeId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
