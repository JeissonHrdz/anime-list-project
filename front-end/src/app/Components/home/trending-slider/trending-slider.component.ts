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
  transformStyle = signal('translateX(0)')
  slideWidth: number | any = 0
  private animeService = inject(AnimeService)
  slider: any;
  currentIndex: number = 0;



  ngOnInit(): void {
    this.slideWidth = $('.slide-item').width();
    this.animeService.getAnimeTrending().pipe(
      takeUntil(this.destroy$)
    ).subscribe((anime) => {
      this.trendingAnime.set(anime)
    })

  }

  rotate(direction: 'next' | 'prev') {
    // 1. Animar el desplazamiento
    
    this.currentIndex += direction === 'next' ? 1 : -1;
    this.transformStyle.set(`translateX(-${this.currentIndex * this.slideWidth}%)`);
    
    // 2. Esperar a que termine la animación
    setTimeout(() => {
      // Rotar el array según la dirección
      this.trendingAnime.update(current => {
        if (direction === 'next') {
          return [...current.slice(1), current[0]];
        } else {
          return [current[current.length - 1], ...current.slice(0, -1)];
        }
      });
      
      // Resetear posición
      this.currentIndex = 0;
      this.transformStyle.set('translateX(0)');
    }, 500);
  }




















  // goToSlide(direction: string) {
  //   this.slideItemWidth = $('.slide-item').width();


  //   if (direction === this.slidePrev) {

  //     this.slideIndex = this.slideIndex - this.slideItemWidth;
  //   } else if (direction === this.slideNext) {
 
  //     this.slideIndex = this.slideIndex + this.slideItemWidth
  //     $("#slider").animate({
  //       scrollLeft: this.slideIndex
  //     }, 150);

  //     this.trendingAnime.update(anime => {
  //       if (anime.length <= 1) return anime
  //       return [...anime.slice(1), anime[0]]

  //     })
  //     console.log(this.slideIndex)
  //   }

  // }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }



}
