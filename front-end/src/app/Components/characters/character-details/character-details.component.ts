import { Component, inject } from '@angular/core';
import { AnimeDetailsService } from '../../../Core/Services/anime-details.service';
import { Character } from '../../../Core/Model/character.model';
import { Subject, takeUntil } from 'rxjs';
import { Anime } from '../../../Core/Model/anime.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimeSearchService } from '../../../Core/Services/anime-search.service';

@Component({
  selector: 'app-character-details',
  imports: [ CommonModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent {

  private destroy$ = new Subject<void>();
  private animeDetailsService = inject(AnimeDetailsService);
  private animeSearchService = inject(AnimeSearchService);
  private router = inject(Router);

  character?: Character;
  descriptionFixed?: String[] = [];

  ngOnInit() {
    this.animeDetailsService.character.pipe( takeUntil(this.destroy$)).subscribe((data: Character) => { 
      this.character = data;  
      this.descriptionFixed = this.destructuringDescription(this.character);       
    });
  }

  goToDetails(id: number) {
    this.animeSearchService.getAnimeId(id);
    this.router.navigate(['/anime', id]);    
    this.animeSearchService.statusCloseComponent(false);
  }

  destructuringDescription(data: Character): string[] {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const descriptionArray = data.node.description?.split("\n") ?? [];
    const descriptionFixed: string[] = [];
    for (let i = 0; i < descriptionArray.length; i++) {
      descriptionFixed.push(
        descriptionArray[i].replace("__","<b>").replace("__","</b>")
        .replace(linkRegex, '<a class="text-blue-500" href="$2" target="_blank">$1</a>')+"<br>"      
      );
      
    }

    return  descriptionFixed;
  }

    


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
