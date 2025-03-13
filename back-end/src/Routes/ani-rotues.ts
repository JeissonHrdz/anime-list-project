import express from 'express'; // impotamos express desde la libreria express
import { searchAnime } from '../Controllers/ani-controller'; // importamos la función searchAnime del archivo ani-controller.ts

const router = express.Router(); // creamos un router de express

router.get('/anime', searchAnime); // definimos una ruta GET en el router que llama a la función searchAnime

export default router; // exportamos el router para poder utilizarlo en otros archivos