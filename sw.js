importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

const staticAssets = [
    './fallback.json',
    './images/fetch-dog.jpg'
];
workbox.precaching.precacheAndRoute(staticAssets);
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 20,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    //css,js file under in this page will be cached
    /\//,
    // Use cache but update in the background ASAP
    workbox.strategies.staleWhileRevalidate({
        // Use a custom cache name
        cacheName: 'root',
    })
);

const fallbackJson = './fallback.json';
const apiHandler = workbox.strategies.networkFirst();
    workbox.routing.registerRoute(/.*(?:newsapi\.org).*$/, ({ event }) => {
    return apiHandler.handle({ event })
        .catch(() => caches.match(fallbackJson));
});