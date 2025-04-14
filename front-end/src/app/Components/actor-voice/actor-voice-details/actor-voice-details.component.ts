import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { VoiceActorService } from '../../../Core/Services/voice-actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { voiceActors, voiceActorsDetails } from '../../../Core/Model/voice-actor.model';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html-pipe';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Character } from '../../../Core/Model/character.model';
import { Anime } from '../../../Core/Model/anime.model';

@Component({
  selector: 'app-actor-voice-details',
  imports: [SafeHtmlPipe,CommonModule],
  templateUrl: './actor-voice-details.component.html',
  styleUrl: './actor-voice-details.component.css'
})
export class ActorVoiceDetailsComponent {

  isBrowser: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any){
     this.isBrowser = isPlatformBrowser(this.platformId);
   }

   

  private destroy$ = new Subject<void>();
  private voiceActorService = inject(VoiceActorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  actorVoiceData?: voiceActorsDetails;
  actorVoiceId?: number;
  descriptionFixed?: string[] = [];
  animeMedia: Anime[] = [];
  characters: Character[] = [];


  ngOnInit(): void {
    
      this.route.paramMap.pipe(
         switchMap(params => {
           this.actorVoiceId = Number(params.get('id'));
           return this.voiceActorService.voiceActorById(this.actorVoiceId).pipe(
             catchError(error => {
               console.error('Error loading data:', error);
               return of(undefined);
             })
           );
         }),
         takeUntil(this.destroy$)
       ).subscribe((data?: voiceActorsDetails) => {
         if (data) {
           this.actorVoiceData = data;                 
           this.descriptionFixed = this.destructuringDescription(this.actorVoiceData);          
          
         } else {
           console.warn('No data received for actor voice details.');
         }
       }) 
    
             
   
  }

    destructuringDescription(data: voiceActorsDetails ): string[] {
     
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const descriptionArray = data.description.split("\n") ?? [];
      const descriptionFixed: string[] = [];
      for (let i = 0; i < descriptionArray.length; i++) {
        descriptionFixed.push(
          descriptionArray[i].replace("__","<b>").replace("__","</b>").replace("**","<b>").replace("**","</b>")
          .replace(linkRegex, '<a class="text-blue-500" href="$2" target="_blank">$1</a>')+"<br>"      
        );        
      }
  
      return  descriptionFixed;
    }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Cleanup if needed
  }

}
