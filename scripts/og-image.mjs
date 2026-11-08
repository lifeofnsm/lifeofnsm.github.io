// Generates public/og-image.png — the 1200×630 preview shown when the site is
// shared on WhatsApp, X, LinkedIn, Facebook etc.
// Run: npm run og   (only needed when the text below changes)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og-image.png', import.meta.url));
const font = `'Helvetica Neue', Helvetica, Arial, sans-serif`;

// grid lines
let grid = '';
for (let x = 0; x <= 1200; x += 48) grid += `<line x1="${x}" y1="0" x2="${x}" y2="630"/>`;
for (let y = 0; y <= 630; y += 48) grid += `<line x1="0" y1="${y}" x2="1200" y2="${y}"/>`;

const chips = ['Certified Research Analyst', 'Author', 'In Markets Since 2013'];
let cx = 80;
const chipSvg = chips
  .map((c, i) => {
    const w = c.length * 10.6 + 36;
    const s = `<g transform="translate(${cx},92)">
      <rect width="${w}" height="40" rx="20" fill="${i === 0 ? 'rgba(37,99,235,0.28)' : 'rgba(255,255,255,0.06)'}" stroke="${i === 0 ? 'rgba(96,165,250,0.55)' : 'rgba(255,255,255,0.14)'}"/>
      <text x="${w / 2}" y="26" text-anchor="middle" font-family="${font}" font-size="18" font-weight="500" fill="${i === 0 ? '#DBEAFE' : '#CBD5E1'}">${c}</text>
    </g>`;
    cx += w + 12;
    return s;
  })
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="0.85" cy="0.05" r="0.6"><stop offset="0" stop-color="#2563EB" stop-opacity="0.55"/><stop offset="1" stop-color="#2563EB" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="0.05" cy="1" r="0.5"><stop offset="0" stop-color="#10B981" stop-opacity="0.22"/><stop offset="1" stop-color="#10B981" stop-opacity="0"/></radialGradient>
    <linearGradient id="txt" x1="0" x2="1"><stop offset="0" stop-color="#60A5FA"/><stop offset="1" stop-color="#34D399"/></linearGradient>
    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B82F6" stop-opacity="0.35"/><stop offset="1" stop-color="#3B82F6" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0A1020"/>
  <g stroke="rgba(255,255,255,0.05)" stroke-width="1">${grid}</g>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>

  ${chipSvg}

  <text font-family="${font}" font-weight="700" font-size="76" letter-spacing="-2.5" fill="#FFFFFF">
    <tspan x="76" y="236">I invest and trade</tspan>
    <tspan x="76" y="322" fill="url(#txt)">with data,</tspan><tspan dx="20" fill="#FFFFFF">not opinions.</tspan>
  </text>

  <text x="80" y="392" font-family="${font}" font-size="28" fill="#94A3B8">Investing in Kannada · Trading in English</text>

  <!-- spark -->
  <g transform="translate(760,430)">
    <path d="M0 140 L40 126 L80 133 L120 108 L160 113 L200 90 L240 97 L280 72 L320 77 L360 50 L400 20 L400 170 L0 170 Z" fill="url(#area)"/>
    <path d="M0 140 L40 126 L80 133 L120 108 L160 113 L200 90 L240 97 L280 72 L320 77 L360 50 L400 20" fill="none" stroke="#60A5FA" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="400" cy="20" r="9" fill="#60A5FA"/>
  </g>

  <line x1="80" y1="500" x2="660" y2="500" stroke="rgba(255,255,255,0.1)"/>
  <text x="80" y="552" font-family="${font}" font-weight="700" font-size="34" letter-spacing="-0.5" fill="#FFFFFF">Nataraj Malavade</text>
  <text x="80" y="590" font-family="${font}" font-size="22" fill="#64748B">natarajmalavade.in</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log('wrote', out);
