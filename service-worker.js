const CACHE_NAME = 'haska-portfolio-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/index.js',
    '/manifest.json'
];
self.addEventListener('install', (event)=>{
    event.waitUntil(caches.open(CACHE_NAME).then((cache)=>{
        return cache.addAll(STATIC_ASSETS);
    }).then(()=>{
        return self.skipWaiting();
    }));
});
self.addEventListener('activate', (event)=>{
    event.waitUntil(caches.keys().then((cacheNames)=>{
        return Promise.all(cacheNames.filter((name)=>name !== CACHE_NAME).map((name)=>caches.delete(name)));
    }).then(()=>{
        return self.clients.claim();
    }));
});
self.addEventListener('fetch', (event)=>{
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith(self.location.origin)) return;
    event.respondWith(caches.match(event.request).then((cached)=>{
        if (cached) {
            fetch(event.request).then((response)=>{
                if (response && response.status === 200) caches.open(CACHE_NAME).then((cache)=>{
                    cache.put(event.request, response.clone());
                });
            }).catch(()=>{});
            return cached;
        }
        return fetch(event.request).then((response)=>{
            if (!response || response.status !== 200) return response;
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache)=>{
                cache.put(event.request, responseToCache);
            });
            return response;
        }).catch(()=>{
            if (event.request.mode === 'navigate') return caches.match('/');
            return new Response('Network error', {
                status: 408,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
        });
    }));
});
self.addEventListener('sync', (event)=>{
    if (event.tag === 'background-sync') event.waitUntil(Promise.resolve());
});
self.addEventListener('push', (event)=>{
    if (event.data) {
        const data = event.data.json();
        event.waitUntil(self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/icon-192x192.png',
            badge: '/icon-72x72.png',
            data: data.data
        }));
    }
});
self.addEventListener('notificationclick', (event)=>{
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data?.url || '/'));
});

//# sourceMappingURL=service-worker.js.map
