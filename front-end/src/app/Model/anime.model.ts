import { Character } from './character.model';

export interface Anime {
 
  id: number;
  title: Title;
  description?: string;
  episodes?: number;
  status: string;
  averageScore?: number;
  genres: string[];
  season?: string;
  bannerImage?: string;
  trailer?: Trailer;
  startDate: Date;
  endDate: Date;
  coverImage: Image;
  format?: string;
  characters: CharacterConnection;
}

interface Title {
    romaji: string;
    english?: string;
    native: string;
  }
  
  interface Date {
    day?: number;
    month?: number;
    year?: number;
  }
  
  interface Image {
    large: string;
  }

  interface CharacterConnection {
    edges: Character[];
  }

  interface Trailer{
    id: String
    site: String
    thumbnail: String 
  }
  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  /* id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  description: string;
  episodes: number;
  status: string;
  averageScore: number;
  genres: string;
  season: string;
  bannerImage: string;
  startDate: {
    day: number;
    month: number;
    year: number;
  };
  endtDate: {
    day: number;
    month: number;
    year: number;
  };
  coverImage: {
    large: string;
  };
  format: string;
  characters: {
    edges: {
      node: Character[];
    };
  };*/

