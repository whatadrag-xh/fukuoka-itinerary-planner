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
  blurb:'Two hundred wooded islands in the bay — best from a sightseeing boat or the Pearl Sea lookout.'},

 /* ---- Fukuoka city, second layer (guide-book favourites) ---- */
 {id:'machiya', name:'Hakata Machiya Folk Museum', jp:'博多町家ふるさと館', area:'hakata', cats:['art','shopping'], lat:33.5941, lon:130.4104,
  dwell:45, fee:200,
  blurb:'A Meiji-era townhouse and workshop row beside Kushida Shrine: Hakata weaving, dolls and festival crafts made in front of you.',
  tip:'¥200, closed on the 4th Monday. The shop upstairs sells the dolls you watched being painted.'},

 {id:'jotenji', name:'Jotenji Temple', jp:'承天寺', area:'hakata', cats:['temple'], lat:33.5962, lon:130.4145,
  dwell:25, fee:0,
  blurb:'The Zen temple where, by tradition, udon and soba were first made in Japan — a mossy, near-empty compound five minutes from the station.',
  tip:'Free, and usually you will be the only visitor. The stone gate and the garden behind it are the reason to come.'},

 {id:'reisen', name:'Reisen Park & Korokan', jp:'冷泉公園・鴻臚館跡', area:'nakasu', cats:['nature','art'], lat:33.5932, lon:130.4069,
  dwell:30, fee:0,
  blurb:'A small riverside park over the excavated foundations of Korokan, the 7th-century guest house for Chinese and Korean envoys.',
  tip:'The excavation exhibit under the park is free. Cherry trees here are among the first to open in the city.',
  photo:'img/reisen-park.jpg'},

 {id:'rakusuien', name:'Rakusuien Garden', jp:'楽水園', area:'hakata', cats:['nature'], lat:33.5866, lon:130.4091,
  dwell:30, fee:100,
  blurb:'A pocket garden of ponds and tea rooms built on a merchant’s villa, two minutes from Hakata Station and almost always quiet.',
  tip:'¥100 including a bowl of matcha on some days. Look for the carp window in the tea house.'},

 {id:'daimyo', name:'Daimyo backstreets', jp:'大名', area:'tenjin', cats:['shopping','food'], lat:33.5883, lon:130.3963,
  dwell:60, fee:0,
  blurb:'Fukuoka’s independent quarter: coffee roasters, record shops, vintage clothing and small bars in a grid of back streets behind Tenjin.',
  tip:'Best between 11:00 and 19:00. The coffee is the local obsession — order a morning set before 11.'},

 {id:'chikagai', name:'Tenjin Chikagai', jp:'天神地下街', area:'tenjin', cats:['shopping','food'], lat:33.5891, lon:130.3991,
  dwell:45, fee:0,
  blurb:'An underground street of shops and bakeries under Tenjin, decorated with ironwork and brick — the rain-proof way between the department stores.',
  tip:'It links Tenjin, Tenjin-Minami and Nishitetsu-Fukuoka stations, so you can cross the whole district without going outside.',
  photo:'img/tenjin-chikagai.jpg'},

 {id:'porttower', name:'Hakata Port Tower', jp:'博多ポートタワー', area:'bay', cats:['view'], lat:33.6041, lon:130.4027,
  dwell:30, fee:0,
  blurb:'A free 70 m observation deck over the ferry terminal and the bay, ten minutes from Hakata Station by bus.',
  tip:'Free, closed Mondays. The Bayside Place fish market downstairs is where the ferries to the islands leave.',
  photo:'img/port-tower.jpg'},

 {id:'markis', name:'Mark Is Fukuoka Momochi', jp:'マークイズ福岡ももち', area:'momochi', cats:['shopping','food'], lat:33.5901, lon:130.3582,
  dwell:60, fee:0,
  blurb:'The mall beside the PayPay Dome, with a rooftop terrace facing the tower — the easiest rainy-day stop in Seaside Momochi.',
  tip:'The rooftop and the food floor face the bay. Combine it with the tower and the beach walk.'},

 {id:'marineworld', name:'Marine World Uminonakamichi', jp:'マリンワールド海の中道', area:'bay', cats:['nature'], lat:33.6628, lon:130.3656,
  dwell:120, fee:2500,
  blurb:'A seaside aquarium built into the hill, with a tunnel tank of Kyushu’s open-ocean fish and a dolphin show over the bay.',
  tip:'¥2,500. JR to Uminonakamichi then a 10-minute walk; the park next door is free to enter.',
  photo:'img/marine-world.jpg'},

 {id:'gokoku', name:'Gokoku Shrine', jp:'福岡縣護国神社', area:'ohori', cats:['temple'], lat:33.5829, lon:130.3849,
  dwell:25, fee:0,
  blurb:'A large, sober shrine in the castle park, with a long stone approach and a quiet precinct of old trees.',
  tip:'Free. Walk out through Maizuru Park to the castle ruins — the cherry tunnel is the city’s best in late March.',
  photo:'img/gokoku-shrine.jpg'},

 {id:'hakataza', name:'Hakataza Theatre', jp:'博多座', area:'nakasu', cats:['art'], lat:33.5921, lon:130.4036,
  dwell:90, fee:0,
  blurb:'The city’s kabuki and musical theatre, on the river in Nakasu, with a single large auditorium and a bento-and-tea interval.',
  tip:'Tickets sell out months ahead for kabuki. Single-act seats go on sale on the morning.'},

 {id:'station', name:'Hakata Station & ekiben', jp:'博多駅', area:'hakata', cats:['shopping','food'], lat:33.5898, lon:130.4207,
  dwell:40, fee:0,
  blurb:'The rail hub and its basement food hall: ekiben, mentaiko, sweets and the city’s densest concentration of lunch counters.',
  tip:'The ekiben counter on the shinkansen concourse opens at 6:30 — buy before you board for a day trip.',
  photo:'img/hakata-station.jpg'},

 /* ---- Dazaifu, second layer ---- */
 {id:'komyozenji', name:'Komyozenji Temple', jp:'光明禅寺', area:'dazaifu', cats:['temple','nature'], lat:33.5192, lon:130.5344,
  dwell:30, fee:200,
  blurb:'A Zen temple two minutes behind Tenmangu with two small stone gardens — moss, raked gravel and maples, and almost nobody in them.',
  tip:'¥200, cash. The rear garden is at its best in November; photography is allowed but keep it quiet.'},

 {id:'starbucks', name:'Starbucks Dazaifu', jp:'スターバックス 太宰府天満宮表参道店', area:'dazaifu', cats:['food'], lat:33.5218, lon:130.5346,
  dwell:20, fee:0,
  blurb:'Kengo Kuma’s timber-lattice coffee shop on the shrine approach: 2,000 cedar beams woven through a narrow slot of a building.',
  tip:'It is a real Starbucks, so the queue moves. Sit at the long counter at the back to see the lattice.'},

 {id:'kaidanin', name:'Kaidan-in', jp:'戒壇院', area:'dazaifu', cats:['temple'], lat:33.5163, lon:130.5328,
  dwell:20, fee:0,
  blurb:'The ordination hall of old Dazaifu, with a bronze Buddha cast in 1444 and a courtyard of plum trees.',
  tip:'Free and usually empty. It is five minutes from Komyozenji, so walk both together.'},

 /* ---- Itoshima, second layer ---- */
 {id:'keya', name:'Keya no Oto', jp:'芥屋の大門', area:'itoshima', cats:['nature','view'], lat:33.5817, lon:130.0503,
  dwell:60, fee:0,
  blurb:'A basalt sea cave on the Itoshima coast, reached by a short sightseeing boat under a cliff of columnar rock.',
  tip:'The boat runs roughly 09:00–17:00, weather permitting, around ¥1,000. Buses out here are infrequent — check the return time.'},

 {id:'sakurai-shrine', name:'Sakurai Shrine', jp:'櫻井神社', area:'itoshima', cats:['temple'], lat:33.5384, lon:130.1841,
  dwell:25, fee:0,
  blurb:'A cedar-shaded shrine on the old road to the coast, with a thatched worship hall and a spring the locals bottle.',
  tip:'Free. Pair it with Sakurai Futamigaura, ten minutes further towards the sea.'},

 {id:'itoshima-stand', name:'Itoshima farm stands', jp:'糸島の直売所', area:'itoshima', cats:['market','food'], lat:33.5570, lon:130.2050,
  dwell:40, fee:0,
  blurb:'Roadside stands along the coastal road selling strawberries, new potatoes, oysters in season and ice cream made that morning.',
  tip:'Cash only, and the best stalls sell out by midday. Strawberry season runs roughly December to May.'},

 /* ---- Yanagawa, second layer ---- */
 {id:'ohana', name:'Ohana', jp:'御花', area:'yanagawa', cats:['art','nature'], lat:33.1615, lon:130.4033,
  dwell:60, fee:700,
  blurb:'The Tachibana family’s Edo-period mansion and garden, with a drawing room of painted screens facing a pond of carp.',
  tip:'¥700 for the garden and the Ohana reference room. The restaurant serves the local unagi seiro-mushi.'},

 {id:'yanagawa-castle', name:'Yanagawa Castle Ruins', jp:'柳川城跡', area:'yanagawa', cats:['art','nature'], lat:33.1625, lon:130.4005,
  dwell:25, fee:0,
  blurb:'Only the moats and earthworks remain of the castle, now a quiet park of pines and water where the boat tours pass.',
  tip:'Free. It is on the canal route, so ask the boatman to stop rather than walking back.'},

 /* ---- Karatsu, second layer ---- */
 {id:'karatsu-kunchi', name:'Karatsu Kunchi Hall', jp:'唐津くんちの館', area:'karatsu', cats:['art'], lat:33.4503, lon:129.9686,
  dwell:30, fee:310,
  blurb:'The festival float hall: fourteen enormous lacquered lions, helmets and dragons carried through town every November.',
  tip:'¥310. The floats are the size of a small house — the hall exists so you can see them without the crowds.'},

 {id:'niji', name:'Niji-no-Matsubara', jp:'虹の松原', area:'karatsu', cats:['nature'], lat:33.4468, lon:130.0135,
  dwell:45, fee:0,
  blurb:'A four-kilometre avenue of black pines planted in the 17th century to shelter the road — one of Japan’s three great pine groves.',
  tip:'Free. The JR Chikuhi line runs through it, so the train window is a legitimate way to see it.',
  photo:'img/niji-matsubara.jpg'},

 {id:'former-karatsu-bank', name:'Former Karatsu Bank', jp:'旧唐津銀行', area:'karatsu', cats:['art'], lat:33.4479, lon:129.9703,
  dwell:25, fee:0,
  blurb:'A 1912 bank of brick and copper domes, built by a disciple of the architect of Tokyo Station, now a small museum.',
  tip:'Free, closed Mondays. It is two minutes from the castle park and makes a good rainy stop.'},

 /* ---- Kitakyushu, second layer ---- */
 {id:'sarakura', name:'Mount Sarakura', jp:'皿倉山', area:'kitakyushu', cats:['view'], lat:33.8510, lon:130.7900,
  dwell:90, fee:1230,
  blurb:'A cable car and slope car up to a 622 m deck with the whole industrial bay below — one of Japan’s new three great night views.',
  tip:'¥1,230 return. Go up an hour before sunset and come down after dark; the last car leaves around 22:00.', photo:'img/sarakura.jpg'},

 {id:'kawachi', name:'Kawachi Wisteria Garden', jp:'河内藤園', area:'kitakyushu', cats:['nature'], lat:33.7930, lon:130.7300,
  dwell:60, fee:1500,
  blurb:'Tunnels of wisteria in purple, white and pink, open only in late April and early May — the photographs are not exaggerated.',
  tip:'Timed tickets are required in season and sell out. Outside those two weeks the garden is closed.', photo:'img/kawachi.jpg'},

 /* ---- Nagasaki, second layer ---- */
 {id:'dejima', name:'Dejima', jp:'出島', area:'nagasaki', cats:['art'], lat:32.7437, lon:129.8730,
  dwell:60, fee:510,
  blurb:'The fan-shaped artificial island where the Dutch were confined for two centuries — rebuilt streets, warehouses and rooms.',
  tip:'¥510. It is a 5-minute walk from the tram stop, and the restored buildings are best seen slowly.', photo:'img/dejima.jpg'},

 {id:'inasayama', name:'Mount Inasa', jp:'稲佐山', area:'nagasaki', cats:['view'], lat:32.7487, lon:129.8483,
  dwell:75, fee:1250,
  blurb:'The ropeway to the 333 m summit, with the harbour and the whole lit city in a bowl below — Nagasaki’s classic night view.',
  tip:'¥1,250 return by ropeway, or a bus to the top for less. Go for dusk and stay for the lights.', photo:'img/inasayama.jpg'},

 /* ---- Beppu, Yufuin, Kagoshima ---- */
 {id:'beppu-sand', name:'Beppu Beach Sand Bath', jp:'別府海浜砂湯', area:'beppu', cats:['nature'], lat:33.2790, lon:131.5060,
  dwell:60, fee:1500,
  blurb:'Lie in a trench dug on the beach while hot spring water is shovelled over you, with the bay a metre away.',
  tip:'About ¥1,500 including towel and gown. Bring nothing valuable — you are buried for ten minutes.', photo:'img/beppu-sand.jpg'},

 {id:'floral-village', name:'Yufuin Floral Village', jp:'湯布院フローラルビレッジ', area:'yufuin', cats:['shopping','food'], lat:33.2653, lon:131.3747,
  dwell:40, fee:0,
  blurb:'A small Cotswold-style lane of shops on the way to the lake — honey, owl cafés, cream puffs and a lot of photographs.',
  tip:'Free to walk. It sits halfway along Yunotsubo Kaido, so it is a stop rather than a destination.', photo:'img/floral-village.jpg'},

 {id:'shiroyama', name:'Shiroyama Park', jp:'城山公園', area:'kagoshima', cats:['nature','view'], lat:31.5976, lon:130.5493,
  dwell:45, fee:0,
  blurb:'The hill above the city where Saigo’s last stand took place, now a wooded park with the volcano across the bay.',
  tip:'Free. The Shiroyama observatory bus runs from Tenmonkan; the walk up takes about 25 minutes.', photo:'img/shiroyama.jpg'},

 /* ---- Hiroshima, second layer ---- */
 {id:'hiroshima-castle', name:'Hiroshima Castle', jp:'広島城', area:'hiroshima', cats:['art','view'], lat:34.4025, lon:132.4594,
  dwell:60, fee:370,
  blurb:'The reconstructed keep of the Mori clan, on its moat ten minutes from the Peace Park, with a museum of the castle town inside.',
  tip:'¥370 for the keep. The grounds and moat walk are free and much quieter than the Peace Park.', photo:'img/hiroshima-castle.jpg'},

 {id:'okonomimura', name:'Okonomi-mura', jp:'お好み村', area:'hiroshima', cats:['food'], lat:34.3915, lon:132.4593,
  dwell:60, fee:0,
  blurb:'A three-storey building of okonomiyaki counters, each with its own cook and its own version of the Hiroshima layered style.',
  tip:'Pick a floor at random and sit at a counter with locals. Cash, and expect a short queue at lunch.', photo:'img/okonomimura.jpg'},

 /* ---- Sasaguri ---- */
 {id:'sasaguri-pilgrimage', name:'Sasaguri pilgrimage trail', jp:'篠栗四国八十八ヶ所', area:'sasaguri', cats:['temple','nature'], lat:33.6170, lon:130.5230,
  dwell:90, fee:0,
  blurb:'An 88-temple miniature of Shikoku’s pilgrimage, strung through the forested valleys above Sasaguri — quiet, mossy and free.',
  tip:'Start at Nanzoin and walk as much as you like; the full circuit takes days, two or three temples are enough.'}
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
   t:['Order a morning set before 11:00.','Try a single-origin pour-over at a small roaster.','Walk the back streets towards Tenjin Central Park afterwards.']},

  /* --- added from the Fukuoka city and prefecture tourist boards --- */

  {id:'mentaiju', meal:'breakfast', name:'Ganso Hakata Mentaiju', jp:'元祖博多めんたい重', area:'nakasu', img:'mentaiko',
   where:'Nishinakasu 6-15 · 5 min from Tenjin or Nakasu-Kawabata', price:'¥2,000–3,000', open:'07:00–22:30',
   rec:'A whole roll of kelp-cured mentaiko laid over rice, with the heat of the sauce chosen from four levels. Open at seven in the morning.',
   w:'A bright, modern dining room on the Nishinakasu riverside, built around one dish: mentaiju, mentaiko set on white rice lined with nori.',
   s:'It is the cleanest introduction to Fukuoka’s signature ingredient, and one of the few mentaiko specialists serving before 10 am — useful when a day trip leaves early.',
   t:['Pick the medium heat if you want to taste the roe, not the chilli.','Add tororo or an onsen egg to stretch it into a bigger breakfast.','Buy a boxed set at the counter for the train.']},

  {id:'daruma', meal:'lunch', name:'Hakata Daruma Honten', jp:'博多だるま 総本店', area:'tenjin', img:'ramen-hakata',
   where:'Watanabe-dōri 1-8-25 · 6 min from Tenjin-minami', price:'¥900–1,200', open:'11:30–01:00',
   rec:'The reference Hakata bowl since 1963: the broth has been simmered and topped up in the same iron pot for sixty years.',
   w:'A proper city ramen shop with counter and tables, always a short queue, and a menu that barely needs reading.',
   s:'The technique is called yobimodoshi — the pot is never emptied — and it gives a rounder, deeper tonkotsu than the pale Nagahama style: this is the richer end of the spectrum.',
   t:['Order ramen and a side of chashu rice.','Ask for kata (firm) noodles on the first bowl.','Come after 14:00 to skip the lunch queue.']},

  {id:'karo-udon', meal:'lunch', name:'Karo no Uron', jp:'かろのうろん', area:'hakata', img:'makino-udon',
   where:'Kamikawabatamachi 2-1 · 5 min from Nakasu-Kawabata', price:'¥600–900', open:'11:00 until the noodles run out',
   rec:'Hakata udon since 1882, in a wooden shop off the Kawabata arcade. Gobo-ten on top, clear Rausu-kombu dashi underneath.',
   w:'An old wooden building with low tables and a queue on weekends, serving soft noodles and crisp burdock tempura.',
   s:'It is the historic version of the bowl the chains copied — the dashi is cleaner and the noodles are boiled to order, which the chains do not manage at volume.',
   t:['Order gobo-ten udon.','Go at 11:00 sharp — they close when the noodles are gone.','Add a rice ball to finish the dashi.']},

  {id:'shoboan', meal:'lunch', name:'Hakata Shoboan', jp:'めんたい料理 博多 椒房庵', area:'hakata', img:'mentaiko',
   where:'JR Hakata City 9F · inside the station', price:'¥2,000–3,000', open:'11:00–16:00, 17:00–22:00',
   rec:'Mentaiko as a whole meal rather than a garnish: cod roe cured in flying-fish dashi, served with rice and small Hakata home dishes.',
   w:'A calm dining room on the ninth floor of the station building, part restaurant and part shop for the company’s mentaiko.',
   s:'Mentaiko is the souvenir everyone buys; eating it here shows what the good version tastes like before it is packed into a box.',
   t:['Order the set that lets you compare fresh and grilled mentaiko.','Try the mentaiko tamagoyaki.','It is inside the station — good for a departure-day lunch.']},

  {id:'yoshida', meal:'lunch', name:'Kappo Yoshida', jp:'割烹 吉田', area:'tenjin', img:'chazuke',
   where:'Tenjin · a few minutes from Tenjin Station', price:'¥1,500–2,500', open:'Lunch only, from 11:30',
   rec:'Tai chazuke: slices of raw sea bream on rice, green tea poured over at the table. The queue starts before it opens.',
   w:'A small counter restaurant that has been in Tenjin since 1963, with a recipe handed down inside the family.',
   s:'The dish is two ingredients and a technique — the fish is cut to order and the tea is hot enough to cook the surface as it hits the bowl.',
   t:['Get there before 11:30.','Eat a few slices raw first, then pour the tea.','Cash, and no reservations at lunch.']},

  {id:'uokura', meal:'lunch', name:'Hakata Uokura', jp:'博多 魚蔵', area:'hakata', img:'seafood-bowl',
   where:'Miyako Hotel 2F, Hakataekihigashi 2-1-1 · 3 min from Hakata Station', price:'¥1,800–3,000', open:'11:00–15:00, 17:00–23:00',
   rec:'Fish from the Genkai Sea and the Iki boats, at hotel-comfortable prices: sashimi, grilled nods, and a lunch set that is the value order.',
   w:'A second-floor dining room inside the Miyako Hotel, with a counter for sashimi and tables for the set meals.',
   s:'Fukuoka’s seafood is the reason to eat here rather than the ramen alone, and this is an easy, central place to try it without a reservation ritual.',
   t:['Take the lunch set rather than à la carte.','Ask what came in from Iki that day.','Try the nodoguro if it is on.']},

  {id:'tashu', meal:'dinner', name:'Motsunabe Tashu', jp:'もつ鍋 田しゅう 福岡大名本店', area:'tenjin', img:'motsunabe',
   where:'Daimyo 1-3-6, Flaps Building 1F · 7 min from Akasaka', price:'¥3,000–4,000', open:'17:00–24:00',
   rec:'A modern motsunabe room in Daimyo: beef offal, cabbage and garlic chives in a pot you finish with champon noodles.',
   w:'A tidy, bright shop with private booths and staff who start the pot at your table and tell you when to eat it.',
   s:'Oyama is the easy introduction; Tashu is where locals take it seriously — the offal is trimmed properly and the broth is not sweetened.',
   t:['Order the miso base and add garlic chives.','Finish with champon noodles, not rice.','Book a booth — the counter is small.']},

  {id:'toriden', meal:'dinner', name:'Tori Den Hakata', jp:'とり田 博多本店', area:'hakata', img:'mizutaki',
   where:'Shimokawabatamachi 10-5 · 5 min from Gion', price:'¥4,000–6,000', open:'17:00–23:00',
   rec:'Hakata mizutaki: chicken simmered six hours in nothing but water, then finished as a rice porridge in the same pot.',
   w:'A modern restaurant near the Gion Yamakasa streets, where the staff cook the pot at your table and pace the courses.',
   s:'Mizutaki is the dish locals are proudest of and visitors most often miss, because it is a slow, set-menu dinner rather than a bowl at a counter.',
   t:['Drink the broth before anything is added.','Keep room for the porridge at the end.','Reserve the evening before.']},

  {id:'tetsunabe', meal:'dinner', name:'Hakata Gion Tetsunabe', jp:'博多祇園鉄なべ', area:'hakata', img:'gyoza',
   where:'Gionmachi 2-20 · 3 min from Gion Station', price:'¥1,500–2,500', open:'17:00–22:30, closed Sundays',
   rec:'Bite-sized gyoza brought to the table in a cast-iron pan, still spitting, with a ponzu you mix yourself.',
   w:'A narrow, old shop with benches and a queue, serving one thing: small pork gyoza in iron pans, ten to an order.',
   s:'Hakata gyoza are small and light so you can eat them with beer; the iron pan keeps the bases crisp to the last one, which the plates elsewhere do not.',
   t:['Order two pans for two people, then more.','Mix ponzu with the chilli paste at the table.','They close on Sundays.']},

  {id:'kawataro', meal:'dinner', name:'Kawataro Nakasu', jp:'河太郎 中洲本店', area:'nakasu', img:'squid-sashimi',
   where:'Nakasu · riverside, 5 min from Nakasu-Kawabata', price:'¥4,000–8,000', open:'17:00–22:00',
   rec:'Live squid sashimi — ikezukuri — pulled from the tank and cut in front of you. The tentacles arrive later, still moving.',
   w:'A sixty-year-old seafood restaurant on the Nakasu riverfront with tanks along the wall and a menu built on what swims in them.',
   s:'Yobuko, just up the coast, is where ikezukuri was invented, and Kawataro is the city’s long-standing specialist — the flesh is translucent and sweet rather than chewy.',
   t:['Order the squid for the table, not per person.','Have the tentacles grilled when the plate comes back.','Book ahead at weekends.']},

  {id:'heisuke', meal:'dinner', name:'Sumibiyakitori Heisuke', jp:'中洲居酒屋 炭火焼鳥 平助', area:'nakasu', img:'yakitori',
   where:'Nakasu · a few minutes from Nakasu-Kawabata', price:'¥3,000–4,000', open:'18:00–01:00',
   rec:'Skewers from ¥150, grilled over binchō charcoal — the oak charcoal that perfumes the meat as much as it cooks it.',
   w:'A small izakaya counter in Nakasu with a six-skewer set for around ¥1,000 and shrimp-and-shiso rolls off the grill.',
   s:'It is the cheap, cheerful end of Fukuoka yakitori: no queue, no ceremony, and a set you can order without reading Japanese.',
   t:['Start with the six-skewer set.','Try the shrimp and shiso roll.','Ask for the charcoal-grilled chicken skin.']},

  {id:'tenjin-yatai', meal:'dinner', name:'Tenjin Yatai Street', jp:'天神屋台街', area:'tenjin', img:'nakasu',
   where:'Around Tenjin Station, the Watanabe-dōri and Showa-dōri corners', price:'¥1,500–2,500', open:'18:30–01:00',
   rec:'The other yatai district: denser around the station than Nakasu, and the place to order grilled ramen — noodles tossed in tonkotsu and sauce, then fried on the griddle.',
   w:'A ring of stalls around Tenjin station and the side streets behind it, some with eight seats and one cook.',
   s:'Grilled ramen was born at Kogane-chan in Nakasu and is now a Tenjin staple; it is the one yatai dish you will not find anywhere else in Japan.',
   t:['Order yaki-ramen at one stall and a beer at the next.','Carry cash and small notes.','Check the weather — stalls stay shut in rain.']}
];
const EAT_BY = Object.fromEntries(EAT.map(e=>[e.id,e]));

