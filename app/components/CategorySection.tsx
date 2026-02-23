import Link from "next/link";
import DealCard from "./DealCard";
import type { Deal, Category } from "../data/deals";

interface CategorySectionProps {
  title: string;
  emoji: string;
  category: Category;
  deals: Deal[];
  href: string;
  accentClass: string;
}

export default function CategorySection({
  title,
  emoji,
  deals,
  href,
  accentClass,
}: CategorySectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{emoji}</span>
          <h2 className={`text-2xl font-bold ${accentClass}`}>{title}</h2>
        </div>
        <Link
          href={href}
          className="text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors flex items-center gap-1"
        >
          See all deals
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}
