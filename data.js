/* ============================================================
   DATA — places, hotels, day trips, fare tables (2026)
   ============================================================ */

const SOURCES = {
  subway:     {label:'Fukuoka City Subway fare table', url:'https://subway.city.fukuoka.lg.jp/eng/fare/', date:'2026'},
  subwaypass: {label:'Subway 1-day pass ¥640', url:'https://subway.city.fukuoka.lg.jp/eng/fare/one', date:'2026'},
  bus150:     {label:'Nishitetsu ¥150 flat-fare zone', url:'https://www.nishitetsu.jp/bus/rosen/150', date:'2026'},
  buspass:    {label:'Nishitetsu bus 1-day pass ¥1,200', url:'https://www.nishitetsu.co.jp/en/group/business/mobility/bus.html', date:'2026'},
  nishitetsu: {label:'Nishitetsu fare revision, 1 April 2026', url:'https://www.nishitetsu.jp/train/2026_unchin-kaitei-ninka/', date:'2026-04-01'},
  citypass:   {label:'Fukuoka Tourist City Pass', url:'https://gofukuoka.jp/citypass.html', date:'2026'},
  jr:         {label:'JR Kyushu ordinary fare table', url:'https://jr-group.jp/kyushu-fare/', date:'2025-04'},
  shinkansen: {label:'JR Kyushu Shinkansen fare and timetable', url:'https://www.jrkyushu.co.jp/english/', date:'2026'},
  airport:    {label:'Airport access fares', url:'https://www.i-fukuoka.jp/en/public/traffic/fukuoka-airport-hakata-tenjin-access.html', date:'2026-10-29'}
};

/* ---------- hotels: a base is a specific building, not a district ---- */
const HOTELS = [
  {id:'nikko',        name:'Hotel Nikko Fukuoka',              jp:'ホテル日航福岡', area:'hakata',  hub:'hakata', lat:33.5897, lon:130.4218, price:28000, walk:'Directly opposite Hakata Station (3 min)'},
  {id:'blossom',      name:'JR Kyushu Hotel Blossom Hakata',   jp:'JR九州ホテル ブラッサム博多中央', area:'hakata', hub:'hakata', lat:33.5903, lon:130.4192, price:19000, walk:'4 min from Hakata Station, Chikushi exit'},
  {id:'green',        name:'Hakata Green Hotel No.1',          jp:'博多グリーンホテル1号館', area:'hakata', hub:'hakata', lat:33.5896, lon:130.4194, price:13000, walk:'3 min from Hakata Station'},
  {id:'nest',         name:'Nest Hotel Hakata Station',        jp:'ネストホテル博多駅前', area:'hakata', hub:'hakata', lat:33.5877, lon:130.4162, price:14000, walk:'7 min from Hakata Station'},
  {id:'withstyle',    name:'With The Style Fukuoka',           jp:'ウィズ ザ スタイル 福岡', area:'hakata', hub:'hakata', lat:33.5887, lon:130.4231, price:33000, walk:'5 min from Hakata Station, Hakata exit'},
  {id:'dormy',        name:'Dormy Inn Hakata Gion',            jp:'ドーミーイン博多祇園', area:'hakata', hub:'hakata', lat:33.5936, lon:130.4092, price:19000, walk:'2 min from Gion subway, 8 min to Kushida'},
  {id:'hyatt',        name:'Grand Hyatt Fukuoka',              jp:'グランドハイアット福岡', area:'hakata', hub:'hakata', lat:33.5897, lon:130.4113, price:36000, walk:'Inside Canal City, 12 min from Hakata Station'},
  {id:'resol',        name:'Hotel Resol Trinity Hakata',       jp:'ホテルリソルトリニティ博多', area:'nakasu', hub:'tenjin', lat:33.5906, lon:130.4033, price:17000, walk:'3 min to Nakasu-Kawabata subway'},
  {id:'oriental',     name:'Hotel Oriental Express Fukuoka Nakasu', jp:'ホテルオリエンタルエクスプレス福岡中洲', area:'nakasu', hub:'tenjin', lat:33.5911, lon:130.4042, price:15000, walk:'4 min to Nakasu-Kawabata, 6 min to yatai'},
  {id:'solaria',      name:'Solaria Nishitetsu Hotel Fukuoka',  jp:'ソラリア西鉄ホテル福岡', area:'tenjin', hub:'tenjin', lat:33.5892, lon:130.3994, price:24000, walk:'Directly above Tenjin Station'},
  {id:'grand',        name:'Nishitetsu Grand Hotel',           jp:'西鉄グランドホテル', area:'tenjin', hub:'tenjin', lat:33.5884, lon:130.3981, price:20000, walk:'5 min from Tenjin Station'},
  {id:'cross',        name:'Cross Life Hakata Tenjin',          jp:'クロスライフ博多天神', area:'tenjin', hub:'tenjin', lat:33.5900, lon:130.4011, price:16000, walk:'6 min from Tenjin-Minami subway'},
  {id:'toei',         name:'Fukuoka Toei Hotel',               jp:'福岡東映ホテル', area:'tenjin', hub:'tenjin', lat:33.5896, lon:130.3951, price:12000, walk:'8 min from Tenjin, quiet side street'},
  {id:'firstcabin',   name:'First Cabin Hakata',               jp:'ファーストキャビン博多', area:'tenjin', hub:'tenjin', lat:33.5903, lon:130.4045, price:5500, walk:'Capsule; 2 min to Nakasu-Kawabata'},
  {id:'hilton',       name:'Hilton Fukuoka Sea Hawk',          jp:'ヒルトン福岡シーホーク', area:'momochi', hub:'tenjin', lat:33.5920, lon:130.3581, price:22000, walk:'Seaside; 12 min walk to Fukuoka Tower'},
  {id:'newotani',     name:'Hotel New Otani Hakata',           jp:'ホテルニューオータニ博多', area:'tenjin', hub:'tenjin', lat:33.5869, lon:130.4031, price:21000, walk:'9 min from Tenjin, 12 min to Hakata'}
];

