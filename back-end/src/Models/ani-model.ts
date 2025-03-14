import { Character } from './character-model';

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
    coverImage: {
        large: string;
    };
    characters: {
        nodes: Character[];
    };
}