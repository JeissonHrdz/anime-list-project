import app from './app'; // importamos la aplicación desde el archivo app.ts
import { PORT } from './Config/ani-config'; // importamos el puerto desde el archivo ani-config.ts

app.listen(PORT, () => { // iniciamos el servidor en el puerto definido
    console.log(`Server running on port ${PORT}`); // mostramos un mensaje por consola
});