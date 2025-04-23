import { Component, inject, signal } from '@angular/core';
import { Anime } from '../../../Core/Model/anime.model';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending-slider',
  imports: [CommonModule],
  templateUrl: './trending-slider.component.html',
  styleUrl: './trending-slider.component.css'
})
export class TrendingSliderComponent {

  private destroy$ = new Subject<void>()
  trendingAnime = signal<Array<Anime>>([])
  private animeService = inject(AnimeService)

  ngOnInit(): void {
    this.animeService.getAnimeTrending().pipe(
      takeUntil(this.destroy$)
    ).subscribe((anime) => {
      this.trendingAnime.set(anime)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
