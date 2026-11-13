---
title: 'API Routes'
summary: 'API routes are Expo Router files ending in +api.ts that export HTTP handlers, letting a React Native project ship server endpoints in the same codebase as its app.'
aliases:
  - 'Expo Router API routes'
  - '+api.ts'
related:
  - 'Expo Router'
  - 'Fetch API'
  - 'API Keys in Mobile Apps'
  - 'Environment Variables'
updated: 2026-11-13
---

API routes are server endpoints you write inside an [Expo Router](/react-native-glossary/expo-router) project. Any file in `app/` whose name ends in `+api.ts` becomes an HTTP route, and the functions it exports, named after HTTP methods, handle requests using the standard `Request` and `Response` objects.

```ts
// app/api/greeting+api.ts  →  /api/greeting
export async function POST(request: Request) {
  const { name } = await request.json();
  return Response.json({ message: `Hello ${name}` });
}
```

The reason they matter in a mobile app is secrets. Everything in a JavaScript bundle can be extracted from the installed app, so a third-party key that must stay private (a payment provider, an LLM provider, an admin database key) cannot live in the client. An API route runs on a server, so it can hold that key and expose only the narrow operation the app needs. See [API keys in mobile apps](/react-native-glossary/api-keys).

In practice:

- The project needs server output (`web.output: "server"` in app config), and the routes are deployed separately from the app binary, to EAS Hosting or another host through an adapter.
- The app calls them with [fetch](/react-native-glossary/fetch-api). A relative URL works against the dev server in development, but a production build needs to know the deployed origin, which you configure for Expo Router.
- Route files are never bundled into the native app.

The common mistake is forgetting that the app and the API now ship on different schedules. A store build in users’ hands for months will keep calling the endpoint shapes it was built with, so changing a route’s request or response format can break older installs. Version or extend routes rather than reshaping them. See the [API routes docs](https://docs.expo.dev/router/reference/api-routes/).
