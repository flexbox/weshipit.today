function extractAppData(app) {
  return {
    android_url: app.android_url,
    ios_url: app.ios_url,
    logo_url: app.logo[0].url,
    name: app.name,
    website_url: app.website_url,
    podcast_url: app.podcast_url,
  };
}

function addAppToCategory(categoryMap, category, appData) {
  if (!categoryMap.has(category)) {
    categoryMap.set(category, []);
  }
  categoryMap.get(category).push(appData);
}

export function formatAppsByCategory(apps) {
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
