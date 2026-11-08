// Site-wide settings. Change a value here and it updates on every page.

export const site = {
  name: 'Nataraj Malavade',
  shortName: 'NSM',
  domain: 'natarajmalavade.in',
  url: 'https://www.natarajmalavade.in',
  // SEO: keep title under ~60 characters and description under ~160
  title: 'Nataraj Malavade | Data-Backed Investing & Trading',
  description:
    'Certified Research Analyst Nataraj Malavade teaches data-backed investing in Kannada and trading in English. Free videos, GrowGuru, courses and calculators.',
  tagline: 'Data-backed investing and trading, in Kannada and English.',
  avatar: 'https://i.ibb.co/FbvTDHZx/DP-Images-3.png',
  ogImage: '/og-image.png', // 1200×630, regenerate with `npm run og`
  locale: 'en_IN',
  twitter: '@malavadenataraj',
  jobTitle: 'Certified Research Analyst',
  city: 'Mysuru',
  region: 'Karnataka',
  knowsAbout: [
    'Stock market investing', 'ETFs', 'Mutual funds', 'Momentum investing', 'Asset allocation',
    'Backtesting', 'Price action trading', 'Market profile', 'Options trading', 'Personal finance',
  ],
  analyticsId: 'G-CGSZK6XNE7',
  googleSiteVerification: 'GwfigfQ6R-6L2TSRdBshxikpeF8kq8VqDU8UxIMJB8s',
  // Hero pills, kept on one line. On smaller screens `short` replaces `label`,
  // and pills with `optional: true` are hidden so the row never wraps.
  credentials: [
    { label: 'Certified Research Analyst' },
    { label: 'Content Creator', optional: true },
    { label: 'Author' },
    { label: 'In Markets Since 2013', short: 'Since 2013' },
  ],
  contact: {
    whatsappNumber: '919844617636',
    whatsappDisplay: '+91 98446 17636',
    supportEmailUser: 'support',
    businessEmailUser: 'iam',
    address: ['Nataraj Malavade, 1st Phase, 4th Stage,', 'Vijayanagara, Mysore — 570030'],
  },
  stats: [
    { value: 200, suffix: 'K+', label: 'YouTube subscribers' },
    { value: 10, suffix: 'K+', label: 'Students trained' },
    { value: 2013, suffix: '', label: 'In markets since', plain: true },
    { value: 2, suffix: '', label: 'Books authored' },
  ],
} as const;

// Main navigation (header). Add a page here when you create it.
export const nav = [
  { label: 'Learn', href: '/#learn' },
  { label: 'Programs', href: '/#programs' },
  { label: 'Calculators', href: '/tools.html' },
  { label: 'Books', href: '/#books' },
  { label: 'Contact', href: '/contact.html' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy.html' },
  { label: 'Terms of Use', href: '/terms-of-use.html' },
  { label: 'Refund Policy', href: '/refund-policy.html' },
  { label: 'Contact Us', href: '/contact.html' },
];
