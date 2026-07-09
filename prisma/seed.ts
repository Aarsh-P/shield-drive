import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, 'seed-data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const vehicles = JSON.parse(rawData);

  console.log(`Seeding ${vehicles.length} vehicle combinations...`);

  const result = await prisma.vehicle.createMany({
    data: vehicles,
    skipDuplicates: true,
  });

  console.log(`Successfully seeded ${result.count} new vehicle entries.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
