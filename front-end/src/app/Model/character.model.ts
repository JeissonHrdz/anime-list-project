import { voiceActors } from './voice-actor.model';

export interface Character {
  role: string;
  node: {
    id: number;
    name: CharacterName;
    description?: string;
    image: Image;
  };
  voiceActors: voiceActors[];
}
interface CharacterName {
  full: string;
}

interface Image {
  large: string;
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
