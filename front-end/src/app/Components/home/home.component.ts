import { Component } from '@angular/core';
import { TrendingSliderComponent } from './trending-slider/trending-slider.component';

@Component({
  selector: 'app-home',
  imports: [ TrendingSliderComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
