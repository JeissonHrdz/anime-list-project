import { Character } from './character.model';

export interface Anime {
 
  id: number;
  title: {
    romaji: string;
    english?: string;
    native: string;
  }
  description?: string;
  episodes?: number;
  status: string;
  averageScore?: number;
  genres: string[];
  season?: string;
  bannerImage?: string;
  trailer?: {
    id: string;
    site: string;
    thumbnail: string;
  }
  startDate: {
    day: number;
    month: number;
    year: number;
  }
  endDate: {
    day: number;
    month: number;
    year: number;
  }
  coverImage: {
    large: string;
  }
  format?: string;
  characters: {
    edges: Character[];
  }
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

