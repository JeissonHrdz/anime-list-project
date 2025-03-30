import express from 'express'; // impotamos express desde la libreria express
import { getAllCharactersByAnime, searchAnimeById, searchAnimeByTitle } from '../Controllers/ani-controller'; // importamos la función searchAnime del archivo ani-controller.ts

const router = express.Router(); // creamos un router de express

router.get('/anime', searchAnimeByTitle); // definimos una ruta GET en el router que llama a la función searchAnime

router.get('/anime-details', searchAnimeById); // definimos una ruta GET en el router que llama a la función searchAnime

router.get('/anime/characters', getAllCharactersByAnime);

export default router; // exportamos el router para poder utilizarlo en otros archivos