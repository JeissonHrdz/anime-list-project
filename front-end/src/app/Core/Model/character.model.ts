import { Anime } from './anime.model';
import { voiceActors } from './voice-actor.model';

export interface Character {
  role: string;
  node: {
    id: number;
    name: CharacterName;
    description?: string;
    image: Image;
    dateOfBirth?: DateOfBirth;  
    gender?: string;
    age?: string;  
    media: AnimeConnection;
  };
  voiceActors: voiceActors[];
}
export interface CharacterDetail {
    id: number;
    name: CharacterName;
    description?: string;
    image: Image;
    dateOfBirth?: DateOfBirth;  
    gender?: string;
    age?: string;  
    media: AnimeConnection; 
}

interface CharacterName {
  full: string;
}

interface Image {
  large: string;
}

interface DateOfBirth {
  year: number;
  month: number;
  day: number;
}

interface AnimeConnection {   
      nodes: Anime[];    
}





