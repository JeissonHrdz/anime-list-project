import express from 'express'; // impotamos express desde la libreria express
import { getAllCharactersByAnime, getAnimeTrending, getCharacter, getVoiceActor, searchAnimeById, searchAnimeByTitle } from '../Controllers/ani-controller'; // importamos la función searchAnime del archivo ani-controller.ts
import { 
    validateId, 
    validateTitle, 
    errorHandler 
} from '../Middleware/ani-middleware';
const router = express.Router(); // creamos un router de express

router.get('/anime', validateTitle, searchAnimeByTitle); 

router.get('/anime/trending', getAnimeTrending);

router.get('/anime-details', validateId, searchAnimeById); 

router.get('/anime/characters', validateId, getAllCharactersByAnime);

router.get('/character', validateId, getCharacter); 

router.get('/voice-actor', validateId, getVoiceActor);

router.use(errorHandler);

export default router; // exportamos el router para poder utilizarlo en otros archivos