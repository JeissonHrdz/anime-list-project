import { Component, inject, signal, AfterViewInit } from '@angular/core';
import { Anime } from '../../../Core/Model/anime.model';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trending-slider',
  imports: [CommonModule],
  templateUrl: './trending-slider.component.html',
  styleUrl: './trending-slider.component.css'
})
export class TrendingSliderComponent implements AfterViewInit {

  private destroy$ = new Subject<void>()
  private animeService = inject(AnimeService)
  private router = inject(Router)
  trendingAnime = signal<Array<Anime>>([])
  slideWidth: number | any = 0
  directionSlide = signal<string>('')


  ngOnInit(): void {
    this.slideWidth = $('.slide-item').width();
    this.animeService.getAnimeTrending().pipe(
      takeUntil(this.destroy$)
    ).subscribe((anime) => {
      this.trendingAnime.set(this.rotatePositionArray(anime))    
    })
  }


  rotatePositionArray(anime: Array<Anime>){
    for (let i = 0; i < 2; i++) {
    if (anime.length > 1) {
      const primerElemento = anime.pop();
      if (primerElemento) {
        anime.unshift(primerElemento);
      }
    }
  }
    return anime;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.highlightThirdElement();
    }, 700);
  }

  goToAnime(animeId: number, index: number) {  
    const element = document.getElementById("" + index);  
   if(element?.children[0].classList.contains('highlighted')) { 
    this.router.navigate(['/anime', animeId]);  
   } 
   
  }


  private highlightThirdElement() {
    const grid = document.querySelector('#slider');
    let count = 0;
    if (grid) {
      const slides = grid.children;
      Array.from(slides).forEach(slide => {
        count++;
        slide.children[0].classList.remove('highlighted');
        if (count > 3) {
          slide.classList.remove('prev');
          slide.classList.add('next');
        } else if (count < 3) {
          slide.classList.remove('next');
          slide.classList.add('prev');
        }
      });
      if (slides.length >= 3) {
        slides[2].children[0].classList.add('highlighted');
        slides[2].classList.remove('prev');
        slides[2].classList.remove('next');
      }



    }
  }

  rotate(direction: string, elementId: number) {
    const grid = document.querySelector('#slider');
    const element = document.getElementById("" + elementId);   

    if (grid) {
      let firstColumn = grid.firstElementChild;
      let lastColumn = grid.lastElementChild;
      if (firstColumn && lastColumn) {
        if (element?.classList.contains('next')) {      
            grid.removeChild(firstColumn);
            grid.appendChild(firstColumn);        

        } else if (element?.classList.contains('prev')) {
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
