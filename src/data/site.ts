// Site-wide settings. Change a value here and it updates on every page.

export const site = {
  name: 'Nataraj Malavade',
  shortName: 'NSM',
  domain: 'natarajmalavade.in',
  url: 'https://www.natarajmalavade.in',
  title: 'Nataraj Malavade | Investor, Trader & Author',
  description:
    'Nataraj Malavade is a data-backed investor, trader and author. Free videos, the GrowGuru community, trading courses and calculators.',
  tagline: 'Data-backed investing and trading, in Kannada and English.',
  avatar: 'https://i.ibb.co/FbvTDHZx/DP-Images-3.png',
  analyticsId: 'G-CGSZK6XNE7',
  googleSiteVerification: 'GwfigfQ6R-6L2TSRdBshxikpeF8kq8VqDU8UxIMJB8s',
  credentials: ['Certified Research Analyst', 'Content Creator', 'Author', 'In Markets Since 2013'],
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
