import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../../../Core/Services/anime.service';
import { Anime } from '../../../../Core/Model/anime.model';

@Component({
  selector: 'app-all-season-anime',
  imports: [],
  templateUrl: './all-season-anime.component.html',
  styleUrl: './all-season-anime.component.css'
})
export class AllSeasonAnimeComponent {

  private destroy$ = new Subject<void>()
  private animeService = inject(AnimeService)
  seasonAnimes:Anime[]=[];

  ngOnInit(): void {
    this.animeService.getAllAnimesActualSeason(1,25).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.seasonAnimes = data
    })
    
  }

}
