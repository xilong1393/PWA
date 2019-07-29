importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded`);
} else {
    console.log(`Boo! Workbox didn't load`);
}

// workbox.routing.registerRoute(
    // /\.(?:png|gif|jpg|jpeg|svg)$/,
    // workbox.strategies.cacheFirst({
        // cacheName: 'images-cache',
        // plugins: [
            // new workbox.expiration.Plugin({
                // maxEntries: 20,
                // maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            // }),
        // ],
    // }),
// );

// workbox.routing.registerRoute(
    // //css,js file under in this page will be cached
    // /\//,
    // // Use cache but update in the background ASAP
    // workbox.strategies.staleWhileRevalidate({
        // // Use a custom cache name
        // cacheName: 'root',
    // })
// );
