import axios from "axios";
import { Anime } from "../Models/ani-model";
import { ANILIST_API_URL } from "../Config/ani-config";
import { Character } from "../Models/character-model";
import { voiceActors } from "../Models/actor-voice-model";
import { Activity } from "../Models/activity-model";

// Constantes
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

// Clase base para el servicio
class AniListService {
  protected async makeRequest(query: string, variables: any) {
    try {
      const response = await axios.post(ANILIST_API_URL, {
        query,
        variables
      });
      return response.data.data;
    } catch (error) {
      const err = error as any;
      console.error(
        "Error en la solicitud de AniList:",
        err.response?.data || err.message
      );
      throw error;
    }
  }
}

// Clase principal del servicio
export class AnimeService extends AniListService {
  // Queries GraphQL
  private readonly ANIME_BY_TITLE_QUERY = `
    query ($title: String, $page: Int, $perPage: Int) {
      Page (page: $page, perPage: $perPage) {
        media (search: $title, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          description
          episodes
          status
          averageScore
          genres
          coverImage {
            large
          }
          format
        }
      }
    }
  `;

  private readonly ANIME_BY_ID_QUERY = `
    query ($id: Int) {           
      Media (id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description
        episodes
        status
        averageScore
        genres
        season
        bannerImage
        source
        duration
        type
        trailer {
          id
          site
          thumbnail
        }
        startDate {
          day
          month
          year 
        }
        endDate {
          day
          month
          year
        }
        coverImage {
          large
          extraLarge
        }
        format
        characters (page: 1, perPage: 6, sort: ID) {
          edges {
            role
            node {
              id                            
              name {
                full
              }
              description                               
              image {
                large
              }
            }
            voiceActors (language: JAPANESE) {
              id
              name {
                first
                last
              }
              image {
                large
              }
            }                       
          }                    
        }
      }          
    }
  `;

  private readonly ANIME_TRENDING_QUERY = ` 
    query ( $seasonYear: Int) {
      Page (page: 1, perPage: 10) {
        media (type: ANIME,  seasonYear: $seasonYear, sort: [TRENDING_DESC, FORMAT_DESC]) {
          id
          title {
            romaji
            english
            native
          }
          description
          episodes
          status 
          averageScore
          genres
          coverImage{
            extraLarge
          }
          format
        }
      }
    }
  `;

  private readonly ANIME_SEASON = ` 
  query ($season: MediaSeason, $seasonYear: Int, $page: Int, $perPage: Int, $sort: MediaSort) {
    Page (page: $page, perPage: $perPage) {
      media (type: ANIME, season: $season,  seasonYear: $seasonYear, sort: [$sort] ) {
        id
        title {
          romaji
          english
          native
        }
        startDate {
          day
          month
          year 
        }        
        description
        episodes
        status 
        averageScore
        genres
        format
        coverImage{
          large
        }
        format
      }
      pageInfo {
      hasNextPage
     }
    }
  }
`;

  private readonly ANIME_BY_FILTER = ` 
query ($page: Int, $perPage: Int, $type: MediaType,  $season: MediaSeason , $search: String, $genreIn: [String],
 $tagIn: [String], $seasonYear: Int, $formatIn: [MediaFormat]){ 
Page (page: $page, perPage: $perPage) {
  media(type: $type, format_in: $formatIn, season: $season, search: $search, genre_in: $genreIn, tag_in: $tagIn, 
  seasonYear: $seasonYear ,sort: [TRENDING_DESC, FORMAT_DESC]) {
    title {
      romaji     
    }  
    id
    format
    season  
    coverImage {
      large
    } 
  }
    pageInfo {
    hasNextPage
  }
}   
}
`;

  async getAnimeByFilter(page: number, perPage: number, type?: string, season?: string | null, search?: string | null,
    genreIn?: string[] | null, tagIn?: string[] | null, seasonYear?: number | null, formatIn?: string[] | null
  ): Promise<Anime[]> {
    search = null;
    const variables = { page, perPage, type, season, search, genreIn, tagIn, seasonYear, formatIn };
    const data = await this.makeRequest(this.ANIME_BY_FILTER, variables);
    console.log(variables);
    return data.Page;
  }


  async getAnimeByTitle(
    title: string,
    page: number = DEFAULT_PAGE,
    perPage: number = DEFAULT_PER_PAGE
  ): Promise<Anime[]> {
    const variables = { title, page, perPage };
    const data = await this.makeRequest(this.ANIME_BY_TITLE_QUERY, variables);
    return data.Page.media as Anime[];
  }

  async getAnimeById(
    id: string,
    page: number = DEFAULT_PAGE,
    perPage: number = DEFAULT_PER_PAGE
  ): Promise<Anime> {
    const variables = { id: parseInt(id), page, perPage };
    const data = await this.makeRequest(this.ANIME_BY_ID_QUERY, variables);
    return data.Media as Anime;
  }

