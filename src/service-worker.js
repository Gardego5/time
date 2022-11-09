import { build, files, version } from "$service-worker";

const worker = self;
const FILES = `cache${version}`;

const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);

worker.addEventListener("install", (event) => {
  event.waitUntil(
    async () => caches
      .open(FILES)
      .then((cache) => cache.addAll(to_cache))
      .then(() => {
        worker.skipWaiting();
      })
  );
});

worker.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(async (keys) => {
      // delete old caches
      for (const key of keys) {
        if (key !== FILES) await caches.delete(key);
      }

      worker.clients.claim();
    })
  );
});

async function fetchAndCache(req) {
  const cache = await caches.open(`offline${version}`);

  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (err) {
    const res = await cache.match(req);
    if (res) return res;

    throw err;
  }
}

worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;

  const url = new URL(event.request.url);

  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest =
    url.hostname === self.location.hostname && staticAssets.has(url.pathname);
  const isStaticAsset =
    url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;

  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith(
      (async () => {
        // always serve staic files and budler-generated assets from cache.
        // if your application has other URLs with data that will never change,
        // set this variable to true for them and they will only be fetched once.
        const cachedAsset = isStaticAsset && (await caches.match(event.request));

        return cachedAsset || fetchAndCache(event.request);
      })()
    )
  }
});
