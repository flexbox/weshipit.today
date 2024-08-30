function extractAppData(app) {
  return {
    android_url: app.fields.android_url,
    ios_url: app.fields.ios_url,
    logo_url: app.fields.logo[0].url,
    name: app.fields.name,
    website_url: app.fields.website_url,
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
    const category = app.fields.category.toLowerCase();
    const appData = extractAppData(app);
    addAppToCategory(categoryMap, category, appData);
  });

  return Array.from(categoryMap, ([category, apps]) => ({ apps, category }));
}
