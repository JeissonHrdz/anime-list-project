import { Request, Response, NextFunction } from "express"; 
import { activityService, ActivityService, animeService, characterService, voiceActorService } from '../Services/ani-service'; 
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
        
    const seasonYear = new Date().getFullYear();

    try {
        const anime = await animeService.getAnimeTrending( seasonYear);
        res.json(anime);
    } catch (error) {
        next(error);
    }
};

export const getAnimeSeason = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    let season = "";
    const month = new Date().getMonth()+1;
     const { page, perPage } = getPaginationParams(req); 
    
    const seasonMapping: { [key: number]: string } = {
        1: "WINTER", 2: "WINTER", 3: "WINTER",
        4: "SPRING", 5: "SPRING", 6: "SPRING",
        7: "SUMMER", 8: "SUMMER", 9: "SUMMER",
        10: "FALL", 11: "FALL", 12: "FALL"
    };
    season = seasonMapping[month] || "";
    const seasonYear = new Date().getFullYear();

    try {
        const anime = await animeService.getAnimeSeason(season, seasonYear, page, perPage,"ID");
        res.json(anime);
    } catch (error) {
        next(error);
    }
};

export const getAnimeUpcomingSeason = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    let season = "";
    let nextSeason = "";
    const month = new Date().getMonth()+1;
    let seasonYear = new Date().getFullYear();
     const { page, perPage } = getPaginationParams(req);   
   

     if (month >= 10) {
        nextSeason = "WINTER";
        seasonYear += 1; // Increment the year for the next season
    } else if (month >= 7) {
        nextSeason = "SPRING";
    } else if (month >= 4) {
        nextSeason = "SUMMER";
    } else if (month >= 1) {
        nextSeason = "FALL";
    } 

    try {
        const anime = await animeService.getAnimeSeason(nextSeason, seasonYear, page, perPage, "TRENDING_DESC");
        res.json(anime);
    } catch (error) {
        next(error);
    }
};

export const getAnimeByFilter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { page, perPage } = getPaginationParams(req);
    const { type, season, search, genreIn, tagIn, seasonYear, formatIn } = req.query;

    try {
        const anime = await animeService.getAnimeByFilter(page, perPage, type as string, season as string, search as string, 
             genreIn as string[], tagIn as string[], Number(seasonYear) || undefined, formatIn as string[]);
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


export const getActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {   
    const { page } = getPaginationParams(req);

    try {
        const activity = await activityService.getGlobalActivity( page); 
        res.json(activity);
    } catch (error) {
        next(error);
    }
};

export const getActivityText = async (req: Request, res: Response, next: NextFunction): Promise<void> => {   
    const { page } = getPaginationParams(req);

    try {
        const activity = await activityService.getGlobalActivityText( page); 
        res.json(activity);
    } catch (error) {
        next(error);
    }
};

export const getGenres = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const fs = require('fs');
    fs.readFile('src/assets/genres.json', 'utf8', (err: any, data: string) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).json({ error: 'Error reading file' });
            return;
        }
        try {
            const genres = JSON.parse(data);
            res.json(genres);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ error: 'Error parsing JSON' });
        }
    });

}