/* ---------- places ------------------------------------------------ */
const POIS = [
 /* ---- Fukuoka city ---- */
 {id:'kushida', name:'Kushida Shrine', jp:'櫛田神社', area:'hakata', cats:['temple'], lat:33.5933, lon:130.4106,
  dwell:40, fee:0, must:true,
  blurb:'Hakata’s guardian shrine, founded in 757 and the home of the Yamakasa festival.',
  tip:'Free entry. The Gion Yamakasa float hall behind the main hall is the part most visitors walk past.',
  near:[{n:'Hakata Machiya Folk Museum',jp:'博多町家ふるさと館',w:'3 min walk',note:'Edo-period townhouse, craft demos, ¥200.'},
        {n:'Kawabata arcade',jp:'川端商店街',w:'4 min walk',note:'Covered shopping street, mentaiko and sweets.'},
        {n:'Tochoji Temple',jp:'東長寺',w:'7 min walk',note:'Five-storey pagoda and the great wooden Buddha.'}]},

 {id:'tochoji', name:'Tochoji Temple', jp:'東長寺', area:'hakata', cats:['temple'], lat:33.5954, lon:130.4125,
  dwell:30, fee:50,
  blurb:'Fukuoka’s oldest temple, with a 10.8 m seated wooden Buddha — the largest in Japan.',
  tip:'The Buddha hall costs ¥50, cash only, and closes at 16:30.',
  near:[{n:'Shofukuji',jp:'聖福寺',w:'4 min walk',note:'Japan’s first Zen temple, founded 1195.'},
        {n:'Jotenji Temple',jp:'承天寺',w:'6 min walk',note:'Quiet Zen garden; origin of udon and soba.'},
        {n:'Canal City Hakata',jp:'キャナルシティ博多',w:'10 min walk',note:'Rainy-day mall with a fountain show.'}]},

 {id:'shofukuji', name:'Shofukuji', jp:'聖福寺', area:'hakata', cats:['temple'], lat:33.5966, lon:130.4139,
  dwell:25, fee:0,
  blurb:'Japan’s first Zen temple, founded in 1195 — a five-minute walk from Tochoji.',
  near:[{n:'Tochoji Temple',jp:'東長寺',w:'4 min walk',note:'Pagoda and the giant Buddha hall.'},
        {n:'Hakata Station',jp:'博多駅',w:'12 min walk',note:'Rail hub, department stores, ekiben.'}]},

 {id:'canal', name:'Canal City Hakata', jp:'キャナルシティ博多', area:'hakata', cats:['shopping'], lat:33.5896, lon:130.4116,
  dwell:75, fee:0, must:true,
  blurb:'A mall built around a canal, with a musical fountain show every 30 minutes.',
  tip:'The most reliable rainy-day option in the city. Ramen Stadium on the 5th floor covers eight regional styles.',
  near:[{n:'Hakataza Theatre',jp:'博多座',w:'6 min walk',note:'Kabuki and musical theatre; box office open daily.'},
        {n:'Sumiyoshi Shrine',jp:'住吉神社',w:'12 min walk',note:'One of Japan’s oldest Sumiyoshi shrines.'},
        {n:'Kushida Shrine',jp:'櫛田神社',w:'9 min walk',note:'The Yamakasa float hall is free.'}]},

 {id:'kawabata', name:'Kawabata Shopping Arcade', jp:'川端商店街', area:'hakata', cats:['shopping','food'], lat:33.5926, lon:130.4076,
  dwell:45, fee:0,
  blurb:'Hakata’s oldest covered arcade — mentaiko, sweets, souvenirs and inexpensive lunch counters.',
  tip:'Fukuoka’s arcades are a local habit: dry, open and busy when it rains.',
  near:[{n:'Kushida Shrine',jp:'櫛田神社',w:'3 min walk',note:'Enter from the shrine side of the arcade.'},
        {n:'Reisen Park',jp:'冷泉公園',w:'5 min walk',note:'Riverside benches; summer beer garden.'},
        {n:'Canal City Hakata',jp:'キャナルシティ博多',w:'8 min walk',note:'Fountain shows on the half hour.'}]},

 {id:'yanagibashi', name:'Yanagibashi Market', jp:'柳橋連合市場', area:'hakata', cats:['market','food'], lat:33.5883, lon:130.4065,
  dwell:40, fee:0,
  blurb:'The city’s kitchen: around fifty stalls of fish, pickles, tamagoyaki and grilled skewers.',
  tip:'Arrive before 11:00 — several stalls pack up in the early afternoon.',
  near:[{n:'Sumiyoshi Shrine',jp:'住吉神社',w:'6 min walk',note:'Mossy and usually empty of tourists.'},
        {n:'Rakusui-en Garden',jp:'楽水園',w:'7 min walk',note:'Small Japanese garden with matcha, ¥100.'},
        {n:'Hakata Station',jp:'博多駅',w:'12 min walk',note:'Useful for luggage lockers.'}]},

 {id:'sumiyoshi', name:'Sumiyoshi Shrine', jp:'住吉神社', area:'hakata', cats:['temple'], lat:33.5850, lon:130.4035,
  dwell:25, fee:0,
  blurb:'A quiet, mossy shrine by the river, and one of Japan’s oldest Sumiyoshi shrines.',
  near:[{n:'Yanagibashi Market',jp:'柳橋連合市場',w:'6 min walk',note:'Breakfast or a late-morning snack.'},
        {n:'Rakusui-en Garden',jp:'楽水園',w:'5 min walk',note:'Tea house in a walled garden, ¥100.'},
        {n:'Canal City Hakata',jp:'キャナルシティ博多',w:'12 min walk',note:'Shopping and dinner options.'}]},

 {id:'nakasu', name:'Nakasu Yatai Stalls', jp:'中洲屋台', area:'nakasu', cats:['food'], lat:33.5915, lon:130.4055,
  dwell:70, fee:0, must:true,
  blurb:'Fukuoka’s riverside food stalls: ramen, yakitori and oden, one counter at a time.',
  tip:'Cash only, around ¥3,000 per person. Most small stalls ask each guest to order a drink.',
  near:[{n:'Nakasu Kawabata shopping street',jp:'中洲川端商店街',w:'3 min walk',note:'Covered arcade parallel to the river.'},
        {n:'Hakataza Theatre',jp:'博多座',w:'4 min walk',note:'Check the evening programme.'},
        {n:'Tenjin',jp:'天神',w:'10 min walk',note:'Cross the river for department stores and bars.'}]},

 {id:'tenjin', name:'Tenjin & Daimyo', jp:'天神・大名', area:'tenjin', cats:['shopping','food'], lat:33.5914, lon:130.3986,
  dwell:90, fee:0, must:true,
  blurb:'The downtown core: department stores, the underground Tenjin Chikagai mall, and Daimyo’s independent shops and cafés.',
  tip:'Tenjin Chikagai is the easiest way to cross the centre in the rain, and it connects straight to the subway.',
  near:[{n:'Daimyo',jp:'大名',w:'6 min walk',note:'Independent clothing, coffee and izakaya streets.'},
        {n:'ACROS Fukuoka',jp:'アクロス福岡',w:'7 min walk',note:'Free stepped roof garden, open to 18:00.'},
        {n:'Tenjin Chikagai',jp:'天神地下街',w:'2 min walk',note:'Underground mall linking the subway lines.'}]},

 {id:'acros', name:'ACROS Fukuoka', jp:'アクロス福岡', area:'tenjin', cats:['nature','view'], lat:33.5899, lon:130.3960,
  dwell:30, fee:0,
  blurb:'A civic hall with a fifteen-storey stepped roof garden — free, and a good 20-minute wander.',
  near:[{n:'Tenjin Chikagai',jp:'天神地下街',w:'3 min walk',note:'Directly connected underground.'},
        {n:'Tenjin Central Park',jp:'天神中央公園',w:'2 min walk',note:'Riverside lawn and food trucks.'},
        {n:'Nakasu yatai',jp:'中洲屋台',w:'12 min walk',note:'Five minutes by taxi after dark.'}]},

 {id:'ohori', name:'Ohori Park', jp:'大濠公園', area:'ohori', cats:['nature'], lat:33.5858, lon:130.3763,
  dwell:60, fee:0, must:true,
  blurb:'A lake loop built from an old castle moat — the city’s favourite walk.',
  tip:'The 2 km loop takes about 25 minutes at a stroll. Boats and a tea house sit on the island.',
  near:[{n:'Fukuoka Art Museum',jp:'福岡市美術館',w:'4 min walk',note:'Dali and Kyushu modernists, ¥200.'},
        {n:'Ohori Japanese Garden',jp:'大濠公園日本庭園',w:'8 min walk',note:'¥250, closed Mondays.'},
        {n:'Fukuoka Castle ruins',jp:'福岡城跡',w:'9 min walk',note:'Stone walls of the Maizuru Park keep.'}]},

 {id:'castle', name:'Fukuoka Castle Ruins', jp:'福岡城跡', area:'ohori', cats:['nature'], lat:33.5846, lon:130.3830,
  dwell:50, fee:0,
  blurb:'Maizuru Park’s stone walls and turrets, with the city’s best cherry trees in late March.',
  near:[{n:'Ohori Park',jp:'大濠公園',w:'8 min walk',note:'Lake loop and coffee kiosks.'},
        {n:'Korokan Site',jp:'鴻臚館跡',w:'5 min walk',note:'Excavated 7th-century guest hall, free.'},
        {n:'Fukuoka Art Museum',jp:'福岡市美術館',w:'9 min walk',note:'Air-conditioned break from the walls.'}]},

 {id:'art', name:'Fukuoka Art Museum', jp:'福岡市美術館', area:'ohori', cats:['art'], lat:33.5864, lon:130.3810,
  dwell:60, fee:200,
  blurb:'A compact, friendly collection running from Dali to Kyushu modernists, beside Ohori Park.',
  near:[{n:'Ohori Park',jp:'大濠公園',w:'2 min walk',note:'The lake is directly outside.'},
        {n:'Gokoku Shrine',jp:'護国神社',w:'3 min walk',note:'Large shrine inside Maizuru Park.'},
        {n:'Fukuoka Castle ruins',jp:'福岡城跡',w:'8 min walk',note:'Best at sunset.'}]},

 {id:'tower', name:'Fukuoka Tower', jp:'福岡タワー', area:'momochi', cats:['view'], lat:33.5934, lon:130.3517,
  dwell:60, fee:800, must:true,
  blurb:'123 m of glass over the bay. Sunset is the slot worth planning around.',
  tip:'Observatory ticket ¥800, bought at the base; queues are rare outside weekends.',
  near:[{n:'Momochi Seaside Park',jp:'ももち浜',w:'7 min walk',note:'Sand and lawns facing the sunset.'},
        {n:'Marizon',jp:'マリゾン',w:'5 min walk',note:'Seaside chapel and cafe terrace.'},
        {n:'PayPay Dome',jp:'みずほPayPayドーム',w:'12 min walk',note:'Baseball, or the adjacent malls.'}]},

 {id:'momochi', name:'Momochi Seaside Park', jp:'ももち浜', area:'momochi', cats:['nature'], lat:33.5936, lon:130.3550,
  dwell:45, fee:0,
  blurb:'Sand, lawns and the Marizon wedding chapel, five minutes from the tower.',
  near:[{n:'Fukuoka Tower',jp:'福岡タワー',w:'6 min walk',note:'Observatory open to 22:00.'},
        {n:'Marizon',jp:'マリゾン',w:'3 min walk',note:'Cafe terrace over the water.'},
        {n:'PayPay Dome',jp:'みずほPayPayドーム',w:'10 min walk',note:'Team store open on non-game days.'}]},

 {id:'paypay', name:'PayPay Dome & Seaside Momochi', jp:'みずほPayPayドーム', area:'momochi', cats:['view'], lat:33.5952, lon:130.3620,
  dwell:30, fee:0,
  blurb:'Baseball stadium, malls and a seaside boardwalk. Worth a look if a game is on.',
  near:[{n:'Fukuoka Tower',jp:'福岡タワー',w:'12 min walk',note:'Or one stop on the bus.'},
        {n:'Momochi Seaside Park',jp:'ももち浜',w:'10 min walk',note:'Beach walk back towards the tower.'},
        {n:'Mark Is Fukuoka Momochi',jp:'マークイズ福岡ももち',w:'4 min walk',note:'Mall with a rooftop garden.'}]},

 {id:'bayside', name:'Bayside Place Hakata', jp:'ベイサイドプレイス博多', area:'bay', cats:['food','shopping'], lat:33.6075, lon:130.4005,
  dwell:40, fee:0,
  blurb:'Harbour mall with a fish market and the ferry pier for Shikanoshima.',
  near:[{n:'Hakata Port Tower',jp:'博多港タワー',w:'2 min walk',note:'Free observation deck.'},
        {n:'Fukuoka Municipal Ferry',jp:'市営渡船',w:'0 min',note:'Boat to Shikanoshima, ¥680 return.'},
        {n:'Hakata Station',jp:'博多駅',w:'15 min bus',note:'City bus ¥150 from the port.'}]},

 {id:'uminonaka', name:'Uminonakamichi Seaside Park', jp:'海の中道海浜公園', area:'bay', cats:['nature'], lat:33.6636, lon:130.3620,
  dwell:150, fee:450,
  blurb:'A whole island of flower fields, bike paths and a seaside pool — the best half-day escape from the city.',
  tip:'Rent a bicycle at the gate; the park is far larger than it looks on the map.',
  near:[{n:'Marine World',jp:'マリンワールド海の中道',w:'10 min walk',note:'Aquarium with a dolphin show.'},
        {n:'Shikanoshima',jp:'志賀島',w:'15 min bus',note:'Fishing port and seafood set meals.'},
        {n:'Sunshine Pool',jp:'サンシャインプール',w:'5 min walk',note:'Summer only.'}]},

 {id:'shikanoshima', name:'Shikanoshima Island', jp:'志賀島', area:'bay', cats:['nature','food'], lat:33.6620, lon:130.3050,
  dwell:150, fee:0,
  blurb:'A slow island of fishing ports, seafood set meals and a hilltop view back over the bay.',
  near:[{n:'Shikajima Shrine',jp:'志賀海神社',w:'5 min walk',note:'Ancient shrine tied to the Munakata deities.'},
        {n:'Katsuma Coast',jp:'勝馬海岸',w:'20 min bus',note:'Quiet swimming beach on the far side.'},
        {n:'Uminonakamichi',jp:'海の中道海浜公園',w:'15 min bus',note:'Combine the two on one loop.'}]},

 {id:'nanzoin', name:'Nanzoin Reclining Buddha', jp:'南蔵院', area:'sasaguri', cats:['temple'], lat:33.5970, lon:130.5420,
  dwell:90, fee:0,
  blurb:'A 41 m bronze reclining Buddha in the hills — genuinely astonishing, and free to visit.',
  tip:'JR Sasaguri Line from Hakata to Kido-Nanzoinmae, ¥340 and about 25 minutes, then a 3-minute walk.',
  near:[{n:'Sasaguri Kuju Forest',jp:'篠栗九大の森',w:'20 min walk',note:'Forest walk with a pond, free.'},
        {n:'Shofukuji Sasaguri',jp:'篠栗四国霊場',w:'15 min walk',note:'Pilgrimage temples through the valley.'}]},

 {id:'dazaifu', name:'Dazaifu Tenmangu', jp:'太宰府天満宮', area:'dazaifu', cats:['temple'], lat:33.5217, lon:130.5348,
  dwell:90, fee:0, must:true,
  blurb:'Kyushu’s great shrine to the god of learning, at the end of a lantern-lined approach of sweet shops.',
  tip:'Try umegae-mochi on the approach — grilled rice cake with red bean, about ¥150. Main hall worship resumed in September 2026 after restoration.',
  near:[{n:'Kyushu National Museum',jp:'九州国立博物館',w:'5 min walk',note:'Escalator tunnel from behind the shrine, ¥700.'},
        {n:'Komyozenji Temple',jp:'光明禅寺',w:'3 min walk',note:'Two small moss gardens, ¥300, closed Mondays.'},
        {n:'Starbucks Dazaifu',jp:'スターバックス太宰府天満宮表参道店',w:'2 min walk',note:'Kengo Kuma’s timber-lattice store.'}]},

 {id:'kyuhaku', name:'Kyushu National Museum', jp:'九州国立博物館', area:'dazaifu', cats:['art'], lat:33.5184, lon:130.5389,
  dwell:100, fee:700,
  blurb:'A superb museum on Kyushu’s role as Japan’s window on Asia, directly behind the shrine.',
  tip:'Closed Mondays. The building alone justifies the walk up the hill.',
  near:[{n:'Dazaifu Tenmangu',jp:'太宰府天満宮',w:'5 min walk',note:'Back through the escalator tunnel.'},
        {n:'Komyozenji Temple',jp:'光明禅寺',w:'8 min walk',note:'Moss and stone gardens, ¥300.'},
        {n:'Kaidan-in',jp:'戒壇院',w:'10 min walk',note:'Quiet 8th-century ordination hall.'}]},

 {id:'futamigaura', name:'Sakurai Futamigaura', jp:'桜井二見ヶ浦', area:'itoshima', cats:['nature','view'], lat:33.5170, lon:130.1845,
  dwell:60, fee:0, must:true,
  blurb:'The roped “couple rocks” standing in the sea, with a white torii gate — Itoshima’s postcard.',
  tip:'Sunset, not midday. Coastal buses thin out after 19:00, so confirm the last one back.',
  near:[{n:'Sakurai Shrine',jp:'櫻井神社',w:'5 min walk',note:'Quiet shrine tied to the Kuroda clan.'},
        {n:'Keya no Oto',jp:'芥屋の大門',w:'15 min drive',note:'Basalt sea cave, boat trips in season.'},
        {n:'Itoshima farm stands',jp:'伊都菜彩',w:'10 min drive',note:'Vegetables, seafood and soft-serve.'}]},

 {id:'shiraito', name:'Shiraito Falls, Itoshima', jp:'白糸の滝', area:'itoshima', cats:['nature'], lat:33.4717, lon:130.2400,
  dwell:70, fee:0,
  blurb:'A 24 m waterfall in a mossy gorge, twenty minutes on foot from the bus stop.',
  near:[{n:'Sakurai Futamigaura',jp:'桜井二見ヶ浦',w:'15 min drive',note:'Pair the two for a coast loop.'},
        {n:'Ihara mountain trail',jp:'井原山',w:'30 min drive',note:'Ridge walk with views over the bay.'}]},

 {id:'yanagawa', name:'Yanagawa Canal Boats', jp:'柳川川下り', area:'yanagawa', cats:['nature'], lat:33.1630, lon:130.4060,
  dwell:130, fee:2200,
  blurb:'Punted boats through the moats of a castle town — the classic slow afternoon.',
  tip:'Boats board near Mihashira Shrine, five minutes from Nishitetsu-Yanagawa station. Reserve on weekends.',
  near:[{n:'Ohana',jp:'御花',w:'5 min walk',note:'Former daimyo residence, garden and restaurant.'},
        {n:'Unagi lunch',jp:'うなぎ',w:'5 min walk',note:'Yanagawa is famous for grilled eel; expect ¥3,000–4,000.'},
        {n:'Yanagawa Castle ruins',jp:'柳川城跡',w:'10 min walk',note:'Only earthworks remain, but the walk is pleasant.'}]},

 {id:'karatsu', name:'Karatsu Castle', jp:'唐津城', area:'karatsu', cats:['view'], lat:33.4460, lon:129.9780,
  dwell:90, fee:500,
  blurb:'A hilltop castle over Karatsu Bay, with the pine-studded Niji-no-Matsubara beach nearby.',
  near:[{n:'Niji-no-Matsubara',jp:'虹の松原',w:'10 min bus',note:'Pine avenue along the bay, free.'},
        {n:'Karatsu Kunchi Hall',jp:'唐津くんち会館',w:'8 min walk',note:'Festival floats displayed year-round.'},
        {n:'Former Karatsu Bank',jp:'旧唐津銀行',w:'7 min walk',note:'Meiji-era brick building, free.'}]},

 /* ---- Kitakyushu ---- */
 {id:'moji-port', name:'Mojiko Retro District', jp:'門司港レトロ', area:'kitakyushu', cats:['view','shopping'], lat:33.9450, lon:130.9625,
  dwell:100, fee:0, must:true,
  blurb:'Meiji-era warehouses, the red-brick station and a lift bridge on the strait facing Honshu.',
  tip:'JR Kagoshima Line to Kokura, then the local line to Mojiko — about 75 minutes from Hakata in total.'},

 {id:'moji-tower', name:'Mojiko Retro Observation Deck', jp:'門司港レトロ展望室', area:'kitakyushu', cats:['view'], lat:33.9467, lon:130.9633,
  dwell:40, fee:300,
  blurb:'A 31st-floor glass room looking over the strait, with the bridge and Honshu across the water.'},

 {id:'kokura-castle', name:'Kokura Castle', jp:'小倉城', area:'kitakyushu', cats:['view'], lat:33.8845, lon:130.8740,
  dwell:60, fee:350,
  blurb:'A reconstructed castle with a lively interior and a garden, beside the Murasaki River.',
  tip:'Entry ¥350; the garden next door is free and quieter than the keep.'},

 {id:'tanga-market', name:'Tanga Market', jp:'旦過市場', area:'kitakyushu', cats:['market','food'], lat:33.8838, lon:130.8792,
  dwell:45, fee:0,
  blurb:'A scruffy, wonderful covered market — grilled fish, croquettes and cooked-at-the-counter stalls.'},

 /* ---- Kumamoto ---- */
 {id:'kumamoto-castle', name:'Kumamoto Castle', jp:'熊本城', area:'kumamoto', cats:['view','nature'], lat:32.8060, lon:130.7060,
  dwell:110, fee:800, must:true,
  blurb:'One of Japan’s three great castles, back open after the 2016 earthquakes, with immense stone walls.',
  tip:'The keep and the rebuilt Honmaru circuit take about two hours. The castle is a 15-minute tram ride from Kumamoto Station.'},

 {id:'suizenji', name:'Suizenji Jojuen Garden', jp:'水前寺成趣園', area:'kumamoto', cats:['nature'], lat:32.7900, lon:130.7350,
  dwell:70, fee:400,
  blurb:'A strolling garden around a spring-fed pond, with miniature Mount Fuji and tea houses.'},

 {id:'sakuranobaba', name:'Sakuranobaba Josaien', jp:'桜の馬場 城彩苑', area:'kumamoto', cats:['food','shopping'], lat:32.8053, lon:130.7030,
  dwell:50, fee:0,
  blurb:'A rebuilt castle-town lane of food stalls and craft shops at the foot of Kumamoto Castle.'},

 {id:'shimotori', name:'Shimotori Arcade', jp:'下通アーケード', area:'kumamoto', cats:['shopping','food'], lat:32.7995, lon:130.7085,
  dwell:60, fee:0,
  blurb:'Kumamoto’s main covered shopping street — ten minutes on the tram from the station.'},

 /* ---- Nagasaki ---- */
 {id:'nagasaki-peace', name:'Nagasaki Peace Park', jp:'長崎平和公園', area:'nagasaki', cats:['art','nature'], lat:32.7730, lon:129.8630,
  dwell:60, fee:0, must:true,
  blurb:'The Peace Statue, the fountain and the hypocenter — the city’s memorial ground, uphill from the station.',
  tip:'Take tram line 1 or 3 to Matsuyamamachi. The Atomic Bomb Museum next door is ¥200 and worth an hour.'},

 {id:'glover-garden', name:'Glover Garden', jp:'グラバー園', area:'nagasaki', cats:['view','art'], lat:32.7340, lon:129.8700,
  dwell:80, fee:620,
  blurb:'Western merchant houses on a hillside above the harbour, with the best view in Nagasaki.',
  tip:'Escalators carry you up, so the walk is downhill all the way back to the tram.'},

 {id:'meganebashi', name:'Megane Bridge', jp:'眼鏡橋', area:'nagasaki', cats:['temple'], lat:32.7425, lon:129.8785,
  dwell:30, fee:0,
  blurb:'A 1643 stone bridge whose two arches mirror in the water as spectacles — with a heart stone in the wall.'},

 {id:'shinchi', name:'Shinchi Chinatown', jp:'新地中華街', area:'nagasaki', cats:['food'], lat:32.7440, lon:129.8720,
  dwell:60, fee:0,
  blurb:'Japan’s oldest Chinatown: champon, sara udon and steamed buns behind painted gates.'},

 /* ---- Beppu ---- */
 {id:'beppu-jigoku', name:'Beppu Jigoku Hells', jp:'別府地獄めぐり', area:'beppu', cats:['nature'], lat:33.3165, lon:131.4740,
  dwell:120, fee:2200, must:true,
  blurb:'Seven steaming, mineral-blue pools — the Umi Jigoku is the one to plan around.',
  tip:'A combined ticket for all seven is ¥2,200; buses run between the hells every 20 minutes.'},

 {id:'beppu-onsen', name:'Takegawara Onsen', jp:'竹瓦温泉', area:'beppu', cats:['nature'], lat:33.2795, lon:131.5035,
  dwell:50, fee:300,
  blurb:'A 1938 bathhouse in the middle of town, with a sand bath and a tiled hall that has barely changed.'},

 {id:'beppu-ropeway', name:'Beppu Ropeway & Mount Tsurumi', jp:'別府ロープウェイ', area:'beppu', cats:['view'], lat:33.2760, lon:131.4400,
  dwell:80, fee:1800,
  blurb:'A gondola up Mount Tsurumi, with the whole bay and the steaming city laid out below.'},

 /* ---- Yufuin ---- */
 {id:'kinrin', name:'Lake Kinrin', jp:'金鱗湖', area:'yufuin', cats:['nature'], lat:33.2630, lon:131.3720,
  dwell:45, fee:0, must:true,
  blurb:'A small lake fed by hot springs, steaming at dawn, at the top of the shopping lane.',
  tip:'From Yufuin station the lake is a 20-minute walk up Yunotsubo Kaido — go early for the mist.'},

 {id:'yunotsubo', name:'Yunotsubo Kaido', jp:'湯の坪街道', area:'yufuin', cats:['shopping','food'], lat:33.2650, lon:131.3735,
  dwell:90, fee:0,
  blurb:'The lane from the station to the lake: croquettes, roll cake, coffee and small craft shops.'},

 /* ---- Kagoshima ---- */
 {id:'sakurajima', name:'Sakurajima Volcano', jp:'桜島', area:'kagoshima', cats:['nature','view'], lat:31.5900, lon:130.6600,
  dwell:150, fee:400, must:true,
  blurb:'An active volcano across the bay: a 15-minute ferry, then lava paths and the Yunohira lookout.',
  tip:'Ferry ¥200 each way, 24 hours. The island bus to the Yunohira observatory stops running in the late afternoon.'},

 {id:'senganen', name:'Sengan-en Garden', jp:'仙巌園', area:'kagoshima', cats:['nature','view'], lat:31.6180, lon:130.5770,
  dwell:70, fee:1000,
  blurb:'A Shimazu clan garden framing the volcano across the water — the classic Kagoshima view.'},

 {id:'tenmonkan', name:'Tenmonkan', jp:'天文館', area:'kagoshima', cats:['food','shopping'], lat:31.5900, lon:130.5570,
  dwell:60, fee:0,
  blurb:'Kagoshima’s downtown grid of arcades, shochu bars and black-pork restaurants.'},

 /* ---- Hiroshima ---- */
 {id:'hiroshima-dome', name:'Hiroshima Peace Memorial', jp:'原爆ドーム', area:'hiroshima', cats:['art'], lat:34.3955, lon:132.4536,
  dwell:90, fee:0, must:true,
  blurb:'The Genbaku Dome and the Peace Memorial Park along the river, with the museum beside it.',
  tip:'Shinkansen from Hakata is about 70 minutes. The museum needs an hour and closes at 17:00 (18:00 from August).'},

 {id:'itsukushima', name:'Itsukushima Shrine', jp:'厳島神社', area:'hiroshima', cats:['temple','view'], lat:34.2960, lon:132.3197,
  dwell:120, fee:300,
  blurb:'The torii that appears to float at high tide, on Miyajima island 25 minutes by ferry from the city.',
  tip:'Check the tide table before you go: high tide for the floating look, low tide to walk out to the gate.'},

 {id:'shukkeien', name:'Shukkeien Garden', jp:'縮景園', area:'hiroshima', cats:['nature'], lat:34.4000, lon:132.4670,
  dwell:60, fee:260,
  blurb:'A 1620 strolling garden of miniaturised valleys and ponds, five minutes from Hiroshima Station.'},

 /* ---- Sasebo ---- */
 {id:'huis-ten-bosch', name:'Huis Ten Bosch', jp:'ハウステンボス', area:'sasebo', cats:['view'], lat:33.0850, lon:129.7930,
  dwell:240, fee:7400, must:true,
  blurb:'A full-scale Dutch town on the bay, with canals, museums, illuminations and a lot of walking.',
  tip:'A 1-day passport is ¥7,400. From Hakata it is about 1 hour 50 by JR Midori, then a shuttle.'},

 {id:'kujukushima', name:'Kujukushima Islands', jp:'九十九島', area:'sasebo', cats:['nature'], lat:33.1570, lon:129.7100,
  dwell:120, fee:1500,
  blurb:'Two hundred wooded islands in the bay — best from a sightseeing boat or the Pearl Sea lookout.'}
];

