
export type Language = 'de' | 'en';

export enum Category {
  Festivent = 'Festivent',
  Sports = 'Sports',
  Dining = 'Dining',
  Career = 'Career'
}

export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  category: Category;
  url?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}
