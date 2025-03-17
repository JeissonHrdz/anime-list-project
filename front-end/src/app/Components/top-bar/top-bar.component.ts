import { Component } from '@angular/core';
import { AnimeSearchComponent } from "../anime-search/anime-search.component";

@Component({
  selector: 'app-top-bar',
  imports: [AnimeSearchComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

}
