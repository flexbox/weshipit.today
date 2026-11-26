import { initAnalytics } from './utils/analytics';

/**
 * Runs once in the browser, before React hydrates, for every page of both
 * routers. `initAnalytics` only registers a click listener and schedules
 * PostHog for when the browser is idle, so it costs hydration nothing.
 */
initAnalytics();
