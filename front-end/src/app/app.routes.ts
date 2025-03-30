import { Routes } from '@angular/router';
import { AnimeSearchComponent } from './Components/anime-search/anime-search.component';
import { AppComponent } from './app.component';
import { AnimeDetailsComponent } from './Components/main-container/anime-details/anime-details.component';
import { MainContainerComponent } from './Components/main-container/main-container.component';

export const routes: Routes = [  
    {path: 'anime/:id', loadComponent: () => import('./Components/main-container/anime-details/anime-details.component').then(m => m.AnimeDetailsComponent)}, 
    {path: 'animes', component: MainContainerComponent},  
    {path: 'anime/:id/characters', loadComponent: () => import('./Components/main-container/anime-all-characters/anime-all-characters.component').then(m => m.AnimeAllCharactersComponent)},
    {path: '', redirectTo: '/animes', pathMatch: 'full'},
];
