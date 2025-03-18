import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from "./Components/top-bar/top-bar.component";
import { AnimeSearchComponent } from "./Components/anime-search/anime-search.component";
import { AnimeService } from './Services/anime.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, AnimeSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';

  animeService = inject(AnimeService)
  animeData: any = null;

  ngOnInit(): void{
    this.animeService.dataFoundEmitter.subscribe(data => this.animeData = data);
  }

}
