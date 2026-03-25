import Link from "next/link";
import { deals, getCategoryDeals } from "./data/deals";
import Navbar from "./components/Navbar";
import CategorySection from "./components/CategorySection";

const stats = [
  { label: "Active Deals", value: deals.length.toString() },
  { label: "Categories", value: "3" },
  { label: "Savings Today", value: "$4,200+" },
];

const categories = [
  {
    title: "Beauty",
    emoji: "💄",
    category: "beauty" as const,
    href: "/beauty",
    accentClass: "text-pink-600",
    description: "Skincare, makeup, haircare & more",
    bgClass: "from-pink-50 to-rose-50 border-pink-200",
    iconBg: "bg-pink-100",
  },
  {
    title: "Fashion",
    emoji: "👗",
    category: "fashion" as const,
    href: "/fashion",
    accentClass: "text-purple-600",
    description: "Clothes, shoes, bags & accessories",
    bgClass: "from-purple-50 to-indigo-50 border-purple-200",
    iconBg: "bg-purple-100",
  },
  {
    title: "Home",
    emoji: "🏠",
    category: "home" as const,
    href: "/home-decor",
    accentClass: "text-rose-600",
    description: "Décor, kitchen, bedding & appliances",
    bgClass: "from-rose-50 to-orange-50 border-rose-200",
    iconBg: "bg-rose-100",
  },
];

export default function Home() {
  const beautyDeals = getCategoryDeals("beauty").slice(0, 3);
  const fashionDeals = getCategoryDeals("fashion").slice(0, 3);
  const homeDeals = getCategoryDeals("home").slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-rose-400 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Doudou<span className="text-yellow-300">Finds</span> 💜
          </h1>
          <p className="text-xl md:text-2xl font-light mb-2 opacity-90">
            The best deals for beauty, fashion & home
          </p>
          <p className="text-sm opacity-75 mb-8">
            Curated discounts picked just for you, every day
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-8 flex-wrap">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="text-xs opacity-75 uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category quick-links */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.category}
              href={cat.href}
              className={`bg-gradient-to-br ${cat.bgClass} border rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition-shadow`}
            >
              <div className={`${cat.iconBg} rounded-full p-3 text-3xl`}>
                {cat.emoji}
              </div>
              <div>
                <h3 className={`font-bold text-lg ${cat.accentClass}`}>
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500">{cat.description}</p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400 ml-auto flex-shrink-0"
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
          ))}
        </div>
      </div>

      {/* Deal sections */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <CategorySection
          title="Beauty"
          emoji="💄"
          category="beauty"
          deals={beautyDeals}
          href="/beauty"
          accentClass="text-pink-600"
        />
        <CategorySection
          title="Fashion"
          emoji="👗"
          category="fashion"
          deals={fashionDeals}
          href="/fashion"
          accentClass="text-purple-600"
        />
        <CategorySection
          title="Home"
          emoji="🏠"
          category="home"
          deals={homeDeals}
          href="/home-decor"
          accentClass="text-rose-600"
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-8 text-center text-sm text-gray-400">
        <p className="font-semibold text-pink-500 text-lg mb-1">
          DoudouFinds 💜
        </p>
        <p>The best deals curated for you — beauty, fashion &amp; home.</p>
        <p className="mt-2 text-xs">© 2026 DoudouFinds. All rights reserved.</p>
      </footer>
    </div>
  );
}
