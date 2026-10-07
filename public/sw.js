/* Trella Marketing — minimal service worker for PWA installability.
 *
 * Pure network passthrough: a registered fetch handler is required for the
 * browser's install prompt to appear; intentionally no caching so content
 * stays fresh.
 */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
