import { Component, inject } from '@angular/core';
import { TopBarComponent } from "../../top-bar/top-bar.component";
import { AnimeService } from '../../../Services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from '../../../Model/anime.model';
import { AnimeSearchService } from '../../../Services/anime-search.service';

@Component({
  selector: 'app-anime-details',
  imports: [],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.css'
})
export class AnimeDetailsComponent {

  private animeService = inject(AnimeService)
  private animeSearchService = inject(AnimeSearchService)
  private route = inject(ActivatedRoute )
 
  animeData?: Anime;
  animeId:number = 0;  

  ngOnInit(): void {  
    this.route.paramMap.subscribe(params => {
      this.animeId = Number(params.get('id'))
      this.animeService.searchAnimeById(this.animeId.toString()).subscribe((data:Anime) => {this.animeData = data});
    });     
    
  }

  ngOnDestroy(): void {

  }

}
