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





/* id: number;
    name: {
        full: string;
    };
    image: {
        large: string;
    };
   /*description: string;
    gender: string; 
    age: string; */
/* media: {
        edges: {
            voiceActors: voiceActors[];
            node:{
                id: number;
            }
        }[];
    };
*/
