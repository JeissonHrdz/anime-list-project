import { Routes } from '@angular/router';
import { AnimeSearchComponent } from './Components/anime/anime-search/anime-search.component';
import { AppComponent } from './app.component';
import { AnimeDetailsComponent } from './Components/anime/anime-details/anime-details.component';
import { HomeComponent } from './Components/home/home.component';


export const routes: Routes = [  
    {path: 'anime/:id', 
        loadComponent: () => import('./Components/anime/anime-details/anime-details.component')
        .then(m => m.AnimeDetailsComponent),
        providers: [
            {
              provide: 'renderMode',
              useValue: 'client'
            }
        ]   
    }, 
    {path: 'home', component: HomeComponent },  
    {path: 'anime/:id/characters', 
        loadComponent: () => import('./Components/anime/anime-all-characters/anime-all-characters.component')
        .then(m => m.AnimeAllCharactersComponent),
        providers: [
            {
              provide: 'renderMode',
              useValue: 'client'
            }
        ] 
    },
    {path: 'character/:id', 
        loadComponent: () => import('./Components/characters/character-details/character-details.component')
        .then(m => m.CharacterDetailsComponent),
        providers: [
            {
              provide: 'renderMode',
              useValue: 'client'
            }
        ] 
    },
    {path: 'voice-actor/:id', 
        loadComponent: () => import('./Components/actor-voice/actor-voice-details/actor-voice-details.component')
        .then(m => m.ActorVoiceDetailsComponent),
        providers: [
            {
              provide: 'renderMode',
              useValue: 'client'
            }
        ] 
    },
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
