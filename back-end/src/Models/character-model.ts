import { voiceActors } from './actor-voice-model';

export interface Character {
    id: number;
    name: {
        full: string;
    };
    image: {
        large: string;
    };
   description: string;  
    media: {
        edges: {
            voiceActors: voiceActors[];
            node:{
                id: number;
            }
        }[];
    };
}

