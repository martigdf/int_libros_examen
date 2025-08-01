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
  state: 'available' | 'requested' | 'reserved' | 'loaned' | 'returned' | 'cancelled' | 'unavailable';
  image?: string;
  owner_id: number;
  publication?: Publication;
}
export interface BookPost {
  name: string;
  author: string;
  location: string;
  description: string;
  genres: number[];
}
