// ============================================================================
// THE single source of truth for everything the site links to.
//
// • Each entry shows up as a card in its `group` section on the home page.
// • Every name in `short` becomes a short redirect link, e.g.
//     short: ['youtube', 'yt']  →  natarajmalavade.in/youtube  and  /yt
//   Use these in video descriptions, bios and WhatsApp messages.
// • Set `hidden: true` to keep a short link working without showing a card.
//
// To add something new: copy an entry, change the values, save. Done.
// ============================================================================

export type IconName =
  | 'youtube' | 'whatsapp' | 'instagram' | 'facebook' | 'x'
  | 'graduation' | 'users' | 'candles' | 'calculator' | 'pen' | 'book';

export type Group = 'learn' | 'courses' | 'tools' | 'books' | 'community';

export interface LinkItem {
  id: string;
  group: Group;
  title: string;
  description: string;
  url: string;
  icon: IconName;
  short: string[];
  /** small labels shown on the card */
  tags?: string[];
  /** language badge */
  lang?: 'ಕನ್ನಡ' | 'English';
  /** call-to-action text on the card */
  cta?: string;
  /** book cover (books group only) */
  cover?: string;
  /** where to buy (books group only) — first one is also `url` */
  stores?: { label: 'Amazon' | 'Flipkart'; url: string }[];
  hidden?: boolean;
}

export const links: LinkItem[] = [
  // ---------- LEARN (free) ----------
  {
    id: 'yt-kannada',
    group: 'learn',
    title: 'Kannada YouTube Channel',
    description: 'Investing, ETFs, mutual funds and managing money, all in Kannada.',
    url: 'https://www.youtube.com/@natarajmalavadekannada?sub_confirmation=1',
    icon: 'youtube',
    lang: 'ಕನ್ನಡ',
    cta: 'Subscribe',
    short: ['youtube', 'yt', 'kannada'],
  },
  {
    id: 'yt-english',
    group: 'learn',
    title: 'Trading YouTube Channel',
    description: 'Price action, market profile, options and market analysis, in English.',
    url: 'https://www.youtube.com/@natarajmalavade',
    icon: 'youtube',
    lang: 'English',
    cta: 'Watch',
    short: ['trading-channel', 'english', 'yt-english'],
  },
  {
    id: 'blog',
    group: 'learn',
    title: 'Blog',
    description: 'Longer write-ups on investing, trading, markets and the books I read.',
    url: 'https://blog.natarajmalavade.in',
    icon: 'pen',
    cta: 'Read articles',
    short: ['blog'],
  },

  // ---------- PROGRAMS (community + courses) ----------
  {
    id: 'growguru',
    group: 'courses',
    title: 'GrowGuru Community',
    description: 'Our Kannada community for long-term investors. We talk ETFs, mutual funds, momentum and asset allocation, with real numbers.',
    url: 'https://growguru.in',
    icon: 'users',
    lang: 'ಕನ್ನಡ',
    tags: ['ETF', 'Mutual Funds', 'Momentum', 'Asset Allocation'],
    cta: 'Join the community',
    short: ['growguru', 'community', 'investing'],
  },
  {
    id: 'trading',
    group: 'courses',
    title: 'Trading Courses',
    description: 'Rule-based trading, taught in English. Price action, market profile and options.',
    url: 'https://trading.natarajmalavade.in',
    icon: 'candles',
    lang: 'English',
    tags: ['Price Action', 'Market Profile', 'Options'],
    cta: 'Explore courses',
    short: ['trading', 'courses'],
  },

  // ---------- TOOLS ----------
  {
    id: 'calculators',
    group: 'tools',
    title: 'Financial Calculators',
    description: 'SIP, step-up SIP, lumpsum, goal planner, EMI, and a Monte Carlo test for your retirement number.',
    url: '/tools.html',
    icon: 'calculator',
    tags: ['Free', 'No sign-up', 'Instant'],
    cta: 'Open calculators',
    short: ['calculators', 'calc', 'sip'],
  },

  // ---------- BOOKS ----------
  {
    id: 'book-day-trading',
    group: 'books',
    title: 'Mastermind of Day Trading',
    description: 'by Nataraj Malavade',
    url: 'https://www.amazon.in/s?k=mastermind+of+day+trading+nataraj+malavade',
    icon: 'book',
    cover: '/images/book2.jpg',
    stores: [
      { label: 'Amazon', url: 'https://www.amazon.in/s?k=mastermind+of+day+trading+nataraj+malavade' },
      { label: 'Flipkart', url: 'https://www.flipkart.com/search?q=mastermind+of+day+trading+nataraj+malavade' },
    ],
    short: ['book-day-trading'],
  },
  {
    id: 'book-price-action',
    group: 'books',
    title: 'The Power of Rule-Based Price Action Trading',
    description: 'by Nataraj Malavade',
    url: 'https://www.amazon.in/s?k=power+of+rule+based+price+action+nataraj+malavade',
    icon: 'book',
    cover: '/images/book1.jpg',
    stores: [
      { label: 'Amazon', url: 'https://www.amazon.in/s?k=power+of+rule+based+price+action+nataraj+malavade' },
      { label: 'Flipkart', url: 'https://www.flipkart.com/search?q=power+of+rule+based+price+action+trading+nataraj+malavade' },
    ],
    short: ['book-price-action'],
  },
  {
    id: 'books',
    group: 'books',
    title: 'All books',
    description: '',
    url: '/#books',
    icon: 'book',
    short: ['books'],
    hidden: true,
  },

  // ---------- COMMUNITY ----------
  {
    id: 'whatsapp-channel',
    group: 'community',
    title: 'WhatsApp Channel',
    description: 'New videos and market updates on WhatsApp.',
    url: 'https://whatsapp.com/channel/0029VaBgcQBHltYAUlUBaI2B',
    icon: 'whatsapp',
    cta: 'Join',
    short: ['whatsapp', 'channel'],
  },
  {
    id: 'instagram',
    group: 'community',
    title: 'Instagram',
    description: '@natarajmalavadekannada',
    url: 'https://instagram.com/natarajmalavadekannada',
    icon: 'instagram',
    lang: 'ಕನ್ನಡ',
    cta: 'Follow',
    short: ['instagram', 'ig'],
  },
  {
    id: 'facebook',
    group: 'community',
    title: 'Facebook',
    description: 'natarajmalavadeofficial',
    url: 'https://www.facebook.com/natarajmalavadeofficial',
    icon: 'facebook',
    lang: 'ಕನ್ನಡ',
    cta: 'Follow',
    short: ['facebook', 'fb'],
  },
  {
    id: 'x',
    group: 'community',
    title: 'X (Twitter)',
    description: '@malavadenataraj',
    url: 'https://www.twitter.com/malavadenataraj',
    icon: 'x',
    cta: 'Follow',
    short: ['twitter', 'x'],
  },
  {
    id: 'business',
    group: 'community',
    title: 'Business enquiries (WhatsApp)',
    description: 'Collaborations and brand deals.',
    url: 'https://wa.me/919844617636',
    icon: 'whatsapp',
    short: ['business', 'collab'],
    hidden: true,
  },
];

export const byGroup = (group: Group) => links.filter((l) => l.group === group && !l.hidden);
export const byId = (id: string) => {
  const item = links.find((l) => l.id === id);
  if (!item) throw new Error(`Unknown link id: ${id}`);
  return item;
};
export const isExternal = (url: string) => /^https?:\/\//.test(url);
