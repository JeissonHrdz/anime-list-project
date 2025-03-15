import axios from 'axios'; // importamos axios para hacer peticiones HTTP
import { Anime } from '../Models/ani-model'; // importamos la interfaz Anime del archivo ani-model.ts
import { ANILIST_API_URL } from '../Config/ani-config';

export const getAnimeByTitle = async (title: string, page: number = 1, perPage: number = 10): Promise<Anime[]> => { // definimos una función asíncrona que recibe un título de anime y devuelve una promesa de Anime

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
                coverImage {
                    large
                }
                characters (page: $page, perPage: $perPage) {
                    edges {
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
                                full
                            }
                            image {
                                large
                            }
                        }
                       
                    }
                    }
                }
            }
        }    
    `;// definimos la query que vamos a enviar a la API de AniList
    const variables = { // definimos las variables que vamos a enviar en la query
        title: title,
        page: page,
        perPage: perPage
    };

    console.log('variables', variables);
    console.log('query', query);
    try {

        const response = await axios.post(ANILIST_API_URL, { // hacemos una petición POST a la API de AniList
            query: query, // pasamos la query
            variables: variables // pasamos las variables
        });
        console.log(response.data.data.Page.media); 
        return response.data.data.Page.media as Anime[] // devolvemos los datos de la media (anime) que nos ha devuelto la API de AniList
      
    } catch (error) {
        const err = error as any;
        console.error("Error en la solicitud de AniList:", err.response?.data || err.message); // si hay un error, lo mostramos por consola
        throw error; // lanzamos el error para que lo maneje el controlador
    }

};