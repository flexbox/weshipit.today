import { filteredApp, frenchApp } from 'apps/web/fixtures/french-apps.fixture';

function extractAppData(app): filteredApp {
  return {
    android_url: app.android_url || null,
    ios_url: app.ios_url || null,
    logo_url: app.logo_url,
    name: app.name,
    podcast_url: app.podcast_url || null,
    website_url: app.website_url || null,
  };
}

function addAppToCategory(categoryMap, category, appData) {
  if (!categoryMap.has(category)) {
    categoryMap.set(category, []);
  }
  categoryMap.get(category).push(appData);
}

export function formatAppsByCategory(apps: frenchApp[]) {
  const categoryMap = new Map();

  apps.forEach((app) => {
    if (app.category) {
      const category = app.category.toLowerCase();
      const appData = extractAppData(app);
      addAppToCategory(categoryMap, category, appData);
    }
  });

  return Array.from(categoryMap, ([category, apps]) => ({ apps, category }));
}
