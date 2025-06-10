// Tipos base
interface Category {
  name: string;
  description?: string; // Opcional
  items?: string[]; // Opcional si hay subcategorías
  subcategories?: Subcategory[]; // Opcional si hay items directos
}

interface Subcategory extends Omit<Category, 'subcategories'> {
  // Hereda de Category pero sin anidar más subcategorías (para evitar recursión infinita)
}

// Tipo principal que representa la estructura completa
export interface Genre {
  categories: Category[];
}
