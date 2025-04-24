import { Component, inject, signal } from '@angular/core';
import { Anime } from '../../../Core/Model/anime.model';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import $ from 'jquery';

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
  slider: any;
  currentSlide: number = 0;
  slideIndex: number = 200;
  slideNext: string = 'next';
  slidePrev: string = 'prev';

  ngOnInit(): void {    
    this.animeService.getAnimeTrending().pipe(
      takeUntil(this.destroy$)
    ).subscribe((anime) => {
      this.trendingAnime.set(anime)
    })
       
  }

 goToSlide(direction: string) {  
  
    if (direction === this.slidePrev) {    
      this.slideIndex = this.slideIndex - 200;
    } else if (direction === this.slideNext) {   
      this.slideIndex = this.slideIndex + 200;
    }
      
    $("#slider").animate({
      scrollLeft: this.slideIndex
    }, 150);   
    console.log(this.slideIndex)

    if (this.slideIndex < 0) {
      this.slideIndex = 200;
    } else if (this.slideIndex > 1000) {
      this.slideIndex = 1000;
    }
    
    
}

ngOnDestroy(): void {
  this.destroy$.next()
  this.destroy$.complete()
}



}
