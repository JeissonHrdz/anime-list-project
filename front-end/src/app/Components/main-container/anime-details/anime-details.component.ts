import { Component, inject } from '@angular/core';
import { TopBarComponent } from '../../top-bar/top-bar.component';
import { AnimeService } from '../../../Services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from '../../../Model/anime.model';
import { AnimeSearchService } from '../../../Services/anime-search.service';
import { AnimeCharactersComponent } from '../anime-characters/anime-characters.component';
import { AnimeDetailsService } from '../../../Services/anime-details.service';
import { Character } from '../../../Model/character.model';

@Component({
  selector: 'app-anime-details',
  imports: [AnimeCharactersComponent],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.css',
})
export class AnimeDetailsComponent {
  private animeService = inject(AnimeService);
  private animeSearchService = inject(AnimeSearchService);
  private animeDetailsService = inject(AnimeDetailsService);
  private route = inject(ActivatedRoute);

  animeData?: Anime;
  animeId: number = 0;
  animeCharacters?: Character[];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.animeId = Number(params.get('id'));
      this.animeService
        .searchAnimeById(this.animeId.toString())
        .subscribe((data: Anime) => {
          this.animeData = data;
          this.characters();
          this.animeDetailsService.animeCharacters(data.characters);
        });
    });
  }

  characters(){
    this.animeData?.characters.edges.node.map((item: any) => {
      console.log(item);
    })
  }

  ngOnDestroy(): void {}
}
