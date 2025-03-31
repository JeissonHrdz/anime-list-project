import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from "./Components/shared/top-bar/top-bar.component";
import { AnimeSearchComponent } from "./Components/anime/anime-search/anime-search.component";
import { AnimeService } from './Core/Services/anime.service';
import { AnimeSearchService } from './Core/Services/anime-search.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, AnimeSearchComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';

  animeService = inject(AnimeService)
  animeSearchService = inject(AnimeSearchService)
  animeData: any = null;
  closeComponent:Boolean = false;

  ngOnInit(){    
    this.animeService.dataFoundEmitter.subscribe(data => this.animeData = data);   
    this.animeSearchService.status.subscribe(data => this.closeComponent = data);
  }

}