const POI = Object.fromEntries(POIS.map(p=>[p.id,p]));

/* ---------- day-trip regions -------------------------------------- */
const TRIP_REGIONS = ['dazaifu','sasaguri','itoshima','yanagawa','karatsu','kitakyushu','kumamoto','nagasaki','beppu','yufuin','kagoshima','hiroshima','sasebo'];
const TRIP_LABELS = {dazaifu:'Dazaifu',sasaguri:'Sasaguri / Nanzoin',itoshima:'Itoshima',yanagawa:'Yanagawa',karatsu:'Karatsu',
  kitakyushu:'Kitakyushu',kumamoto:'Kumamoto',nagasaki:'Nagasaki',beppu:'Beppu',yufuin:'Yufuin',kagoshima:'Kagoshima',hiroshima:'Hiroshima',sasebo:'Sasebo'};
const TRIP_JP = {dazaifu:'太宰府',sasaguri:'篠栗・南蔵院',itoshima:'糸島',yanagawa:'柳川',karatsu:'唐津',kitakyushu:'北九州',
  kumamoto:'熊本',nagasaki:'長崎',beppu:'別府',yufuin:'由布院',kagoshima:'鹿児島',hiroshima:'広島',sasebo:'佐世保'};

/* regional legs: door-to-door minutes and the published station-pair fare */
const TRIPS = {
  dazaifu:{legs:{
      tenjin:{min:38,fare:480,mode:'Nishitetsu limited express',detail:'Nishitetsu Fukuoka (Tenjin) → Nishitetsu-Futsukaichi → Dazaifu',src:'nishitetsu'},
      hakata:{min:46,fare:740,mode:'Subway + Nishitetsu',detail:'Subway to Tenjin-Minami (¥260), 6-minute walk, train ¥480',src:'nishitetsu'}},
    note:'Nishitetsu Tenjin–Dazaifu is ¥480 since the 1 April 2026 revision. The Tabito Liner bus from Hakata is ¥800 and is not covered by the Tourist City Pass.'},
  sasaguri:{legs:{
      hakata:{min:30,fare:340,mode:'JR Sasaguri Line',detail:'JR Hakata → Kido-Nanzoinmae, 3-minute walk to the temple',src:'jr'},
      tenjin:{min:45,fare:600,mode:'Subway + JR',detail:'Subway to Hakata (¥260) then JR Sasaguri Line (¥340)',src:'jr'}},
    note:'One of the cheapest major sights in Fukuoka: ¥340 each way on the JR Sasaguri Line.'},
  itoshima:{legs:{
      tenjin:{min:55,fare:600,mode:'Subway + JR Chikuhi Line',detail:'Subway to Meinohama (¥260), JR Chikuhi Line to Chikuzen-Maebaru (¥340)',src:'jr'},
      hakata:{min:62,fare:640,mode:'Subway + JR Chikuhi Line',detail:'Subway to Meinohama (¥300), JR Chikuhi Line (¥340)',src:'jr'}},
    note:'Coastal buses beyond Maebaru run hourly at best. Confirm the last departure before committing to sunset.'},
  yanagawa:{legs:{
      tenjin:{min:48,fare:960,mode:'Nishitetsu limited express',detail:'Nishitetsu Fukuoka (Tenjin) → Nishitetsu-Yanagawa, no change',src:'nishitetsu'},
      hakata:{min:58,fare:1220,mode:'Subway + Nishitetsu',detail:'Subway to Tenjin (¥260) then Nishitetsu limited express (¥960)',src:'nishitetsu'}},
    note:'The boat dock is a 5-minute walk from Nishitetsu-Yanagawa. The city pass does not cover the section beyond Zasshonokuma.'},
  karatsu:{legs:{
      hakata:{min:80,fare:1300,mode:'JR Chikuhi Line',detail:'JR Hakata → Karatsu, direct along the coast',src:'jr'},
      tenjin:{min:92,fare:1560,mode:'Subway + JR',detail:'Subway to Meinohama (¥260) then JR Chikuhi Line (¥1,300)',src:'jr'}},
    note:'A long day out: worth it with three days or more, otherwise Karatsu competes badly with Dazaifu.'},
  kitakyushu:{legs:{
      hakata:{min:35,fare:2000,mode:'JR Kagoshima Line · Sonic',detail:'JR Hakata → Kokura 20 min, or Mojiko 75 min',src:'jr'},
      tenjin:{min:47,fare:2260,mode:'Subway + JR',detail:'Subway to Hakata (¥260) then JR (¥2,000)',src:'jr'}},
    note:'Kokura is 20 minutes from Hakata; Mojiko adds another 15. The retro district starts at Mojiko station.'},
  kumamoto:{legs:{
      hakata:{min:40,fare:4750,mode:'Kyushu Shinkansen',detail:'Hakata → Kumamoto, 33–45 min',src:'shinkansen'},
      tenjin:{min:52,fare:5010,mode:'Subway + Shinkansen',detail:'Subway to Hakata (¥260) then Shinkansen (¥4,750)',src:'shinkansen'}},
    note:'Shinkansen ¥4,750 each way. A Kyushu Rail Pass (3 days, around ¥15,000) pays for itself on two long day trips.'},
  nagasaki:{legs:{
      hakata:{min:95,fare:5000,mode:'Kamome Shinkansen',detail:'Hakata → Nagasaki, 1 h 20',src:'shinkansen'},
      tenjin:{min:107,fare:5260,mode:'Subway + Shinkansen',detail:'Subway to Hakata (¥260) then Kamome (¥5,000)',src:'shinkansen'}},
    note:'Nagasaki is a genuinely long day: 1 h 20 each way. Trams in the city are a flat ¥140.'},
  beppu:{legs:{
      hakata:{min:120,fare:5900,mode:'JR Sonic',detail:'Hakata → Beppu, about 2 h',src:'jr'},
      tenjin:{min:132,fare:6160,mode:'Subway + JR',detail:'Subway to Hakata (¥260) then Sonic (¥5,900)',src:'jr'}},
    note:'Two hours each way. The hells are on the west side of town; the station is on the east.', long:true},
  yufuin:{legs:{
      hakata:{min:135,fare:5700,mode:'JR Yufuin-no-Mori',detail:'Hakata → Yufuin, 2 h 15 (reserve the scenic train)',src:'jr'},
      tenjin:{min:147,fare:5960,mode:'Subway + JR',detail:'Subway to Hakata (¥260) then Yufuin-no-Mori (¥5,700)',src:'jr'}},
    note:'The Yufuin-no-Mori fills up — book a seat. The lake is a 20-minute walk from the station.', long:true},
  kagoshima:{legs:{
      hakata:{min:95,fare:10200,mode:'Kyushu Shinkansen',detail:'Hakata → Kagoshima-Chuo, 1 h 17',src:'shinkansen'},
      tenjin:{min:107,fare:10460,mode:'Subway + Shinkansen',detail:'Subway to Hakata (¥260) then Shinkansen (¥10,200)',src:'shinkansen'}},
    note:'The fare is the problem, not the distance: ¥10,200 each way. Only worth it with a rail pass.', long:true},
  hiroshima:{legs:{
      hakata:{min:70,fare:8900,mode:'Sanyo Shinkansen',detail:'Hakata → Hiroshima, 1 h 10 by Nozomi',src:'shinkansen'},
      tenjin:{min:82,fare:9160,mode:'Subway + Shinkansen',detail:'Subway to Hakata (¥260) then Nozomi (¥8,900)',src:'shinkansen'}},
    note:'Hiroshima is in Honshu, not Kyushu, and ¥8,900 each way. A rail pass changes the maths completely.', long:true},
  sasebo:{legs:{
      hakata:{min:110,fare:4600,mode:'JR Midori',detail:'Hakata → Sasebo, 1 h 50',src:'jr'},
      tenjin:{min:122,fare:4860,mode:'Subway + JR',detail:'Subway to Hakata (¥260) then Midori (¥4,600)',src:'jr'}},
    note:'Huis Ten Bosch has its own station on the same line, 15 minutes before Sasebo.', long:true}
};

