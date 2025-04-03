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
    gender: string;
    dateOfBirth: {
        year: number;
        month: number;
        day: number;
    };
    age: number;   
    media: {
        edges: {
            voiceActors: voiceActors[];
            node:{
                id: number;
            }
        }[];
    };
}

