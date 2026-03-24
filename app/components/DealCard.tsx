import type { Deal } from "../data/deals";
import Link from "next/link";

interface DealCardProps {
  deal: Deal;
}

const categoryColors: Record<string, string> = {
  beauty: "bg-pink-100 text-pink-700",
  fashion: "bg-purple-100 text-purple-700",
  home: "bg-rose-100 text-rose-700",
};

const categoryHrefs: Record<string, string> = {
  beauty: "/beauty",
  fashion: "/fashion",
  home: "/home-decor",
};

export default function DealCard({ deal }: DealCardProps) {
  const savings = deal.originalPrice - deal.salePrice;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      {/* Top color bar */}
      <div
        className={`h-2 ${
          deal.category === "beauty"
            ? "bg-gradient-to-r from-pink-400 to-rose-400"
            : deal.category === "fashion"
            ? "bg-gradient-to-r from-purple-400 to-indigo-400"
            : "bg-gradient-to-r from-rose-400 to-orange-300"
        }`}
      />

      <div className="p-4 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{deal.emoji}</span>
            {deal.isHot && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                🔥 HOT
              </span>
            )}
          </div>
          <Link
            href={categoryHrefs[deal.category]}
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[deal.category]}`}
          >
            {deal.category.charAt(0).toUpperCase() + deal.category.slice(1)}
          </Link>
        </div>

        {/* Title & store */}
        <h3 className="font-semibold text-gray-800 text-sm leading-snug mb-1">
          {deal.title}
        </h3>
        <p className="text-xs text-gray-400 mb-2">at {deal.store}</p>

        {/* Description */}
        <p className="text-xs text-gray-500 mb-4 flex-1">{deal.description}</p>

        {/* Pricing */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${deal.salePrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${deal.originalPrice.toFixed(2)}
              </span>
            </div>
            <span className="text-xs text-green-600 font-semibold">
              Save ${savings.toFixed(2)} ({deal.discountPercent}% off)
            </span>
          </div>
          <span className="bg-green-50 text-green-700 text-lg font-bold px-2 py-1 rounded-xl border border-green-200">
            -{deal.discountPercent}%
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">{deal.postedAt}</span>
          <button className="flex items-center gap-1 text-xs font-medium text-pink-500 hover:text-pink-700 transition-colors">
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 11l5-5 5 5H14v4h-4v-4H7z" />
            </svg>
            {deal.votes}
          </button>
        </div>
      </div>
    </div>
  );
}