const INTERESTS = [
  {key:'temple',label:'Temples',jp:'寺社'},
  {key:'nature',label:'Gardens & nature',jp:'自然'},
  {key:'food',label:'Food & yatai',jp:'屋台'},
  {key:'shopping',label:'Shopping',jp:'買い物'},
  {key:'view',label:'Views',jp:'眺望'},
  {key:'art',label:'Museums',jp:'美術'},
  {key:'market',label:'Markets',jp:'市場'}
];

/* the four meal anchors every day is built around */
const MEALS = [
  {key:'breakfast', label:'Breakfast', jp:'朝食', at:8*60+15, dur:45,
   blurb:'At or beside your hotel. A convenience-store breakfast is ¥500; a hotel buffet ¥2,500.'},
  {key:'lunch', label:'Lunch', jp:'昼食', at:12*60+30, dur:60,
   blurb:'Near wherever you are at midday. Set lunches run ¥900–1,500; arcade counters are cheapest.'},
  {key:'tea', label:'Tea break', jp:'喫茶', at:15*60+30, dur:30,
   blurb:'A café stop to sit down. Fukuoka’s kissaten often serve a drink with a small sweet.'},
  {key:'dinner', label:'Dinner', jp:'夕食', at:19*60, dur:90,
   blurb:'Nakasu yatai along the river (cash, about ¥3,000 per person) or a ramen counter in Tenjin.'}
];
const MEAL = Object.fromEntries(MEALS.map(m=>[m.key,m]));

