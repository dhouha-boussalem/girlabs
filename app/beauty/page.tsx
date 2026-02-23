import { getCategoryDeals } from "../data/deals";
import Navbar from "../components/Navbar";
import DealCard from "../components/DealCard";

export const metadata = {
  title: "Beauty Deals – Girlabs",
  description: "Best deals on skincare, makeup, haircare and more.",
};

export default function BeautyPage() {
  const beautyDeals = getCategoryDeals("beauty");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-5xl">💄</span>
            <div>
              <h1 className="text-4xl font-extrabold">Beauty Deals</h1>
              <p className="opacity-90 mt-1">
                Skincare, makeup, haircare & more — at the best prices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deals grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            {beautyDeals.length} deals found
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {beautyDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </main>
    </div>
  );
}
