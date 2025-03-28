import { Component, inject } from '@angular/core';
import { AnimeService } from '../../../Services/anime.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnimeSearchComponent } from '../../anime-search/anime-search.component';
import { Router } from '@angular/router';
import { Anime } from '../../../Model/anime.model';
import { AnimeSearchService } from '../../../Services/anime-search.service';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  animeTitle: string = '';
  animeData: any = null;
  errorMessage: string = '';
  anime: Array<Anime> = [];

  private animeService = inject(AnimeService);
  private animeSearchService = inject(AnimeSearchService );
  private router = inject(Router)
  animeSearch: any = null;

  searchAnime() {    
    this.animeService.searchAnime(this.animeTitle).subscribe((data:Array<Anime>) => {    
      this.anime = data;      
      this.sendData();      
    });
    this.animeSearchService.statusCloseComponent(true);
  }  

  sendData(){    
    this.animeService.dataFound(this.anime);
  }

}
