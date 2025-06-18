import { Component, HostListener, inject } from '@angular/core';
import { GenresService } from '../../Core/Services/genres.service';
import { Genre } from '../../Core/Model/genres.model';
import $ from 'jquery';
import { SearchService } from '../../Core/Services/search.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown } from '@ng-icons/heroicons/outline';
import { AnimeService } from '../../Core/Services/anime.service';
import { Anime } from '../../Core/Model/anime.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [NgIcon],
  providers: [provideIcons({ heroChevronDown })],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  private destroy$ = new Subject<void>();
    private genresService = inject(GenresService);
  private searchService = inject(SearchService)
  private animeService = inject(AnimeService)

  anime: Anime[] = [];

  genres?: Genre;
  isVisibleBoxGenres = false;
  isVisibleBoxYears = false;
  isVisibleBoxSeason = false;
  isVisibleBoxFormat = false;
  isBoxOpened = false;
  boxOpened: string = '';

  countSelectedsGenres = 0;
  nameSelecteFirstGenre: string = '';
  genresSelected: string[] | null = null;
  nameAnime: string | null = null;
  yearSelected: number = 0;
  seasonSelected: string = '';
  formatSelected: string = '';
  years: number[] = [];
  formats = ["TV","MOVIE","MUSIC","ONA","OVA","SPECIAL","TV_SHORT"];


  ngOnInit() {
    this.genresService.getGenres().subscribe({
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
  }  

  getAnimeByFilters(){  
    this.animeService.getAnimeByFilters(
      1, 
      20, 
      'ANIME',
      'SUMMER',
      this.nameAnime,
      this.genresSelected || [],
      [],
      this.yearSelected,
      this.formats).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        this.anime = data;
        console.log('Anime loaded successfully:', this.anime);
      },
      error: (err) => {
        console.error('Error loading anime:', err);
        console.error(err);
      }
    })
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

  closeBox(id: string) {
    (this as any)[`isVisibleBox${id}`] = false;
    $(`#${id}Box`).fadeOut(150);
  }

  getYearSelected(year: number) {
    if (year !== this.yearSelected) {
      $("#" + this.yearSelected).removeClass('selected')
    }
    $("#" + year).addClass('selected')
    this.yearSelected = year;  }

  getSeasonSelected(season: string) {
    if (season !== this.seasonSelected) {
      $(this.seasonSelected).removeClass('selected')
    }
    $(season).addClass('selected')
    this.seasonSelected = season  }
  getFormatSelected(format: string) {
    if (format !== this.formatSelected) {
      $(this.formatSelected).removeClass('selected')
    }
    $(format).addClass('selected')
    this.formatSelected = format;
  }

  @HostListener('document:click')
  onDocumentClick(): void {    
    if (!this.isBoxOpened) { 
      this.closeBox(this.boxOpened);
    }
    this.isBoxOpened = false;   
    
  }
}


