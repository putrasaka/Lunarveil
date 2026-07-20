export type ArtworkCategory = 'Cat Minyak' | 'Akrilik' | 'Monokrom' | 'Grafit Pensil';

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  medium: string;
  dimension: string;
  year: string;
  price: string;
  isAvailable: boolean;
  description: string;
  story: string;
  image: string;
  isHighlight: boolean;
  title_id?: string;
  title_en?: string;
  medium_id?: string;
  medium_en?: string;
  description_id?: string;
  description_en?: string;
  story_id?: string;
  story_en?: string;
}

export interface CollectorInquiry {
  id?: string;
  name: string;
  whatsapp: string;
  email: string;
  message: string;
  artworkId: string;
  artworkTitle: string;
}

export interface ArtAchievement {
  year: string;
  title: string;
  description: string;
  title_id?: string;
  title_en?: string;
  description_id?: string;
  description_en?: string;
}