/* streets worth knowing by name when you navigate on foot */
const STREETS = [
  {jp:'明治通り',en:'Meiji-dōri',lat:33.5906,lon:130.4024},
  {jp:'渡辺通り',en:'Watanabe-dōri',lat:33.5874,lon:130.3988},
  {jp:'大博通り',en:'Taihaku-dōri',lat:33.5932,lon:130.4152},
  {jp:'昭和通り',en:'Shōwa-dōri',lat:33.5872,lon:130.4140},
  {jp:'国体道路',en:'Kokutai-dōro',lat:33.5846,lon:130.3946},
  {jp:'那珂川',en:'Naka River',lat:33.5892,lon:130.4058}
];

/* photographs for the “within reach” cards: image file stem per place name */
const NEARPHOTO = {
  'ACROS Fukuoka':'acros','Canal City Hakata':'canal','Daimyo':'daimyo','Dazaifu Tenmangu':'dazaifu',
  'Fukuoka Castle ruins':'castle','Fukuoka Tower':'tower','Hakata Station':'hakata-station',
  'Jotenji Temple':'jotenji','Kaidan-in':'kaidanin','Karatsu Kunchi Hall':'karatsu-kunchi',
  'Katsuma Coast':'katsuma','Kawabata arcade':'kawabata','Keya no Oto':'keya','Kushida Shrine':'kushida',
  'Kyushu National Museum':'kyuhaku','Marine World':'marine-world','Marizon':'marizon',
  'Mark Is Fukuoka Momochi':'markis','Momochi Seaside Park':'momochi','Nakasu yatai':'nakasu',
  'Niji-no-Matsubara':'niji-matsubara','Ohori Japanese Garden':'ohori','Ohori Park':'ohori',
  'PayPay Dome':'paypay','Rakusui-en Garden':'rakusuien','Sakurai Futamigaura':'futamigaura',
  'Sasaguri Kuju Forest':'sasaguri-forest','Shikajima Shrine':'shikajima-shrine','Shikanoshima':'shikanoshima',
  'Shofukuji':'shofukuji','Shofukuji Sasaguri':'sasaguri-pilgrimage','Sumiyoshi Shrine':'sumiyoshi',
  'Tenjin':'tenjin','Tenjin Chikagai':'tenjin-chikagai','Tenjin Central Park':'tenjin-park',
  'Tochoji Temple':'tochoji','Uminonakamichi':'uminonaka',
  'Yanagibashi Market':'yanagibashi',
  'Former Karatsu Bank':'former-karatsu-bank','Fukuoka Art Museum':'art','Gokoku Shrine':'gokoku-shrine',
  'Hakata Machiya Folk Museum':'machiya','Hakata Port Tower':'port-tower','Hakataza Theatre':'hakataza',
  'Ihara mountain trail':'ihara','Itoshima farm stands':'itoshima-stand','Komyozenji Temple':'komyozenji',
  'Korokan Site':'korokan','Nakasu Kawabata shopping street':'nakasu-kawabata','Ohana':'ohana',
  'Reisen Park':'reisen-park','Sakurai Shrine':'sakurai-shrine','Starbucks Dazaifu':'starbucks',
  'Sunshine Pool':'sunshine-pool','Unagi lunch':'unagi','Yanagawa Castle ruins':'yanagawa-castle',
  'Fukuoka Municipal Ferry':'bayside'
};

/* ============================================================
   FARE ENGINE — published tables, 2026
   ============================================================ */
const SUBWAY_ZONES = [[3,210],[7,260],[11,300],[15,340],[19,360],[Infinity,380]];
function subwayZone(km){
  for(let i=0;i<SUBWAY_ZONES.length;i++) if(km<=SUBWAY_ZONES[i][0]) return i+1;
  return 6;
}
const arc = {toR:Math.PI/180};
function haversine(a,b){
  const R=6371,toR=Math.PI/180;
  const dLat=(b.lat-a.lat)*toR, dLon=(b.lon-a.lon)*toR;
  const la1=a.lat*toR, la2=b.lat*toR;
  const h=Math.sin(dLat/2)**2+Math.cos(la1)*Math.cos(la2)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.min(1,Math.sqrt(h)));
}
const SUBWAY_AREAS = new Set(['tenjin','hakata','nakasu','ohori','momochi']);

function travel(a,b,hub){
  hub = hub||'hakata';
  const ra = TRIP_REGIONS.includes(a.area), rb = TRIP_REGIONS.includes(b.area);

  if((ra||rb) && a.area!==b.area){
    const r = ra?a.area:b.area, T = TRIPS[r];
    const c = T.legs[hub] || T.legs.hakata || T.legs.tenjin;
    return {min:c.min,fare:c.fare,mode:c.mode,detail:c.detail,note:T.note,src:c.src,kind:'daytrip'};
  }
  const d = haversine(a,b);
  if(d<=1.2) return {min:Math.max(4,Math.round(d/4.4*60)),fare:0,mode:'Walk',dist:d,src:'walk'};

  /* inside a day-trip area: local buses and trains, not long-distance rail */
  if(ra&&rb){
    const fare = d<=3?200:d<=6?240:d<=10?270:340;
    return {min:Math.round(7+d*2.6),fare,mode:'Local bus',dist:d,src:'bus',
      detail:'Local bus or tram, distance fare',note:null};
  }

  const bothSubway = SUBWAY_AREAS.has(a.area)&&SUBWAY_AREAS.has(b.area);
  if(bothSubway){
    const km=Math.max(1,d*1.35), zone=subwayZone(km);
    const fare = SUBWAY_ZONES[zone-1][1];
    const subMin = Math.round(11+d*1.7);
    const walkMin = Math.round(d/4.2*60);
    if(walkMin<=subMin+3) return {min:walkMin,fare:0,mode:'Walk',dist:d,src:'walk'};
    return {min:subMin,fare,mode:'Subway · zone '+zone,dist:d,src:'subway',
      detail:'Fukuoka City Subway, '+zone+'-zone adult ticket',note:null};
  }
  if(d<=3.6){
    return {min:Math.round(8+d*3.0),fare:150,mode:'Nishitetsu city bus',dist:d,src:'bus',
      detail:'Flat fare inside the central ¥150 zone',note:null};
  }
  const km=d*1.35;
  if(km<=22){
    const fare = jrFare(km);
    return {min:Math.round(14+d*2.4),fare,mode:'JR or subway + walk',dist:d,src:'jr',
      detail:'JR Kyushu, '+Math.round(km)+' km band',note:null};
  }
  return {min:Math.round(10+d*2.2),fare:d<=8?260:340,mode:'Bus / rail',dist:d,src:'bus',
    detail:'Nishitetsu bus outside the flat zone',note:null};
}

const JR_BANDS = [[3,200],[6,240],[10,270],[15,340],[20,450],[25,560],[30,660],[35,760],[40,870],[45,990],[50,1090],[60,1300],[70,1510],[80,1730]];
function jrFare(km){
  for(const [lim,fare] of JR_BANDS) if(km<=lim) return fare;
  return 1730;
}

