"use client";
import { useState, useTransition } from "react";
import Navbar from "../components/Navbar";
import { submitDeal } from "../actions";

export default function SubmitPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitDeal(formData);
      setResult(res);
      if (res.success) (e.target as HTMLFormElement).reset();
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-pink-600 mb-2">
          Partage un bon plan 💜
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Tu as trouvé une super promo ? Partage-la avec la communauté !
        </p>

        {result && (
          <div
            className={`mb-6 rounded-xl p-4 text-sm font-medium ${
              result.success
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {result.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Titre du deal *
            </label>
            <input
              name="title"
              required
              placeholder="Ex : Sérum Vitamine C à -40%"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Boutique / Marque *
            </label>
            <input
              name="store"
              required
              placeholder="Ex : Sephora, Zara, Amazon…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Catégorie *
            </label>
            <select
              name="category"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">-- Choisir --</option>
              <option value="beauty">💄 Beauté</option>
              <option value="fashion">👗 Mode</option>
              <option value="home">🏠 Maison</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Prix original (€)
              </label>
              <input
                name="original_price"
                type="number"
                step="0.01"
                min="0"
                placeholder="59.99"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Prix soldé (€)
              </label>
              <input
                name="sale_price"
                type="number"
                step="0.01"
                min="0"
                placeholder="29.99"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Lien du deal *
            </label>
            <input
              name="affiliate_url"
              type="url"
              required
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description (optionnel)
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Quelques mots sur ce deal..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ton pseudo (optionnel)
            </label>
            <input
              name="submitted_by"
              placeholder="@tonpseudo"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60"
          >
            {isPending ? "Envoi en cours…" : "Soumettre ce deal 💜"}
          </button>
        </form>
      </div>
    </div>
  );
}
