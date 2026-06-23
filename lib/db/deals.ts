/**
 * lib/db/deals.ts
 * Data layer Supabase — remplace app/data/deals.ts
 * À utiliser uniquement côté serveur (Server Components, Server Actions).
 */
import { supabase } from "../supabase";

export type Category = "beauty" | "fashion" | "home";

export interface Deal {
  id: string;
  title: string;
  store: string;
  category: Category;
  description: string | null;
  image_url: string | null;
  affiliate_url: string;
  original_price: number;
  sale_price: number;
  discount_percent: number;
  savings_amount: number;
  is_hot: boolean;
  votes: number;
  click_count: number;
  created_at: string;
}

/** Tous les deals actifs, triés par votes */
export async function getAllDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("is_active", true)
    .order("votes", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Deal[];
}

/** Deals d'une catégorie */
export async function getCategoryDeals(
  category: Category,
  options: {
    limit?: number;
    sortBy?: "votes" | "created_at" | "discount_percent";
    search?: string;
  } = {}
): Promise<Deal[]> {
  const { limit = 50, sortBy = "votes", search } = options;

  let query = supabase
    .from("deals")
    .select("*")
    .eq("is_active", true)
    .eq("category", category)
    .order(sortBy, { ascending: false })
    .limit(limit);

  if (search?.trim()) {
    query = query.or(
      `title.ilike.%${search}%,store.ilike.%${search}%,description.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as Deal[];
}

/** Deals HOT pour la homepage */
export async function getHotDeals(limit = 6): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("is_active", true)
    .eq("is_hot", true)
    .order("votes", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data as Deal[];
}

/** Recherche globale */
export async function searchDeals(query: string): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("is_active", true)
    .or(
      `title.ilike.%${query}%,store.ilike.%${query}%,description.ilike.%${query}%`
    )
    .order("votes", { ascending: false })
    .limit(30);

  if (error) throw new Error(error.message);
  return data as Deal[];
}
