/* ============================================================
   Fukuoka Itinerary Planner — application
   ============================================================ */

const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

const fmt = m => {
  m = Math.round(m);
  const h = Math.floor(m/60)%24, mm = ((m%60)+60)%60;
  return String(h).padStart(2,'0') + ':' + String(mm).padStart(2,'0');
};
const toMin = v => { const [h,m] = v.split(':').map(Number); return h*60+m; };
const mins = m => Math.round(m) + ' min';
const yen  = n => '¥' + Math.round(n).toLocaleString('en-US');
const esc  = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const catLabel = c => c.charAt(0).toUpperCase() + c.slice(1);
const photoOf = p => p.photo || ('img/' + p.id + '.jpg');

/* ============================================================
   STATE
   ============================================================ */
const state = {
  days: 3,
  hotelId: 'nikko',
  interests: new Set(['temple','food']),
  trips: new Set(),
  plan: [],
  scale: 1,
  hotelQuery: '',
  hotelArea: 'all',
  panelDay: 0,
  panelCat: 'all',
  panelQuery: ''
};

const hotel = () => HOTELS.find(h => h.id === state.hotelId) || HOTELS[0];
const isTrip = p => TRIP_REGIONS.includes(p.area);

/* ============================================================
   LIVE PLACE SEARCH — OpenStreetMap, free and keyless
   ------------------------------------------------------------
   No hand-written list can hold every hotel, mall, shop and
   restaurant in the city, so both search boxes also ask Photon
   (photon.komoot.io), a free OpenStreetMap search service.
   No key, no account, results cached, failures degrade quietly.
   ============================================================ */
const PHOTON = 'https://photon.komoot.io/api/';
const PHOTON_BBOX = '130.05,33.02,131.20,34.08';   /* Fukuoka and reachable day trips */
const OSM_HOTEL_TYPES = ['tourism:hotel','tourism:guest_house','tourism:hostel','tourism:apartment','tourism:motel'];
const OSM_CACHE = new Map();
const live = {
  hotel: {q:'', status:'idle', items:[], seq:0, timer:0},
  place: {q:'', status:'idle', items:[], seq:0, timer:0}
};
const AREA_ANCHORS = [
  ['hakata', 33.5900, 130.4207], ['tenjin', 33.5892, 130.3994],
  ['nakasu', 33.5906, 130.4033], ['ohori', 33.5860, 130.3850],
  ['momochi', 33.5920, 130.3581]
];
const OSM_KIND = {
  hotel:'Hotel', guest_house:'Guesthouse', hostel:'Hostel', apartment:'Apartment hotel', motel:'Motel',
  attraction:'Attraction', museum:'Museum', viewpoint:'Viewpoint', artwork:'Public art', theme_park:'Theme park',
  restaurant:'Restaurant', cafe:'Café', bar:'Bar', pub:'Pub', fast_food:'Fast food', food_court:'Food court',
  marketplace:'Market', mall:'Shopping mall', department_store:'Department store', supermarket:'Supermarket',
  convenience:'Convenience store', bakery:'Bakery', temple:'Temple', shrine:'Shrine', park:'Park',
  place_of_worship:'Place of worship', theatre:'Theatre', cinema:'Cinema', gallery:'Gallery',
  hotel_building:'Hotel', commercial:'Commercial building', retail:'Retail building'
};
const OSM_CAT = {
  'tourism:hotel':'stay','tourism:guest_house':'stay','tourism:hostel':'stay','tourism:apartment':'stay','tourism:motel':'stay',
  'tourism:attraction':'view','tourism:museum':'art','tourism:viewpoint':'view','tourism:artwork':'view','tourism:theme_park':'view',
  'amenity:restaurant':'food','amenity:cafe':'food','amenity:bar':'food','amenity:pub':'food','amenity:fast_food':'food',
  'amenity:food_court':'food','amenity:marketplace':'market','shop:bakery':'food','shop:butcher':'food',
  'shop:mall':'shopping','shop:department_store':'shopping','shop:supermarket':'shopping','shop:convenience':'shopping',
  'building:temple':'temple','amenity:place_of_worship':'temple','leisure:park':'nature'
};

function nearestArea(lat, lon){
  let best = 'hakata', bestD = Infinity;
  AREA_ANCHORS.forEach(([key, la, lo]) => {
    const d = haversine({lat, lon}, {lat:la, lon:lo});
    if(d < bestD){ bestD = d; best = key; }
  });
  return best;
}

function osmResult(f){
  const p = f.properties || {}, c = (f.geometry && f.geometry.coordinates) || [];
  if(!p.name || !p.osm_key || c.length < 2) return null;
  const lat = Number(c[1]), lon = Number(c[0]);
  if(!isFinite(lat) || !isFinite(lon)) return null;
  const addr = [p.housenumber && p.street ? p.housenumber + ' ' + p.street : p.street, p.district || p.city]
    .filter(Boolean).join(', ');
  return {
    key: (p.osm_type || 'N') + p.osm_id,
    name: p.name,
    jp: /[\u3040-\u30ff\u4e00-\u9faf]/.test(p.name) ? p.name : '',
    lat, lon,
    osmKey: p.osm_key, osmValue: p.osm_value || '',
    kind: OSM_KIND[p.osm_value] || OSM_KIND[p.osm_key] || catLabel(p.osm_value || p.osm_key || 'place'),
    addr, city: p.city || '',
    area: nearestArea(lat, lon),
    dist: haversine({lat, lon}, hotel()),
    url: 'https://www.openstreetmap.org/' +
      ({N:'node', W:'way', R:'relation'}[p.osm_type] || 'node') + '/' + p.osm_id
  };
}