/* ---------- eating on a day trip: the meal is at the destination ----
   A lunch recommendation in Tenjin is useless on a Hiroshima day, so
   every day-trip region carries its own breakfast-free set.          */
const EAT_TRIP = [
  /* Dazaifu */
  {id:'t-dazaifu-lunch', meal:'lunch', name:'Tenmangu approach stalls', jp:'天満宮表参道', area:'dazaifu', img:'makino-udon',
   where:'The shrine approach, 5 min from Dazaifu station', price:'¥800–1,400', open:'10:00–17:00',
   rec:'Ume-gayu (plum rice porridge) and Dazaifu soba at the stalls along the approach — the local order is porridge, then a grilled cake for the walk back.',
   w:'A row of small kitchens and tea rooms between the station and the shrine, most of them selling the same two things: plum porridge and buckwheat noodles.'},
  {id:'t-dazaifu-tea', meal:'tea', name:'Umegae-mochi stalls', jp:'梅ヶ枝餅', area:'dazaifu', img:'umegae',
   where:'Along the approach · several stalls', price:'¥150 a cake', open:'09:00–17:00',
   rec:'Rice cakes grilled to order with red bean inside — crisp outside, eaten standing at the stall.',
   w:'Small stalls with a hot plate each, turning cakes by hand and selling them within a minute of the grill.'},
  {id:'t-dazaifu-dinner', meal:'dinner', name:'Dazaifu unagi houses', jp:'太宰府のうなぎ', area:'dazaifu', img:'unagi',
   where:'Around the shrine and the station', price:'¥2,500–4,500', open:'11:00–20:00',
   rec:'Charcoal-grilled eel over rice is what people eat here before the train back — a short, expensive, very good dinner.',
   w:'Several old eel restaurants sit on the shrine approach and near the station, grilling to order in lacquered boxes.'},

  /* Sasaguri */
  {id:'t-sasaguri-lunch', meal:'lunch', name:'Sasaguri soba shops', jp:'篠栗のそば処', area:'sasaguri', img:'makino-udon',
   where:'Near Nanzoin and along the valley road', price:'¥800–1,200', open:'11:00–15:00',
   rec:'Rural soba with mountain vegetables, served in converted farmhouses around the temple — lunch is part of the day out here.',
   w:'A handful of family soba restaurants in the valley, most with a few tables and a view of the forest.'},
  {id:'t-sasaguri-tea', meal:'tea', name:'Nanzoin shrine tea house', jp:'南蔵院の茶屋', area:'sasaguri', img:'umegae',
   where:'At the temple gate', price:'¥300–600', open:'09:00–16:00',
   rec:'Sweet red-bean soup and tea at the temple, eaten on a bench beside the reclining Buddha.',
   w:'A simple tea house at the temple entrance serving amazake and dango to pilgrims.'},
  {id:'t-sasaguri-dinner', meal:'dinner', name:'Back to Hakata for dinner', jp:'博多で夕食', area:'sasaguri', img:'yakitori',
   where:'Hakata Station, 30 min back on the JR line', price:'¥2,000–3,500', open:'17:00–23:00',
   rec:'Sasaguri is a half-day place: eat dinner back in Hakata, where the yakitori counters are, rather than waiting for a country kitchen to open.',
   w:'The last leg back is 30 minutes, so plan the evening in the city and keep the day trip to daylight.'},

  /* Itoshima */
  {id:'t-itoshima-lunch', meal:'lunch', name:'Itoshima oyster huts', jp:'糸島のかき小屋', area:'itoshima', img:'nigiri',
   where:'Kishi and Fukuyoshi, along the coastal road', price:'¥1,500–3,000', open:'10:00–16:00 (winter)',
   rec:'In season you grill your own oysters at a table under a tarpaulin, with the sea across the road. Out of season, grilled squid and fish set meals.',
   w:'Seasonal oyster huts open from roughly November to March on the beaches west of Maebaru; the rest of the year the same families run seafood counters.'},
  {id:'t-itoshima-tea', meal:'tea', name:'Itoshima coast cafés', jp:'糸島のカフェ', area:'itoshima', img:'latte',
   where:'Along the Sunset Road and Futamigaura', price:'¥600–1,100', open:'11:00–18:00',
   rec:'The coast road is a chain of small cafés with wooden decks facing the sea — the local ritual is coffee at sunset.',
   w:'Scattered beach cafés and bakeries between Maebaru and Futamigaura, most with parking and a view of the water.'},
  {id:'t-itoshima-dinner', meal:'dinner', name:'Ito no Umi seafood', jp:'糸島の海鮮', area:'itoshima', img:'unagi',
   where:'Fishing ports along the coast · then the JR back', price:'¥2,000–4,000', open:'11:00–20:00',
   rec:'Eat fish at the port before the last train: sea bream, squid and whatever came in that morning, at a fraction of city prices.',
   w:'Port-side restaurants at Fukuyoshi and Maebaru, mostly family-run, with a counter and a tank.'},

  /* Yanagawa */
  {id:'t-yanagawa-lunch', meal:'lunch', name:'Motoyoshiya unagi', jp:'元祖本吉屋', area:'yanagawa', img:'unagi',
   where:'Okinohata, on the canal · 10 min from Nishitetsu-Yanagawa', price:'¥3,000–5,000', open:'11:00–20:00',
   rec:'Yanagawa’s seiro-mushi eel — grilled, then steamed over rice in a wooden box — has been made at this canal-side house since 1681.',
   w:'A thatched Edo-period building over the water, where the eel is grilled then steamed and brought in a lacquered box.'},
  {id:'t-yanagawa-tea', meal:'tea', name:'Yanagawa sweets shops', jp:'柳川の甘味処', area:'yanagawa', img:'umegae',
   where:'Around the boat dock and the castle park', price:'¥400–800', open:'10:00–17:00',
   rec:'Shiruko and cold matcha in a shop facing the moat, after the boat ride.',
   w:'Old sweet shops near the canal landing, most of them with a few seats looking at the water.'},
  {id:'t-yanagawa-dinner', meal:'dinner', name:'Canal-side izakaya', jp:'川沿いの居酒屋', area:'yanagawa', img:'yakitori',
   where:'Near Nishitetsu-Yanagawa station', price:'¥2,000–3,500', open:'17:00–22:00',
   rec:'Small izakaya by the station serving river fish and local sake — or take the 48-minute train back and eat later in Tenjin.',
   w:'A short street of izakaya and yakitori counters around the station, busiest on Friday and Saturday.'},

  /* Karatsu */
  {id:'t-karatsu-lunch', meal:'lunch', name:'Yobuko squid houses', jp:'呼子のイカ', area:'karatsu', img:'nigiri',
   where:'Yobuko port, 30 min by bus from Karatsu station', price:'¥1,800–3,500', open:'11:00–15:00',
   rec:'Live squid, sliced transparent within a minute of leaving the tank — Yobuko is the port that made the dish famous.',
   w:'A row of squid restaurants around the Yobuko fish market, each with tanks at the door. The tentacles come back fried or as tempura afterwards.'},
  {id:'t-karatsu-tea', meal:'tea', name:'Karatsu-ware tea rooms', jp:'唐津焼の茶処', area:'karatsu', img:'latte',
   where:'Around Karatsu station and the castle', price:'¥500–900', open:'10:00–17:00',
   rec:'Coffee or matcha served in Karatsu-ware — the local pottery is 400 years old and the cups are the point.',
   w:'Small cafés and gallery tea rooms in the town centre, several of them inside kilns and old merchant houses.'},
  {id:'t-karatsu-dinner', meal:'dinner', name:'Karatsu fish market counters', jp:'唐津の海鮮', area:'karatsu', img:'unagi',
   where:'Near the station and the ferry terminal', price:'¥2,000–3,500', open:'11:00–20:00',
   rec:'Eat early at the market counters, then take the coastal JR line back — the last useful train leaves before 21:00.',
   w:'Family seafood restaurants around the station, with the day’s catch on a board by the door.'},

  /* Kitakyushu */
  {id:'t-kitakyushu-lunch', meal:'lunch', name:'Kokura udon shops', jp:'小倉うどん', area:'kitakyushu', img:'sukesan-udon',
   where:'Around Kokura station and the Tanga market', price:'¥500–900', open:'07:00–20:00',
   rec:'Kokura udon is softer and sweeter than the Hakata version, and the station stands sell it from early morning.',
   w:'Standing and counter udon shops in and around Kokura station, plus the market stalls a short walk away.'},
  {id:'t-kitakyushu-tea', meal:'tea', name:'Mojiko retro cafés', jp:'門司港レトロの喫茶', area:'kitakyushu', img:'latte',
   where:'Mojiko retro district, by the ferry terminal', price:'¥600–1,000', open:'10:00–18:00',
   rec:'Coffee and baked curry in the 1910s warehouses of Mojiko, with the Kanmon strait out of the window.',
   w:'A cluster of cafés in the restored port buildings, several of them in former customs and bank offices.'},
  {id:'t-kitakyushu-dinner', meal:'dinner', name:'Yahata gyoza counters', jp:'八幡の餃子', area:'kitakyushu', img:'yakitori',
   where:'Yahata and Kokura · or the 20-min Sonic back', price:'¥1,500–3,000', open:'17:00–23:00',
   rec:'Kitakyushu has its own gyoza culture — small, crisp and ordered by the dozen — and a night view to go with it if you go up Sarakurayama first.',
   w:'Smoky gyoza and yakitori counters around Yahata and Kokura stations, cheap and open late.'},

  /* Kumamoto */
  {id:'t-kumamoto-lunch', meal:'lunch', name:'Kokutei ramen', jp:'黒亭', area:'kumamoto', img:'ramen-hakata',
   where:'Near Kumamoto station · also branches downtown', price:'¥800–1,200', open:'10:30–21:00',
   rec:'Kumamoto ramen: thick noodles, garlic oil and a burnt-fried garlic chip on top. Kokutei is the counter locals name first.',
   w:'A busy ramen shop with counter seating and a short menu — ramen, gyoza, rice. Order at the ticket machine.'},
  {id:'t-kumamoto-tea', meal:'tea', name:'Ikinari dango stalls', jp:'いきなり団子', area:'kumamoto', img:'umegae',
   where:'Station shops and around Suizenji', price:'¥150–400', open:'09:00–17:00',
   rec:'Sweet potato and red bean steamed in a dough parcel — the plainest, most Kumamoto thing you can eat standing up.',
   w:'Sold at station kiosks and small sweet shops; it is steamed, not grilled, so it comes warm in paper.'},
  {id:'t-kumamoto-dinner', meal:'dinner', name:'Basashi and akaushi beef', jp:'馬刺し・あか牛', area:'kumamoto', img:'yakitori',
   where:'Shimotori arcade and around the station', price:'¥3,000–5,000', open:'17:00–23:00',
   rec:'Horse sashimi and red beef are the local evening orders; both are served raw or seared at izakaya in the arcade.',
   w:'Izakaya in the Shimotori and Kamitori arcades, most with a picture menu and a basashi set.'},

  /* Nagasaki */
  {id:'t-nagasaki-lunch', meal:'lunch', name:'Shikairo champon', jp:'四海楼', area:'nagasaki', img:'ramen-hakata',
   where:'Matsugae, above the harbour · 10 min from Oura', price:'¥1,000–1,600', open:'11:00–21:00',
   rec:'The 1899 restaurant that invented champon: pork, squid and cabbage in a milky broth, plus sara udon if you want it crisp.',
   w:'A large Chinese restaurant on the hill above the port, with a view over the bay and a menu built around two dishes.'},
  {id:'t-nagasaki-tea', meal:'tea', name:'Castella shops', jp:'カステラ', area:'nagasaki', img:'umegae',
   where:'Shinchi Chinatown and the Oura slope', price:'¥300–900', open:'09:00–18:00',
   rec:'Nagasaki castella — the Portuguese sponge the city has been baking for 400 years. Buy a thick slice, still warm.',
   w:'Bakery shops along the Chinatown streets and the slope to Glover Garden, most offering samples at the door.'},
  {id:'t-nagasaki-dinner', meal:'dinner', name:'Dejima Wharf seafood', jp:'出島ワーフの海鮮', area:'nagasaki', img:'nigiri',
   where:'Dejima Wharf, on the water', price:'¥2,500–4,500', open:'11:00–22:00',
   rec:'Fish and chips aside, the wharf restaurants do the local catch — and the terrace looks straight at the harbour lights.',
   w:'A row of restaurants on a pier by Dejima, with terraces over the water and a view of Mount Inasa.'},

  /* Beppu */
  {id:'t-beppu-lunch', meal:'lunch', name:'Beppu cold noodles', jp:'別府冷麺', area:'beppu', img:'makino-udon',
   where:'Around Beppu station', price:'¥800–1,300', open:'11:00–20:00',
   rec:'Beppu reimen: chewy cold noodles in a beef broth, a Korean-Japanese dish the city adopted and made its own.',
   w:'A handful of old noodle shops near the station, each with a slightly different broth and kimchi.'},
  {id:'t-beppu-tea', meal:'tea', name:'Jigoku-mushi pudding', jp:'地獄蒸しプリン', area:'beppu', img:'latte',
   where:'Kannawa, at the hells', price:'¥350–600', open:'09:00–17:00',
   rec:'Custard steamed over the hot springs — the set is a small glass jar of pudding and a spoon, eaten at the counter.',
   w:'Sold at the hells and at a few Kannawa shops, steamed in the same vents that cook the eggs.'},
  {id:'t-beppu-dinner', meal:'dinner', name:'Toriten and onsen steam', jp:'とり天', area:'beppu', img:'tempura',
   where:'Downtown Beppu, near the station', price:'¥1,500–3,000', open:'17:00–23:00',
   rec:'Toriten — Oita’s fried chicken tempura — with a cold beer, or a jigoku-mushi set steamed at your table.',
   w:'Izakaya and set-meal shops around Ekimae-dori, most of them with toriten on the first line of the menu.'},

  /* Yufuin */
  {id:'t-yufuin-lunch', meal:'lunch', name:'Yunotsubo croquettes and soba', jp:'湯の坪街道の食べ歩き', area:'yufuin', img:'tempura',
   where:'Yunotsubo Kaido, between the station and the lake', price:'¥400–1,300', open:'10:00–17:00',
   rec:'The lane is built for eating while walking: beef croquettes, tofu, soft ice cream and a bowl of soba when you want to sit down.',
   w:'A single shopping street running uphill from the station, lined with counters selling one thing each.'},
  {id:'t-yufuin-tea', meal:'tea', name:'Yufuin roll cake', jp:'由布院ロールケーキ', area:'yufuin', img:'latte',
   where:'Yunotsubo Kaido', price:'¥500–1,200', open:'10:00–17:00',
   rec:'The town’s famous Swiss roll, sold by the slice with coffee in a garden café behind the shops.',
   w:'Bake shops along the lane, several with a sit-down café and a view of Mount Yufu.'},
  {id:'t-yufuin-dinner', meal:'dinner', name:'Onsen-steamed set meals', jp:'湯布院の湯けむり料理', area:'yufuin', img:'sukesan-udon',
   where:'Near the station and the lake', price:'¥2,500–4,500', open:'17:00–21:00',
   rec:'Vegetables and chicken steamed over the spring vents, served with rice — Yufuin’s quiet answer to a hot-spring dinner.',
   w:'Ryokan dining rooms and a few restaurants near the station, most requiring a reservation by afternoon.'},

  /* Kagoshima */
  {id:'t-kagoshima-lunch', meal:'lunch', name:'Kurobuta tonkatsu', jp:'黒豚とんかつ', area:'kagoshima', img:'tempura',
   where:'Tenmonkan and the station', price:'¥1,300–2,200', open:'11:00–21:00',
   rec:'Kagoshima’s black pork, breaded and fried, with shredded cabbage and a sweet-savoury sauce. The local lunch order.',
   w:'Tonkatsu restaurants in Tenmonkan and at the station, most with a counter and a set with rice, soup and pickles.'},
  {id:'t-kagoshima-tea', meal:'tea', name:'Mujaki shirokuma', jp:'むじゃき 白熊', area:'kagoshima', img:'latte',
   where:'Tenmonkan arcade', price:'¥700–1,000', open:'11:00–21:00',
   rec:'Shirokuma — shaved ice piled with condensed milk and fruit, invented in this arcade and still the city’s dessert.',
   w:'A bright café in the Tenmonkan arcade with a plastic model of the ice in the window and a queue in August.'},
  {id:'t-kagoshima-dinner', meal:'dinner', name:'Kagoshima ramen and shochu', jp:'鹿児島ラーメンと焼酎', area:'kagoshima', img:'ramen-hakata',
   where:'Tenmonkan back streets', price:'¥900–2,500', open:'17:00–24:00',
   rec:'Pale pork-and-chicken broth with pickled radish, and a glass of the local sweet-potato shochu on the rocks.',
   w:'Small ramen counters and shochu bars in the Tenmonkan grid, many open past midnight.'},

  /* Hiroshima */
  {id:'t-hiroshima-lunch', meal:'lunch', name:'Okonomi-mura', jp:'お好み村', area:'hiroshima', img:'yatai2',
   where:'Shintenchi, 5 min from the Peace Park', price:'¥900–1,400', open:'11:00–22:00',
   rec:'Hiroshima okonomiyaki is layered, not mixed: batter, cabbage, pork, noodles, egg. Twenty-odd counters in one building, each with its own cook.',
   w:'A narrow building of okonomiyaki stalls on three floors, all counter seating, all cooked in front of you on a hot plate.'},
  {id:'t-hiroshima-tea', meal:'tea', name:'Momiji manju on Miyajima', jp:'もみじ饅頭', area:'hiroshima', img:'umegae',
   where:'Miyajima shopping street, by the shrine', price:'¥120–400', open:'09:00–17:00',
   rec:'Maple-leaf cakes filled with red bean, fried on a hot plate so the edges crisp — the ferry ride back tastes of them.',
   w:'Dozens of shops along the Miyajima approach; the ones frying in the window are the ones to buy from.'},
  {id:'t-hiroshima-dinner', meal:'dinner', name:'Anagomeshi before the train', jp:'あなごめし', area:'hiroshima', img:'unagi',
   where:'Around Hiroshima station, or on Miyajima', price:'¥2,000–3,500', open:'11:00–20:00',
   rec:'Salt-water eel grilled and laid over rice, in a lacquered box — the last proper meal before the shinkansen home.',
   w:'Anago restaurants at the station and on the island, most with a queue at noon and space after 18:00.'},

  /* Sasebo */
  {id:'t-sasebo-lunch', meal:'lunch', name:'Sasebo burger', jp:'佐世保バーガー', area:'sasebo', img:'yatai2',
   where:'Around Sasebo station and the arcade', price:'¥600–1,200', open:'10:00–20:00',
   rec:'The American-influenced burger Sasebo has made since the base years: hand-made patty, bacon, egg, a squirt of sauce.',
   w:'Independent burger shops across the city, each with a slightly different stack — Hikari is the best known.'},
  {id:'t-sasebo-tea', meal:'tea', name:'Huis Ten Bosch bakeries', jp:'ハウステンボスの焼き菓子', area:'sasebo', img:'latte',
   where:'Inside Huis Ten Bosch', price:'¥400–900', open:'09:00–20:00',
   rec:'Cheese cake and coffee in a Dutch-style square, with the canals and the windmill outside the window.',
   w:'Cafés and bakeries throughout the park; the ones along the harbour are the quietest.'},
  {id:'t-sasebo-dinner', meal:'dinner', name:'Lemon steak and seafood', jp:'レモンステーキ・海鮮', area:'sasebo', img:'yakitori',
   where:'Downtown Sasebo · or the Midori back to Hakata', price:'¥1,800–3,500', open:'17:00–22:00',
   rec:'Sasebo lemon steak — thin beef with a lemon-and-soy sauce — is the local dinner, and the fish is straight off the port.',
   w:'Teppan and seafood restaurants in the arcade near the station, most open until 22:00.'}
];
const EAT_TRIP_BY = Object.fromEntries(EAT_TRIP.map(e=>[e.id,e]));

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
