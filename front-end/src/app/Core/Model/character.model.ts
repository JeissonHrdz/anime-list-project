import { Anime } from './anime.model';
import { voiceActors } from './voice-actor.model';

export interface Character {
  role: string;
  node: {
    id: number;
    name: {
      full: string;
      native: string;
      alternative: string[];
    }
    description?: string;
    image: {
      large: string;
    }
    dateOfBirth?: {
      year: number;
      month: number;
      day: number;
    } 
    gender?: string;
    age?: string;  
    media: {
      nodes: Anime[];    
      pageInfo: {
        hasNextPage: boolean;
      };
    }
  };
  voiceActors: voiceActors[];
}


export interface CharacterDetail {
    id: number;
    name: {
      full: string;
      native: string;
      alternative: string[];      
    }
    description?: string;
    image: {
      large: string;
    }
    dateOfBirth?: {
      year: number;
      month: number;
      day: number;
    }
    gender?: string;
    age?: string;  
    media: {
      nodes: Anime[];    
      pageInfo: {
        hasNextPage: boolean;
      };
    }
}






