import { Anime } from "./anime.model";


export interface ListActivity{
    id: number;
    userId: number;
    type: string;
    status:string;
    progress: string;
    createdAt: string;
    user: {
        name: string;
        avatar:{
            medium: string;
        }
    }
    media: Anime;  
}

export interface TextActivity{
    id: number;
    userId: number;
    type: string;
    text?:string; 
    createdAt: string;
    user: {
        name: string;
        avatar:{
            medium: string;
        }
    }
    
  
}

export type Activity = ListActivity | TextActivity;

export type ActivityResponse = Activity[];