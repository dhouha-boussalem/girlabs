"use server";
import { getSupabaseClient } from "@/lib/supabase";

// ── Soumettre un deal ──────────────────────────────────────
export async function submitDeal(formData: FormData): Promise<{
  success: boolean;
  message: string;
}> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      message: "Service temporairement indisponible.",
    };
  }

  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    store: String(formData.get("store") ?? "").trim(),
    category: String(formData.get("category") ?? ""),
    description: String(formData.get("description") ?? "").trim() || null,
    affiliate_url: String(formData.get("affiliate_url") ?? "").trim(),
    original_price: parseFloat(String(formData.get("original_price"))) || null,
    sale_price: parseFloat(String(formData.get("sale_price"))) || null,
    submitted_by: String(formData.get("submitted_by") ?? "").trim() || null,
  };

  if (!payload.title || !payload.store || !payload.affiliate_url) {
    return { success: false, message: "Titre, boutique et lien sont requis." };
  }

  const { error } = await supabase.from("deal_submissions").insert(payload);

  if (error) {
    console.error("submitDeal error:", error);
    return { success: false, message: "Erreur lors de la soumission." };
  }

  return {
    success: true,
    message: "Merci ! Ton deal sera examiné et publié très vite 💜",
  };
}
