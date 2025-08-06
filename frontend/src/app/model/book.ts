export interface Publication {
  id: number;
  creation_date: string;
  location: string;
  id_user: number;
  id_book: number;
}

export interface Book {
  id: number;
  name: string;
  author: string;
  state: 'available' | 'unavailable';
  genres?: string[];
  photo?: string;
  owner_id: number;
  creation_date: string;
  owner_username?: string;
  owner_name?: string;
  owner_lastname?: string;
  publication?: Publication;
}
export interface BookPost {
  name: string;
  author: string;
  location: string;
  description: string;
  genres: number[];
}
