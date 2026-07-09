import * as fs from 'fs';
import * as path from 'path';

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
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class']
};

interface VehicleSeed {
  year: number;
  make: string;
  model: string;
}

const vehicles: VehicleSeed[] = [];

// Generate data from 2012 to 2026
for (let year = 2012; year <= 2026; year++) {
  for (const [make, models] of Object.entries(makeModels)) {
    for (const model of models) {
      vehicles.push({
        year,
        make,
        model
      });
    }
  }
}

const outputPath = path.join(__dirname, '..', 'prisma', 'seed-data.json');

// Ensure prisma directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(vehicles, null, 2), 'utf-8');
console.log(`Generated ${vehicles.length} vehicle records in ${outputPath}`);
