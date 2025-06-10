import { Component, inject } from '@angular/core';
import { GenresService } from '../../Core/Services/genres.service';
import { Genre } from '../../Core/Model/genres.model';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


private genresService = inject(GenresService);
genres?: Genre;


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
  
}


