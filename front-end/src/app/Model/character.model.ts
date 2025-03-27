import { voiceActors } from "./voice-actor.model";

export interface Character {
    id: number;
    name: {
        full: string;
    };
    image: {
        large: string;
    };
   /*description: string;
    gender: string; 
    age: string; */
    media: {
        edges: {
            voiceActors: voiceActors[];
            node:{
                id: number;
            }
        }[];
    };
}
