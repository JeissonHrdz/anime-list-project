import { Component, inject } from '@angular/core';
import { AnimeService } from '../../../Core/Services/anime.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Anime } from '../../../Core/Model/anime.model';
import { AnimeSearchService } from '../../../Core/Services/anime-search.service';
import { NgIcon,  provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgIcon],
  providers: [provideIcons({ heroMagnifyingGlassSolid })],
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