/* ============================================================
   ROUTE ORDERING — nearest neighbour + 2-opt
   ============================================================ */
function routeCost(r){ let c=0; for(let i=1;i<r.length;i++) c+=haversine(r[i-1],r[i]); return c; }
function twoOpt(r){
  let improved=true, guard=0;
  while(improved && guard++<40){
    improved=false;
    for(let i=1;i<r.length-1;i++){
      for(let j=i+1;j<r.length;j++){
        const a=r[i-1], b=r[i], c=r[j], d=r[j+1]||null;
        const before=haversine(a,b)+(d?haversine(c,d):0);
        const after=haversine(a,c)+(d?haversine(b,d):0);
        if(after<before-0.002){
          const seg=r.slice(i,j+1).reverse();
          r.splice(i,seg.length,...seg);
          improved=true;
        }
      }
    }
  }
}
function orderStops(pois){
  if(pois.length<=2) return pois.slice();
  let best=null,bestCost=Infinity;
  for(let s=0;s<pois.length;s++){
    const route=[pois[s]];
    const rest=pois.filter(p=>p!==pois[s]);
    while(rest.length){
      let bi=0,bd=Infinity;
      rest.forEach((p,i)=>{const d=haversine(route[route.length-1],p); if(d<bd){bd=d;bi=i;}});
      route.push(rest.splice(bi,1)[0]);
    }
    twoOpt(route);
    const c=routeCost(route);
    if(c<bestCost){bestCost=c;best=route;}
  }
  return best;
}
function distribute(pois,n){
  if(n<=0||!pois.length) return [];
  const anchors=[pois[0]];
  while(anchors.length<n && anchors.length<pois.length){
    let best=null,bd=-1;
    for(const p of pois){
      const d=Math.min(...anchors.map(a=>haversine(a,p)));
      if(d>bd){bd=d;best=p;}
    }
    if(!best||anchors.includes(best)) break;
    anchors.push(best);
  }
  const groups=anchors.map(()=>[]);
  for(const p of pois){
    let bi=0,bd=Infinity;
    anchors.forEach((a,i)=>{const d=haversine(a,p); if(d<bd){bd=d;bi=i;}});
    groups[bi].push(p);
  }
  const cap=6;
  for(let pass=0;pass<10;pass++){
    const heavy=groups.findIndex(g=>g.length>cap);
    if(heavy<0) break;
    const light=groups.reduce((mi,g,i)=>g.length<groups[mi].length?i:mi,0);
    if(light===heavy) break;
    groups[light].push(groups[heavy].pop());
  }
  return groups.filter(g=>g.length);
}

/* ============================================================
   EATING — recommended counters for each meal
   ============================================================ */
const EAT = [
  {id:'nagahama-ya', meal:'breakfast', name:'Ganso Nagahama-ya', jp:'元祖長浜屋', area:'hakata', img:'ramen-hakata',
   where:'Nagahama, 2-11-20 · 6 min from Nishitetsu-Yanagibashi', price:'¥650–850', open:'24 hours',
   rec:'The 1952 counter where Nagahama ramen began: thin noodles in cloudy tonkotsu, a tray of pickled ginger, breakfast crowds of taxi drivers.',
   w:'A shed-like ramen shop on the road behind the fish market. You pay at the door, take a tray, and eat standing or at a shared table.',
   s:'It is the reference bowl for Nagahama style — pale, fast, cheap, and open at 6 am when the market is still working. Nagahama-ya still does one thing and has not softened it for visitors.',
   t:['Order “ramen” and add the free pickled ginger yourself.','Ask for a second helping of noodles (kaedama) while the broth is hot.','Walk 3 minutes to the Nagahama fish market afterwards.']},

  {id:'makino-udon', meal:'breakfast', name:'Makino Udon Hakata', jp:'牧のうどん 博多', area:'hakata', img:'makino-udon',
   where:'Hakata Station area · 4 min from the Chikushi exit', price:'¥500–800', open:'08:00–02:00',
   rec:'Soft Hakata udon in a dashi so constant the staff top up your bowl. A gobo tempura on the side costs ¥150.',
   w:'A local udon chain whose bowls never quite seem to empty — the broth is kept low and refilled as you eat, so the noodles stay hot.',
   s:'Hakata udon is deliberately soft, almost dumpling-like. Makino’s is the easiest version to try near the station, and the gobo-ten is the order locals place.',
   t:['Order gobo-ten udon and leave the bruise-yourself-broth for later in the bowl.','Add rice at the end to finish the dashi.','Try the spicy mentaiko udon if you eat it.']},

  {id:'sukesan', meal:'breakfast', name:'Sukesan Udon', jp:'資さんうどん', area:'hakata', img:'sukesan-udon',
   where:'Several city branches · 3 min from Hakata Station', price:'¥500–900', open:'24 hours',
   rec:'Kitakyushu’s 24-hour udon institution: gobo-ten udon, oden from the pot, and a room full of people at any hour.',
   w:'Fukuoka-born chain, open round the clock, with counter seats and a self-service oden pot. Breakfast here is normal, not an occasion.',
   s:'The oden is the reason to come — daikon, egg and thick konnyaku simmered in a light dashi, picked from the pot yourself.',
   t:['Take a bowl of gobo-ten udon and one oden egg.','Try the kashiwa (chicken) rice ball.','Walk it off along the Naka River.']},

  {id:'ichiran-honten', meal:'lunch', name:'Ichiran Honten', jp:'一蘭 本社総本店', area:'nakasu', img:'ichiran',
   where:'Nakasu, 5 min from Nakasu-Kawabata subway', price:'¥1,000–1,500', open:'24 hours',
   rec:'The original booth-seat shop, 1960: you order at a machine, sit in a private stall and the ramen arrives through a curtain.',
   w:'A five-storey red building beside the river, which is both the company headquarters and the original restaurant. Even the booths have booths.',
   s:'The focus is engineered: one bowl, one broth, no conversation. It is not the best ramen in Fukuoka for everyone, but it is the most complete experience of the city’s ramen culture.',
   t:['Order the standard tonkotsu and choose your noodle firmness on the paper.','Ask for kaedama (extra noodles) halfway through.','Visit after 21:00 when the queue shortens.']},

  {id:'hirao', meal:'lunch', name:'Tempura Hirao', jp:'天ぷら ひらお', area:'tenjin', img:'tempura',
   where:'Tenjin, 3 min from Tenjin Station', price:'¥800–1,200', open:'11:00–21:00',
   rec:'A queue-for-it tempura counter where the set comes out piece by piece, with free mentaiko and gobo at the counter.',
   w:'A standing-and-counter tempura shop, ordered by set. Each piece is fried when you sit and handed over on a rack.',
   s:'The free mentaiko and the house-made gobo salad at the counter are the local trick — most visitors do not notice them.',
   t:['Order the ten-don or the teishoku, both under ¥1,200.','Take the free mentaiko with rice.','Go before 11:45 or after 14:00 to skip the queue.']},

  {id:'hyotan', meal:'lunch', name:'Hyotan Sushi', jp:'ひょうたん寿司', area:'tenjin', img:'nigiri',
   where:'Tenjin 2-10-13 · 5 min from Tenjin Station', price:'¥1,500–3,000', open:'11:30–22:00',
   rec:'The counter locals send visitors to: generous nigiri, a loud room, and lunch sets that cost half of what the same fish would in Tokyo.',
   w:'A busy, unfancy sushi restaurant with counter and table seats, a picture menu and a queue at lunchtime.',
   s:'Portions are famously large and the fish is bought at the city market each morning. The lunch chirashi is the value order.',
   t:['Order the lunch chirashi or the nigiri set.','Ask what came in that morning.','Try mentaiko on rice at the end.']},

  {id:'oyama', meal:'lunch', name:'Motsunabe Oyama', jp:'博多もつ鍋 おおやま', area:'hakata', img:'motsunabe',
   where:'Hakata, 6 min from Hakata Station', price:'¥1,200–2,000', open:'11:30–23:00',
   rec:'Motsunabe — beef offal hotpot with cabbage and garlic chives — costs a third at lunch. This is the easiest place to learn it.',
   w:'A chain that started in Fukuoka and still serves the dish in porcelain pots on gas burners, cooked at the table.',
   s:'Lunch sets include the pot, rice and pickles, so you get the local speciality without the evening price or the crowd.',
   t:['Order the miso broth rather than soy.','Add champon noodles for the second half of the pot.','Finish with rice in the remaining broth.']},

  {id:'nakasu-yatai', meal:'dinner', name:'Nakasu Yatai Street', jp:'中洲屋台', area:'nakasu', img:'nakasu',
   where:'Along the Naka River, Nakasu · 5 min from Nakasu-Kawabata', price:'¥3,000 per person', open:'18:00–01:00',
   rec:'Fukuoka’s open-air food stalls, thirty of them along the river. Ramen at one, oden at the next, yakitori at another.',
   w:'Tiny collapsible restaurants with a counter, a cook and eight seats, set up each evening along the river and taken down before morning.',
   s:'The appeal is not any single dish but the sequence: you eat and talk in the same seat, and the cook is your entire service staff.',
   t:['Start with a bowl at a ramen stall, then move on.','Order a drink at each stall — it is expected.','Carry cash; most stalls do not take cards.']},

  {id:'kawaya', meal:'dinner', name:'Torikawa Kawaya', jp:'とりかわ かわ屋', area:'tenjin', img:'yakitori',
   where:'Tenjin, 7 min from Tenjin Station', price:'¥3,000–4,000', open:'17:00–24:00',
   rec:'Chicken skin skewers cooked six times over charcoal until crisp — the one yakitori order you should not skip in Fukuoka.',
   w:'A busy yakitori shop where nearly every table orders the same thing: torikawa, layers of skin rolled onto a skewer.',
   s:'The six-grill method is a Fukuoka technique. The result is crisp outside, soft and juicy inside, with a tare that is sweet but not heavy.',
   t:['Order torikawa first and plenty of it.','Add chicken thigh and the fried cartilage.','Reserve, or come at 17:00 when it opens.']},

  {id:'yamanaka', meal:'dinner', name:'Unagi Yamanaka', jp:'うなぎ やま中', area:'hakata', img:'unagi',
   where:'Hakata, 8 min from Hakata Station', price:'¥3,000–5,000', open:'11:00–21:00',
   rec:'Charcoal-grilled eel in a lacquered box, crisp on the surface, with a clear sauce that lets the fish speak.',
   w:'A long-running unagi restaurant with private rooms and a short menu built around one fish.',
   s:'Yamanaka grills to order rather than steaming first, which gives the skin a snap that Tokyo-style eel does not have.',
   t:['Order unadon (over rice) rather than unaju if you want the cheaper portion.','Ask for extra sansho pepper.','Lunch is ¥1,000 cheaper than dinner.']},

  {id:'umegae', meal:'tea', name:'Umegae-mochi stalls', jp:'梅ヶ枝餅', area:'dazaifu', img:'umegae',
   where:'Dazaifu approach · 2 min from the shrine', price:'¥150 a cake', open:'09:00–17:00',
   rec:'Rice cakes grilled to order on the approach to Dazaifu Tenmangu — crisp outside, red bean inside, eaten standing at the stall.',
   w:'A row of small stalls along the shrine approach, each with a hot plate and a woman turning cakes with her fingers.',
   s:'They are made in front of you and sold within a minute of leaving the grill, which is why the ones you buy elsewhere are never as good.',
   t:['Buy one hot and eat it there.','Try a second from a different stall and compare.','Take a boxed set home — they travel well for a day.']},

  {id:'daimyo-coffee', meal:'tea', name:'Daimyo coffee street', jp:'大名のカフェ', area:'tenjin', img:'latte',
   where:'Daimyo, 6 min from Tenjin Station', price:'¥500–900', open:'08:00–22:00',
   rec:'Fukuoka roasts its own coffee, and Daimyo’s side streets are full of small counters where a pour-over comes with a tiny sweet.',
   w:'A grid of back streets behind Tenjin, with third-wave roasters, old kissaten and record shops mixed together.',
   s:'The local habit is a “morning set”: coffee with toast or a boiled egg, served until 11:00 and rarely more than ¥700.',
   t:['Order a morning set before 11:00.','Try a single-origin pour-over at a small roaster.','Walk the back streets towards Tenjin Central Park afterwards.']}
];
const EAT_BY = Object.fromEntries(EAT.map(e=>[e.id,e]));