function liveSearch(kind, raw){
  const box = live[kind];
  const q = (raw || '').trim();
  box.q = q; box.seq += 1;
  if(q.length < 2){ box.status = 'idle'; box.items = []; paintLive(kind); return; }
  const cacheKey = kind + '|' + q.toLowerCase();
  if(OSM_CACHE.has(cacheKey)){ box.status = 'done'; box.items = OSM_CACHE.get(cacheKey); paintLive(kind); return; }
  box.status = 'loading'; box.items = []; paintLive(kind);
  const seq = box.seq;
  const url = new URL(PHOTON);
  url.searchParams.set('q', q);
  url.searchParams.set('limit', '15');
  url.searchParams.set('lang', 'en');
  url.searchParams.set('lat', String(hotel().lat));
  url.searchParams.set('lon', String(hotel().lon));
  url.searchParams.set('bbox', PHOTON_BBOX);
  if(kind === 'hotel') OSM_HOTEL_TYPES.forEach(t => url.searchParams.append('osm_tag', t));
  fetch(url.toString(), {headers:{Accept:'application/json'}})
    .then(r => { if(!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(data => {
      const items = (data.features || []).map(osmResult).filter(Boolean)
        .filter(x => kind !== 'hotel' || x.osmKey === 'tourism')
        .slice(0, 8);
      OSM_CACHE.set(cacheKey, items);
      if(seq !== box.seq) return;
      box.items = items;
      box.status = items.length ? 'done' : 'empty';
      paintLive(kind);
    })
    .catch(() => {
      if(seq !== box.seq) return;
      box.status = 'error';
      paintLive(kind);
    });
}

function liveAsk(kind, q){
  const box = live[kind];
  clearTimeout(box.timer);
  const t = (q || '').trim();
  if(t.length < 2){ box.status = 'idle'; box.items = []; box.q = ''; }
  else if(box.q !== t){ box.status = 'loading'; box.items = []; box.q = t; }
  paintLive(kind);
  box.timer = setTimeout(() => liveSearch(kind, q), 420);
}

function paintLive(kind){
  if(kind === 'hotel') renderControls();
  else renderPanel();
}

const mapsSearch = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);

function liveHotelHtml(){
  const q = state.hotelQuery.trim();
  if(q.length < 2) return '';
  const box = live.hotel;
  let body = '';
  if(box.status === 'loading') body = '<p class="osmnote">Looking through OpenStreetMap…</p>';
  else if(box.status === 'error') body = '<p class="osmnote">Live search is not answering just now. <a href="' +
    mapsSearch(q + ' hotel Fukuoka') + '" target="_blank" rel="noopener">Search Google Maps instead</a>.</p>';
  else if(box.status === 'empty') body = '<p class="osmnote">No hotel of that name in Fukuoka on OpenStreetMap. Try the Japanese name, or <a href="' +
    mapsSearch(q + ' hotel Fukuoka') + '" target="_blank" rel="noopener">search Google Maps</a>.</p>';
  else if(box.status === 'done') body = box.items.map((it, i) =>
    '<button class="hotel osm" data-osmhotel="' + i + '">' +
      '<span class="hname">' + esc(it.name) + '</span>' +
      (it.jp ? '<span class="hjp">' + esc(it.jp) + '</span>' : '') +
      '<span class="hmeta">' + esc(it.kind) + (it.addr ? ' · ' + esc(it.addr) : it.city ? ' · ' + esc(it.city) : '') + '</span>' +
      '<span class="hmeta osmgo">' + it.dist.toFixed(1) + ' km away · use as your base →</span>' +
    '</button>').join('');
  if(!body) return '';
  return '<div class="osmblock"><div class="osmhead"><b>Any hotel in Fukuoka</b><span>OpenStreetMap</span></div>' + body + '</div>';
}

function useOSMHotel(it){
  const id = 'osm-' + it.key;
  if(!HOTELS.some(h => h.id === id)){
    HOTELS.push({id, name:it.name, jp:it.jp || 'OpenStreetMap listing',
      area:it.area, hub:(it.area === 'hakata' ? 'hakata' : 'tenjin'),
      lat:it.lat, lon:it.lon, price:null,
      walk:(it.addr ? it.addr + ' · ' : '') + 'found via OpenStreetMap',
      osm:true, osmUrl:it.url});
  }
  state.hotelId = id;
  state.hotelQuery = ''; state.hotelArea = 'all';
  const inp = $('#hotelSearch'); if(inp) inp.value = '';
  live.hotel.status = 'idle'; live.hotel.items = []; live.hotel.q = '';
  live.hotel.seq += 1;
  generate(); MAPSCOPE = 'auto'; render();
}

/* live OSM and Wikipedia rows borrow the photograph of the same place
   from the curated list, so a result never comes up as a blank card */
function plainName(v){
  return (v || '').toLowerCase().replace(/[^a-z0-9\u3040-\u30ff\u4e00-\u9faf]/g, '');
}
function photoForLive(name, lat, lon){
  const n = plainName(name);
  if(n.length > 2){
    const hit = POIS.find(p => {
      const pn = plainName(p.name);
      if(!pn) return false;
      if(pn === n) return true;
      return n.length > 5 && pn.length > 5 && (pn.indexOf(n) === 0 || n.indexOf(pn) === 0);
    });
    if(hit) return photoOf(hit);
  }
  if(typeof lat === 'number' && typeof lon === 'number'){
    let best = null, bd = 1e9;
    POIS.forEach(p => {
      if(typeof p.lat !== 'number') return;
      const d = haversine({lat, lon}, p);
      if(d < bd){ bd = d; best = p; }
    });
    if(best && bd < 0.4) return photoOf(best);
  }
  return 'img/place-unknown.svg';
}

function livePlaceHtml(from){
  const q = state.panelQuery.trim();
  if(q.length < 2) return '';
  const box = live.place;
  let body = '';
  if(box.status === 'loading') body = '<p class="osmnote">Looking through OpenStreetMap…</p>';
  else if(box.status === 'error') body = '<p class="osmnote">Live search is not answering just now. <a href="' +
    mapsSearch(q + ' Fukuoka') + '" target="_blank" rel="noopener">Search Google Maps instead</a>.</p>';
  else if(box.status === 'empty') body = '<p class="osmnote">Nothing by that name near Fukuoka on OpenStreetMap. Try another spelling, or <a href="' +
    mapsSearch(q + ' Fukuoka') + '" target="_blank" rel="noopener">search Google Maps</a>.</p>';
  else if(box.status === 'done') body = box.items.map((it, i) => {
    const leg = travel(from, {lat:it.lat, lon:it.lon, area:it.area}, hotel().hub);
    const osmPic = photoForLive(it.name, it.lat, it.lon);
    return '<div class="opt osmopt' + (osmPic === 'img/place-unknown.svg' ? ' nopic' : '') + '">' +
      '<img src="' + osmPic + '" alt="" loading="lazy">' +
      '<div><h4>' + esc(it.name) + (it.jp ? '<span class="jp">' + esc(it.jp) + '</span>' : '') +
        '<span class="osmflag">OSM</span></h4>' +
        '<div class="bl">' + esc(it.kind) + (it.addr ? ' · ' + esc(it.addr) : '') + '</div>' +
        '<div class="legline">' + (leg.dist ? leg.dist.toFixed(1) + ' km · ' : '') +
          '<b>' + esc(leg.mode) + '</b> · ' + mins(leg.min) + ' · ' +
          (leg.fare ? yen(leg.fare) + ' est.' : 'free') + '</div>' +
      '</div>' +
      '<button class="addto" data-addosm="' + i + '">+ Add</button></div>';
  }).join('');
  if(!body) return '';
  return '<div class="osmblock osmplaces"><div class="osmhead"><b>Anywhere in Fukuoka</b><span>OpenStreetMap</span></div>' + body + '</div>';
}

function osmToPOI(it){
  const id = 'osm-' + it.key;
  if(POI[id]) return id;
  const cat = OSM_CAT[it.osmKey + ':' + it.osmValue] ||
    (it.osmKey === 'shop' ? 'shopping' : it.osmKey === 'amenity' ? 'food' : 'view');
  POI[id] = {
    id, name:it.name, jp:it.jp, area:it.area, cats:[cat],
    lat:it.lat, lon:it.lon, dwell:60, fee:0,
    blurb: it.kind + (it.addr ? ' at ' + it.addr : '') + '. Found through the live OpenStreetMap search.',
    tip: 'Opening hours and prices are not listed for this one — check before you go.',
    photo: photoForLive(it.name, it.lat, it.lon), osm: true, osmUrl: it.url
  };
  return id;
}

/* ============================================================
   WIKIPEDIA SIGHTS — free, keyless, CORS-enabled
   ------------------------------------------------------------
   The curated list can never hold every sight in Kyushu, so the
   add-a-stop sheet also asks Wikipedia what is listed around the
   day's anchor point. No key, no account, failures stay quiet.
   ============================================================ */
const WIKI = {key:'', status:'idle', items:[], seq:0};
const WIKI_SKIP = /^(List of|Timeline of|Category:|Portal:|File:|Template:|Geography of|History of)|disambiguation/i;
const WIKI_ADMIN = /\bis (a|an|the) (ward|city|prefecture|subprefecture|district|municipality|neighbourhood|neighborhood|town|village) of\b/i;

function wikiAnchor(day){
  if(!day) return hotel();
  const first = day.items.map(i => (i.type === 'stop' ? POI[i.id] : null)).filter(Boolean)[0];
  if(first) return first;
  if(day.kind === 'trip'){
    const pool = POIS.filter(q => q.area === day.region && q.lat != null);
    if(pool.length){
      return {
        lat: pool.reduce((s,q) => s + q.lat, 0) / pool.length,
        lon: pool.reduce((s,q) => s + q.lon, 0) / pool.length,
        area: day.region,
        name: TRIP_LABELS[day.region]
      };
    }
  }
  return hotel();
}

function areaNear(lat, lon){
  let best = null, bd = Infinity;
  POIS.forEach(p => {
    if(p.lat == null || p.lon == null) return;
    const d = haversine({lat, lon}, p);
    if(d < bd){ bd = d; best = p.area; }
  });
  return (best && bd < 40) ? best : nearestArea(lat, lon);
}

function wikiSearch(anchor){
  const key = anchor.lat.toFixed(2) + ',' + anchor.lon.toFixed(2);
  if(WIKI.key === key) return;
  WIKI.key = key; WIKI.status = 'loading'; WIKI.items = []; WIKI.seq += 1;
  const seq = WIKI.seq;
  const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*' +
    '&generator=geosearch&ggscoord=' + anchor.lat + '|' + anchor.lon +
    '&ggsradius=10000&ggslimit=20' +
    '&prop=coordinates|pageimages|extracts&exintro=1&explaintext=1&exchars=180' +
    '&piprop=thumbnail&pithumbsize=280';
  fetch(url)
    .then(r => { if(!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(data => {
      if(seq !== WIKI.seq) return;
      const pages = (data.query && data.query.pages) ? Object.values(data.query.pages) : [];
      const known = new Set(POIS.map(p => p.name.toLowerCase()));
      WIKI.items = pages
        .map(pg => {
          const c = pg.coordinates && pg.coordinates[0];
          if(!c || !pg.title) return null;
          return {
            pageid: pg.pageid, title: pg.title, lat: c.lat, lon: c.lon,
            extract: (pg.extract || '').replace(/\s+/g, ' ').trim(),
            thumb: pg.thumbnail ? pg.thumbnail.source : null,
            url: 'https://en.wikipedia.org/?curid=' + pg.pageid
          };
        })
        .filter(Boolean)
        .filter(x => !known.has(x.title.toLowerCase()) && !WIKI_SKIP.test(x.title) && !WIKI_ADMIN.test(x.extract.slice(0, 110)))
        .slice(0, 8);
      WIKI.status = WIKI.items.length ? 'done' : 'empty';
      if($('#addModal').classList.contains('open')) renderPanel();
    })
    .catch(() => {
      if(seq !== WIKI.seq) return;
      WIKI.status = 'error';
      if($('#addModal').classList.contains('open')) renderPanel();
    });
}

function wikiHtml(day){
  const anchor = wikiAnchor(day);
  wikiSearch(anchor);
  const head = '<div class="osmhead"><b>Sights around ' + esc(anchor.name || 'your day') + '</b><span>Wikipedia</span></div>';
  if(WIKI.status === 'loading'){
    return '<div class="osmblock wikiblock">' + head + '<p class="osmnote">Reading Wikipedia’s list of sights nearby…</p></div>';
  }
  if(!WIKI.items.length) return '';
  const rows = WIKI.items.map((it, i) => {
    const leg = travel(anchor, {lat:it.lat, lon:it.lon, area:areaNear(it.lat, it.lon)}, hotel().hub);
    return '<div class="opt wikiopt">' +
      '<img src="' + (it.thumb || photoForLive(it.title, it.lat, it.lon)) + '" alt="" loading="lazy" referrerpolicy="no-referrer">' +
      '<div><h4>' + esc(it.title) + '<span class="osmflag">Wiki</span></h4>' +
        '<div class="bl">' + esc(it.extract || 'A sight Wikipedia lists near this part of the trip.') + '</div>' +
        '<div class="legline">' + (leg.dist ? leg.dist.toFixed(1) + ' km · ' : '') +
          '<b>' + esc(leg.mode) + '</b> · ' + mins(leg.min) + ' · ' +
          (leg.fare ? yen(leg.fare) + ' est.' : 'free') + '</div>' +
      '</div>' +
      '<button class="addto" data-addwiki="' + i + '">+ Add</button></div>';
  }).join('');
  return '<div class="osmblock wikiblock">' + head + rows + '</div>';
}

function wikiToPOI(it){
  const id = 'wiki-' + it.pageid;
  if(POI[id]) return id;
  POI[id] = {
    id, name: it.title, jp: '', area: areaNear(it.lat, it.lon), cats: ['view'],
    lat: it.lat, lon: it.lon, dwell: 60, fee: 0,
    blurb: it.extract || 'A sight listed on Wikipedia near this part of the trip.',
    tip: 'Opening hours and prices are not listed here — check before you go.',
    photo: it.thumb || photoForLive(it.title, it.lat, it.lon), wiki: true, wikiUrl: it.url
  };
  return id;
}

/* ============================================================
   PLAN GENERATION
   ============================================================ */
function scoreOf(p){
  let s = p.must ? 5 : 0;
  p.cats.forEach(c => { if(state.interests.has(c)) s += 3; });
  return s;
}

function cityPool(){
  let pool = POIS.filter(p => !isTrip(p) && (p.must || p.cats.some(c => state.interests.has(c))));
  if(!pool.length) pool = POIS.filter(p => !isTrip(p) && p.must);
  if(!pool.length) pool = POIS.filter(p => !isTrip(p));
  return pool.slice().sort((a,b) => scoreOf(b) - scoreOf(a));
}

/* every day is built the same way: breakfast, places, lunch,
   places, tea, places, dinner — then the traveller can move anything */
function makeDay(index, spec){
  /* a day trip holds four stops at most — more than that and the
     day stops being a day and becomes a checklist */
  const stops = spec.kind === 'trip'
    ? orderStops(POIS.filter(p => p.area === spec.region)).slice(0, 4)
    : (spec.stops || []);
  const n = stops.length;
  const m = Math.max(1, Math.ceil(n * 0.4));
  const a = Math.max(1, Math.ceil((n - m) * 0.55));
  const parts = [stops.slice(0,m), stops.slice(m,m+a), stops.slice(m+a)];

  const items = [{type:'meal', key:'breakfast'}];
  parts[0].forEach(p => items.push({type:'stop', id:p.id}));
  items.push({type:'meal', key:'lunch'});
  parts[1].forEach(p => items.push({type:'stop', id:p.id}));
  items.push({type:'meal', key:'tea'});
  parts[2].forEach(p => items.push({type:'stop', id:p.id}));
  items.push({type:'meal', key:'dinner'});

  return {index, kind:spec.kind, region:spec.region || null, spec, start:8*60, title:spec.title || null, items};
}

function generate(){
  const tripKeys = [...state.trips].filter(r => TRIPS[r]).slice(0, Math.max(0, state.days - 1));
  const cityDays = Math.max(1, state.days - tripKeys.length);
  const pool = cityPool();
  const chosen = pool.slice(0, Math.min(pool.length, cityDays * 5));
  const groups = distribute(chosen, cityDays);

  const plan = [];
  let ci = 0, ti = 0;
  for(let i = 0; i < state.days; i++){
    let spec;
    if(i > 0 && i % 2 === 1 && ti < tripKeys.length){
      spec = {kind:'trip', region:tripKeys[ti++]};
    } else if(ci < groups.length){
      spec = {kind:'core', stops:orderStops(groups[ci++])};
    } else if(ti < tripKeys.length){
      spec = {kind:'trip', region:tripKeys[ti++]};
    } else {
      spec = {kind:'core', stops:[]};
    }
    plan.push(makeDay(i, spec));
  }
  state.plan = plan;
}

/* ============================================================
   SCHEDULE — times flow from the day start, meal anchors and pins
   ============================================================ */
function schedule(day){
  const h = hotel();
  let t = day.start;
  let prev = {lat:h.lat, lon:h.lon, area:h.area, name:h.name};
  const rows = [];
  let fares = 0, admissions = 0, distance = 0, walked = 0;
  const spend = {subway:0, bus:0, jr:0};
  let lastStop = null;

  day.items.forEach((it, idx) => {
    if(it.type === 'meal'){
      const m = MEAL[it.key];
      if(it.off){ rows.push({kind:'meal', key:it.key, label:m.label, jp:m.jp, blurb:m.blurb, off:true, start:null, dur:0, idx}); return; }
      const at  = it.at != null ? it.at : m.at;
      const dur = it.dur != null ? it.dur : m.dur;
      const start = Math.max(t, at);
      rows.push({kind:'meal', key:it.key, label:m.label, jp:m.jp, blurb:m.blurb,
                 start, end:start+dur, dur, wait:start-t, at, pinned:it.at!=null, idx});
      t = start + dur;
      return;
    }
    const p = POI[it.id];
    if(!p) return;
    const leg = travel(prev, p, h.hub);
    const arrive = t + leg.min;
    const start = it.at != null ? Math.max(it.at, arrive) : arrive;
    const dur = it.dur != null ? it.dur : p.dwell;
    if(leg.fare){ fares += leg.fare; }
    if(leg.src === 'subway') spend.subway += leg.fare;
    else if(leg.src === 'bus') spend.bus += leg.fare;
    else if(leg.src === 'jr' || leg.src === 'shinkansen') spend.jr += leg.fare;
    if(leg.dist){ distance += leg.dist; if(leg.src === 'walk') walked += leg.dist; }
    admissions += p.fee || 0;
    rows.push({kind:'stop', poi:p, leg, start, end:start+dur, dur, pinned:it.at!=null, wait:Math.round(start-arrive), idx});
    prev = p; lastStop = p; t = start + dur;
  });

  const back = travel(prev, {lat:h.lat, lon:h.lon, area:h.area}, h.hub);
  fares += back.fare || 0;

  return {rows, end:t, back, fares, admissions, distance, walked, spend};
}

/* ============================================================
   RENDER — controls
   ============================================================ */
const AREA_LABEL = {hakata:'Hakata 博多', tenjin:'Tenjin 天神', nakasu:'Nakasu 中洲', momochi:'Momochi ももち'};

function renderControls(){
  $('#daysInput').value = state.days;
  $('#daysWord').textContent = state.days === 1 ? 'day' : 'days';

  const h = hotel();
  $('#hotelNow').innerHTML = '<b>' + esc(h.name) + '</b><span class="jp">' + esc(h.jp) + '</span>' +
    '<span class="hotelmeta">' + esc(AREA_LABEL[h.area] || h.area) + ' · ' + esc(h.walk) + '</span>' +
    '<span class="hotelprice">' + (h.price ? 'about ' + yen(h.price) + ' a night' : 'live listing · rate not listed') + '</span>';

  const areas = [['all','All areas'],['hakata','Hakata'],['tenjin','Tenjin'],['nakasu','Nakasu'],['momochi','Momochi']];
  $('#hotelAreas').innerHTML = areas.map(([k,l]) =>
    '<button class="chip small" data-harea="' + k + '" aria-pressed="' + (state.hotelArea===k) + '">' + l + '</button>').join('');

  const q = state.hotelQuery.trim().toLowerCase();
  const list = HOTELS.filter(x => (state.hotelArea === 'all' || x.area === state.hotelArea) &&
    (!q || (x.name + ' ' + x.jp + ' ' + x.area + ' ' + x.walk).toLowerCase().includes(q)));

  $('#hotelList').innerHTML = (list.length ? list.map(x =>
    '<button class="hotel' + (x.id === state.hotelId ? ' on' : '') + '" data-hotel="' + x.id + '" aria-pressed="' + (x.id === state.hotelId) + '">' +
      '<span class="hname">' + esc(x.name) + '</span>' +
      '<span class="hjp">' + esc(x.jp) + '</span>' +
      '<span class="hmeta">' + esc(AREA_LABEL[x.area] || x.area) + ' · ' + (x.price ? yen(x.price) + '/night' : 'rate not listed') + '</span>' +
    '</button>').join('')
    : '<p class="hint">No hotel matches our shortlist. The live search below covers every hotel in the city.</p>') +
    liveHotelHtml();

  $('#interestChips').innerHTML = INTERESTS.map(i =>
    '<button class="chip" data-interest="' + i.key + '" aria-pressed="' + state.interests.has(i.key) + '">' +
    esc(i.label) + '<span class="jp">' + i.jp + '</span></button>').join('');

  $('#tripChips').innerHTML = TRIP_REGIONS.map(r => {
    const t = TRIPS[r];
    return '<button class="chip' + (t.long ? ' long' : '') + '" data-trip="' + r + '" aria-pressed="' + state.trips.has(r) + '" title="' +
      esc(t.legs.hakata.mode) + ' · ' + t.legs.hakata.min + ' min each way · ' + yen(t.legs.hakata.fare) + '">' +
      TRIP_LABELS[r] + '<span class="jp">' + TRIP_JP[r] + '</span></button>';
  }).join('');

  const maxTrips = Math.max(0, state.days - 1);
  $('#tripHint').innerHTML = state.trips.size + ' of ' + maxTrips + ' possible day trips chosen. ' +
    'A day trip takes a whole day, so it uses one of your ' + state.days + ' days.';
}

/* ============================================================
   RENDER — days
   ============================================================ */
const DAYCOL = ['#3F6FCB','#6A3F86','#2C4F96','#5B86DE','#1E0427','#2F7E8E'];

function altsFor(p){
  const rows = [];
  if(p.near && p.near.length){
    p.near.forEach(a => rows.push({n:a.n, jp:a.jp, w:a.w, note:a.note, img:NEARPHOTO[a.n] || null}));
  }
  const siblings = POIS.filter(q => q.area === p.area && q.id !== p.id);
  siblings.forEach(q => {
    const d = haversine(p, q);
    if(d > 12) return;
    rows.push({n:q.name, jp:q.jp, w:mins(d/4.4*60) + ' walk', note:q.blurb.split('.')[0] + '.', img:q.id});
  });
  return rows;
}

function altList(p){
  const rows = altsFor(p);
  if(!rows.length) return '';
  const inner = rows.map(a =>
    '<li>' + (a.img
        ? '<img class="althumb" src="img/' + a.img + '.jpg" alt="' + esc(a.n) + '" loading="lazy"' +
          (POI[a.img] ? ' data-detail="' + a.img + '" role="button" tabindex="0"' : '') + '>'
        : '<div class="althumb">' + esc((a.jp || a.n).charAt(0)) + '</div>') +
      '<div><div class="nameline"><b>' + esc(a.n) + '</b><span class="jp">' + esc(a.jp) + '</span></div>' +
      '<div class="metaline"><span class="w">' + esc(a.w) + '</span> · ' + esc(a.note) + '</div></div></li>').join('');
  return '<details class="alts"><summary>' + rows.length + ' places within reach</summary><ul>' + inner + '</ul></details>';
}

function timeBtn(value, attrs, label){
  return '<button class="timebtn" ' + attrs + ' aria-haspopup="listbox" aria-label="' + esc(label) + '">' +
    '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.4V12l3 2"/></svg>' +
    '<span>' + (value || 'off') + '</span></button>';
}

/* the meal has to be where the day is: on a Hiroshima day the lunch
   recommendation comes from Hiroshima, not from Tenjin */
function mealPicks(dayIdx, key){
  const day = state.plan[dayIdx];
  if(day && day.kind === 'trip' && key !== 'breakfast'){
    const local = EAT_TRIP.filter(e => e.area === day.region && e.meal === key);
    if(local.length) return local;
  }
  return EAT.filter(e => e.meal === key);
}

function mealRow(r, dayIdx){
  const off = r.off ? ' off' : '';
  const tval = r.off ? '' : fmt(r.start);
  const picks = mealPicks(dayIdx, r.key);
  const pick = (!r.off && picks.length) ? picks[dayIdx % picks.length] : null;
  return '<li class="row mealrow' + off + '" draggable="true" data-day="' + dayIdx + '" data-idx="' + r.idx + '">' +
    '<div class="rowgrip" title="Drag to move">⠿</div>' +
    '<div class="rowtime">' +
      timeBtn(tval, 'data-topen="' + dayIdx + ':' + r.idx + '"', r.label + ' time') +
      '<div class="durline">' +
        '<button data-durstep="-15" data-day="' + dayIdx + '" data-idx="' + r.idx + '" aria-label="15 minutes shorter">−</button>' +
        '<span>' + (r.off ? 'off' : r.dur + ' min') + '</span>' +
        '<button data-durstep="15" data-day="' + dayIdx + '" data-idx="' + r.idx + '" aria-label="15 minutes longer">+</button>' +
      '</div>' +
      (r.pinned ? '<button class="pinflag" data-unpin="' + dayIdx + ':' + r.idx + '">fixed</button>' : '') +
    '</div>' +
    '<div class="mealbody">' +
      '<div class="stopname">' + esc(r.label) + '<span class="jp">' + esc(r.jp) + '</span>' +
        '<span class="tag">meal</span></div>' +
      '<div class="blurb">' + esc(r.blurb) + '</div>' +
      (pick ? '<button class="mealpick" data-detail="eat:' + pick.id + '">' +
        '<img src="img/' + pick.img + '.jpg" alt="" loading="lazy">' +
        '<span class="mpbody"><b>Top pick · ' + esc(pick.name) + '</b>' +
          '<em>' + esc(pick.rec) + '</em></span>' +
        '<span class="mpprice">' + esc(pick.price) + '</span></button>' : '') +
    '</div>' +
    '<div class="rowtools">' +
      '<label class="mealcheck" title="Include this meal"><input type="checkbox" data-mealtoggle="' + dayIdx + ':' + r.idx + '"' + (r.off ? '' : ' checked') + '><span>in plan</span></label>' +
      '<button data-move="-1" data-day="' + dayIdx + '" data-idx="' + r.idx + '" aria-label="Move up">↑</button>' +
      '<button data-move="1" data-day="' + dayIdx + '" data-idx="' + r.idx + '" aria-label="Move down">↓</button>' +
      '<button data-remove="' + dayIdx + ':' + r.idx + '" aria-label="Remove">×</button>' +
    '</div>' +
  '</li>';
}

function stopRow(r, dayIdx){
  const p = r.poi, leg = r.leg;
  const legHtml = leg
    ? '<div class="leg"><b>' + esc(leg.mode) + '</b><span>' + mins(leg.min) + '</span>' +
      '<span>' + (leg.fare ? yen(leg.fare) : 'free') + '</span>' +
      (leg.detail ? '<span class="src">' + esc(leg.detail) + '</span>' : '') + '</div>' +
      (leg.note ? '<div class="tip">' + esc(leg.note) + '</div>' : '')
    : '';
  const waitHtml = r.wait > 4 ? '<div class="waitnote">' + mins(r.wait) + ' to spare before this stop — wander nearby.</div>' : '';
  return '<li class="row" draggable="true" data-day="' + dayIdx + '" data-idx="' + r.idx + '">' +
    '<div class="rowgrip" title="Drag to move">⠿</div>' +
    '<div class="rowtime">' +
      timeBtn(fmt(r.start), 'data-topen="' + dayIdx + ':' + r.idx + '"', 'Start time for ' + p.name) +
      '<div class="durline">' +
        '<button data-durstep="-15" data-day="' + dayIdx + '" data-idx="' + r.idx + '" aria-label="15 minutes shorter">−</button>' +
        '<span>' + r.dur + ' min</span>' +
        '<button data-durstep="15" data-day="' + dayIdx + '" data-idx="' + r.idx + '" aria-label="15 minutes longer">+</button>' +
      '</div>' +
      (r.pinned ? '<button class="pinflag" data-unpin="' + dayIdx + ':' + r.idx + '">fixed · auto</button>' : '') +
    '</div>' +
    '<div class="stopbody">' +
      '<button class="phbtn" data-detail="' + p.id + '" aria-label="Open details for ' + esc(p.name) + '">' +
        '<img class="ph" src="' + photoOf(p) + '" alt="' + esc(p.name) + '" loading="lazy">' +
      '</button>' +
      '<div class="stoptext">' +
        '<div class="stopname">' + esc(p.name) + '<span class="jp">' + esc(p.jp) + '</span>' +
          '<span class="tag">' + catLabel(p.cats[0]) + '</span></div>' +
        '<div class="blurb">' + esc(p.blurb) + '</div>' +
        legHtml + waitHtml +
        '<div class="metaline2">' + (p.fee ? yen(p.fee) + ' entry' : 'free entry') + ' · ends ' + fmt(r.end) + '</div>' +
        (p.tip ? '<div class="tip">' + esc(p.tip) + '</div>' : '') +
        altList(p) +
      '</div>' +
    '</div>' +
    '<div class="rowtools">' +
      '<button data-move="-1" data-day="' + dayIdx + '" data-idx="' + r.idx + '" aria-label="Move up">↑</button>' +
      '<button data-move="1" data-day="' + dayIdx + '" data-idx="' + r.idx + '" aria-label="Move down">↓</button>' +
      '<button class="daypick" data-daymenu="' + dayIdx + ':' + r.idx + '" aria-haspopup="listbox" aria-label="Move ' + esc(p.name) + ' to another day">' +
        'Day ' + (dayIdx+1) + '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' +
      '</button>' +
      '<button data-remove="' + dayIdx + ':' + r.idx + '" aria-label="Remove this stop">×</button>' +
    '</div>' +
  '</li>';
}

function renderDays(){
  const host = $('#daysHost');
  host.innerHTML = state.plan.map((day, di) => {
    const s = schedule(day);
    const col = DAYCOL[di % DAYCOL.length];
    const title = day.kind === 'trip'
      ? 'Day trip to ' + TRIP_LABELS[day.region]
      : (day.items.some(i => i.type === 'stop') ? dominantArea(day) : 'Open day');
    const jp = day.kind === 'trip' ? TRIP_JP[day.region] : '';
    const stopCount = day.items.filter(i => i.type === 'stop').length;
    const late = s.end > 23*60;

    const header = '<div class="dayhead">' +
      '<div class="daynum" style="background:' + col + '">' + (di+1) + '</div>' +
      '<div class="daytitle"><h3>' + esc(title) + (jp ? '<span class="jpname">' + esc(jp) + '</span>' : '') + '</h3>' +
        '<div class="daymeta">' + stopCount + ' stops · leave ' +
          timeBtn(fmt(day.start), 'data-topen="start:' + di + '"', 'Leave the hotel at') +
          ' · back around ' + fmt(s.end + (s.back ? s.back.min : 0)) + ' · ' + yen(s.fares) + ' transit' +
        '</div>' +
      '</div>' +
      '<div class="dayactions">' +
        '<button class="addstop" data-open-add="' + di + '">+ Add a stop</button>' +
        '<button class="ghost tiny" data-resetday="' + di + '">Reset day</button>' +
      '</div>' +
    '</div>';

    const body = day.items.length
      ? s.rows.map(r => r.kind === 'meal' ? mealRow(r, di) : stopRow(r, di)).join('')
      : '<li class="empty">No stops on this day yet. Add one, or pick another interest.</li>';

    const ret = s.back && stopCount
      ? '<div class="retline">Then back to ' + esc(hotel().name) + ' — ' + esc(s.back.mode.toLowerCase()) + ' · ' +
        mins(s.back.min) + (s.back.fare ? ' · ' + yen(s.back.fare) : '') + '</div>'
      : '';

    const warn = late ? '<div class="extra warn">This day now runs past 23:00. Shorten a stop or move one to another day.</div>' : '';

    return '<div class="panel day" style="--daycol:' + col + '">' + header +
      '<ol class="tl" data-day="' + di + '">' + body +
        '<li class="dropend" data-day="' + di + '" data-idx="' + day.items.length + '">drop here to move to the end</li>' +
      '</ol>' + ret + warn + '</div>';
  }).join('');
}

function dominantArea(day){
  const count = {};
  day.items.filter(i => i.type === 'stop').forEach(i => {
    const p = POI[i.id]; if(p) count[p.area] = (count[p.area]||0)+1;
  });
  const top = Object.entries(count).sort((a,b) => b[1]-a[1])[0];
  if(!top) return 'City day';
  return ({hakata:'Hakata old town · 博多旧市街', tenjin:'Tenjin & downtown · 天神',
    nakasu:'Nakasu & the river · 中洲', ohori:'Ohori Park & castle · 大濠公園',
    momochi:'Momochi seaside · ももち', bay:'The bay · 博多湾'})[top[0]] || 'City day';
}

/* ============================================================
   MAP
   ============================================================ */
let MAP = null, LAYER = null, MAPSCOPE = 'auto';

function scopeDay(){
  if(MAPSCOPE === 'all') return null;
  if(MAPSCOPE === 'auto'){
    return state.plan.find(d => d.kind === 'trip')
        || state.plan.find(d => d.items.filter(i => i.type === 'stop').length > 1)
        || state.plan[0] || null;
  }
  return state.plan[Number(MAPSCOPE)] || null;
}

function ensureMap(){
  const host = document.getElementById('map');
  if(!host) return null;
  if(!window.L){
    host.innerHTML = '<div class="mapfail">The map library could not load. Everything else on this page still works.</div>';
    return null;
  }
  if(MAP) return MAP;
  MAP = L.map('map', {scrollWheelZoom:true, zoomControl:true, attributionControl:true}).setView([33.5902,130.4207], 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:19,
    attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(MAP);
  LAYER = L.layerGroup().addTo(MAP);
  return MAP;
}

function popupHtml(p, n){
  return '<div class="pj">' + n + '. ' + esc(p.name) + '</div>' +
    '<div class="jp">' + esc(p.jp) + '</div>' +
    '<img src="' + photoOf(p) + '" alt="' + esc(p.name) + '" data-detail="' + p.id + '" role="button" tabindex="0">' +
    '<div>' + esc(p.blurb) + '</div>' +
    '<div style="margin-top:5px;color:var(--ink-dim)">' + mins(p.dwell) + ' · ' + (p.fee ? yen(p.fee) + ' entry' : 'free entry') + '</div>';
}

function drawMap(){
  const map = ensureMap();
  if(!map) return;
  LAYER.clearLayers();
  const h = hotel();
  L.marker([h.lat, h.lon], {icon:L.divIcon({className:'', html:'<div class="pin base">H</div>', iconSize:[26,26], iconAnchor:[13,13]})})
    .addTo(LAYER)
    .bindPopup('<div class="pj">' + esc(h.name) + '</div><div class="jp">' + esc(h.jp) + ' · your base</div>');

  const all = [[h.lat, h.lon]];
  state.plan.forEach((day, di) => {
    const stops = day.items.filter(i => i.type === 'stop').map(i => POI[i.id]).filter(Boolean);
    if(!stops.length) return;
    const col = DAYCOL[di % DAYCOL.length];
    L.polyline([[h.lat,h.lon]].concat(stops.map(p => [p.lat,p.lon])),
      {color:col, weight:3, opacity:.72, dashArray:'7 6'}).addTo(LAYER);
    stops.forEach((p, k) => {
      all.push([p.lat, p.lon]);
      L.marker([p.lat, p.lon], {
        icon:L.divIcon({className:'', html:'<div class="pin" style="background:' + col + '">' + (k+1) + '</div>', iconSize:[26,26], iconAnchor:[13,13]}),
        riseOnHover:true
      }).addTo(LAYER).bindPopup(popupHtml(p, k+1)).bindTooltip(p.name + ' · ' + p.jp, {direction:'top', offset:[0,-12]});
    });
  });

  const focus = scopeDay();
  let framed = all;
  if(focus){
    const fs = focus.items.filter(i => i.type === 'stop').map(i => POI[i.id]).filter(Boolean);
    framed = [[h.lat,h.lon]].concat(fs.map(p => [p.lat,p.lon]));
  }
  if(framed.length > 1) map.fitBounds(L.latLngBounds(framed).pad(0.22), {animate:false});
  else map.setView([h.lat,h.lon], 13);
}

function renderMapChips(){
  const host = $('#mapScope');
  const active = scopeDay();
  const chips = ['<button class="mchip" data-scope="all" aria-pressed="' + (MAPSCOPE==='all') + '">Whole trip</button>'];
  state.plan.forEach((d, i) => {
    const nm = d.kind === 'trip' ? TRIP_LABELS[d.region] : dominantArea(d).split(' · ')[0];
    chips.push('<button class="mchip" data-scope="' + i + '" aria-pressed="' + (MAPSCOPE !== 'all' && active === d) + '">Day ' + (i+1) + ' · ' + esc(nm) + '</button>');
  });
  host.innerHTML = chips.join('');
}

function renderLegend(){
  $('#legend').innerHTML = state.plan.map((d, i) =>
    '<span><i style="background:' + DAYCOL[i % DAYCOL.length] + '"></i>Day ' + (i+1) +
    (d.kind === 'trip' ? ' · ' + esc(TRIP_LABELS[d.region]) : '') + '</span>').join('') +
    '<span><i style="background:#e37cbf"></i>Your hotel</span>' +
    '<span class="legendnote">Streets you will walk: ' + STREETS.map(s => s.jp + ' ' + s.en).join(' · ') + '</span>';
}

/* ============================================================
   COST, PASSES, NOTES, SOURCES
   ============================================================ */
const MEAL_COST = {breakfast:600, lunch:1200, tea:600, dinner:2800};

function renderBudget(){
  let transit = 0, entries = 0, food = 0, km = 0, stops = 0;
  state.plan.forEach(day => {
    const s = schedule(day);
    transit += s.fares; entries += s.admissions; km += s.distance;
    stops += day.items.filter(i => i.type === 'stop').length;
    s.rows.forEach(r => { if(r.kind === 'meal' && !r.off) food += MEAL_COST[r.key] || 0; });
  });
  const total = transit + entries + food;
  const nights = Math.max(1, state.days - 1);
  const h = hotel();

  $('#budgetCard').innerHTML =
    '<h3>Cost estimate <span class="sub">費用</span></h3>' +
    '<div class="money">' + yen(total) + ' <small>per person · ' + state.days + ' day' + (state.days>1?'s':'') +
      ' · ' + yen(Math.round(total/state.days)) + '/day</small></div>' +
    '<ul class="rows">' +
      '<li><span class="k">Transit <span class="jp">交通費</span></span><span class="v">' + yen(transit) + '</span></li>' +
      '<li><span class="k">Entry fees <span class="jp">入場料</span></span><span class="v">' + yen(entries) + '</span></li>' +
      '<li><span class="k">Food, four meals a day <span class="jp">食費</span></span><span class="v">' + yen(food) + '</span></li>' +
      '<li><span class="k">Walking in the plan</span><span class="v">' + km.toFixed(1) + ' km</span></li>' +
      '<li><span class="k">Stops booked</span><span class="v">' + stops + '</span></li>' +
      '<li class="soft"><span class="k">' + esc(h.name) + '</span><span class="v">' +
        (h.price ? yen(h.price) + ' × ' + nights + ' night' + (nights>1?'s':'') : 'rate not listed') + '</span></li>' +
    '</ul>' +
    '<div class="verdict">' + baseVerdict() + '</div>';
}

function baseVerdict(){
  const h = hotel();
  const firsts = state.plan.filter(d => d.kind === 'core').map(d => {
    const it = d.items.find(i => i.type === 'stop');
    return it ? POI[it.id] : null;
  }).filter(Boolean);
  if(!firsts.length) return 'Add a few sights and the base comparison will appear here.';
  const other = h.area === 'hakata' ? HOTELS.find(x => x.area === 'tenjin') : HOTELS.find(x => x.area === 'hakata');
  const sum = (hd) => firsts.reduce((s,p) => s + travel(hd, p, hd.hub).min, 0);
  const mine = sum(h), theirs = sum(other);
  if(theirs + 8 < mine)
    return '<b>Base check.</b> ' + esc(other.name) + ' would cut about ' + (mine - theirs) + ' min of travel each morning.';
  return '<b>Base check.</b> ' + esc(h.name) + ' is the better base for this plan; ' + esc(other.name) +
    ' would add about ' + Math.max(0, mine - theirs) + ' min per day.';
}

function dayCover(s, kind){
  const {subway:s1, bus:b, jr:j} = s.spend;
  if(kind === 'subway') return s1;
  if(kind === 'bus') return b;
  if(kind === 'city') return s1 + b + j;
  return 0;
}

function renderPass(){
  let transit = 0;
  const per = state.plan.map(d => schedule(d));
  per.forEach(s => transit += s.fares);
  const defs = [
    {name:'Subway 1-day pass', unit:640, kind:'subway', note:'¥640 per day, all three subway lines'},
    {name:'Nishitetsu bus 1-day pass', unit:1200, kind:'bus', note:'¥1,200 per day, city buses'},
    {name:'Tourist City Pass', unit:2500, kind:'city', note:'Subway, city buses, JR and Nishitetsu inside the city'}
  ];
  const products = defs.map(p => {
    const daySaving = per.map(s => Math.max(0, dayCover(s, p.kind) - p.unit));
    return {name:p.name, note:p.note, unit:p.unit, covered:per.reduce((a,s) => a + dayCover(s, p.kind), 0),
            saving:daySaving.reduce((a,b) => a+b, 0)};
  });
  const best = products.slice().sort((a,b) => b.saving - a.saving)[0];

  const rows = products.map(p =>
    '<tr><td>' + esc(p.name) + '<br><span class="tinynote">' + esc(p.note) + '</span></td>' +
    '<td class="num">' + yen(p.unit) + '</td>' +
    '<td class="num ' + (p.saving>0?'good':'bad') + '">' + (p.saving>0 ? '+'+yen(p.saving) : '—') + '</td></tr>').join('');

  const verdict = best.saving > 0
    ? '<div class="verdict"><b>Best value: the ' + esc(best.name) + '.</b> On the days it covers it comes out about ' +
      yen(best.saving) + ' ahead of paying per ride.</div>'
    : '<div class="verdict warn"><b>No pass pays off on this plan.</b> Every product costs more than the travel it covers — pay per ride with an IC card.</div>';

  $('#passCard').innerHTML =
    '<h3>Pass comparison <span class="sub">乗車券</span></h3>' +
    '<div class="money">' + yen(transit) + ' <small>transit, pay-as-you-go</small></div>' +
    '<table class="ptable"><thead><tr><th>Product</th><th class="num">Per day</th><th class="num">Best saving</th></tr></thead><tbody>' + rows + '</tbody></table>' +
    verdict +
    '<div class="verdict note">IC cards (Hayakaken, Suica, ICOCA) work on the subway, JR, Nishitetsu trains and every city bus.</div>';
}

function renderTips(){
  const regions = new Set(state.plan.filter(d => d.kind === 'trip').map(d => d.region));
  const items = [];
  items.push('<li><b>The airport has two terminals, two answers.</b> Domestic arrivals ride the subway to Hakata for ¥260 in five minutes. International arrivals take the free shuttle to the domestic side, or the bus from stop 6/7 for ¥400.</li>');
  items.push('<li><b>City buses are a flat ¥150</b> inside the central zone between Hakata, Tenjin, Yakuin and Canal City <span class="jp">(福岡都心150円均一)</span>.</li>');
  items.push('<li><b>One IC card covers everything</b> — subway, JR, Nishitetsu and buses. Top up at any station machine.</li>');
  if(regions.has('dazaifu')) items.push('<li><b>Dazaifu:</b> Nishitetsu from Tenjin is ¥480 since April 2026. The Tabito Liner from Hakata is ¥800 and the City Pass does not cover it.</li>');
  if(regions.has('kumamoto')) items.push('<li><b>Kumamoto:</b> the castle is a 15-minute tram ride from the station. The tram is a flat ¥170; a 1-day pass is ¥500.</li>');
  if(regions.has('nagasaki')) items.push('<li><b>Nagasaki:</b> trams are a flat ¥140. Ride line 1 or 3 to the Peace Park, and the ropeway runs from 09:00.</li>');
  if(regions.has('hiroshima')) items.push('<li><b>Hiroshima:</b> the Peace Park is a 20-minute tram ride (¥190) from the station. For Miyajima, the JR ferry is covered by the rail pass.</li>');
  if(regions.has('kagoshima')) items.push('<li><b>Kagoshima:</b> the Sakurajima ferry is ¥200 each way and runs 24 hours. The island bus stops early.</li>');
  if(regions.has('beppu') || regions.has('yufuin')) items.push('<li><b>Beppu and Yufuin:</b> reserve the Yufuin-no-Mori in advance, and remember the last Sonic back to Hakata leaves before 21:00.</li>');
  items.push('<li><b>Yatai are cash only</b>, and most stalls expect each guest to order a drink. Budget ¥3,000 per person.</li>');
  items.push('<li><b>Any stop can be dragged</b> to a new place in the day, or moved to another day with the day menu on the row.</li>');

  $('#tipsCard').innerHTML = '<h3>Local notes <span class="sub">現地の注意</span></h3><ul class="tips">' + items.join('') + '</ul>';
}

function renderSources(){
  const list = Object.values(SOURCES).map(s =>
    '<li>' + esc(s.label) + ' — <a href="' + s.url + '" target="_blank" rel="noopener">' + s.url.replace(/^https?:\/\//,'') + '</a> <span class="srcdate">(' + s.date + ')</span></li>').join('');
  $('#sourceCard').innerHTML =
    '<h4>Data sources and method</h4><ul>' + list + '</ul>' +
    '<p>Map tiles and place names: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>, rendered with Leaflet. ' +
    'Live place search: <a href="https://photon.komoot.io/" target="_blank" rel="noopener">Photon</a> over OpenStreetMap data — free, keyless, and it covers every hotel, restaurant, shop and mall in the city, not just our shortlist. ' +
    'More sights: <a href="https://www.mediawiki.org/wiki/API:Geosearch" target="_blank" rel="noopener">Wikipedia’s geosearch API</a>, also free and keyless, lists everything Wikipedia has an article for around the day you are planning — CC BY-SA. ' +
    'Our own list of 84 places is cross-checked against the Fukuoka City and Fukuoka Prefecture tourist guides, Japan Guide and Wikivoyage, so it holds what people actually recommend rather than whatever the data happens to contain. ' +
    'Photographs: Wikimedia Commons, freely licensed. Hotel prices are typical 2026 guide rates for a double, not live availability. ' +
    'Fares reflect the published tables as of November 2026, including the 1 April 2026 Nishitetsu revision. Journey times are modelled from distance and published timetables for planning, not ticketing.</p>';
}

/* ============================================================
   WHERE TO EAT
   ============================================================ */
const MEAL_LABEL = {breakfast:'Breakfast', lunch:'Lunch', tea:'Tea', dinner:'Dinner'};

function renderEat(){
  const host = $('#eatGrid');
  if(!host) return;
  const order = ['breakfast','lunch','tea','dinner'];
  host.innerHTML = '<div class="eatcol">' + order.map(k => {
    const list = EAT.filter(e => e.meal === k);
    return '<div class="eatgroup"><h3>' + MEAL_LABEL[k] + '<span>' +
      (k === 'breakfast' ? '朝食' : k === 'lunch' ? '昼食' : k === 'tea' ? '喫茶' : '夕食') + '</span></h3>' +
      list.map(e =>
        '<button class="eatcard" data-detail="eat:' + e.id + '">' +
          '<span class="eatpic"><img src="img/' + e.img + '.jpg" alt="' + esc(e.name) + '" loading="lazy">' +
            '<span class="eatbadge">' + MEAL_LABEL[k] + '</span></span>' +
          '<span class="eatbody"><span class="eatname">' + esc(e.name) + '<em>' + esc(e.jp) + '</em></span>' +
            '<span class="eatwhere">' + esc(e.where) + '</span>' +
            '<span class="eatreco">' + esc(e.rec) + '</span>' +
            '<span class="eatmeta">' + esc(e.price) + ' · ' + esc(e.open) + '</span></span>' +
        '</button>').join('') +
      '</div>';
  }).join('') + '</div>';
}

/* ============================================================
   DETAIL SHEET — liquid glass, one place at a time
   ============================================================ */
const AREA_NAME = {hakata:'Hakata', tenjin:'Tenjin', nakasu:'Nakasu', ohori:'Ohori Park', momochi:'Momochi',
  bay:'the bay', sasaguri:'Sasaguri', dazaifu:'Dazaifu', itoshima:'Itoshima', yanagawa:'Yanagawa',
  karatsu:'Karatsu', kitakyushu:'Kitakyushu', kumamoto:'Kumamoto', nagasaki:'Nagasaki', beppu:'Beppu',
  yufuin:'Yufuin', kagoshima:'Kagoshima', hiroshima:'Hiroshima', sasebo:'Sasebo'};

function galleryFor(p){
  const ref = (p.lat == null) ? (POIS.find(q => q.area === p.area) || {lat:33.5902, lon:130.4207}) : p;
  const near = POIS.filter(q => q.id !== p.id && q.area === p.area)
    .map(q => ({q, d:haversine(ref, q)}))
    .sort((a,b) => a.d - b.d)
    .slice(0, 4)
    .map(x => x.q);
  if(near.length >= 3) return near;
  const extra = POIS.filter(q => q.id !== p.id && !near.includes(q) && q.area !== p.area)
    .map(q => ({q, d:haversine(ref, q)})).sort((a,b) => a.d - b.d).slice(0, 3 - near.length).map(x => x.q);
  return near.concat(extra);
}

function renderDetail(type, id){
  const isEat = type === 'eat';
  const item = isEat ? (EAT_BY[id] || EAT_TRIP_BY[id]) : POI[id];
  if(!item) return;
  const d = isEat ? item : (DETAIL[id] || {});
  const img = isEat ? 'img/' + item.img + '.jpg' : photoOf(item);
  const area = AREA_NAME[item.area] || item.area;
  const cats = isEat ? ['food'] : item.cats;
  const gallery = (item.osm || item.wiki) ? [] : galleryFor(item);

  const chips = [
    '<span class="dchip">' + (isEat ? MEAL_LABEL[item.meal] : catLabel(cats[0])) + '</span>',
    '<span class="dchip">' + esc(area) + '</span>',
    isEat
      ? '<span class="dchip">' + esc(item.price) + '</span>'
      : '<span class="dchip">' + (item.fee ? yen(item.fee) + ' entry' : 'Free entry') + '</span>',
    isEat ? '<span class="dchip">' + esc(item.open) + '</span>'
          : '<span class="dchip">About ' + mins(item.dwell) + ' here</span>'
  ].join('');

  const todos = (d.t || []).map(t => '<li>' + esc(t) + '</li>').join('');
  const note = isEat
    ? '<div class="dnote"><b>Where.</b> ' + esc(item.where) + '</div>'
    : (item.tip ? '<div class="dnote"><b>Good to know.</b> ' + esc(item.tip) + '</div>' : '');
  const liveNote = item.osm
    ? '<div class="dnote"><b>Live listing.</b> Found through OpenStreetMap, so we have its name, type and position but not its opening hours. ' +
      '<a href="' + item.osmUrl + '" target="_blank" rel="noopener">OpenStreetMap</a> · ' +
      '<a href="' + mapsSearch(item.lat + ',' + item.lon) + '" target="_blank" rel="noopener">Google Maps</a></div>'
    : item.wiki
    ? '<div class="dnote"><b>From Wikipedia.</b> Name, position and summary come from Wikipedia; opening hours and prices are not included. ' +
      '<a href="' + item.wikiUrl + '" target="_blank" rel="noopener">Read the article</a> · ' +
      '<a href="' + mapsSearch(item.lat + ',' + item.lon) + '" target="_blank" rel="noopener">Google Maps</a></div>'
    : '';

  $('#detailBody').innerHTML =
    '<div class="dhero">' +
      '<img src="' + img + '" alt="' + esc(item.name) + '">' +
      '<div class="dherotxt"><p class="djp">' + esc(item.jp) + '</p>' +
        '<h2 id="detailTitle">' + esc(item.name) + '</h2></div>' +
    '</div>' +
    '<div class="dinner">' +
      '<div class="dchips">' + chips + '</div>' +
      '<p class="dlede">' + esc(isEat ? item.rec : item.blurb) + '</p>' +
      '<div class="dsection"><h4>What it is</h4><p>' + esc(d.w || item.blurb) + '</p></div>' +
      (d.s ? '<div class="dsection"><h4>What stands out</h4><p>' + esc(d.s) + '</p></div>' : '') +
      (todos ? '<div class="dsection"><h4>Popular things to do</h4><ol class="dtodo">' + todos + '</ol></div>' : '') +
      note + liveNote +
      (gallery.length ? '<div class="dsection"><h4>More around ' + esc(area) + '</h4>' +
        '<div class="dgallery">' + gallery.map(q =>
          '<button class="dgtile" data-detail="' + q.id + '">' +
            '<img src="' + photoOf(q) + '" alt="' + esc(q.name) + '" loading="lazy">' +
            '<span>' + esc(q.name) + '<em>' + esc(q.jp) + '</em></span></button>').join('') +
        '</div></div>' : '') +
      '<p class="dsource">' + (item.osm ? 'Position and type: OpenStreetMap contributors.'
        : item.wiki ? 'Text and photograph: Wikipedia contributors, CC BY-SA.'
        : 'Photographs: Wikimedia Commons.') + '</p>' +
    '</div>';

  const scroll = $('#detailBody');
  if(scroll) scroll.scrollTop = 0;
}

function openDetail(ref){
  const [type, id] = ref.indexOf('eat:') === 0 ? ['eat', ref.slice(4)] : ['poi', ref];
  const ok = type === 'eat' ? !!(EAT_BY[id] || EAT_TRIP_BY[id]) : !!POI[id];
  if(!ok) return;
  renderDetail(type, id);
  const m = $('#detailModal');
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
  const x = m.querySelector('.glass-x');
  if(x) x.focus({preventScroll:true});
}

function closeDetail(){
  const m = $('#detailModal');
  if(!m) return;
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
}

/* ============================================================
   TIME PICKER — rounded list, one pill per time
   ============================================================ */
let TPOP = null;
let DPOP = null;

const TIMES = (() => { const out = []; for(let m = 5*60; m <= 23*60+45; m += 15) out.push(m); return out; })();
const timePeriod = m => m < 7*60 ? 'Early' : m < 11*60 ? 'Morning' : m < 14*60 ? 'Midday'
  : m < 17*60 ? 'Afternoon' : m < 20*60 ? 'Evening' : 'Night';
const periodIcon = p => p === 'Early' ? 'sunrise' : p === 'Evening' ? 'sunset' : p === 'Night' ? 'moon' : 'sun';

function tIcon(kind){
  const paths = {
    sun:'<circle cx="12" cy="12" r="4.1"/><path d="M12 2.8v2.3M12 18.9v2.3M2.8 12h2.3M18.9 12h2.3M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"/>',
    sunrise:'<path d="M2.8 18.4h18.4M6.6 18.4a5.4 5.4 0 0 1 10.8 0"/><path d="M12 3.4v4.2M5.6 8.4l1.7 1.7M18.4 8.4l-1.7 1.7M2.8 21.2h18.4"/>',
    sunset:'<path d="M2.8 18.4h18.4M6.6 18.4a5.4 5.4 0 0 1 10.8 0"/><path d="M12 7.6V3.4M5.6 12.8l1.7-1.7M18.4 12.8l-1.7-1.7M2.8 21.2h18.4"/>',
    moon:'<path d="M20.2 14.6A8.6 8.6 0 0 1 9.4 3.8a8.6 8.6 0 1 0 10.8 10.8Z"/>'
  };
  return '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths[kind] + '</svg>';
}

function closeTimePicker(){
  if(TPOP && TPOP.el && TPOP.el.parentNode) TPOP.el.parentNode.removeChild(TPOP.el);
  TPOP = null;
}

function closeDayMenu(){
  if(DPOP && DPOP.parentNode) DPOP.parentNode.removeChild(DPOP);
  DPOP = null;
}

/* the Day 1 / Day 2 menu: the same liquid-glass popover as the time picker */
function openDayMenu(btn){
  closeDayMenu();
  const [d, i] = btn.dataset.daymenu.split(':').map(Number);
  const el = document.createElement('div');
  el.className = 'timepop daypop';
  el.setAttribute('role', 'listbox');
  el.setAttribute('aria-label', 'Move to another day');
  el.innerHTML = '<div class="tpop-head"><b>Move to another day</b><span>' + state.plan.length + ' days</span></div>' +
    '<div class="tpop-list">' +
    state.plan.map((day, k) => {
      const n = day.items.filter(x => x.type === 'stop').length;
      const kind = day.kind === 'trip' ? 'Day trip' : 'City day';
      return '<button class="topt dayopt' + (k === d ? ' on' : '') + '" data-daymove="' + d + ':' + i + ':' + k + '" role="option" aria-selected="' + (k === d) + '">' +
        '<span class="ticon">' + (k+1) + '</span>' +
        '<span class="dayopt-text"><span class="tlabel">Day ' + (k+1) + '</span>' +
        '<span class="tsub">' + kind + ' · ' + n + ' stops</span></span></button>';
    }).join('') + '</div>';
  document.body.appendChild(el);
  el.style.width = 'min(340px, calc(100vw - 36px))';
  el.style.maxHeight = Math.min(460, window.innerHeight - 90) + 'px';
  el.addEventListener('click', e => {
    const opt = e.target.closest('[data-daymove]');
    if(!opt) return;
    const [fromD, fromI, toD] = opt.dataset.daymove.split(':').map(Number);
    closeDayMenu();
    if(toD !== fromD) moveItem(fromD, fromI, toD, state.plan[toD].items.length);
  });
  DPOP = el;
}

function applyTime(ref, val){
  if(ref.indexOf('start:') === 0){
    const di = Number(ref.split(':')[1]);
    if(val !== 'auto' && state.plan[di]){ state.plan[di].start = Number(val); touch(); }
    return;
  }
  const [di, ii] = ref.split(':').map(Number);
  const it = state.plan[di] && state.plan[di].items[ii];
  if(!it) return;
  if(val === 'auto') it.at = null;
  else { it.at = Number(val); if(it.type === 'meal') it.off = false; }
  touch();
}

function openTimePicker(btn){
  closeTimePicker();
  const ref = btn.dataset.topen;
  const isStart = ref.indexOf('start:') === 0;
  const parts = ref.replace('start:', '').split(':').map(Number);
  const cur = isStart ? state.plan[parts[0]].start
    : (state.plan[parts[0]].items[parts[1]] || {}).at;
  const shown = btn.querySelector('span');
  const curShown = cur != null ? cur
    : (shown && /^\d\d:\d\d$/.test(shown.textContent) ? toMin(shown.textContent) : null);

  const nearest = (curShown == null) ? null
    : TIMES.reduce((a,b) => Math.abs(b-curShown) < Math.abs(a-curShown) ? b : a, TIMES[0]);

  const el = document.createElement('div');
  el.className = 'timepop';
  el.setAttribute('role', 'listbox');
  el.setAttribute('aria-label', isStart ? 'Leave the hotel at' : 'Start time');
  el.innerHTML = '<div class="tpop-head"><b>' + (isStart ? 'Leave the hotel' : 'Start time') + '</b><span>15-minute steps</span></div>' +
    '<div class="tpop-list">' +
    (isStart ? '' : '<button class="topt auto" data-tval="auto" role="option">' +
      '<span class="ticon">' + tIcon('sun') + '</span><span class="tlabel">Auto</span>' +
      '<span class="tsub">flow on</span></button>') +
    TIMES.map(m => {
      const p = timePeriod(m), sel = nearest === m;
      return '<button class="topt' + (sel ? ' on' : '') + '" data-tval="' + m + '" role="option" aria-selected="' + sel + '">' +
        '<span class="ticon">' + tIcon(periodIcon(p)) + '</span>' +
        '<span class="tlabel">' + fmt(m) + '</span>' +
        '<span class="tsub">' + p + '</span></button>';
    }).join('') + '</div>';
  document.body.appendChild(el);

  /* popups open in the middle of the screen, not in a corner */
  el.style.width = 'min(320px, calc(100vw - 36px))';
  el.style.maxHeight = Math.min(440, window.innerHeight - 90) + 'px';

  el.addEventListener('click', e => {
    const opt = e.target.closest('[data-tval]');
    if(!opt) return;
    applyTime(ref, opt.dataset.tval);
    closeTimePicker();
  });

  TPOP = {el, btn};
  const chosen = el.querySelector('.topt.on') || el.querySelector('.topt');
  if(chosen){
    const list = el.querySelector('.tpop-list');
    list.scrollTop = Math.max(0, chosen.offsetTop - list.clientHeight/2 + chosen.offsetHeight/2);
  }
}

/* ============================================================
   ADD-A-STOP SHEET
   ============================================================ */
const PANEL_CATS = [['all','Everything'],['temple','Temples'],['food','Food'],['nature','Nature'],
  ['view','Views'],['art','Museums'],['market','Markets'],['shopping','Shopping'],['stay','Hotels']];

function recScore(leg, p){
  let s = 0;
  s += leg.fare === 0 ? 4 : leg.fare <= 210 ? 3 : leg.fare <= 340 ? 1.5 : 0;
  s += leg.min <= 10 ? 3 : leg.min <= 18 ? 2 : leg.min <= 30 ? 1 : 0;
  s += p.must ? 3 : 0;
  s += p.cats.some(c => state.interests.has(c)) ? 2 : 0;
  s += p.fee ? 0 : 1;
  s += leg.dist && leg.dist < 1 ? 1.5 : 0;
  return s;
}

function renderPanel(){
  const day = state.plan[state.panelDay];
  if(!day) return;
  const inDay = new Set(day.items.filter(i => i.type === 'stop').map(i => i.id));
  const lastStopItem = [...day.items].reverse().find(i => i.type === 'stop');
  const prev = lastStopItem ? POI[lastStopItem.id] : null;
  const from = prev || {lat:hotel().lat, lon:hotel().lon, area:hotel().area, name:hotel().name};

  $('#sheetTabs').innerHTML = state.plan.map((d, i) =>
    '<button class="sheet-tab" data-pday="' + i + '" aria-pressed="' + (i === state.panelDay) + '">Day ' + (i+1) +
    (d.kind === 'trip' ? ' · ' + esc(TRIP_LABELS[d.region]) : '') + '</button>').join('');
  $('#sheetCats').innerHTML = PANEL_CATS.map(([k,l]) =>
    '<button class="sheet-tab" data-pcat="' + k + '" aria-pressed="' + (state.panelCat === k) + '">' + l + '</button>').join('');

  $('#sheetSub').textContent = 'Day ' + (state.panelDay+1) + ' · after ' + (prev ? prev.name : hotel().name) +
    ' · ' + inDay.size + ' stops already';

  const q = state.panelQuery.trim().toLowerCase();
  const pool = day.kind === 'trip'
    ? POIS.filter(p => p.area === day.region)
    : POIS.filter(p => !isTrip(p));

  const rows = pool
    .filter(p => !inDay.has(p.id))
    .filter(p => state.panelCat === 'all' || p.cats.includes(state.panelCat))
    .filter(p => !q || (p.name + ' ' + p.jp + ' ' + p.blurb).toLowerCase().includes(q))
    .map(p => { const leg = travel(from, p, hotel().hub); return {p, leg, score:recScore(leg, p)}; })
    .sort((a,b) => b.score - a.score);

  const recCount = rows.length >= 8 ? 5 : rows.length >= 4 ? 3 : 1;
  $('#sheetList').innerHTML = (rows.length ? rows.map((o, idx) => {
    const p = o.p, leg = o.leg;
    const dist = leg.dist ? leg.dist.toFixed(1) + ' km · ' : '';
    return '<div class="opt">' +
      '<img src="' + photoOf(p) + '" alt="' + esc(p.name) + '" loading="lazy" data-detail="' + p.id + '" role="button" tabindex="0">' +
      '<div><h4>' + esc(p.name) + '<span class="jp">' + esc(p.jp) + '</span>' +
        (idx < recCount ? '<span class="rec">Recommended</span>' : '') + '</h4>' +
        '<div class="bl">' + esc(p.blurb) + '</div>' +
        '<div class="legline">From ' + esc(from.name) + ': <b>' + esc(leg.mode) + '</b> · ' + mins(leg.min) + ' · ' +
          (leg.fare ? yen(leg.fare) : 'free') + ' · ' + dist +
          (p.fee ? yen(p.fee) + ' entry' : 'free entry') + ' · ' + mins(p.dwell) + ' there</div>' +
      '</div>' +
      '<button class="addto" data-add="' + p.id + '">+ Add</button></div>';
  }).join('') : '<div class="sheet-empty">Nothing in our guide matches that — the live search below covers the rest of the city.</div>') +
    livePlaceHtml(from) + wikiHtml(day);
}

function openPanel(dayIdx){
  state.panelDay = Math.max(0, Math.min(dayIdx, state.plan.length-1));
  const m = $('#addModal');
  m.classList.add('open'); m.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  renderPanel();
}
function closePanel(){
  const m = $('#addModal');
  m.classList.remove('open'); m.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

/* ============================================================
   MUTATIONS
   ============================================================ */
function touch(){
  render();
}

function moveItem(fromDay, fromIdx, toDay, toIdx){
  const src = state.plan[fromDay], dst = state.plan[toDay];
  if(!src || !dst) return;
  if(fromDay === toDay && fromIdx === toIdx) return;
  const it = src.items.splice(fromIdx, 1)[0];
  if(!it) return;
  let idx = toIdx;
  if(fromDay === toDay && fromIdx < toIdx) idx--;
  idx = Math.max(0, Math.min(idx, dst.items.length));
  dst.items.splice(idx, 0, it);
  touch();
}

function nudge(dayIdx, idx, dir){
  const items = state.plan[dayIdx].items;
  const j = idx + dir;
  if(j < 0 || j >= items.length) return;
  const tmp = items[idx]; items[idx] = items[j]; items[j] = tmp;
  touch();
}

function stepDuration(dayIdx, idx, step){
  const it = state.plan[dayIdx].items[idx];
  if(!it) return;
  if(it.type === 'meal') it.off = false;
  const base = it.dur != null ? it.dur : (it.type === 'meal' ? MEAL[it.key].dur : (POI[it.id]?.dwell || 60));
  it.dur = Math.max(10, base + step);
  touch();
}

function removeItem(dayIdx, idx){
  state.plan[dayIdx].items.splice(idx, 1);
  touch();
}

function addStop(id){
  const day = state.plan[state.panelDay];
  if(!day) return;
  const dinnerIdx = day.items.findIndex(i => i.type === 'meal' && i.key === 'dinner');
  const at = dinnerIdx >= 0 ? dinnerIdx : day.items.length;
  day.items.splice(at, 0, {type:'stop', id});
  closePanel();
  touch();
}

/* ============================================================
   RENDER
   ============================================================ */
function render(){
  closeTimePicker();
  renderControls();
  renderDays();
  renderEat();
  drawMap();
  renderMapChips();
  renderLegend();
  renderBudget();
  renderPass();
  renderTips();
  renderSources();
}

/* ============================================================
   EVENTS
   ============================================================ */
function clampTrips(){
  const max = Math.max(0, state.days - 1);
  if(state.trips.size > max){
    state.trips = new Set([...state.trips].slice(0, max));
  }
}

function setDays(n){
  state.days = Math.max(1, Math.min(10, Math.round(n) || 1));
  clampTrips();
  generate();
  MAPSCOPE = 'auto';
  render();
}

$('#daysMinus').addEventListener('click', () => setDays(state.days - 1));
$('#daysPlus').addEventListener('click', () => setDays(state.days + 1));
$('#daysInput').addEventListener('change', e => setDays(Number(e.target.value)));

$('#hotelSearch').addEventListener('input', e => {
  state.hotelQuery = e.target.value;
  renderControls();
  liveAsk('hotel', e.target.value);
});
$('#hotelAreas').addEventListener('click', e => {
  const b = e.target.closest('[data-harea]'); if(!b) return;
  state.hotelArea = b.dataset.harea; renderControls();
});
$('#hotelList').addEventListener('click', e => {
  const osm = e.target.closest('[data-osmhotel]');
  if(osm){
    const it = live.hotel.items[Number(osm.dataset.osmhotel)];
    if(it) useOSMHotel(it);
    return;
  }
  const b = e.target.closest('[data-hotel]'); if(!b) return;
  state.hotelId = b.dataset.hotel;
  generate();
  MAPSCOPE = 'auto';
  render();
});

$('#interestChips').addEventListener('click', e => {
  const b = e.target.closest('[data-interest]'); if(!b) return;
  const k = b.dataset.interest;
  state.interests.has(k) ? state.interests.delete(k) : state.interests.add(k);
  generate(); render();
});

$('#tripChips').addEventListener('click', e => {
  const b = e.target.closest('[data-trip]'); if(!b) return;
  const k = b.dataset.trip;
  if(state.trips.has(k)) state.trips.delete(k);
  else {
    const max = Math.max(0, state.days - 1);
    if(state.trips.size >= max){
      if(max === 0){ alert('Add another day first — a day trip uses a whole day.'); return; }
      state.trips.delete([...state.trips][0]);
    }
    state.trips.add(k);
  }
  generate(); render();
});

$('#rebuildBtn').addEventListener('click', () => {
  generate(); MAPSCOPE = 'auto'; render();
  const el = $('#daysHost');
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
});

$('#resetBtn').addEventListener('click', () => {
  state.days = 3; state.hotelId = 'nikko';
  state.interests = new Set(['temple','food']);
  state.trips = new Set();
  state.hotelQuery = ''; state.hotelArea = 'all';
  live.hotel.status = 'idle'; live.hotel.items = []; live.hotel.q = '';
  const hs = $('#hotelSearch'); if(hs) hs.value = '';
  generate(); MAPSCOPE = 'auto'; render();
});

$('#printBtn').addEventListener('click', () => window.print());

/* text size */
const SCALES = [15.5, 17.5, 19.5];
function applyScale(){
  document.documentElement.style.fontSize = SCALES[state.scale] + 'px';
  $$('#textSize button').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.scale) === state.scale)));
  try { localStorage.setItem('fp-scale', state.scale); } catch(_) {}
}
$('#textSize').addEventListener('click', e => {
  const b = e.target.closest('[data-scale]'); if(!b) return;
  state.scale = Number(b.dataset.scale);
  applyScale();
});

/* day interactions */
$('#daysHost').addEventListener('click', e => {
  const open = e.target.closest('[data-open-add]');
  if(open){ openPanel(Number(open.dataset.openAdd)); return; }

  const reset = e.target.closest('[data-resetday]');
  if(reset){
    const i = Number(reset.dataset.resetday);
    const day = state.plan[i];
    state.plan[i] = makeDay(i, day.spec);
    touch();
    return;
  }

  const step = e.target.closest('[data-durstep]');
  if(step){ stepDuration(Number(step.dataset.day), Number(step.dataset.idx), Number(step.dataset.durstep)); return; }

  const mv = e.target.closest('[data-move]');
  if(mv){ nudge(Number(mv.dataset.day), Number(mv.dataset.idx), Number(mv.dataset.move)); return; }

  const unpin = e.target.closest('[data-unpin]');
  if(unpin){
    const [d,i] = unpin.dataset.unpin.split(':').map(Number);
    const it = state.plan[d].items[i]; if(it){ it.at = null; touch(); }
    return;
  }

  const rm = e.target.closest('[data-remove]');
  if(rm){
    const [d,i] = rm.dataset.remove.split(':').map(Number);
    removeItem(d, i);
    return;
  }
});

$('#daysHost').addEventListener('change', e => {
  const t = e.target;

  if(t.dataset.mealtoggle){
    const [d,i] = t.dataset.mealtoggle.split(':').map(Number);
    const it = state.plan[d].items[i];
    if(it){ it.off = !t.checked; touch(); }
    return;
  }

  if(t.dataset.moveto){
    const [d,i] = t.dataset.moveto.split(':').map(Number);
    const to = Number(t.value);
    if(to !== d) moveItem(d, i, to, state.plan[to].items.length);
    return;
  }
});

/* drag and drop */
let DRAG = null;
const clearDropMarks = () => $$('#daysHost .drop-before, #daysHost .drop-after, #daysHost .dragging')
  .forEach(el => el.classList.remove('drop-before','drop-after','dragging'));

$('#daysHost').addEventListener('dragstart', e => {
  const row = e.target.closest('.row');
  if(!row) return;
  DRAG = {day:Number(row.dataset.day), idx:Number(row.dataset.idx)};
  row.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  try { e.dataTransfer.setData('text/plain', 'row'); } catch(_) {}
});
$('#daysHost').addEventListener('dragend', () => { DRAG = null; clearDropMarks(); });
$('#daysHost').addEventListener('dragover', e => {
  const row = e.target.closest('.row, .dropend');
  if(!row || !DRAG) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  $$('#daysHost .drop-before, #daysHost .drop-after').forEach(el => el.classList.remove('drop-before','drop-after'));
  if(row.classList.contains('dropend')){ row.classList.add('drop-after'); return; }
  const r = row.getBoundingClientRect();
  row.classList.add(e.clientY > r.top + r.height/2 ? 'drop-after' : 'drop-before');
});
$('#daysHost').addEventListener('drop', e => {
  const row = e.target.closest('.row, .dropend');
  if(!row || !DRAG) return;
  e.preventDefault();
  let toIdx = Number(row.dataset.idx);
  if(row.classList.contains('drop-after')) toIdx += 1;
  const from = DRAG;
  DRAG = null;
  clearDropMarks();
  moveItem(from.day, from.idx, Number(row.dataset.day), toIdx);
});

$('#mapScope').addEventListener('click', e => {
  const b = e.target.closest('[data-scope]'); if(!b) return;
  MAPSCOPE = b.dataset.scope;
  drawMap(); renderMapChips(); renderLegend();
});

/* time picker */
document.addEventListener('click', e => {
  const trigger = e.target.closest('[data-topen]');
  if(trigger){ openTimePicker(trigger); return; }
  const dayTrigger = e.target.closest('[data-daymenu]');
  if(dayTrigger){ openDayMenu(dayTrigger); return; }
  if(TPOP && !e.target.closest('.timepop')) closeTimePicker();
  if(DPOP && !e.target.closest('.daypop')) closeDayMenu();
});
window.addEventListener('scroll', () => {
  if(TPOP) closeTimePicker();
  if(DPOP) closeDayMenu();
}, {passive:true});

/* place details */
document.addEventListener('click', e => {
  if(e.target.closest('[data-dclose]')){ closeDetail(); return; }
  const hit = e.target.closest('[data-detail]');
  if(hit){ openDetail(hit.dataset.detail); }
});
document.addEventListener('keydown', e => {
  if((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-detail][tabindex]')){
    e.preventDefault();
    openDetail(e.target.dataset.detail);
  }
});

/* add-stop sheet */
$('#addModal').addEventListener('click', e => {
  if(e.target.closest('[data-close]')){ closePanel(); return; }
  const tab = e.target.closest('[data-pday]');
  if(tab){ state.panelDay = Number(tab.dataset.pday); renderPanel(); return; }
  const cat = e.target.closest('[data-pcat]');
  if(cat){ state.panelCat = cat.dataset.pcat; renderPanel(); return; }
  const addOSM = e.target.closest('[data-addosm]');
  if(addOSM){
    const it = live.place.items[Number(addOSM.dataset.addosm)];
    if(it){ addStop(osmToPOI(it)); return; }
  }
  const addWiki = e.target.closest('[data-addwiki]');
  if(addWiki){
    const it = WIKI.items[Number(addWiki.dataset.addwiki)];
    if(it){ addStop(wikiToPOI(it)); return; }
  }
  const add = e.target.closest('[data-add]');
  if(add){ addStop(add.dataset.add); return; }
});
$('#sheetSearch').addEventListener('input', e => {
  state.panelQuery = e.target.value;
  renderPanel();
  liveAsk('place', e.target.value);
});
document.addEventListener('keydown', e => {
  if(e.key !== 'Escape') return;
  if(TPOP){ closeTimePicker(); return; }
  if($('#detailModal').classList.contains('open')){ closeDetail(); return; }
  closePanel();
});

/* ============================================================
   BOOT
   ============================================================ */
try {
  const saved = localStorage.getItem('fp-scale');
  if(saved != null) state.scale = Math.min(2, Math.max(0, Number(saved)));
} catch(_) {}
applyScale();
generate();
render();

/* the neon skyline band runs from the top of the page to the foot of the hero */
function sizeNight(){
  const night = document.querySelector('.night');
  const hero = document.querySelector('.hero');
  if(!night || !hero) return;
  night.style.height = Math.round(hero.getBoundingClientRect().bottom + window.scrollY) + 'px';
}
window.addEventListener('resize', sizeNight);
if(document.fonts && document.fonts.ready) document.fonts.ready.then(sizeNight);
sizeNight();
