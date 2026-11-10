/* Itmām service worker v7
   - page and data files (json): network first, cache only as offline fallback, so updates always arrive
   - recitation audio and icons: cache first (they never change) */
const V="itmam-v7",AUDIO="itmam-audio-v1";
const SHELL=["./","index.html","meta.json","vocab.json","s/001.json","manifest.webmanifest","icons/icon.svg","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==AUDIO).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const cacheFirst=(req,name)=>caches.open(name).then(c=>c.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok)c.put(req,r.clone());return r})));
const networkFirst=req=>fetch(req).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(k=>k.put(req,c))}return r}).catch(()=>caches.match(req,{ignoreSearch:true}).then(m=>m||caches.match("index.html")));
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);if(r.method!=="GET")return;
  if(u.hostname==="huggingface.co"&&u.pathname.includes("/maqra-project/")&&r.mode==="cors"){e.respondWith(cacheFirst(r,AUDIO));return}
  if(u.origin!==location.origin)return;
  if(u.pathname.includes("/audio/")||u.pathname.includes("/icons/")){e.respondWith(cacheFirst(r,u.pathname.includes("/audio/")?AUDIO:V));return}
  e.respondWith(networkFirst(r));
});
