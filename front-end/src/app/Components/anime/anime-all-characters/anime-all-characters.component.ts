import { Component, inject } from '@angular/core';
import { AnimeService } from '../../../Core/Services/anime.service';
import { Character } from '../../../Core/Model/character.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-anime-all-characters',
  imports: [CommonModule],
  templateUrl: './anime-all-characters.component.html',
  styleUrl: './anime-all-characters.component.css'
})
export class AnimeAllCharactersComponent {

  private destroy$ = new Subject<void>()
  private animeService = inject(AnimeService)
  private route = inject(ActivatedRoute)

  characters?: Array<Character> = []
  animeId: number = 0


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.animeId = Number(params.get('id'));
        return this.animeService.getAllCharacterByAnime(this.animeId).pipe(
          catchError(error => {
            console.error('Error loading data:', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((data: Array<Character>) => {
      this.characters = data;
      console.log(this.characters)
    })
  }
}
