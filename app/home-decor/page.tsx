import { getCategoryDeals } from "../data/deals";
import Navbar from "../components/Navbar";
import DealCard from "../components/DealCard";

export const metadata = {
  title: "Home Deals – Girlabs",
  description: "Best deals on home décor, kitchen, bedding and appliances.",
};

export default function HomeDecorPage() {
  const homeDeals = getCategoryDeals("home");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-rose-400 to-orange-300 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🏠</span>
            <div>
              <h1 className="text-4xl font-extrabold">Home Deals</h1>
              <p className="opacity-90 mt-1">
                Décor, kitchen, bedding & appliances — at the best prices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deals grid */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            {homeDeals.length} deals found
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {homeDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </main>
    </div>
  );
}
