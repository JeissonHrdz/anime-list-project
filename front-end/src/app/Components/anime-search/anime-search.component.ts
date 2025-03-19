import { Component, inject } from "@angular/core";
import { AnimeService } from "../../Services/anime.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Anime } from "../../Model/anime.model";
import { NgScrollbarModule } from "ngx-scrollbar";

@Component({
  selector: "app-anime-search",
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgScrollbarModule],
  templateUrl: "./anime-search.component.html",
  styleUrl: "./anime-search.component.css"
})
export class AnimeSearchComponent {
  private animeService = inject(AnimeService);

  anime: Array<Anime> = [];
  dataFound:boolean = false;

  ngOnInit(): void {    
    this.animeService.dataFoundEmitter.subscribe((data:Array<Anime>) => {          
       if(data.length > 0){this.dataFound = true}
       console.log(data);
        this.anime = data        
    }
    );   
  } 
}
