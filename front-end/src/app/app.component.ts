import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from "./Components/top-bar/top-bar.component";
import { AnimeSearchComponent } from "./Components/anime-search/anime-search.component";
import { AnimeService } from './Services/anime.service';
import { MainContainerComponent } from './Components/main-container/main-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopBarComponent, AnimeSearchComponent, MainContainerComponent],
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
