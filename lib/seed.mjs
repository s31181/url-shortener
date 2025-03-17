import { setupDb } from './db.mjs';

async function seedDatabase() {
  const db = await setupDb();

  const seedData = [
    { shortId: 'abc123', originalUrl: 'https://google.com', metaOgTitle: 'Google', metaOgDescription: 'Google', metaOgImage: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' },
    { shortId: 'def456', originalUrl: 'https://linkedin.com', metaOgTitle: 'LinkedIn', metaOgDescription: 'LinkedIn', metaOgImage: 'https://www.linkedin.com/images/branding/linkedin.png' },
    { shortId: 'ghi789', originalUrl: 'https://x.com', metaOgTitle: 'X', metaOgDescription: 'X', metaOgImage: 'https://www.x.com/images/branding/x-logo.png' },
  ];

  for (const { shortId, originalUrl } of seedData) {
    await db.run('INSERT INTO urls (shortId, originalUrl) VALUES (?, ?)', [shortId, originalUrl]);
  }

  console.log('Database seeded successfully');
  await db.close();
}

seedDatabase().catch((err) => {
  console.error('Error seeding database:', err);
});