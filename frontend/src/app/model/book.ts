export interface Book {
  id: number;
  name: string;
  author: string;
  state: 'available' | 'requested' | 'reserved' | 'loaned' | 'returned' | 'cancelled' | 'unavailable';
  image?: string; 
}