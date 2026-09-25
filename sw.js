// 离线缓存：联网优先拿最新页面，断网时用缓存
var C='usj926-v1';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r})
    .catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match('./',{ignoreSearch:true})})}));
});
