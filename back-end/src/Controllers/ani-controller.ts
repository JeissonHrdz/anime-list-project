import { Request, Response } from "express"; // importamos Request y Response desde la libreria express
import { getAllCharacters, getAnimeById, getAnimeByTitle, getCharacterById, getVoiceActorById } from '../Services/ani-service'; // importamos la función getAnimeByTitle del archivo ani-service.ts
import { parse } from "dotenv";

export const searchAnimeByTitle = async (req: Request, res: Response): Promise<void> => { // definimos una función asíncrona que recibe una petición y una respuesta y devuelve una promesa de tipo void
    const title = req.query.title as string; // obtenemos el título del anime de la query de la petición
    const page = parseInt(req.query.page as string) || 1; // obtenemos la página de la query de la petición
    const perPage = parseInt(req.query.perPage as string) || 10; // obtenemos el número de elementos por página de la query de la petición

    if (!title) { // si no se ha proporcionado un título
        res.status(400).json({ error: 'Invalid anime Title' }); // devolvemos un error 400
        return
    }

    try {
        const anime = await getAnimeByTitle(title, page, perPage); // llamamos a la función getAnimeByTitle para obtener los datos del anime
        res.json(anime); // devolvemos los datos del anime    
        console.log(anime);
    } catch (error) {
        console.error(error); // si hay un error, lo mostramos por consola
        res.status(500).json({ error: 'Internal server error' }); // devolvemos un error 500
    }
}


export const searchAnimeById = async (req: Request, res: Response): Promise<void> => { // definimos una función asíncrona que recibe una petición y una respuesta y devuelve una promesa de tipo void
    const id = req.query.id as string; // obtenemos el id del anime de la query de la petición
    const page = parseInt(req.query.page as string) || 1; // obtenemos la página de la query de la petición
    const perPage = parseInt(req.query.perPage as string) || 10; // obtenemos el número de elementos por página de la query de la petición

    if (!id) { // si no se ha proporcionado un título
        res.status(400).json({ error: 'Invalid anime Title' }); // devolvemos un error 400
        return
    }

    try {
        const anime = await getAnimeById(id, page, perPage); // llamamos a la función getAnimeByTitle para obtener los datos del anime
        res.json(anime); // devolvemos los datos del anime    
        console.log(anime);
    } catch (error) {
        console.error(error); // si hay un error, lo mostramos por consola
        res.status(500).json({ error: 'Internal server error' }); // devolvemos un error 500
    }
}

export const getAllCharactersByAnime = async (req: Request, res: Response): Promise<void> => { // definimos una función asíncrona que recibe una petición y una respuesta y devuelve una promesa de tipo void
    const id = req.query.id as string; // obtenemos el id del anime de la query de la petición

    if (!id) { // si no se ha proporcionado un título
        res.status(400).json({ error: 'Invalid anime Title' }); // devolvemos un error 400
        return
    }

    try {
        const anime = await getAllCharacters(id,); // llamamos a la función getAnimeByTitle para obtener los datos del anime
        res.json(anime); // devolvemos los datos del anime    
        console.log(anime);
    } catch (error) {
        console.error(error); // si hay un error, lo mostramos por consola
        res.status(500).json({ error: 'Internal server error' }); // devolvemos un error 500
    }

}

export const getCharacter = async (req: Request, res: Response): Promise<void> => { // definimos una función asíncrona que recibe una petición y una respuesta y devuelve una promesa de tipo void
    const id = req.query.id as string; // obtenemos el id del anime de la query de la petición

    if (!id) { // si no se ha proporcionado un título
        res.status(400).json({ error: 'Invalid character id' }); // devolvemos un error 400
        return
    }

    try {
        const anime = await getCharacterById(id,); // llamamos a la función getAnimeByTitle para obtener los datos del anime
        res.json(anime); // devolvemos los datos del anime    
        console.log(anime);
    } catch (error) {
        console.error(error); // si hay un error, lo mostramos por consola
        res.status(500).json({ error: 'Internal server error' }); // devolvemos un error 500
    }

}


export const getVoiceActor = async (req: Request, res: Response): Promise<void> => { 
    const id = req.query.id as string; 

    if (!id) { // si no se ha proporcionado un título
        res.status(400).json({ error: 'Invalid voice actor id' }); // devolvemos un error 400
        return
    }

    try {
        const voiceActor = await getVoiceActorById(id,); 
        res.json(voiceActor); // devolvemos los datos del anime    
        console.log(voiceActor);
    } catch (error) {
        console.error(error); // si hay un error, lo mostramos por consola
        res.status(500).json({ error: 'Internal server error' }); // devolvemos un error 500
    }

}
