import { Component, Directive, Inject, inject, PLATFORM_ID } from '@angular/core';
import { AnimeDetailsService } from '../../../Core/Services/anime-details.service';
import { Character, CharacterDetail } from '../../../Core/Model/character.model';
import { Subject, takeUntil } from 'rxjs';
import { Anime } from '../../../Core/Model/anime.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeSearchService } from '../../../Core/Services/anime-search.service';
import { CharacterService } from '../../../Core/Services/character.service';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html-pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({ 
  selector: 'app-character-details',
  imports: [ CommonModule, SafeHtmlPipe],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent {

  isBrowser: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any){
     this.isBrowser = isPlatformBrowser(this.platformId);
   }

  private destroy$ = new Subject<void>();
  private animeDetailsService = inject(AnimeDetailsService);
  private animeSearchService = inject(AnimeSearchService);
  private characterService = inject(CharacterService);
  private route = inject(ActivatedRoute);
  private router = inject(Router); 

  character?: CharacterDetail;
  descriptionFixed?: string[] = [];

  ngOnInit() {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const characterId = Number(params.get('id'));
      this.characterService.searchCharacterById(characterId).pipe(takeUntil(this.destroy$)).subscribe((data: CharacterDetail) => {
        this.character = data    
        console.log(this.character);        
        this.descriptionFixed = this.destructuringDescription(this.character); 
        console.log(this.descriptionFixed);   
      });
    })   
   $("#topBar").addClass("bg-neutral-800");
  }


  goToDetails(id: number) {
    this.animeSearchService.getAnimeId(id);
    this.router.navigate(['/anime', id]);    
    this.animeSearchService.statusCloseComponent(false);
  }

   showVoiceActorDetails(voiceActorId: number) {         
    this.router.navigate(['/voice-actor', voiceActorId]);  

}

  destructuringDescription(data: CharacterDetail): string[] {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const descriptionArray = data.description?.split("\n") ?? [];
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
