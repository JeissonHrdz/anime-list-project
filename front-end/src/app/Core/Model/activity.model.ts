import { Anime } from "./anime.model";


 interface AllActivity{
    id: number;
    userId: number;
    type: string;
    status?:string;
    progress?: string;
    text?:string; 
    createdAt: string;
    user: {
        name: string;
        avatar:{
            medium: string;
        }
    }
    media: Anime;  
}

/*export interface TextActivity{
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
    
  
}*/

export type Activity = AllActivity

export type ActivityResponse = Activity[];