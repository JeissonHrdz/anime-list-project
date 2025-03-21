import { Component, inject } from '@angular/core';
import { TopBarComponent } from "../../top-bar/top-bar.component";
import { AnimeService } from '../../../Services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anime-details',
  imports: [],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.css'
})
export class AnimeDetailsComponent {

  private animeService = inject(AnimeService)
  private route = inject(ActivatedRoute )
  animeId:number = 0;
  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {this.animeId = Number(params.get('id'))}); 
    console.log(this.animeId);
  }

}
