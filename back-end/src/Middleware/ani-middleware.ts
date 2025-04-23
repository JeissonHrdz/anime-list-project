import { Request, Response, NextFunction } from 'express';

// Constantes para valores por defecto
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;

// Interfaz para los parámetros de paginación
export interface PaginationParams {
    page: number;
    perPage: number;
}

// Middleware para validar ID
export const validateId = (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.query.id +" id ");
    const id = req.query.id as string;
    if (!id) {
        res.status(400).json({ error: 'ID inválido' });
        return;
    }
    next();
};

// Middleware para validar título
export const validateTitle = (req: Request, res: Response, next: NextFunction): void => {
    const title = req.query.title as string;
    
    if (!title) {
        res.status(400).json({ error: 'Título de anime inválido' });
        return;
    }
    next();
};

// Middleware para manejar errores
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
};

// Función de utilidad para obtener parámetros de paginación
export const getPaginationParams = (req: Request): PaginationParams => ({
    page: parseInt(req.query.page as string) || DEFAULT_PAGE,
    perPage: parseInt(req.query.perPage as string) || DEFAULT_PER_PAGE
}); 