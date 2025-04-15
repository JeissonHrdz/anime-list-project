import axios from "axios"; // importamos axios para hacer peticiones HTTP
import { Anime } from "../Models/ani-model"; // importamos la interfaz Anime del archivo ani-model.ts
import { ANILIST_API_URL } from "../Config/ani-config";
import { Character } from "../Models/character-model";
import { voiceActors } from "../Models/actor-voice-model";

export const getAnimeByTitle = async (
  title: string,
  page: number = 1,
  perPage: number = 20
): Promise<Anime[]> => {
  // definimos una función asíncrona que recibe un título de anime y devuelve una promesa de Anime

  const query = `
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
    `; // definimos la query que vamos a enviar a la API de AniList
  const variables = {
    // definimos las variables que vamos a enviar en la query
    title: title,
    page: page,
    perPage: perPage
  };

  console.log("variables", variables);
  console.log("query", query);
  try {
    const response = await axios.post(ANILIST_API_URL, {
      // hacemos una petición POST a la API de AniList
      query: query, // pasamos la query
      variables: variables // pasamos las variables
    });

    return response.data.data.Page.media as Anime[]; // devolvemos los datos de la media (anime) que nos ha devuelto la API de AniList
  } catch (error) {
    const err = error as any;
    console.error(
      "Error en la solicitud de AniList:",
      err.response?.data || err.message
    ); // si hay un error, lo mostramos por consola
    throw error; // lanzamos el error para que lo maneje el controlador
  }
};

export const getAnimeById = async (
  id: string,
  page: number = 1,
  perPage: number = 20
): Promise<Anime> => {
  // definimos una función asíncrona que recibe un título de anime y devuelve una promesa de Anime

  const query = `
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
                trailer{
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
    `; // definimos la query que vamos a enviar a la API de AniList
  const variables = {
    // definimos las variables que vamos a enviar en la query
    id: id,
    page: page,
    perPage: perPage
  };

  console.log("variables", variables);
  console.log("query", query);
  try {
    const response = await axios.post(ANILIST_API_URL, {
      // hacemos una petición POST a la API de AniList
      query: query, // pasamos la query
      variables: variables // pasamos las variables
    });

    return response.data.data.Media as Anime; // devolvemos los datos de la media (anime) que nos ha devuelto la API de AniList
  } catch (error) {
    const err = error as any;
    console.error(
      "Error en la solicitud de AniList:",
      err.response?.data || err.message
    ); // si hay un error, lo mostramos por consola
    throw error; // lanzamos el error para que lo maneje el controlador
  }
};

export const getAllCharacters = async (id: string): Promise<Character[]> => {
  const query = `
        query ($id: Int) {           
             Media (id: $id, type: ANIME) {    
              title {
                  romaji
              } 
              coverImage {
                  large
              }          
                characters  {
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
    `; // definimos la query que vamos a enviar a la API de AniList
  const variables = {
    // definimos las variables que vamos a enviar en la query
    id: id
  };
  console.log("variables", variables);
  console.log("query", query);
  try {
    const response = await axios.post(ANILIST_API_URL, {
      // hacemos una petición POST a la API de AniList
      query: query, // pasamos la query
      variables: variables // pasamos las variables
    });

    return response.data.data.Media.characters.edges as Character[]; // devolvemos los datos de la media (anime) que nos ha devuelto la API de AniList
  } catch (error) {
    const err = error as any;
    console.error(
      "Error en la solicitud de AniList:",
      err.response?.data || err.message
    ); // si hay un error, lo mostramos por consola
    throw error; // lanzamos el error para que lo maneje el controlador
  }
};

export const getCharacterById = async (characterId: string): Promise<Character> => {
  const query = `
       query Character($characterId: Int) {
            Character(id: $characterId) {
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
    `; // definimos la query que vamos a enviar a la API de AniList
  const variables = {
    // definimos las variables que vamos a enviar en la query
    characterId: characterId
  };
  console.log("variables", variables);
  console.log("query", query);
  try {
    const response = await axios.post(ANILIST_API_URL, {
      // hacemos una petición POST a la API de AniList
      query: query, // pasamos la query
      variables: variables // pasamos las variables
    });

    return response.data.data.Character; // devolvemos los datos de la media (anime) que nos ha devuelto la API de AniList
  } catch (error) {
    const err = error as any;
    console.error(
      "Error en la solicitud de AniList:",
      err.response?.data || err.message
    ); // si hay un error, lo mostramos por consola
    throw error; // lanzamos el error para que lo maneje el controlador
  }
};

export const getVoiceActorById = async (voiceActorId: string): Promise<voiceActors> => {
  const query = `
          query Staff($voiceActorId: Int) {
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
            characters {
              edges {
                role
                node {
                  id
                  name {
                   full
                  }
                   image {
                    large
                   }
                  media {
                    nodes {
                      id
                      startDate {              
                        year 
                      }
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
            }
          }
        }
    `;
  const variables = {

    voiceActorId: voiceActorId
  };
  console.log("variables", variables);
  console.log("query", query);
  try {
    const response = await axios.post(ANILIST_API_URL, {
      query: query,
      variables: variables
    });
    return response.data.data.Staff
  } catch (error) {
    const err = error as any;
    console.error(
      "Error en la solicitud de AniList:",
      err.response?.data || err.message
    );
    throw error;
  }
};