/* ============================================================
   DETAIL — what each place is, what stands out, what to do
   ============================================================ */
const DETAIL = {
  kushida:{w:'Hakata’s guardian shrine, founded in 757 and rebuilt by the Kuroda clan in 1587. It is the parish shrine of the old merchant quarter.',
    s:'Towering Yamakasa festival floats are displayed in a hall behind the main building all year, and the ceiling carries a huge painted phoenix.',
    t:['Look into the float hall behind the main hall.','Find the 1,000-year-old ginkgo tree in the courtyard.','Walk out through the Kawabata arcade.']},
  tochoji:{w:'A Shingon temple founded in 806 by Kobo Daishi, the monk who brought esoteric Buddhism from China.',
    s:'A 10.8 m seated wooden Buddha — the largest of its kind in Japan — sits in a hall you enter by walking around its base.',
    t:['Walk the pitch-dark “hell circuit” under the Buddha hall.','Climb the red five-storey pagoda.','Buy a small charm at the shop by the gate.']},
  shofukuji:{w:'Japan’s first Zen temple, founded in 1195 by the monk Eisai, who also brought tea seeds home from China.',
    s:'It is almost empty of visitors, with a long gravel approach and a gate inscription by Emperor Gotoba.',
    t:['Walk the gravel approach slowly — it is the point.','Look for the old tea well.','Combine it with Tochoji five minutes away.']},
  canal:{w:'A shopping and cinema complex built around an artificial canal in 1996, on the site of the old Hakata beer hall.',
    s:'A musical fountain show runs every 30 minutes on the sunken plaza, and Ramen Stadium on the fifth floor gathers eight regional ramen shops.',
    t:['Time a visit for a fountain show.','Eat at Ramen Stadium instead of the chain restaurants.','Use it as the rainy-day plan — it connects to the arcades.']},
  kawabata:{w:'Hakata’s oldest covered shopping street, running from Kushida Shrine to the river.',
    s:'It is a working arcade, not a tourist one: mentaiko shops, a 100-year-old tofu seller, cheap lunch counters and festival stalls.',
    t:['Buy mentaiko vacuum-packed for the flight home.','Try a Hakata doll or a small festival craft.','Look for the snack alleys off the main street after dark.']},
  yanagibashi:{w:'The city’s kitchen: around fifty stalls under one roof, selling fish, pickles, tamagoyaki and grilled skewers.',
    s:'It is a real market where restaurants shop, and the cooked food sold at the front is priced for workers, not visitors.',
    t:['Eat a grilled skewer standing at the counter.','Buy tamagoyaki by weight.','Come before 11:00 — stalls close through the afternoon.']},
  sumiyoshi:{w:'One of Japan’s oldest Sumiyoshi shrines, linked to safe voyages and sumo, set back from the river.',
    s:'Moss, stone lanterns and a thatched worship hall — ten minutes from the station and usually almost empty.',
    t:['Visit the main hall and the small subordinate shrines.','Look for the sumo ring inside the grounds.','Pair it with Yanagibashi market for breakfast.']},
  nakasu:{w:'Fukuoka’s riverside yatai: about thirty tiny open-air restaurants set up each evening along the Naka River.',
    s:'Each stall seats eight to ten people around one cook — ramen, oden, yakitori, tempura, one speciality per stall.',
    t:['Walk the full row first, then choose a stall.','Order a drink at every stall you sit at.','Bring cash and expect to share the counter.']},
  tenjin:{w:'The downtown core: department stores, the underground Tenjin Chikagai mall, and the grid of Daimyo’s independent shops behind it.',
    s:'The scale is walkable and the underground city is enormous — you can cross the centre without surfacing.',
    t:['Use Tenjin Chikagai to cross in the rain.','Walk Daimyo for coffee, clothes and izakaya.','Check the food hall of a department store basement.']},
  acros:{w:'A civic hall with a fifteen-storey stepped roof garden, planted as a mountain slope.',
    s:'It is free, open to the sky, and gives a view over Tenjin and the river that most visitors never see.',
    t:['Climb the stepped garden to the top.','Sit on the upper terrace at sunset.','Drop into the underground mall from the basement.']},
  ohori:{w:'A lake built from the moat of Fukuoka Castle, now the city’s favourite park, ringed by a 2 km path.',
    s:'The loop is flat and shaded, with an island tea house and boats for hire — the best hour in the city on a warm day.',
    t:['Walk or jog the 2 km loop.','Rent a rowing boat on the lake.','Coffee at the lakeside kiosk, then the art museum.']},
  castle:{w:'The stone walls and turrets of Fukuoka Castle, abandoned in 1871 and now the Maizuru Park ruin field.',
    s:'The layered walls are among the largest in Japan, and the site is the city’s best cherry-blossom ground in late March.',
    t:['Walk the restored turret and the main enclosure.','Find the view over the city from the honmaru.','Come back for hanami in spring.']},
  art:{w:'The city art museum, with a collection running from Dali and Miro to Kyushu painters and modern Japanese ceramics.',
    s:'It is small enough for an hour, air-conditioned, and the garden entrance faces Ohori Park.',
    t:['See the Dali and the Kyushu modernists.','Check what is in the temporary gallery.','Use the museum café for a quiet lunch.']},
  tower:{w:'A 234 m tower on the Momochi waterfront, built for the 1989 Asia-Pacific Expo, with a 123 m observation deck.',
    s:'The deck faces west over the bay, so sunset is the slot to book; on clear days you can see Shikanoshima and the mountains of Saga.',
    t:['Go up 40 minutes before sunset.','Stay for the skyline at blue hour.','Walk down to the beach afterwards.']},
  momochi:{w:'A city beach and lawn on the bay, with the Marizon wedding chapel built out over the water.',
    s:'It is the only sand beach inside the city, and the sunset lines up with the tower and the bay.',
    t:['Walk the beach at low tide.','Have a drink on the Marizon terrace.','Walk west to the tower for sunset.']},
  paypay:{w:'Fukuoka SoftBank Hawks’ domed baseball stadium and the malls and boardwalk around it.',
    s:'On a game day the whole district turns into a street party; the team store is open on quiet days too.',
    t:['Check the Hawks’ home schedule before you go.','Visit the team store for a cap.','Walk the boardwalk towards the tower.']},
  bayside:{w:'A harbour mall with a fish market, a hot-spring bath and the ferry pier for Shikanoshima.',
    s:'It is a working port building rather than a polished attraction — the fish market and the ferry are the reasons to come.',
    t:['Look at the fish market in the morning.','Take the municipal ferry to Shikanoshima.','Go up the port tower for a free view.']},
  uminonaka:{w:'A 300-hectare seaside park on a sandbar island, with flower fields, bike paths and a pool.',
    s:'It is far bigger than it looks: rent a bicycle at the gate or you will see a tenth of it. Spring and autumn flower beds are the draw.',
    t:['Rent a bike at the entrance.','Ride to the flower fields and the beach.','Add the Marine World aquarium next door.']},
  shikanoshima:{w:'A small island at the mouth of the bay, reached by ferry, with a fishing port and a hilltop view.',
    s:'Seafood set meals at the port, a shrine tied to the Munakata sea deities, and a walk over the hill to a quiet beach.',
    t:['Eat a seafood set at the port.','Visit Shikajima Shrine.','Walk to the hilltop lookout over the bay.']},
  nanzoin:{w:'A Shingon temple in the hills behind Fukuoka, home to a 41 m bronze reclining Buddha.',
    s:'The scale is genuinely astonishing and the entry is free — one of the best-value sights in Kyushu.',
    t:['Walk the full length of the reclining Buddha.','Follow the small shrine path into the forest.','Continue to the Sasaguri pilgrimage temples.']},
  dazaifu:{w:'Kyushu’s great shrine to Sugawara no Michizane, the god of learning, at the end of a street of sweet shops.',
    s:'The approach is lined with plum trees and stalls selling umegae-mochi, grilled to order; the main hall reopened in 2026 after restoration.',
    t:['Eat umegae-mochi while it is hot.','Visit the treasure hall and the plum garden.','Walk up to the Kyushu National Museum behind the shrine.']},
  kyuhaku:{w:'The national museum for Kyushu, built into the hill behind Dazaifu Tenmangu, telling Japan’s story through its Asian exchanges.',
    s:'A dramatic glass building entered by a long escalator tunnel, with a strong permanent collection and excellent temporary shows.',
    t:['Ride the escalator tunnel from behind the shrine.','See the exchange-history galleries on the upper floor.','Check the special exhibition before you go.']},
  futamigaura:{w:'The “couple rocks” of Sakurai — two boulders roped together in the sea, with a white torii gate in front.',
    s:'It is a sunset photograph and a shrine visit in one place, and the coastal road behind it is lined with cafés.',
    t:['Come for sunset, not midday.','Photograph through the torii from the beach.','Visit Sakurai Shrine five minutes inland.']},
  shiraito:{w:'A 24 m waterfall in a mossy gorge in the mountains of Itoshima.',
    s:'Cool air, wet stone and very few people — a 20-minute walk from the bus stop, and a different Fukuoka entirely.',
    t:['Walk to the base of the falls.','Continue up the forest path.','Eat soba at the small shop by the car park.']},
  yanagawa:{w:'Punted boats through the moats of a castle town, poled by boatmen who sing and tell jokes.',
    s:'The town is built on water, and the 70-minute course passes under low bridges and past garden walls.',
    t:['Take the 70-minute boat course.','Eat steamed eel (seiro-mushi) for lunch.','Visit the Ohana residence and garden.']},
  karatsu:{w:'A hilltop castle over Karatsu Bay, reached through a town of pottery kilns and old merchant houses.',
    s:'From the top you see the pine avenue of Niji-no-Matsubara curving along the bay — one of Kyushu’s classic views.',
    t:['Climb the castle keep.','Walk or cycle Niji-no-Matsubara.','See the Kunchi festival floats at the hall below.']},
  'moji-port':{w:'The Meiji-era port district of Moji, with red-brick warehouses, a retro station and a lift bridge over the strait.',
    s:'It faces Honshu across the water, so the view is of another island, and the architecture is a rare survival of Japan’s first industrial ports.',
    t:['Look at Mojiko station’s restored interior.','Walk the Blue Wing lift bridge.','Eat yaki-curry at the retro food hall.']},
  'moji-tower':{w:'A 31st-floor glass observation room in a tower block at the edge of the retro district.',
    s:'The strait, the bridge and the Honshu shoreline fill the window, and the ticket is only ¥300.',
    t:['Go up for the strait view.','Stay for the container ships.','Walk back through the warehouses at dusk.']},
  'kokura-castle':{w:'A reconstructed castle above the Murasaki River, with a lively interior of interactive exhibits.',
    s:'The keep is a museum rather than a ruin, but the garden beside it and the river walk are calm and free.',
    t:['Climb the keep for the city view.','Walk the free garden next door.','Continue to Tanga market for lunch.']},
  'tanga-market':{w:'A scruffy, wonderful covered market in Kokura, running since the war, with fish, pickles and cooked food at the counter.',
    s:'It is one of the few markets in Japan where the stalls cook what they sell and hand it over the counter — croquettes, grilled fish, oden.',
    t:['Eat a croquette while it is hot.','Buy grilled fish for the train.','Walk five minutes to Kokura Castle.']},
  'kumamoto-castle':{w:'One of Japan’s three great castles, founded in 1607 and reopened after the 2016 earthquakes.',
    s:'The curved stone walls are immense, and the rebuilt Honmaru palace gives a sense of the interior that most castle ruins lack.',
    t:['Walk the full Honmaru circuit.','Climb the keep for the view over the city.','Eat at Josaien at the foot of the walls.']},
  suizenji:{w:'A strolling garden built in 1632 around a spring-fed pond, with miniature mountains copied from the Tokaido road.',
    s:'The conical mound is a miniature Mount Fuji, and the tea house serves matcha on the water.',
    t:['Walk the pond loop slowly.','Have matcha at the lakeside tea house.','Look for the miniature Fuji at the far end.']},
  sakuranobaba:{w:'A rebuilt castle-town lane of food stalls and craft shops at the foot of Kumamoto Castle.',
    s:'It is unashamedly for visitors, but the food is local and the castle view from the square is excellent.',
    t:['Try the horse-meat croquette.','Buy a Kumamoto craft souvenir.','Walk up to the castle from here.']},
  shimotori:{w:'Kumamoto’s main covered shopping street, a long arcade of shops, ramen counters and bars.',
    s:'It is where the city actually shops, and the side alleys hold some of the best cheap eating in Kyushu.',
    t:['Walk the arcade from end to end.','Eat Kumamoto ramen in a side alley.','Take the tram back to the station.']},
  'nagasaki-peace':{w:'The memorial ground at the hypocenter of the 1945 atomic bombing, with the Peace Statue and the fountain.',
    s:'The statue points to the sky and the museum next door is small, direct and devastating.',
    t:['See the Peace Statue and the hypocenter marker.','Spend an hour in the Atomic Bomb Museum.','Walk down to the Urakami cathedral ruins.']},
  'glover-garden':{w:'The Western merchant houses of Nagasaki’s foreign settlement, moved onto a hillside above the harbour.',
    s:'The view over the bay is the best in the city, and the houses show how Europeans lived here in the Meiji era.',
    t:['Take the escalator up, walk down.','Find the heart-shaped stone in the paving.','Stay for the harbour view at sunset.']},
  meganebashi:{w:'A 1643 stone bridge whose two arches reflect in the river as a pair of spectacles.',
    s:'It survived the atomic bombing and is now the centre of a small riverside walk with stone embankments.',
    t:['Photograph the reflection from the downstream bank.','Find the heart-shaped stone in the wall.','Walk the river path towards Shinchi.']},
  shinchi:{w:'Japan’s oldest Chinatown, four streets of restaurants behind painted gates.',
    s:'Champon and sara udon were invented in Nagasaki, and this is where to eat both.',
    t:['Eat champon at a counter restaurant.','Try sara udon, the crisp-noodle version.','Buy a steamed bun from a street stall.']},
  'beppu-jigoku':{w:'Seven geothermal pools around Beppu, coloured by minerals and far too hot to bathe in.',
    s:'Umi Jigoku’s cobalt-blue pool and the blood-red Chinoike Jigoku are the two that stay with you.',
    t:['Buy the combined ticket for all seven.','See Umi Jigoku and Chinoike Jigoku at minimum.','Try an onsen egg cooked in the steam.']},
  'beppu-onsen':{w:'A 1938 bathhouse in central Beppu, with a tiled hall, a sand bath and almost no changes since it opened.',
    s:'The sand bath — you are buried in warm sand by attendants — is the reason to come, and it costs ¥1,500.',
    t:['Take the sand bath, then wash.','Look at the tiled main hall.','Walk the onsen town afterwards.']},
  'beppu-ropeway':{w:'A gondola to the summit of Mount Tsurumi, 1,375 m above the bay.',
    s:'The whole of Beppu, its steam and the bay appear at once, and the summit path is a short loop.',
    t:['Ride up and walk the summit loop.','Look for the steam rising across the city.','Come down before the last gondola.']},
  kinrin:{w:'A small lake fed by hot springs at the top of Yufuin’s shopping lane, steaming at dawn.',
    s:'The mist on the water in the early morning, with Mount Yufu behind, is the image everyone comes for.',
    t:['Arrive before 08:00 for the mist.','Walk the short lake loop.','Coffee at a lakeside café.']},
  yunotsubo:{w:'The lane from Yufuin station to Lake Kinrin, lined with croquette shops, bakeries and craft stores.',
    s:'It is a shopping street that has kept its scale — low buildings, small makers, and a view of the mountain between them.',
    t:['Eat a menchi-katsu croquette.','Buy a roll cake from the famous shop.','Walk to the lake at the top.']},
  sakurajima:{w:'An active volcano across Kagoshima Bay, reached by a 15-minute ferry that runs all night.',
    s:'Lava paths, ash-black slopes and the Yunohira lookout, with the city and the bay on the other side.',
    t:['Take the ferry and hire a car or bus pass.','Walk the lava path near the visitor centre.','Go up to the Yunohira lookout.']},
  senganen:{w:'A Shimazu clan garden laid out in 1658, framing the volcano across the water.',
    s:'The borrowed landscape of Sakurajima is the whole design, and the iso garden by the sea is a national scenic site.',
    t:['Stand at the main viewpoint over the volcano.','Walk the iso garden by the shore.','Taste shochu at the Sengan-en shop.']},
  tenmonkan:{w:'Kagoshima’s downtown grid of arcades, shochu bars and black-pork restaurants.',
    s:'It is a working city centre with excellent cheap eating, and the shochu selection is the best in Japan.',
    t:['Walk the arcade in the evening.','Eat black pork (kurobuta) tonkatsu.','Try a shochu flight at a bar.']},
  'hiroshima-dome':{w:'The Genbaku Dome, a ruined exhibition hall kept as it stood after the 1945 bombing, and the Peace Memorial Park around it.',
    s:'The park is a sequence rather than a single sight: the dome, the cenotaph, the flame and the museum.',
    t:['Walk the park from the dome to the museum.','Spend an hour in the Peace Memorial Museum.','Cross the river for the view back.']},
  itsukushima:{w:'The shrine on Miyajima whose torii appears to float at high tide, 25 minutes by ferry from Hiroshima.',
    s:'The gate and the shrine buildings stand in the water, and the island behind is a wooded pilgrimage path.',
    t:['Check the tide table first.','Walk out to the gate at low tide.','Ride the ropeway up Mount Misen.']},
  shukkeien:{w:'A 1620 strolling garden of miniature valleys and ponds, five minutes from Hiroshima Station.',
    s:'It was built as a reduced landscape — the name means “contracted scenery” — and it is a quiet hour in a busy city.',
    t:['Walk the pond loop.','Have matcha at the tea house.','Visit the prefectural art museum next door.']},
  'huis-ten-bosch':{w:'A full-scale recreation of a Dutch town on the Sasebo coast, with canals, windmills and museums.',
    s:'It is enormous, unashamedly artificial, and at night the illumination is one of Japan’s largest.',
    t:['Rent a bike or take the canal boat.','Stay for the evening illumination.','Check the seasonal flower and light events.']},
  kujukushima:{w:'Two hundred wooded islands in the bay off Sasebo, best seen from a sightseeing boat or the Pearl Sea lookout.',
    s:'The islands are uninhabited and the water is calm, so the boat trip is gentle and the viewpoints are famous.',
    t:['Take the Kujukushima sightseeing boat.','Go up to the Pearl Sea lookout.','Visit the aquarium at the same complex.']}
};
