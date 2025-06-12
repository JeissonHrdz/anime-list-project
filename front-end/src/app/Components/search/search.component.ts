import { Component, inject } from '@angular/core';
import { GenresService } from '../../Core/Services/genres.service';
import { Genre } from '../../Core/Model/genres.model';
import $ from 'jquery';
import { SearchService } from '../../Core/Services/search.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


private genresService = inject(GenresService);
private searchService = inject(SearchService)

genres?: Genre;
isVisible = false;
isVisibleBoxYears = false;
isVisibleBoxSeason = false;
countSelectedsGenres = 0;
nameSelecteFirstGenre: string = '';
genresSelected: string[] = [];
yearSelected: number = 0;
seasonSelected: string = '';
years: number[] = [];


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
  
  showBoxGenres(){
    if(this.isVisible) {
      $("#genresBox").fadeOut(150);
      this.isVisible = false;
      return;
    }
    this.isVisible = true;
    $("#genresBox").fadeIn(150);
  }

  selectedGenresItems(name: string) {
    if(this.countSelectedsGenres === 0) {
         this.nameSelecteFirstGenre = name;   
    }
    if(this.genresSelected.includes(name)) {
      this.genresSelected = this.genresSelected.filter(item => item !== name);
      if(this.countSelectedsGenres === 1) {
        this.nameSelecteFirstGenre = '';
      }
      this.countSelectedsGenres--;     
      return;
    }
    this.genresSelected.push(name); 
    this.countSelectedsGenres++;
  }


  showBoxYears(){
    if(this.isVisibleBoxYears) {
      $("#yearsBox").fadeOut(150);
      this.isVisibleBoxYears = false;
      return;
    }
    this.isVisibleBoxYears = true;
    $("#yearsBox").fadeIn(150);
  }

  getYearSelected(year: number){  
    if(year != this.yearSelected){
       $("#"+this.yearSelected).removeClass('selected') 
    }
    $("#"+year).addClass('selected') 
    this.yearSelected = year;
  }

  showBoxSeason(){
    if(this.isVisibleBoxSeason) {
      $("#seasonBox").fadeOut(150);
      this.isVisibleBoxSeason = false;
      return;
    }
    this.isVisibleBoxSeason = true;
    $("#seasonBox").fadeIn(150);
  }

  getSeasonSelected(season: string){  
    
    if(season !== this.seasonSelected){
       $("#"+this.seasonSelected).removeClass('selected') 
    }
    $("#"+season).addClass('selected') 
    this.seasonSelected = season;
  }
  
}


