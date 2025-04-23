import { Request, Response, NextFunction } from "express"; 
import { animeService, characterService, voiceActorService } from '../Services/ani-service'; 
import { getPaginationParams } from '../Middleware/ani-middleware';


export const searchAnimeByTitle = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    const title = req.query.title as string;
    const { page, perPage } = getPaginationParams(req);

    try {
        const anime = await animeService.getAnimeByTitle(title, page, perPage);
        res.json(anime);
    } catch (error) {
        next(error);
    }
};

export const searchAnimeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {  
    const id = req.query.id as string;
    const { page, perPage } = getPaginationParams(req);

    try {
        const anime = await animeService.getAnimeById(id, page, perPage);
        res.json(anime);
    } catch (error) {
        next(error);
    }
};

export const getAnimeTrending = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    let season = "";
    const month = new Date().getMonth()+1;
    
    if(month >= 1 && month <= 3) {
        season = "WINTER";
    } else if(month >= 4 && month <= 6) {
        season = "SPRING";
    } else if(month >= 7 && month <= 9) {
        season = "SUMMER";
    } else if(month >= 10 && month <= 12) {
        season = "FALL";
    }

    const seasonYear = new Date().getFullYear();

    try {
        const anime = await animeService.getAnimeTrending(season, seasonYear);
        res.json(anime);
    } catch (error) {
        next(error);
    }
};

export const getAllCharactersByAnime = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    const id = req.query.id as string;

    try {
        const characters = await characterService.getAllCharacters(id);
        res.json(characters);
    } catch (error) {
        next(error);
    }
};

export const getCharacter = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    const id = req.query.id as string;

    try {
        const character = await characterService.getCharacterById(id);
        res.json(character);
    } catch (error) {
        next(error);
    }
};

export const getVoiceActor = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    const id = req.query.id as string;
    const { page } = getPaginationParams(req);

    try {
        const voiceActor = await voiceActorService.getVoiceActorById(id, page);
        res.json(voiceActor);
    } catch (error) {
        next(error);
    }
};
