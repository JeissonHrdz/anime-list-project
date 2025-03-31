import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [ SearchBarComponent, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

}
