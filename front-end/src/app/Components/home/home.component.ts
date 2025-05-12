import { Component } from '@angular/core';
import { TrendingSliderComponent } from './trending-slider/trending-slider.component';
import { SeasonAnimeComponent } from "./season-anime/season-anime.component";
import { ActivityComponent } from "./activity/activity.component";

@Component({
  selector: 'app-home',
  imports: [TrendingSliderComponent, SeasonAnimeComponent, ActivityComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
 