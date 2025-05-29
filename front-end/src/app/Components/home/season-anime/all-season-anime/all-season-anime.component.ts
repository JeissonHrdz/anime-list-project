import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnimeService } from '../../../../Core/Services/anime.service';

@Component({
  selector: 'app-all-season-anime',
  imports: [],
  templateUrl: './all-season-anime.component.html',
  styleUrl: './all-season-anime.component.css'
})
export class AllSeasonAnimeComponent {

  private destroy$ = new Subject<void>()
  private animeService = inject(AnimeService)

  ngOnInit(): void {
    this.animeService.getAllAnimesActualSeason(1,10).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      console.log(data);
    })
    
  }

}
