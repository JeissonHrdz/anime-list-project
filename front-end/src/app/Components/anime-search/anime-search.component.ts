import { Component, inject } from "@angular/core";
import { AnimeService } from "../../Services/anime.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Anime } from "../../Model/anime.model";
import { NgScrollbarModule } from "ngx-scrollbar";
import { Router } from "@angular/router";

@Component({
  selector: "app-anime-search",
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgScrollbarModule],
  templateUrl: "./anime-search.component.html",
  styleUrl: "./anime-search.component.css"
})
export class AnimeSearchComponent {
  private animeService = inject(AnimeService);
  private router = inject(Router); 

  anime: Array<Anime> = [];
  dataFound:boolean = false;
  show:boolean = false;

  ngOnInit(): void {    
    this.animeService.dataFoundEmitter.subscribe((data:Array<Anime>) => {          
       if(data.length > 0){this.dataFound = true; this.show = true}
       console.log(data);
        this.anime = data        
    }
    );   
  } 
  goToDetails(id: number) {
   
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/anime', id]);         
    });
    this.router.navigate(['/anime', id]); 
    this.show = false;
  
  }
}
