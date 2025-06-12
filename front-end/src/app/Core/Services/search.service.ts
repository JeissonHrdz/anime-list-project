import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }


  getAllYears(): number[] {
    // Example: return an array of years from 2000 to 2023
    return Array.from({ length: 87 }, (_, i) => (new Date().getFullYear()+1) - i);
  }
}
