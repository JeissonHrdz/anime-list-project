import express from 'express';
import cors from 'cors';
import aniRoutes from './Routes/ani-rotues'; // importamos el router de anime desde el archivo ani-routes.ts

const app = express(); // creamos una instancia de express

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json()); // le decimos a express que vamos a usar JSON en las peticiones
app.use('/api', aniRoutes); // definimos la ruta base de la API y le pasamos el router de anime

export default app; // exportamos la aplicación para poder utilizarla en otros archivos