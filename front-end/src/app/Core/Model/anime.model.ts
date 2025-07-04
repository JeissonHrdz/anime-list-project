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
  source?: string;
  duration?: number;
  type?: string;
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
    medium: string;
    large: string;
    extraLarge: string;
  }
  format?: string;
  characters: {
    edges: Character[];
  }
}

export interface AnimeSeason { 
    anime: Anime[];
    pageInfo: {
      hasNextPage: boolean;
  }
}

export interface AnimeFilters { 
    media: Anime[];
    pageInfo: {
      hasNextPage: boolean;
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

