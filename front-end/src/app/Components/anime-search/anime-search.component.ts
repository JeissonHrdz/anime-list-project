import { Component, inject } from '@angular/core';
import { AnimeService } from '../../Services/anime.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anime-search',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './anime-search.component.html',
  styleUrl: './anime-search.component.css'
})
export class AnimeSearchComponent {
    animeTitle: string = '';
    animeData: any = null;
    errorMessage: string = '';

    private animeService = inject(AnimeService);
  
    searchAnime() {
      this.animeService.searchAnime(this.animeTitle).subscribe({
        next: (data) => {
          console.log(data);
          this.animeData = data;
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }    

}
