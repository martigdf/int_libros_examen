export interface Request{
  id: number;
  creation_date: string;
  state: 'pending' | 'accepted' | 'declined' | 'cancelled';
  sender_user_id: number;
  receiver_user_id: number;
  books: number[];  
}

export interface RequestPost {
  receiver_user_id: number;
  books: number[];
}

export interface RequestPayload {
  sender_user_id: number;
  receiver_user_id: number;
  books: number[];
}
