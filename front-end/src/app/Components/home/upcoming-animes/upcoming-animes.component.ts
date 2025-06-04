import { Component, inject, signal } from '@angular/core';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Subject, takeUntil } from 'rxjs';
import { Anime } from '../../../Core/Model/anime.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-animes',
  imports: [],
  templateUrl: './upcoming-animes.component.html',
  styleUrl: './upcoming-animes.component.css'
})
export class UpcomingAnimesComponent {

  private animeService = inject(AnimeService);
  private router = inject(Router);
  private destroy$ = new Subject<void>()
  upcomingSeasonAnime = signal<Array<Anime>>([])


  ngOnInit() {
    this.animeService.getAnimesUpcoming(1, 10).pipe(
     takeUntil(this.destroy$)
    ).subscribe((data) => { 
      console.info('Upcoming Animes', data);
      this.upcomingSeasonAnime.set(data);      
    })
  }

  goToAnimeDetails(animeId: number) {
    this.router.navigate(['/anime', animeId]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
