import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { GenresService } from '../../Core/Services/genres.service';
import { Genre } from '../../Core/Model/genres.model';
import $ from 'jquery';
import { SearchService } from '../../Core/Services/search.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';
import { AnimeService } from '../../Core/Services/anime.service';
import { Anime, AnimeFilters } from '../../Core/Model/anime.model';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { stat } from 'node:fs';

@Component({
  selector: 'app-search',
  imports: [NgIcon],
  providers: [provideIcons({ heroChevronDown, heroAdjustmentsHorizontal })],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  private destroy$ = new Subject<void>();
  private genresService = inject(GenresService);
  private searchService = inject(SearchService)
  private animeService = inject(AnimeService)
  private router = inject(Router)

  anime: AnimeFilters = {} as AnimeFilters;
  @ViewChild('loadMore') loadMore!: ElementRef

  genres?: Genre;
  isVisibleBoxGenres = false;
  isVisibleBoxYears = false;
  isVisibleBoxSeason = false;
  isVisibleBoxFormat = false;
  isBoxOpened = false;
  boxOpened: string = '';

  countSelectedsGenres = 0;
  nameSelecteFirstGenre: string = '';
  genresSelected: string[] = [];
  nameAnime: string | null = null;
  yearSelected: number = 0;
  seasonSelected: string | null = null;
  formatSelected: string[] = [];
  years: number[] = [];
  formats = ["TV", "MOVIE", "MUSIC", "ONA", "OVA", "SPECIAL", "TV_SHORT"];
  seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];
  page = 1;

  ngOnInit() {
    this.genresService.getGenres().pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.genres = data;
        console.log('Genres loaded successfully:', this.genres);
      },
      error: (err) => {
        console.error('Error loading genres:', err);
        console.error(err);
      }
    });
    this.years = this.searchService.getAllYears();

    setTimeout(() => {
      this.stupIntersectionObserver()
    }, 1000);

  }

  stupIntersectionObserver() {
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.loadMoreAnime()
          }
        })
      })
      observer.observe(this.loadMore.nativeElement)  
  }

  getAnimeByFilters(state?: boolean, page?: number) {
  
    this.nameAnime = $("#nameAnime").val() as string || null;
    this.seasonSelected = this.seasonSelected?.replace('.', '').toUpperCase() || null;

    if (this.yearSelected !== 0 && this.seasonSelected === null) {
      this.seasonSelected = 'WINTER';
    }
    if (this.yearSelected === 0 && this.seasonSelected !== null) {
      this.yearSelected = 2025;
    }

    this.animeService.getAnimeByFilters(this.page, 15, 'ANIME', this.seasonSelected, this.nameAnime, this.genresSelected || null, [],
      this.yearSelected, this.formatSelected.length > 0 ? this.formatSelected.map(format => format.replace('.', '')) : this.formats
    ).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {            
     
        if(state){
          this.anime.media = this.anime.media.concat(data.media);
        }else{              
          this.anime.media = data.media
          this.page = 2;
        }

        if(!data.pageInfo.hasNextPage) {
          state = false; 
          this.page = 1;       
        } 
       
      },
      error: (err) => {
        console.error('Error loading anime:', err);
        console.error(err);
      }
    })
  }

  loadMoreAnime() {  
    if(this.page > 1){
    this.page++;
    this.getAnimeByFilters(true);
    }
    
  }

  selectedGenresItems(name: string) {
    if (this.countSelectedsGenres === 0) {
      this.nameSelecteFirstGenre = name;
    }
    if (this.genresSelected?.includes(name)) {
      this.genresSelected = this.genresSelected.filter(item => item !== name);
      if (this.countSelectedsGenres === 1) {
        this.nameSelecteFirstGenre = '';
      }
      this.countSelectedsGenres--;
      return;
    }
    this.genresSelected?.push(name);
    this.countSelectedsGenres++;
  }


  toggleBoxVisibility(id: string) {
    if (this.boxOpened !== '' && this.boxOpened !== id) {
      this.closeBox(this.boxOpened);
    }
    (this as any)[`isVisibleBox${id}`] = !(this as any)[`isVisibleBox${id}`];
    $(`#${id}Box`)[(this as any)[`isVisibleBox${id}`] ? 'fadeIn' : 'fadeOut'](150);
    this.isBoxOpened = true;
    this.boxOpened = id;
  }

  toggleFilters() {
    $(".filters").slideToggle('fast');
  }

  closeBox(id: string) {
    (this as any)[`isVisibleBox${id}`] = false;
    $(`#${id}Box`).fadeOut(150);
  }

  getYearSelected(year: number) {
    if (year !== this.yearSelected) {
      $("#" + this.yearSelected).removeClass('selected')
    }
    $("#" + year).addClass('selected')
    this.yearSelected = year;
  }

  getSeasonSelected(season: string) {
    if (season !== this.seasonSelected) {
      $(this.seasonSelected!).removeClass('selected')
    }
    $(season).addClass('selected')
    this.seasonSelected = season
  }

  getFormatSelected(format: string) {
    if (this.formatSelected.includes(format)) {
      // Remove format if already selected
      this.formatSelected = this.formatSelected.filter(f => f !== format);
      $(format).removeClass('selected');
    } else {
      // Add format if not selected
      this.formatSelected = [format];
      $(format).addClass('selected');
      // Remove selection from other formats
      this.formats.forEach(f => {
        if (f !== format) {
          $(f).removeClass('selected');
        }
      });
    }
  }

  goToAnimeDetails(id: number) {
    this.router.navigate(['/anime/', id]);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (!this.isBoxOpened) {
      this.closeBox(this.boxOpened);
    }
    this.isBoxOpened = false;

  }
}


