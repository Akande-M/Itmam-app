/* Itmām service worker: app shell offline; surah text and recitations cached on the device as they're used */
const V="itmam-v6",AUDIO="itmam-audio-v1";
const SHELL=["./","index.html","meta.json","bundle.json","vocab.json","s/001.json","manifest.webmanifest","icons/icon.svg","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==AUDIO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const cacheFirst=(req,name)=>caches.open(name).then(c=>c.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok)c.put(req,r.clone());return r})));
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);if(r.method!=="GET")return;
  if(u.hostname==="huggingface.co"&&u.pathname.includes("/maqra-project/")&&r.mode==="cors"){e.respondWith(cacheFirst(r,AUDIO));return}
  if(u.origin!==location.origin)return;
  if(r.mode==="navigate"||u.pathname.endsWith("index.html")||u.pathname.endsWith("/")){
    e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))));return}
  e.respondWith(cacheFirst(r,u.pathname.includes("/audio/")?AUDIO:V));
});
