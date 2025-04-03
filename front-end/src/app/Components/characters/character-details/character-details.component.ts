import { Component, inject } from '@angular/core';
import { AnimeDetailsService } from '../../../Core/Services/anime-details.service';
import { Character } from '../../../Core/Model/character.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-character-details',
  imports: [],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent {

  private destroy$ = new Subject<void>();
  private animeDetailsService = inject(AnimeDetailsService);
  character?: Character;

  ngOnInit() {
    this.animeDetailsService.character.pipe( takeUntil(this.destroy$)).subscribe((data: Character) => { 
      this.character = data;    
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
