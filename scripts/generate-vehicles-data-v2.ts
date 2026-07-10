import * as fs from 'fs';
import * as path from 'path';

// ─── Seeded PRNG (mulberry32) for reproducibility ──────────────────────────

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = seed + 0x6d2b79f5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// ─── Source data ───────────────────────────────────────────────────────────

const makeModels: Record<string, string[]> = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Prius', 'Tacoma', 'Highlander', 'Sienna', 'Tundra'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V', 'Ridgeline'],
  Ford: ['F-150', 'Escape', 'Explorer', 'Mustang', 'Focus', 'Fusion', 'Edge', 'Ranger'],
  Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Suburban', 'Cruze', 'Colorado', 'Bolt EV'],
  Subaru: ['Outback', 'Forester', 'Impreza', 'Crosstrek', 'Legacy', 'Ascent'],
  Nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier', 'Murano', 'Leaf'],
  Jeep: ['Grand Cherokee', 'Cherokee', 'Wrangler', 'Compass', 'Renegade', 'Gladiator'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade', 'Kona', 'Ioniq 5'],
  Kia: ['Sorento', 'Sportage', 'Optima', 'Soul', 'Forte', 'Telluride', 'EV6'],
  Ram: ['1500', '2500', '3500'],
  GMC: ['Sierra', 'Terrain', 'Acadia', 'Yukon'],
  Dodge: ['Charger', 'Challenger', 'Durango', 'Grand Caravan'],
  Lexus: ['RX', 'ES', 'NX', 'IS', 'GX'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
};

// ─── Deterministic data generation ─────────────────────────────────────────

const rand = mulberry32(42); // fixed seed → identical output every run

function pickRandomSubset<T>(items: T[], minRatio: number, maxRatio: number): T[] {
  const count = Math.max(
    1,
    Math.floor(items.length * (minRatio + rand() * (maxRatio - minRatio)))
  );
  const shuffled = [...items].sort(() => rand() - 0.5);
  return shuffled.slice(0, count).sort();
}

import type { VehicleSeed } from './types';

const vehicles: VehicleSeed[] = [];
const makes = Object.keys(makeModels);

for (let year = 2012; year <= 2026; year++) {
  const yearMakes = pickRandomSubset(makes, 0.6, 0.9);

  for (const make of yearMakes) {
    const allModels = makeModels[make];
    const yearModels = pickRandomSubset(allModels, 0.5, 0.85);

    for (const model of yearModels) {
      vehicles.push({ year, make, model });
    }
  }
}

// ─── Write output ──────────────────────────────────────────────────────────

const outputPath = path.join(__dirname, '..', 'prisma', 'seed-data.json');

const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(vehicles, null, 2), 'utf-8');
console.log(`Generated ${vehicles.length} vehicle records in ${outputPath}`);
