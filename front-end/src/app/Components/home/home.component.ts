import { Component } from '@angular/core';
import { TrendingSliderComponent } from './trending-slider/trending-slider.component';
import { SeasonAnimeComponent } from "./season-anime/season-anime.component";
import { ActivityComponent } from "./activity/activity.component";
import { UpcomingAnimesComponent } from "./upcoming-animes/upcoming-animes.component";

@Component({
  selector: 'app-home',
  imports: [TrendingSliderComponent, SeasonAnimeComponent, ActivityComponent, UpcomingAnimesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
 