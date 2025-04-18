import { CharacterDetailsComponent } from "../../Components/characters/character-details/character-details.component";
import { Anime } from "./anime.model";
import { Character, CharacterDetail } from "./character.model";

export interface voiceActors {
    id: number;
    name: {
      first: string;
      last: string;
      native: string;
      alternative: string[];
    }
    image: {
      large: string;
    } 
    description: string;
    gender: string;
    dateOfBirth: {
      day: number;
      month: number;      
      year: number;
     
    }
    dateOfDeath: {
      day: number;
      month: number;
      year: number;    
      
    }
    age: number;
    homeTown: string;
    siteUrl: string;
    characters: Character[]
 }

 export interface voiceActorsDetails {
  id: number;
  name: {
    first: string;
    last: string;
    native: string;
    alternative: string[]
  }
  image: {
    large: string;
  }
  description: string;
  gender: string;
  dateOfBirth: {
    day: number;
    month: number;
    year: number; 
  }
  dateOfDeath: {
    day: number;
    month: number;
    year: number;    
    
  }
  age: number;
  homeTown: string;
  siteUrl: string;
  characterMedia: {
    edges: {
      characters: CharacterDetail[]
      node: Anime 
    } []
  } 
}

