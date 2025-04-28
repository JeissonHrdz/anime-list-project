import { Component, inject, signal, AfterViewInit } from '@angular/core';
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
export class TrendingSliderComponent implements AfterViewInit {

  private destroy$ = new Subject<void>()
  private animeService = inject(AnimeService)
  trendingAnime = signal<Array<Anime>>([])
  slideWidth: number | any = 0

  ngOnInit(): void {
    this.slideWidth = $('.slide-item').width();
    this.animeService.getAnimeTrending().pipe(
      takeUntil(this.destroy$)
    ).subscribe((anime) => {
      this.trendingAnime.set(anime)
    })
  }

  ngAfterViewInit(): void {   
    setTimeout(() => {
      this.highlightThirdElement();
    }, 400);
  }

  private highlightThirdElement() {
    const grid = document.querySelector('#slider');
    if (grid) {
      const slides = grid.children;
      Array.from(slides).forEach(slide => {
        slide.children[0].classList.remove('highlighted');    
      });
      if (slides.length >= 3) {
        slides[2].children[0].classList.add('highlighted');
      }
     
    }
  }

  rotate(direction: string) {
    const grid = document.querySelector('#slider');
    if (grid) {
      const firstColumn = grid.firstElementChild;
      const lastColumn = grid.lastElementChild; 
      if (firstColumn && lastColumn) {
        if(direction === 'next'){
          grid.removeChild(firstColumn);
          grid.appendChild(firstColumn);
        }else if(direction === 'prev'){
          grid.removeChild(lastColumn);
          grid.insertBefore(lastColumn, firstColumn);
        }
        this.highlightThirdElement();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
