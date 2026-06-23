export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      deals: {
        Row: {
          id: number;
          title: string;
          store: string;
          category: string;
          original_price: number;
          sale_price: number;
          discount_percent: number;
          description: string;
          emoji: string;
          is_hot: boolean;
          posted_at: string;
          votes: number;
          created_at: string;
        };
        Insert: {
          id: number;
          title: string;
          store: string;
          category: string;
          original_price: number;
          sale_price: number;
          discount_percent: number;
          description: string;
          emoji: string;
          is_hot?: boolean;
          posted_at: string;
          votes?: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          store?: string;
          category?: string;
          original_price?: number;
          sale_price?: number;
          discount_percent?: number;
          description?: string;
          emoji?: string;
          is_hot?: boolean;
          posted_at?: string;
          votes?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      deal_submissions: {
        Row: {
          id: string;
          title: string;
          store: string;
          category: string;
          description: string | null;
          affiliate_url: string;
          original_price: number | null;
          sale_price: number | null;
          submitted_by: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          store: string;
          category: string;
          description?: string | null;
          affiliate_url: string;
          original_price?: number | null;
          sale_price?: number | null;
          submitted_by?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          store?: string;
          category?: string;
          description?: string | null;
          affiliate_url?: string;
          original_price?: number | null;
          sale_price?: number | null;
          submitted_by?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_votes: {
        Args: { deal_id: number };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