  async getAnimeTrending(seasonYear: number): Promise<Anime[]> {
    const variables = { seasonYear };
    const data = await this.makeRequest(this.ANIME_TRENDING_QUERY, variables);
    return data.Page.media as Anime[];
  }

  async getAnimeSeason(season: string, seasonYear: number, page: number, perPage: number, sort: string): Promise<Anime[]> {
    const variables = { season, seasonYear, page, perPage, sort };
    const data = await this.makeRequest(this.ANIME_SEASON, variables);
    return data.Page.media as Anime[];
  }

}
// Clase para manejar personajes
export class CharacterService extends AniListService {
  private readonly ALL_CHARACTERS_QUERY = `
    query ($id: Int) {           
      Media (id: $id, type: ANIME) {    
        title {
          romaji
        } 
        coverImage {
          large
        }          
        characters {
          edges {
            role
            node {
              id                            
              name {
                full
              }
              description  
              gender
              dateOfBirth {
                year
                month
                day
              }
              age                                                                                
              image {
                large
              }                        
            }
            voiceActors (language: JAPANESE, sort: ROLE) {
              id
              name {
                first
                last
              }
              image {
                large
              }
            }                       
          }                    
        }
      }          
    }
  `;

  private readonly CHARACTER_BY_ID_QUERY = `
    query Character($characterId: Int) {
      Character(id: $characterId) {
        id
        name {
          full
          native
          alternative
        }
        description
        gender
        dateOfBirth {
          year
          month
          day
        }
        age
        image {
          large
        }    
        media (sort: ID) {      
          nodes {        
            id
            title {
              romaji
            }
            coverImage {
              large
            }
          }    
        }
      }
    }
  `;

  async getAllCharacters(id: string): Promise<Character[]> {
    const variables = { id: parseInt(id) };
    const data = await this.makeRequest(this.ALL_CHARACTERS_QUERY, variables);
    return data.Media.characters.edges as Character[];
  }

  async getCharacterById(characterId: string): Promise<Character> {
    const variables = { characterId: parseInt(characterId) };
    const data = await this.makeRequest(this.CHARACTER_BY_ID_QUERY, variables);
    return data.Character;
  }
}

// Clase para manejar actores de voz
export class VoiceActorService extends AniListService {
  private readonly VOICE_ACTOR_BY_ID_QUERY = `
    query Staff($voiceActorId: Int, $page: Int) {
      Staff(id: $voiceActorId) {
        id
        name {
          first
          last
          native
          alternative
        }
        image {
          large
        }
        description
        gender
        dateOfBirth {
          day
          month
          year
        }
        dateOfDeath {
          day
          month
          year
        }
        age
        homeTown
        siteUrl
        characterMedia(sort: START_DATE_DESC, page: $page) {     
          edges {
            characters {
              id
              name {
                full
              }
              image {
                large
              }
            }
            node {
              id
              title {
                romaji
              }
              startDate {
                year
              }
              coverImage {
                large
              }
            }
          }   
        }
      }
    }
  `;

  async getVoiceActorById(voiceActorId: string, page: number): Promise<voiceActors> {
    const variables = {
      voiceActorId: parseInt(voiceActorId),
      page
    };
    const data = await this.makeRequest(this.VOICE_ACTOR_BY_ID_QUERY, variables);
    return data.Staff;
  }
}

export class ActivityService extends AniListService {
  private readonly ALL_ACTIVITY_RECENT = `
   query Activity($page: Int) {
  Page(page: $page, perPage: 20) {
    activities(sort: ID_DESC, isFollowing: false, type_in: [ ANIME_LIST, MANGA_LIST]  
    ) {
      ... on ListActivity {
        id
        userId
        type
        status
        progress
        createdAt        
        user {
          name
          avatar {
            medium
          }
        }
        media {
          id
          title {
            romaji
          }
          coverImage {
            medium
            large
            extraLarge
          }
          bannerImage
        }
      }      
    }
    pageInfo {
      hasNextPage
    }
  } 
}`;


  private readonly ALL_ACTIVITY_TEXT = `
   query Activity($page: Int) {
  Page(page: $page, perPage: 20) {
    activities(sort: ID_DESC, isFollowing: false, type_in: [TEXT]  
    ) {      
      ... on TextActivity {
        id
        userId
        type
        text
        createdAt
        user {
          name
          avatar {
            medium
          }
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  } 
}`;
  async getGlobalActivity(page: number): Promise<Activity> {
    const variables = { page };
    const data = await this.makeRequest(this.ALL_ACTIVITY_RECENT, variables);
    return data.Page.activities as Activity;
  }

  async getGlobalActivityText(page: number): Promise<Activity> {
    const variables = { page };
    const data = await this.makeRequest(this.ALL_ACTIVITY_TEXT, variables);
    return data.Page.activities as Activity;
  }
}

// Exportar instancias de los servicios
export const animeService = new AnimeService();
export const characterService = new CharacterService();
export const voiceActorService = new VoiceActorService();
export const activityService = new ActivityService();
