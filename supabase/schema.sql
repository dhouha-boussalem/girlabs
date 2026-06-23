-- ============================================================
-- GirlLabs / DoudouFinds – Supabase schema
-- Exécuter ce script dans : Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Table deals
CREATE TABLE IF NOT EXISTS deals (
  id               INTEGER PRIMARY KEY,
  title            TEXT    NOT NULL,
  store            TEXT    NOT NULL,
  category         TEXT    NOT NULL CHECK (category IN ('beauty', 'fashion', 'home')),
  original_price   NUMERIC NOT NULL,
  sale_price       NUMERIC NOT NULL,
  discount_percent INTEGER NOT NULL,
  description      TEXT    NOT NULL,
  emoji            TEXT    NOT NULL,
  is_hot           BOOLEAN NOT NULL DEFAULT FALSE,
  posted_at        TEXT    NOT NULL,
  votes            INTEGER NOT NULL DEFAULT 0,
  affiliate_url    TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Row Level Security
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Lecture publique
CREATE POLICY "Public read access"
  ON deals FOR SELECT
  USING (true);

-- 3. Fonction RPC pour incrémenter les votes de façon sûre
CREATE OR REPLACE FUNCTION increment_votes(deal_id INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE deals SET votes = votes + 1 WHERE id = deal_id;
END;
$$;

-- 4. Table soumissions utilisateurs
CREATE TABLE IF NOT EXISTS deal_submissions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  store          TEXT NOT NULL,
  category       TEXT NOT NULL CHECK (category IN ('beauty', 'fashion', 'home')),
  description    TEXT,
  affiliate_url  TEXT NOT NULL,
  original_price NUMERIC,
  sale_price     NUMERIC,
  submitted_by   TEXT,
  status         TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE deal_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Soumissions publiques"
  ON deal_submissions FOR INSERT WITH CHECK (true);

-- 5. Seed – 18 deals initiaux
INSERT INTO deals (id, title, store, category, original_price, sale_price, discount_percent, description, emoji, is_hot, posted_at, votes, affiliate_url)
VALUES
  -- Beauty
  (1,  'Maybelline Sky High Mascara',                   'Sephora',         'beauty',  12.99,  7.49,  42, 'Lengthening & volumizing mascara. Waterproof formula. Black.',                                       '💄',  TRUE,  '2 hours ago',   324, NULL),
  (2,  'The Ordinary Niacinamide 10% + Zinc 1% Serum',  'ASOS',            'beauty',   9.90,  5.50,  44, 'Reduces blemishes, pores, and oil control. 30ml.',                                                  '✨',  TRUE,  '5 hours ago',   210, NULL),
  (3,  'Olaplex No.3 Hair Perfector',                   'Ulta Beauty',     'beauty',  30.00, 18.00,  40, 'Reduces breakage and visibly strengthens hair.',                                                    '💇‍♀️', FALSE, '1 day ago',      97, NULL),
  (4,  'Charlotte Tilbury Pillow Talk Lipstick',         'Boots',           'beauty',  28.00, 16.80,  40, 'Iconic medium-nude pink with warm undertones. Long-lasting formula.',                               '💋',  FALSE, '3 days ago',    153, NULL),
  (5,  'Neutrogena Hydro Boost Water Gel',              'Amazon',          'beauty',  19.97, 11.00,  45, 'Hyaluronic acid moisturizer for hydrated, supple skin. 1.7 oz.',                                    '💧',  TRUE,  '6 hours ago',   278, NULL),
  (6,  'NYX Professional Makeup Setting Spray',          'Target',          'beauty',   9.00,  5.00,  44, 'Long-lasting matte finish. Keeps makeup fresh all day.',                                            '🌸',  FALSE, '2 days ago',     66, NULL),
  -- Fashion
  (7,  'Levi''s 501 Original Fit Jeans',                'Levi''s',         'fashion', 79.50, 39.99,  50, 'Classic straight-leg jeans. Button fly. Multiple washes.',                                         '👖',  TRUE,  '1 hour ago',    512, NULL),
  (8,  'Zara Floral Midi Dress',                        'Zara',            'fashion', 59.99, 29.99,  50, 'Flowing floral print midi dress with puff sleeves.',                                               '👗',  TRUE,  '3 hours ago',   389, NULL),
  (9,  'Nike Air Max 270 Women''s Shoes',               'Nike',            'fashion',150.00, 89.97,  40, 'Max Air unit for all-day comfort. Available in multiple colors.',                                   '👟',  FALSE, '8 hours ago',   234, NULL),
  (10, 'Coach Tabby Shoulder Bag 26',                   'Coach Outlet',    'fashion',350.00,175.00,  50, 'Pebble leather with signature flap and gold hardware. Crossbody strap.',                            '👜',  TRUE,  '4 hours ago',   445, NULL),
  (11, 'H&M Ribbed Turtleneck Sweater',                 'H&M',             'fashion', 34.99, 14.99,  57, 'Cozy ribbed-knit turtleneck in soft blended fabric.',                                              '🧣',  FALSE, '1 day ago',     119, NULL),
  (12, 'Ray-Ban Wayfarer Classic Sunglasses',           'Sunglass Hut',    'fashion',161.00, 96.60,  40, 'Iconic acetate frame with polarized lenses. UV400 protection.',                                     '🕶️',  FALSE, '2 days ago',     88, NULL),
  -- Home
  (13, 'Yankee Candle Large Jar – Pink Sands',          'Amazon',          'home',    32.99, 16.50,  50, 'Warm tropical blend of citrus, florals, and soft musk. 22 oz jar.',                                 '🕯️',  TRUE,  '30 min ago',    601, NULL),
  (14, 'KitchenAid Artisan Stand Mixer',                'Williams Sonoma', 'home',   449.99,299.99,  33, '5 qt bowl, 10 speeds, 59 touchpoints. Available in Empire Red & more.',                             '🍰',  TRUE,  '2 hours ago',   730, NULL),
  (15, 'Anthropologie Monique Duvet Cover – Full/Queen','Anthropologie',   'home',   228.00,113.00,  50, 'Embroidered floral cotton duvet cover with button closure.',                                        '🛏️',  FALSE, '5 hours ago',   182, NULL),
  (16, 'Dyson V15 Detect Cordless Vacuum',             'Best Buy',        'home',   749.99,524.99,  30, 'Laser reveals microscopic dust. LCD screen. 60-min runtime.',                                       '🏠',  TRUE,  '7 hours ago',   843, NULL),
  (17, 'IKEA FRÖDD Throw Pillow Cover 4-Pack',          'IKEA',            'home',    24.99, 12.99,  48, 'Cotton cushion covers in pastel pink & sage. 20x20 in.',                                            '🛋️',  FALSE, '1 day ago',      97, NULL),
  (18, 'Nespresso Vertuo Pop Coffee Machine',           'Nespresso',       'home',   109.00, 65.40,  40, 'Compact espresso & coffee maker with 5 cup sizes. Removable 37 oz water tank.',                     '☕',  FALSE, '3 days ago',    147, NULL)
ON CONFLICT (id) DO NOTHING;
