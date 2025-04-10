import express from 'express'; // impotamos express desde la libreria express
import { getAllCharactersByAnime, getCharacter, getVoiceActor, searchAnimeById, searchAnimeByTitle } from '../Controllers/ani-controller'; // importamos la función searchAnime del archivo ani-controller.ts

const router = express.Router(); // creamos un router de express

router.get('/anime', searchAnimeByTitle); 

router.get('/anime-details', searchAnimeById); 

router.get('/anime/characters', getAllCharactersByAnime);

router.get('/character', getCharacter); 

router.get('/voice-actor', getVoiceActor);

export default router; // exportamos el router para poder utilizarlo en otros archivos