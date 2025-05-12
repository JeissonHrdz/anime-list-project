import { Anime } from "./ani-model";


export interface Activity{
    listActivities: ListAcitvity[];
    textActivities: TextAcitvity[];
}

export interface ListAcitvity{
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

export interface TextAcitvity{
    id: number;
    userId: number;
    type: string;
    text:string; 
    createdAt: string;
    user: {
        name: string;
        avatar:{
            medium: string;
        }
    }
    media: Anime;
  
}