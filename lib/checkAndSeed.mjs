import { setupDb } from './db.mjs';

async function checkAndSeed() {
  const db = await setupDb();

  // Check if the table is empty
  const rowCount = await db.get('SELECT COUNT(*) as count FROM urls');

  if (rowCount.count === 0) {
    console.log('Seeding database...');
    const ip = 'http://10.2.15.193:3000';
    const seedData = [
      { shortId: 'abc123', originalUrl: 'https://google.com', metaOgTitle: 'Google', metaOgDescription: 'Google', metaOgImage: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', ip: ip },
      { shortId: 'def456', originalUrl: 'https://linkedin.com', metaOgTitle: 'LinkedIn', metaOgDescription: 'LinkedIn', metaOgImage: 'https://www.citypng.com/public/uploads/preview/hd-linkedin-official-logo-transparent-background-701751694779193uxxevujc5p.png', ip: ip},
      { shortId: 'ghi789', originalUrl: 'https://x.com', metaOgTitle: 'X', metaOgDescription: 'X', metaOgImage: 'https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png', ip: ip },
    ];

    for (const { shortId, originalUrl, metaOgTitle, metaOgDescription, metaOgImage } of seedData) {
      await db.run('INSERT INTO urls (shortId, originalUrl, metaOgTitle, metaOgDescription, metaOgImage, ip) VALUES (?, ?, ?, ?, ?, ?)', [shortId, originalUrl, metaOgTitle, metaOgDescription, metaOgImage, ip]);
    }

    console.log('Database seeded successfully');
  } else {
    console.log('Database already seeded');
  }

  await db.close();
}

checkAndSeed().catch((err) => {
  console.error('Error checking and seeding database:', err);
});