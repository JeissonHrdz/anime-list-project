export interface Anime {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
    };
    description: string;
    episodes: number;
    status: string;
    averageScore: number;
    genres: string;
    coverImage: {
        large: string;
    };   
    format: string;
}