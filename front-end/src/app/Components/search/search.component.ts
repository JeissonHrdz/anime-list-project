import { Component, inject } from '@angular/core';
import { GenresService } from '../../Core/Services/genres.service';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


private genresService = inject(GenresService);
genres: any[] = [];


  ngOnInit() {
    this.genresService.getGenres().subscribe({
      next: (data) => {
        if (data && Array.isArray(data)) {
          this.genres = data;
        } else {
          console.error('Data is not an array:', data);
        }
      },
      error: (err) => {
        console.error('Error loading genres:', err);
        console.error(err);
      }
    });
  }
  
}


