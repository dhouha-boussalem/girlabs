import { getSupabaseClient } from "./supabase";
import type { Deal, Category } from "@/app/data/deals";
import { deals as staticDeals } from "@/app/data/deals";

// Shape returned by Supabase (snake_case columns)
interface SupabaseDeal {
  id: number;
  title: string;
  store: string;
  category: Category;
  original_price: number;
  sale_price: number;
  discount_percent: number;
  description: string;
  emoji: string;
  is_hot: boolean;
  posted_at: string;
  votes: number;
}

function toDeal(row: SupabaseDeal): Deal {
  return {
    id: row.id,
    title: row.title,
    store: row.store,
    category: row.category,
    originalPrice: row.original_price,
    salePrice: row.sale_price,
    discountPercent: row.discount_percent,
    description: row.description,
    emoji: row.emoji,
    isHot: row.is_hot,
    postedAt: row.posted_at,
    votes: row.votes,
  };
}

export async function getAllDeals(): Promise<Deal[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return staticDeals;

  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .order("votes", { ascending: false });

  if (error || !data) return staticDeals;
  return data.map(toDeal);
}

export async function getCategoryDealsFromDB(
  category: Category
): Promise<Deal[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return staticDeals.filter((d) => d.category === category);
  }

  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("category", category)
    .order("votes", { ascending: false });

  if (error || !data) {
    return staticDeals.filter((d) => d.category === category);
  }
  return data.map(toDeal);
}
