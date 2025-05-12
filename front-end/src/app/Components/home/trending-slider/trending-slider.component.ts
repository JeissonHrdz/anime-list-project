import { Component, inject, signal, AfterViewInit } from '@angular/core';
import { Anime } from '../../../Core/Model/anime.model';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { Router } from '@angular/router';
import e from 'express';

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
  screenWidth = signal<boolean>(false)


  ngOnInit(): void {
    this.slideWidth = $('.slide-item').width();
    this.animeService.getAnimeTrending().pipe(
      takeUntil(this.destroy$)
    ).subscribe((anime) => {
       if(window.innerWidth >= 600) {
        this.trendingAnime.set(this.rotatePositionArray(anime));    
        }
       else {this.trendingAnime.set(anime)}
    })
  }


  rotatePositionArray(anime: Array<Anime>) {
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
      if (window.innerWidth >= 1250) return
      const grid = document.querySelector('#slider');
      const firstColumn = grid?.firstElementChild as HTMLElement;
      if (!grid && firstColumn) return;
      if(window.innerWidth <= 600) { this.screenWidth.set(true) }
        else{ 
      grid?.removeChild(firstColumn)
      grid?.appendChild(firstColumn)
      this.highlightThirdElement()
}
   
    }, 700);
  }

  goToAnime(animeId: number, index: number) {
    const element = document.getElementById("" + index);
    if (element?.children[0].classList.contains('highlighted') || window.innerWidth <= 600) {
      this.router.navigate(['/anime', animeId]);
    }
  }
  

private highlightThirdElement() {
  const grid = document.querySelector('#slider');
  if (!grid) return;

  const slides = Array.from(grid.children);
  const isLargeScreen = window.innerWidth > 1250;
  const highlightIndex = isLargeScreen ? 2 : 1;
  const boundary = isLargeScreen ? 3 : 2;

  slides.forEach((slide, index) => {
    const count = index + 1; // Los índices empiezan en 0
    const firstChild = slide.children[0] as HTMLElement;
    
    firstChild.classList.remove('highlighted');
    
    if (count > boundary) {
      slide.classList.remove('prev');
      slide.classList.add('next');
    } else if (count < boundary) {
      slide.classList.remove('next');
      slide.classList.add('prev');
    }
  });

  const slideToHighlight = slides[highlightIndex];
  if (slideToHighlight) {
    const firstChild = slideToHighlight.children[0] as HTMLElement;
    firstChild.classList.add('highlighted');
    slideToHighlight.classList.remove('prev', 'next');
  }
}

  rotate(direction: string, elementId: number) {
    if(window.innerWidth <= 600) return
    const grid = document.querySelector('#slider');
    const element = document.getElementById(String(elementId));

    if (!grid || !element) return;

    const firstColumn = grid.firstElementChild;
    const lastColumn = grid.lastElementChild;

    if (!firstColumn || !lastColumn) return;

    if (element.classList.contains('next')) {
      grid.append(firstColumn);
    }
    else if (element.classList.contains('prev')) {
      grid.insertBefore(lastColumn, firstColumn);
    }

    this.highlightThirdElement();
  }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
