import { Component, inject } from '@angular/core';
import { GenresService } from '../../Core/Services/genres.service';
import { Genre } from '../../Core/Model/genres.model';
import $ from 'jquery';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


private genresService = inject(GenresService);
genres?: Genre;
isVisible = false;
countSelectedsGenres = 0;
nameSelecteFirstGenre: string = '';
genresSelected: string[] = [];


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
  
}


