import { Component, inject, OnDestroy } from "@angular/core";
import { AnimeService } from "../../Services/anime.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Anime } from "../../Model/anime.model";
import { NgScrollbarModule } from "ngx-scrollbar";
import { Router } from "@angular/router";
import { AnimeDetailsComponent } from "../main-container/anime-details/anime-details.component";
import { AnimeSearchService } from "../../Services/anime-search.service";
import { on } from "events";

@Component({
  selector: "app-anime-search",
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgScrollbarModule],
  templateUrl: "./anime-search.component.html",
  styleUrl: "./anime-search.component.css"
})
export class AnimeSearchComponent {
  private animeService = inject(AnimeService);
  private animeSearchService = inject(AnimeSearchService );
  animeDetails?:AnimeDetailsComponent;
  private router = inject(Router);   

  anime: Array<Anime> = [];
  dataFound:boolean = false;
  show:boolean = false;

  ngOnInit()  {    
    this.animeService.dataFoundEmitter.subscribe((data:Array<Anime>) => {          
       if(data.length > 0){this.dataFound = true; this.show = true}      
        this.anime = data        
    }
    );   
  } 
  goToDetails(id: number) {       
    this.animeDetails?.ngOnDestroy()
    this.router.navigate(['/anime', id]); 
    this.show = false;   
    this.animeSearchService.statusCloseComponent(false); 
  }

  

}
