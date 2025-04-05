import { Component, inject, OnDestroy } from "@angular/core";
import { AnimeService } from "../../../Core/Services/anime.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Anime } from "../../../Core/Model/anime.model";
import { NgScrollbarModule } from "ngx-scrollbar";
import { Router } from "@angular/router";
import { AnimeDetailsComponent } from "../../anime/anime-details/anime-details.component";
import { AnimeSearchService } from "../../../Core/Services/anime-search.service";
import { on } from "events";
import { Subject, takeUntil } from "rxjs";
import { NgIcon,  provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';


@Component({
  selector: "app-anime-search",
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgScrollbarModule],
  providers: [provideIcons({heroUsers})],
  templateUrl: "./anime-search.component.html",
  styleUrl: "./anime-search.component.css"
})
export class AnimeSearchComponent {

  private destroy$ = new Subject<void>();
  private animeService = inject(AnimeService);
  private animeSearchService = inject(AnimeSearchService);
  private router = inject(Router);

  anime: Anime[] = []; 



  get hasResults(): boolean {
    return this.anime.length > 0
  }

  ngOnInit() {
    this.animeService.dataFoundEmitter.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: Anime[]) => {      
      this.anime = data
    }
    );
    $("body").addClass("overflow-hidden"); // Add class to body
  }
  goToDetails(id: number) {
    this.animeSearchService.getAnimeId(id);
    this.router.navigate(['/anime', id]);    
    this.animeSearchService.statusCloseComponent(false);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
