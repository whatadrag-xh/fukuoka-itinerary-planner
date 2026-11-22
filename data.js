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

/* ============================================================
   STATIONS — real coordinates, used by the route maps
   ============================================================ */
const STATIONS = [
  {n:'Hakata', jp:'博多駅', lat:33.59000, lon:130.42101, kind:'JR · subway · city bus'},
  {n:'Nakasu-Kawabata', jp:'中洲川端駅', lat:33.59473, lon:130.40641, kind:'Subway'},
  {n:'Gion', jp:'祇園駅', lat:33.59434, lon:130.41432, kind:'Subway'},
  {n:'Tenjin', jp:'天神駅', lat:33.59126, lon:130.39863, kind:'Subway'},
  {n:'Tenjin-minami', jp:'天神南駅', lat:33.58860, lon:130.40238, kind:'Subway'},
  {n:'Akasaka', jp:'赤坂駅', lat:33.58908, lon:130.39036, kind:'Subway'},
  {n:'Ohorikoen', jp:'大濠公園駅', lat:33.59011, lon:130.37876, kind:'Subway'},
  {n:'Nishijin', jp:'西新駅', lat:33.58373, lon:130.35946, kind:'Subway'},
  {n:'Meinohama', jp:'姪浜駅', lat:33.58371, lon:130.32510, kind:'Subway · JR'},
  {n:'Fukuoka Airport', jp:'福岡空港駅', lat:33.59732, lon:130.44818, kind:'Subway'},
  {n:'Nishitetsu-Fukuoka', jp:'西鉄福岡(天神)駅', lat:33.58925, lon:130.39942, kind:'Nishitetsu Tenjin Ōmuta line'},
  {n:'Nishitetsu-Yakuin', jp:'薬院駅', lat:33.58170, lon:130.40181, kind:'Nishitetsu'},
  {n:'Nishitetsu-Hirao', jp:'西鉄平尾駅', lat:33.57398, lon:130.40597, kind:'Nishitetsu'},
  {n:'Nishitetsu-Ohashi', jp:'西鉄大橋駅', lat:33.55920, lon:130.42647, kind:'Nishitetsu'},
  {n:'Nishitetsu-Futsukaichi', jp:'西鉄二日市駅', lat:33.50215, lon:130.51778, kind:'Nishitetsu'},
  {n:'Nishitetsu-Dazaifu', jp:'西鉄太宰府駅', lat:33.51849, lon:130.53116, kind:'Nishitetsu Dazaifu line'},
  {n:'Nishitetsu-Yanagawa', jp:'西鉄柳川駅', lat:33.16518, lon:130.41923, kind:'Nishitetsu Tenjin Ōmuta line'},
  {n:'Yoshizuka', jp:'吉塚駅', lat:33.60703, lon:130.42383, kind:'JR Kagoshima main line'},
  {n:'Takeshita', jp:'竹下駅', lat:33.56865, lon:130.43147, kind:'JR Kagoshima main line'},
  {n:'Kasuga', jp:'春日駅', lat:33.53510, lon:130.46886, kind:'JR Kagoshima main line'},
  {n:'Kurume', jp:'久留米駅', lat:33.32064, lon:130.50140, kind:'JR Kyushu Shinkansen · Kagoshima line'},
  {n:'Kokura', jp:'小倉駅', lat:33.88685, lon:130.88251, kind:'JR Sanyo Shinkansen · Kagoshima line'},
  {n:'Beppu', jp:'別府駅', lat:33.27962, lon:131.50031, kind:'JR Nippo main line'},
  {n:'Yufuin', jp:'由布院駅', lat:33.26245, lon:131.35500, kind:'JR Kyudai main line'},
  {n:'Karatsu', jp:'唐津駅', lat:33.44627, lon:129.96775, kind:'JR Chikuhi line'},
  {n:'Yanagawa', jp:'柳川駅', lat:33.1642, lon:130.4045, kind:'Nishitetsu Tenjin Ōmuta line'},
  {n:'Nagasaki', jp:'長崎駅', lat:32.75217, lon:129.86888, kind:'JR Nishi-Kyushu Shinkansen'},
  {n:'Kumamoto', jp:'熊本駅', lat:32.79032, lon:130.68897, kind:'JR Kyushu Shinkansen'},
  {n:'Kagoshima-Chuo', jp:'鹿児島中央駅', lat:31.58371, lon:130.54179, kind:'JR Kyushu Shinkansen'},
  {n:'Hiroshima', jp:'広島駅', lat:34.39739, lon:132.47584, kind:'JR Sanyo Shinkansen'},
  {n:'Sasebo', jp:'佐世保駅', lat:33.16371, lon:129.72610, kind:'JR Sasebo line'}
];

const STATION_BY = Object.fromEntries(STATIONS.map(s => [s.n, s]));

function nearestStation(lat, lon, maxKm){
  let best = null;
  for(const s of STATIONS){
    const d = haversine({lat, lon}, s);
    if(d <= (maxKm || 6) && (!best || d < best.d)) best = {s, d};
  }
  return best;
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
/* ============================================================
   RAIL — real track geometry between stations, drawn by the route maps
   Tracks: OpenStreetMap contributors (ODbL). RAILSEG holds each piece
   A|B (alphabetical, running A -> B); RAILCHAIN joins pieces into a
   journey, e.g. Tenjin -> Hakata -> Kokura.
   ============================================================ */
const RAILSEG = {
  'Akasaka|Nishitetsu-Fukuoka':[[33.58889,130.38951],[33.58924,130.39125],[33.59001,130.39463],[33.59021,130.39531],[33.59054,130.39577],[33.59074,130.39614],[33.59103,130.39741]],
  'Akasaka|Ohorikoen':[[33.58906,130.39037],[33.58859,130.38774],[33.58847,130.38641],[33.58907,130.38245],[33.58939,130.38117],[33.58981,130.37989],[33.59008,130.37875]],
  'Akasaka|Tenjin':[[33.58908,130.39036],[33.59005,130.39462],[33.59025,130.39528],[33.59058,130.39573],[33.59079,130.39612],[33.5909,130.39653],[33.59123,130.39828]],
  'Beppu|Yoshizuka':[[33.27962,131.50031],[33.28287,131.50174],[33.2922,131.50042],[33.31788,131.49918],[33.32878,131.49359],[33.33146,131.49297],[33.3433,131.49313],[33.34927,131.494],[33.35956,131.49781],[33.36132,131.49995],[33.36955,131.52288],[33.37086,131.53619],[33.36665,131.55173],[33.36718,131.55542],[33.37619,131.5622],[33.37885,131.56923],[33.38265,131.57362],[33.38536,131.57925],[33.38696,131.58073],[33.39249,131.58147],[33.39643,131.58525],[33.40134,131.5859],[33.40961,131.58146],[33.41057,131.57927],[33.41221,131.56672],[33.41221,131.55563],[33.41294,131.55329],[33.41453,131.55182],[33.41942,131.5504],[33.4263,131.54293],[33.42759,131.54044],[33.4299,131.53026],[33.4326,131.52434],[33.437,131.51894],[33.44211,131.51755],[33.44408,131.51614],[33.44697,131.50903],[33.4515,131.5005],[33.45375,131.49947],[33.46288,131.50058],[33.47438,131.4952],[33.48036,131.48807],[33.48159,131.48505],[33.48233,131.47605],[33.49014,131.46682],[33.49987,131.43853],[33.50682,131.42513],[33.51722,131.41815],[33.53617,131.41018],[33.53813,131.40786],[33.53993,131.40209],[33.54385,131.39542],[33.54557,131.39438],[33.55626,131.3916],[33.56497,131.38294],[33.56592,131.37841],[33.56427,131.34579],[33.56704,131.31629],[33.56466,131.28925],[33.57142,131.27476],[33.57232,131.26192],[33.5762,131.24913],[33.57756,131.24733],[33.58635,131.24078],[33.59311,131.23156],[33.59357,131.2291],[33.59325,131.21652],[33.59743,131.20549],[33.59763,131.19697],[33.60295,131.17647],[33.60431,131.1741],[33.60953,131.16896],[33.61917,131.14479],[33.62121,131.1358],[33.62131,131.12097],[33.62079,131.11895],[33.6176,131.11447],[33.61668,131.1121],[33.61736,131.10126],[33.6187,131.09915],[33.62168,131.0966],[33.63743,131.07192],[33.64633,131.06523],[33.65874,131.05267],[33.66484,131.04995],[33.67041,131.04361],[33.6752,131.03322],[33.67576,131.02626],[33.67698,131.02331],[33.6791,131.02153],[33.6842,131.01973],[33.70534,130.99859],[33.71313,130.98678],[33.71879,130.97678],[33.71782,130.97386],[33.69656,130.96185],[33.69364,130.96156],[33.68156,130.96407],[33.67904,130.96374],[33.67611,130.96211],[33.65114,130.93982],[33.64072,130.92237],[33.6379,130.91902],[33.63347,130.91647],[33.62424,130.91465],[33.62186,130.91317],[33.61852,130.90615],[33.61691,130.8984],[33.61275,130.88513],[33.61292,130.87679],[33.61523,130.87338],[33.61751,130.87193],[33.62558,130.8702],[33.63007,130.86603],[33.63527,130.86534],[33.64374,130.86178],[33.65137,130.85465],[33.65187,130.85288],[33.65158,130.84915],[33.65215,130.84503],[33.65032,130.83628],[33.64808,130.83026],[33.64755,130.82578],[33.64311,130.82065],[33.64216,130.8187],[33.64292,130.81094],[33.64241,130.80802],[33.63985,130.80312],[33.63345,130.79946],[33.63291,130.79838],[33.63359,130.7955],[33.63202,130.78531],[33.63341,130.77674],[33.63105,130.76844],[33.62813,130.76582],[33.62591,130.76256],[33.62018,130.76239],[33.61706,130.75763],[33.61647,130.75612],[33.61531,130.74379],[33.61644,130.73796],[33.61341,130.73269],[33.61545,130.72632],[33.6146,130.71955],[33.61528,130.71719],[33.61691,130.71582],[33.62186,130.71418],[33.62511,130.71156],[33.63871,130.6952],[33.63796,130.69226],[33.63172,130.68933],[33.62645,130.68948],[33.62527,130.6887],[33.62299,130.68535],[33.62048,130.68356],[33.59909,130.67523],[33.59306,130.67402],[33.58565,130.66788],[33.58462,130.66535],[33.58518,130.65556],[33.58672,130.65025],[33.58592,130.64388],[33.58695,130.63735],[33.59045,130.62934],[33.59455,130.62507],[33.59577,130.62109],[33.59552,130.61834],[33.59304,130.61415],[33.59194,130.60944],[33.5919,130.60322],[33.59319,130.59764],[33.59537,130.59313],[33.59881,130.58898],[33.61729,130.57353],[33.61843,130.57095],[33.61878,130.56607],[33.62166,130.55943],[33.62318,130.55316],[33.62165,130.54207],[33.624,130.53491],[33.62447,130.53087],[33.6227,130.5049],[33.61974,130.49324],[33.61648,130.48602],[33.61613,130.48144],[33.61356,130.47799],[33.61252,130.47558],[33.611,130.46577],[33.61247,130.46008],[33.61398,130.43299],[33.61063,130.42772],[33.6064,130.42401]],
  'Beppu|Yufuin':[[33.27962,131.50031],[33.27722,131.49926],[33.27572,131.49913],[33.27094,131.50098],[33.27006,131.50171],[33.26946,131.50259],[33.2689,131.50459],[33.26844,131.50848],[33.26703,131.51249],[33.26529,131.51589],[33.26409,131.52133],[33.26153,131.52882],[33.26048,131.53071],[33.25812,131.53335],[33.25728,131.53543],[33.25664,131.54198],[33.25507,131.54585],[33.25466,131.54777],[33.2552,131.55432],[33.25475,131.55895],[33.25408,131.56088],[33.25235,131.56384],[33.2511,131.56884],[33.25025,131.57342],[33.24904,131.57633],[33.24829,131.57886],[33.24757,131.58006],[33.24507,131.58259],[33.24034,131.59017],[33.23451,131.60259],[33.23253,131.60598],[33.23148,131.6087],[33.22947,131.61293],[33.22757,131.61465],[33.22576,131.61714],[33.22496,131.61794],[33.22347,131.61834],[33.22213,131.61785],[33.22042,131.61623],[33.21989,131.6152],[33.21976,131.61444],[33.21983,131.61287],[33.22055,131.61024],[33.22071,131.60791],[33.22018,131.60199],[33.21642,131.59362],[33.21422,131.59075],[33.21376,131.58942],[33.21377,131.58836],[33.21517,131.57946],[33.21669,131.57214],[33.21657,131.57024],[33.21612,131.56897],[33.21364,131.56339],[33.21147,131.56049],[33.21027,131.56002],[33.20423,131.55887],[33.20232,131.55806],[33.1987,131.55519],[33.1967,131.55264],[33.19348,131.54988],[33.19294,131.5491],[33.19261,131.54812],[33.19258,131.54708],[33.19281,131.54612],[33.19458,131.54297],[33.19597,131.53607],[33.19757,131.53338],[33.19996,131.53039],[33.20097,131.52739],[33.20112,131.5263],[33.20084,131.52447],[33.19752,131.51733],[33.19622,131.51206],[33.19622,131.50968],[33.19688,131.50728],[33.19694,131.50641],[33.19592,131.50158],[33.19627,131.49896],[33.19616,131.49793],[33.19565,131.49682],[33.19167,131.49171],[33.1913,131.49071],[33.19126,131.48935],[33.19158,131.4883],[33.19234,131.4873],[33.19534,131.48577],[33.19697,131.48439],[33.19796,131.48323],[33.19934,131.4812],[33.20003,131.47933],[33.20032,131.47822],[33.20037,131.47673],[33.20011,131.47378],[33.19965,131.4728],[33.19906,131.47219],[33.19706,131.47142],[33.19346,131.47154],[33.192,131.4706],[33.19048,131.46733],[33.18821,131.4653],[33.18612,131.46221],[33.18416,131.45713],[33.1842,131.45535],[33.18554,131.45155],[33.1857,131.45013],[33.18532,131.44878],[33.18419,131.44666],[33.18415,131.44393],[33.18452,131.44298],[33.18729,131.43845],[33.18763,131.43703],[33.18696,131.43382],[33.18732,131.42994],[33.18723,131.42838],[33.18458,131.41549],[33.18327,131.41317],[33.18302,131.41197],[33.1834,131.41021],[33.18477,131.40807],[33.18513,131.4058],[33.18508,131.40119],[33.18482,131.3979],[33.18648,131.39254],[33.1864,131.39145],[33.1857,131.38938],[33.18571,131.38827],[33.18596,131.38731],[33.18706,131.38552],[33.18739,131.38457],[33.18716,131.38181],[33.18737,131.38055],[33.18938,131.37794],[33.19118,131.37472],[33.19233,131.36824],[33.19311,131.36709],[33.19485,131.36569],[33.19541,131.36466],[33.19558,131.36383],[33.19555,131.36118],[33.19709,131.35788],[33.19727,131.35469],[33.19846,131.35063],[33.19893,131.34962],[33.2018,131.34551],[33.20356,131.34466],[33.20516,131.34277],[33.20785,131.34115],[33.21152,131.33515],[33.2155,131.33193],[33.21751,131.33146],[33.22134,131.32939],[33.22219,131.32868],[33.22337,131.32718],[33.22427,131.32656],[33.22939,131.32577],[33.23015,131.32531],[33.23196,131.32345],[33.23427,131.32308],[33.23616,131.32218],[33.23768,131.32216],[33.23962,131.32277],[33.24053,131.32382],[33.24096,131.32535],[33.24086,131.32639],[33.24012,131.32871],[33.24009,131.32953],[33.24048,131.33088],[33.24573,131.33874],[33.24832,131.34075],[33.24985,131.34413],[33.2521,131.34563],[33.25293,131.34655],[33.25362,131.34827],[33.25407,131.35164],[33.25578,131.35485],[33.25697,131.35579],[33.25917,131.35598],[33.26022,131.35587],[33.26245,131.355]],
  'Fukuoka Airport|Hakata':[[33.59732,130.44818],[33.59822,130.44473],[33.59862,130.4421],[33.59856,130.43997],[33.59841,130.43886],[33.59813,130.43778],[33.59779,130.43699],[33.59749,130.43646],[33.59673,130.4355],[33.59552,130.43452],[33.59034,130.43163],[33.58879,130.43068],[33.58847,130.43027],[33.58807,130.42937],[33.58794,130.42819],[33.58807,130.42755],[33.58836,130.42697],[33.58968,130.42528],[33.58984,130.42489],[33.59006,130.42061]],
  'Gion|Hakata':[[33.59481,130.41373],[33.59255,130.41671],[33.5917,130.41777],[33.59089,130.41868],[33.5905,130.41921],[33.59018,130.41984],[33.5901,130.42061],[33.59,130.42101]],
  'Gion|Nakasu-Kawabata':[[33.59481,130.41373],[33.59633,130.41173],[33.59653,130.41133],[33.59667,130.41091],[33.59676,130.41046],[33.59678,130.41001],[33.59661,130.40912],[33.59641,130.40856],[33.59618,130.4081],[33.59574,130.40743],[33.59428,130.40598]],
  'Gion|Yoshizuka':[[33.59434,130.41432],[33.59195,130.41739],[33.59138,130.41804],[33.59257,130.42118],[33.59611,130.42123],[33.59955,130.42143],[33.6008,130.42159],[33.60186,130.42186],[33.60337,130.42241],[33.60505,130.42322],[33.6064,130.42401]],
  'Hakata|Takeshita':[[33.59006,130.42061],[33.58979,130.42112],[33.58777,130.421],[33.58544,130.42064],[33.58426,130.42055],[33.58327,130.42056],[33.5825,130.42065],[33.58157,130.42088],[33.5809,130.42109],[33.58014,130.42142],[33.57948,130.4218],[33.5789,130.42221],[33.57783,130.42315],[33.57295,130.42771],[33.56895,130.43156]],
  'Hakata|Tenjin-minami':[[33.59,130.42101],[33.5897,130.41912],[33.58975,130.41671],[33.58986,130.41474],[33.58992,130.41438],[33.59007,130.41384],[33.59029,130.41335],[33.59176,130.41094],[33.5919,130.41059],[33.59191,130.41022],[33.59182,130.40985],[33.58865,130.40246]],
  'Hakata|Yoshizuka':[[33.59,130.42101],[33.59086,130.42118],[33.59543,130.4212],[33.60035,130.42151],[33.60186,130.42186],[33.60337,130.42241],[33.60505,130.42322],[33.6064,130.42401]],
  'Hiroshima|Kokura':[[34.39739,132.47584],[34.39984,132.4711],[34.40371,132.46884],[34.40683,132.46548],[34.40994,132.45678],[34.41024,132.45154],[34.40369,132.39019],[34.39712,132.35921],[34.39537,132.35414],[34.39049,132.34449],[34.38415,132.33634],[34.37815,132.33132],[34.35367,132.31709],[34.33584,132.30475],[34.31567,132.29201],[34.30709,132.28508],[34.3015,132.27874],[34.28201,132.25066],[34.2622,132.22547],[34.23882,132.19663],[34.23184,132.18982],[34.22525,132.18519],[34.18224,132.16037],[34.13208,132.12958],[34.12519,132.12452],[34.11944,132.11879],[34.11519,132.11332],[34.11115,132.10668],[34.10575,132.09338],[34.09402,132.03323],[34.08979,132.0193],[34.08513,132.01012],[34.06665,131.98178],[34.05643,131.95999],[34.04411,131.94321],[34.04042,131.93462],[34.03842,131.92508],[34.03787,131.90702],[34.035,131.88461],[34.03589,131.86255],[34.03373,131.84424],[34.03433,131.83487],[34.03749,131.82447],[34.04658,131.80729],[34.04914,131.80453],[34.05522,131.79991],[34.06231,131.79697],[34.06757,131.78789],[34.0674,131.7818],[34.07025,131.76561],[34.07002,131.75897],[34.07105,131.75461],[34.07167,131.74552],[34.07239,131.74242],[34.0719,131.73497],[34.07344,131.73039],[34.07587,131.72672],[34.08059,131.71488],[34.08006,131.7124],[34.0765,131.70696],[34.06954,131.7026],[34.06591,131.69644],[34.05693,131.69198],[34.05487,131.6903],[34.0533,131.68644],[34.05501,131.68125],[34.05458,131.67803],[34.05301,131.67631],[34.04899,131.67511],[34.04642,131.67317],[34.04481,131.66708],[34.04045,131.65923],[34.04063,131.65343],[34.04415,131.64821],[34.04822,131.64426],[34.04906,131.64107],[34.04788,131.63619],[34.04545,131.63197],[34.04292,131.62964],[34.0395,131.62264],[34.039,131.61855],[34.04461,131.60347],[34.05093,131.59161],[34.05265,131.58319],[34.05352,131.56687],[34.05319,131.56291],[34.04415,131.51919],[34.04648,131.51247],[34.04919,131.49592],[34.05767,131.48056],[34.06016,131.47376],[34.06295,131.46926],[34.06943,131.46249],[34.08133,131.44604],[34.09481,131.40907],[34.09569,131.402],[34.09186,131.39476],[34.08022,131.37687],[34.07472,131.37037],[34.06032,131.35613],[34.05646,131.35029],[34.05389,131.34481],[34.05174,131.33783],[34.05064,131.33079],[34.05072,131.31309],[34.05005,131.30567],[34.04876,131.30001],[34.04005,131.27272],[34.03834,131.26426],[34.0373,131.25452],[34.03721,131.24428],[34.03796,131.23532],[34.04656,131.18021],[34.0499,131.16884],[34.06381,131.13346],[34.06749,131.11871],[34.07539,131.05033],[34.07571,131.04178],[34.07496,131.03232],[34.07224,131.02022],[34.06036,130.98589],[34.05546,130.97745],[34.04849,130.97018],[34.02908,130.95677],[34.02262,130.95306],[34.01676,130.95111],[33.99728,130.94728],[33.98985,130.94792],[33.98304,130.95049],[33.96099,130.96711],[33.95947,130.96487],[33.95703,130.96406],[33.95278,130.9659],[33.94661,130.96483],[33.94452,130.96262],[33.94476,130.96119],[33.94253,130.95899],[33.93706,130.9475],[33.92997,130.94346],[33.92468,130.94315],[33.91871,130.93964],[33.91232,130.93731],[33.90749,130.93466],[33.90341,130.93137],[33.89929,130.92492],[33.89347,130.91894],[33.89246,130.91639],[33.89264,130.91052],[33.89148,130.90527],[33.88846,130.89904],[33.88539,130.89515],[33.88447,130.89183],[33.88748,130.88244]],
  'Kagoshima-Chuo|Kumamoto':[[31.58371,130.54179],[31.5854,130.53012],[31.58655,130.52573],[31.59857,130.50217],[31.60448,130.48168],[31.60753,130.47394],[31.62919,130.43718],[31.63667,130.42642],[31.68037,130.37877],[31.68526,130.37416],[31.69068,130.37019],[31.69794,130.36628],[31.78373,130.3279],[31.80137,130.31644],[31.82134,130.30985],[31.824,130.3082],[31.82839,130.30339],[31.84369,130.27962],[31.84429,130.27581],[31.84605,130.27184],[31.84616,130.26744],[31.84789,130.26433],[31.84856,130.26172],[31.84828,130.25952],[31.84637,130.25517],[31.8468,130.24835],[31.85075,130.24067],[31.85192,130.2365],[31.85441,130.23355],[31.85593,130.22967],[31.85733,130.22804],[31.86154,130.22715],[31.86546,130.22437],[31.86983,130.22482],[31.87255,130.22412],[31.87622,130.21965],[31.88183,130.21603],[31.8835,130.21639],[31.88769,130.22016],[31.89265,130.22055],[31.90899,130.22508],[31.92058,130.22256],[31.92357,130.22067],[31.93264,130.22029],[31.93869,130.21752],[31.94807,130.21799],[31.95206,130.22249],[31.95773,130.22326],[31.95945,130.22234],[31.96289,130.21724],[31.96543,130.21525],[31.96841,130.21131],[31.97199,130.2098],[31.97592,130.20503],[31.978,130.20434],[31.98321,130.20595],[31.9851,130.20557],[31.99166,130.19781],[31.99503,130.19765],[32,130.19599],[32.01168,130.19732],[32.01626,130.19874],[32.02182,130.19661],[32.03289,130.19541],[32.03467,130.19648],[32.0372,130.20277],[32.03868,130.20413],[32.04149,130.20452],[32.0464,130.20654],[32.05482,130.20616],[32.05969,130.20928],[32.06051,130.21094],[32.0615,130.22111],[32.06535,130.2249],[32.06541,130.23012],[32.06776,130.23665],[32.07117,130.24269],[32.0713,130.245],[32.06975,130.24986],[32.06503,130.25647],[32.06377,130.26015],[32.06233,130.28825],[32.06267,130.30788],[32.0672,130.31752],[32.08204,130.35597],[32.08459,130.35842],[32.08624,130.35893],[32.10449,130.35267],[32.10993,130.35203],[32.11636,130.35252],[32.12297,130.35448],[32.15039,130.36637],[32.15784,130.37096],[32.17367,130.3859],[32.19484,130.40912],[32.22044,130.44068],[32.23503,130.45373],[32.23895,130.45798],[32.24256,130.46319],[32.2485,130.47447],[32.25852,130.50184],[32.26321,130.51079],[32.26476,130.51042],[32.27427,130.50217],[32.27823,130.50038],[32.28188,130.49968],[32.28405,130.49615],[32.28528,130.4952],[32.29827,130.49484],[32.30466,130.49876],[32.30698,130.49917],[32.30855,130.49839],[32.31358,130.49364],[32.33111,130.48765],[32.33313,130.48798],[32.33942,130.49184],[32.34461,130.49927],[32.35456,130.50767],[32.35903,130.50776],[32.37736,130.50303],[32.37926,130.50317],[32.38366,130.50854],[32.38713,130.51157],[32.39122,130.51298],[32.39234,130.51724],[32.3937,130.51976],[32.40109,130.52751],[32.40639,130.53447],[32.40795,130.53767],[32.41416,130.54214],[32.42066,130.5505],[32.42271,130.55537],[32.42567,130.55852],[32.42674,130.56404],[32.43021,130.56849],[32.43068,130.57333],[32.43325,130.57856],[32.43981,130.58564],[32.44752,130.58856],[32.45661,130.59962],[32.47482,130.61189],[32.47987,130.61939],[32.48591,130.62542],[32.48868,130.63339],[32.49009,130.6347],[32.49201,130.63457],[32.49976,130.62945],[32.50595,130.61811],[32.50732,130.61702],[32.50885,130.61692],[32.51032,130.61772],[32.51131,130.61931],[32.5128,130.62663],[32.51391,130.62941],[32.51599,130.63231],[32.51846,130.63439],[32.53609,130.62682],[32.5404,130.62554],[32.54902,130.62493],[32.55583,130.62619],[32.56428,130.63015],[32.61195,130.66355],[32.61635,130.66606],[32.62257,130.66827],[32.62856,130.6691],[32.63459,130.66874],[32.63991,130.66742],[32.6538,130.66168],[32.65943,130.66072],[32.66535,130.66084],[32.67128,130.66215],[32.684,130.66703],[32.72209,130.6749],[32.73405,130.67827],[32.74807,130.68012],[32.77859,130.68611],[32.78463,130.68545],[32.79097,130.68898]],
  'Karatsu|Meinohama':[[33.44627,129.96775],[33.44526,129.97117],[33.44438,129.97268],[33.44361,129.97334],[33.43912,129.97556],[33.43803,129.9768],[33.43762,129.97778],[33.43568,129.98627],[33.43588,129.98815],[33.43905,129.99592],[33.43987,129.99906],[33.43996,130.00086],[33.43918,130.00403],[33.43916,130.0057],[33.43978,130.01023],[33.44083,130.01437],[33.44301,130.03089],[33.44359,130.03204],[33.44551,130.03419],[33.44646,130.03584],[33.44821,130.04283],[33.44872,130.04367],[33.44967,130.04441],[33.45069,130.04463],[33.45152,130.04446],[33.45695,130.04192],[33.4587,130.04026],[33.46256,130.0374],[33.46361,130.03715],[33.46527,130.03724],[33.46735,130.03813],[33.47012,130.04062],[33.47219,130.04129],[33.47429,130.04263],[33.47531,130.04282],[33.47791,130.04261],[33.47862,130.04283],[33.48015,130.04384],[33.4816,130.04436],[33.48634,130.04998],[33.4874,130.05038],[33.48966,130.05041],[33.49358,130.05209],[33.49408,130.05238],[33.49477,130.05325],[33.49554,130.05546],[33.49628,130.05861],[33.49681,130.05979],[33.49748,130.06259],[33.49888,130.06507],[33.50019,130.06669],[33.50174,130.06968],[33.50206,130.07284],[33.50125,130.0755],[33.50105,130.07704],[33.50147,130.07937],[33.50386,130.08915],[33.50499,130.09292],[33.50577,130.09485],[33.5085,130.1],[33.50888,130.10111],[33.50905,130.10256],[33.50882,130.1074],[33.50911,130.10994],[33.50882,130.11117],[33.50766,130.11286],[33.50721,130.11411],[33.50719,130.11503],[33.50761,130.11708],[33.50759,130.11931],[33.50981,130.12738],[33.51052,130.12845],[33.51195,130.12982],[33.51245,130.13078],[33.51278,130.13558],[33.51307,130.13691],[33.51388,130.13826],[33.52146,130.14641],[33.52375,130.14923],[33.53546,130.17029],[33.53677,130.17154],[33.54591,130.17838],[33.54924,130.18452],[33.55275,130.18933],[33.55506,130.19148],[33.55578,130.19248],[33.55649,130.19455],[33.55701,130.19988],[33.55767,130.20414],[33.56105,130.21456],[33.56521,130.23254],[33.57163,130.24848],[33.57267,130.2499],[33.57457,130.25102],[33.57522,130.25168],[33.57693,130.25454],[33.57761,130.2562],[33.57861,130.26422],[33.57978,130.28146],[33.58118,130.28662],[33.58133,130.28786],[33.5809,130.29002],[33.57959,130.29329],[33.57936,130.29547],[33.57798,130.30054],[33.57792,130.30214],[33.57869,130.30425],[33.58342,130.30994],[33.58414,130.31146],[33.58418,130.3157],[33.58356,130.32559]],
  'Kokura|Yoshizuka':[[33.88748,130.88244],[33.88995,130.86856],[33.8902,130.86607],[33.89015,130.86356],[33.88971,130.86082],[33.88855,130.85675],[33.886,130.85075],[33.88483,130.84853],[33.86795,130.82671],[33.86395,130.82053],[33.84547,130.78912],[33.84254,130.78461],[33.83595,130.77559],[33.8285,130.76693],[33.82134,130.75988],[33.81262,130.75215],[33.7948,130.73803],[33.79188,130.73504],[33.78876,130.73084],[33.78641,130.72653],[33.7845,130.72179],[33.78355,130.71851],[33.78114,130.70721],[33.77966,130.70236],[33.77763,130.69764],[33.7742,130.69133],[33.77151,130.68664],[33.76883,130.68286],[33.75424,130.66653],[33.75016,130.66161],[33.74685,130.65692],[33.74539,130.65446],[33.74329,130.65018],[33.74091,130.64452],[33.73919,130.63928],[33.73424,130.62001],[33.73283,130.61525],[33.72977,130.6076],[33.72624,130.60099],[33.72226,130.5952],[33.71446,130.58587],[33.71196,130.58238],[33.68786,130.53864],[33.68576,130.5352],[33.67603,130.51767],[33.67179,130.51065],[33.66657,130.50332],[33.65073,130.48324],[33.63413,130.46484],[33.62973,130.45969],[33.62726,130.45601],[33.61246,130.43015],[33.6099,130.42691],[33.6064,130.42401]],
  'Kumamoto|Kurume':[[32.79097,130.68898],[32.79596,130.69317],[32.79981,130.69412],[32.80622,130.69455],[32.81861,130.69932],[32.82148,130.69943],[32.85994,130.67781],[32.86541,130.67405],[32.87054,130.66911],[32.92272,130.6065],[32.93899,130.57848],[32.9465,130.56933],[32.98272,130.53741],[33.03823,130.49957],[33.04931,130.49402],[33.08059,130.48674],[33.09133,130.4859],[33.09749,130.4866],[33.11237,130.48992],[33.14403,130.49401],[33.17669,130.49229],[33.22781,130.50063],[33.25086,130.50137],[33.26289,130.50287],[33.28897,130.50363],[33.30808,130.50348],[33.32098,130.50104]],
  'Kurume|Nishitetsu-Ohashi':[[33.32097,130.501],[33.3246,130.50007],[33.32892,130.49757],[33.3314,130.49678],[33.34503,130.49618],[33.35811,130.49647],[33.36106,130.49593],[33.3635,130.49501],[33.37776,130.48687],[33.38582,130.48152],[33.38979,130.47835],[33.41588,130.45564],[33.41978,130.45275],[33.42621,130.44903],[33.43202,130.44667],[33.43642,130.44547],[33.44026,130.44476],[33.44449,130.4444],[33.45115,130.44435],[33.46175,130.44469],[33.47835,130.44781],[33.48178,130.44792],[33.48621,130.44754],[33.49181,130.44594],[33.50144,130.44154],[33.50427,130.44049],[33.52907,130.43316],[33.53128,130.43269],[33.53493,130.43246],[33.53965,130.43307],[33.54715,130.43463],[33.5544,130.4366],[33.55462,130.43646],[33.55659,130.43113],[33.55919,130.42646]],
  'Kurume|Takeshita':[[33.32098,130.50104],[33.3246,130.50011],[33.32924,130.49748],[33.33142,130.49683],[33.34597,130.49622],[33.35768,130.49655],[33.36062,130.4961],[33.36353,130.49505],[33.37778,130.48691],[33.38585,130.48155],[33.38981,130.47839],[33.4159,130.45568],[33.4198,130.4528],[33.42622,130.44908],[33.43031,130.44734],[33.43437,130.44604],[33.43846,130.44509],[33.44449,130.44445],[33.45819,130.44454],[33.46482,130.44518],[33.47754,130.44778],[33.48113,130.44801],[33.48503,130.44778],[33.48794,130.44724],[33.49175,130.44601],[33.50374,130.44072],[33.53066,130.43285],[33.53424,130.43251],[33.53763,130.43278],[33.54721,130.43469],[33.55363,130.43651],[33.55684,130.43676],[33.5602,130.43622],[33.5643,130.43457],[33.56716,130.43309],[33.56895,130.43156]],
  'Kurume|Yanagawa':[[33.32098,130.50104],[33.30989,130.5033],[33.30005,130.50345],[33.29995,130.50272],[33.29924,130.5011],[33.29763,130.49882],[33.28883,130.49174],[33.28167,130.484],[33.28089,130.48267],[33.27896,130.47804],[33.27789,130.47646],[33.27704,130.47573],[33.27561,130.47513],[33.27312,130.47481],[33.25798,130.47009],[33.25474,130.46876],[33.24491,130.46086],[33.21427,130.44192],[33.20494,130.43404],[33.18872,130.42193],[33.17912,130.41641],[33.17683,130.41559],[33.17408,130.4157],[33.17257,130.41607],[33.16833,130.41787],[33.1642,130.4045]],
  'Kurume|Yufuin':[[33.32098,130.50104],[33.3099,130.50339],[33.30087,130.50406],[33.29942,130.50632],[33.29829,130.51933],[33.30238,130.5312],[33.30931,130.543],[33.3109,130.54779],[33.31303,130.56512],[33.31246,130.56918],[33.31285,130.58665],[33.31459,130.59336],[33.31963,130.60407],[33.32234,130.64526],[33.32841,130.67278],[33.33007,130.67728],[33.33668,130.68724],[33.34098,130.69811],[33.34134,130.74854],[33.33991,130.76471],[33.33438,130.78113],[33.33576,130.79414],[33.34708,130.8097],[33.3475,130.81186],[33.34706,130.81914],[33.34615,130.82192],[33.34031,130.83255],[33.34019,130.83492],[33.3415,130.83997],[33.33865,130.8497],[33.33509,130.85305],[33.32894,130.85606],[33.32212,130.86491],[33.31652,130.86789],[33.31418,130.87017],[33.31217,130.87427],[33.31284,130.88356],[33.31394,130.88968],[33.31797,130.89375],[33.32063,130.89852],[33.32541,130.90256],[33.32741,130.90721],[33.32763,130.92191],[33.32846,130.92679],[33.32815,130.92847],[33.3137,130.9419],[33.31179,130.94707],[33.3071,130.95022],[33.30507,130.95279],[33.30416,130.95576],[33.30356,130.96468],[33.29866,130.97091],[33.29629,130.97266],[33.29092,130.9873],[33.28845,130.99033],[33.28747,130.99455],[33.28766,130.99763],[33.2867,131.00434],[33.28023,131.00852],[33.27773,131.00887],[33.2726,131.00782],[33.26866,131.01057],[33.25925,131.01366],[33.25662,131.0166],[33.25445,131.02034],[33.25495,131.02427],[33.25437,131.02858],[33.25854,131.04275],[33.25881,131.05087],[33.26094,131.0572],[33.26404,131.06148],[33.26459,131.06621],[33.26754,131.06969],[33.26855,131.07795],[33.26932,131.07945],[33.27419,131.08399],[33.27693,131.08491],[33.28016,131.088],[33.28253,131.09259],[33.28269,131.0953],[33.28192,131.09968],[33.28237,131.10441],[33.28072,131.11287],[33.27804,131.12218],[33.27847,131.12374],[33.28231,131.12861],[33.28318,131.13171],[33.28377,131.13611],[33.28351,131.14052],[33.28483,131.14838],[33.2844,131.15095],[33.27838,131.16684],[33.27099,131.17362],[33.26552,131.17688],[33.26325,131.17738],[33.2604,131.17684],[33.25439,131.17422],[33.2408,131.1726],[33.2384,131.17435],[33.23736,131.17778],[33.23476,131.1808],[33.23025,131.18262],[33.22585,131.18799],[33.22459,131.1911],[33.22496,131.19447],[33.22648,131.19886],[33.22581,131.20456],[33.22634,131.21153],[33.22756,131.2127],[33.2309,131.21398],[33.23351,131.21792],[33.23819,131.22178],[33.2418,131.22734],[33.24288,131.23741],[33.24125,131.24134],[33.24108,131.2447],[33.23983,131.24752],[33.24066,131.25441],[33.23927,131.25996],[33.23969,131.26524],[33.23859,131.27058],[33.23954,131.2737],[33.24226,131.27589],[33.24304,131.27801],[33.24141,131.30171],[33.24201,131.30322],[33.24861,131.31118],[33.25176,131.31381],[33.25388,131.32859],[33.25626,131.33133],[33.25777,131.33685],[33.26375,131.34654],[33.26452,131.3519],[33.26245,131.355]],
  'Meinohama|Nishijin':[[33.58356,130.32559],[33.58358,130.32712],[33.58329,130.3319],[33.58296,130.33477],[33.58223,130.33711],[33.58107,130.33931],[33.58089,130.34003],[33.58077,130.34132],[33.58097,130.34477],[33.5814,130.34889],[33.58187,130.35061],[33.58301,130.35737],[33.58349,130.35901],[33.58372,130.35947]],
  'Meinohama|Sasebo':[[33.58356,130.32559],[33.58414,130.31146],[33.57869,130.30425],[33.57792,130.30214],[33.57959,130.29329],[33.58133,130.28786],[33.57978,130.28146],[33.57761,130.2562],[33.57522,130.25168],[33.57163,130.24848],[33.56521,130.23254],[33.56105,130.21456],[33.55767,130.20414],[33.55649,130.19455],[33.55578,130.19248],[33.54924,130.18452],[33.54591,130.17838],[33.53546,130.17029],[33.52375,130.14923],[33.51307,130.13691],[33.51245,130.13078],[33.50981,130.12738],[33.50759,130.11931],[33.50721,130.11411],[33.50911,130.10994],[33.50888,130.10111],[33.50499,130.09292],[33.50147,130.07937],[33.50108,130.07645],[33.50209,130.07239],[33.50162,130.0693],[33.49748,130.06259],[33.49437,130.05266],[33.48966,130.05041],[33.48666,130.05017],[33.4816,130.04436],[33.47791,130.04261],[33.47429,130.04263],[33.47012,130.04062],[33.46735,130.03813],[33.46527,130.03724],[33.46256,130.0374],[33.45695,130.04192],[33.45152,130.04446],[33.45015,130.04458],[33.44872,130.04367],[33.44659,130.03611],[33.44283,130.03023],[33.44083,130.01437],[33.43916,130.0057],[33.43987,129.99906],[33.43588,129.98815],[33.43611,129.98429],[33.43447,129.98248],[33.42442,129.98746],[33.41846,129.98663],[33.41206,129.98253],[33.40585,129.97443],[33.4028,129.97376],[33.39756,129.97869],[33.3934,129.98115],[33.38904,129.98343],[33.38611,129.98342],[33.38443,129.98417],[33.37988,129.98793],[33.37783,129.99147],[33.36797,130.00051],[33.36419,130.00485],[33.36228,130.00551],[33.35909,130.00464],[33.35749,130.00327],[33.35376,129.99776],[33.35149,129.99172],[33.3471,129.99028],[33.34577,129.98922],[33.3427,129.98135],[33.33895,129.97982],[33.33737,129.97825],[33.3368,129.97294],[33.33544,129.97131],[33.33277,129.97121],[33.3294,129.97488],[33.3271,129.97547],[33.32555,129.97506],[33.3226,129.97242],[33.3179,129.97259],[33.31643,129.97402],[33.31498,129.97874],[33.31378,129.97968],[33.3122,129.97971],[33.31068,129.97924],[33.30539,129.97509],[33.30006,129.97196],[33.29141,129.97006],[33.28625,129.96968],[33.28265,129.96821],[33.28138,129.96709],[33.27905,129.96275],[33.27371,129.96043],[33.27195,129.95712],[33.27148,129.94965],[33.26676,129.93717],[33.26374,129.9318],[33.26212,129.9266],[33.26195,129.9231],[33.26056,129.91914],[33.26202,129.90917],[33.26372,129.90601],[33.26411,129.90299],[33.26571,129.89987],[33.26829,129.89667],[33.27019,129.89194],[33.26816,129.88485],[33.26882,129.88275],[33.27102,129.88071],[33.27172,129.87879],[33.27225,129.87026],[33.27082,129.86714],[33.26663,129.8632],[33.26219,129.86193],[33.25934,129.85904],[33.25308,129.85486],[33.24617,129.8533],[33.2432,129.85332],[33.23894,129.8505],[33.23254,129.85121],[33.22592,129.84757],[33.22436,129.84787],[33.21995,129.85083],[33.21609,129.85111],[33.21063,129.84998],[33.20641,129.85067],[33.19909,129.85066],[33.19742,129.8519],[33.19035,129.86212],[33.18771,129.86078],[33.18687,129.85658],[33.18576,129.85507],[33.1771,129.85211],[33.17406,129.84623],[33.16606,129.84046],[33.16303,129.83609],[33.16023,129.83485],[33.15707,129.83161],[33.14674,129.82792],[33.14484,129.82544],[33.14432,129.82333],[33.14487,129.81907],[33.14394,129.81153],[33.14487,129.8058],[33.14377,129.80247],[33.14125,129.80036],[33.14094,129.79754],[33.14197,129.79547],[33.14224,129.78966],[33.14341,129.78705],[33.15188,129.77936],[33.15422,129.77345],[33.15795,129.77112],[33.15927,129.76912],[33.16011,129.76565],[33.15997,129.76356],[33.15634,129.75624],[33.15601,129.75382],[33.15902,129.74805],[33.15901,129.7403],[33.15816,129.73677],[33.15827,129.73487],[33.16371,129.7261]],
  'Nagasaki|Nishitetsu-Ohashi':[[32.75217,129.86888],[32.75897,129.86968],[32.76638,129.87389],[32.77534,129.88219],[32.78095,129.89003],[32.78443,129.89803],[32.78625,129.90559],[32.7896,129.9523],[32.79174,129.96263],[32.79505,129.97184],[32.81443,130.00925],[32.81968,130.01767],[32.82673,130.02518],[32.83872,130.03379],[32.84506,130.04012],[32.84739,130.04145],[32.85028,130.04149],[32.86595,130.03674],[32.87197,130.03331],[32.87754,130.02842],[32.88152,130.02341],[32.88485,130.01757],[32.89403,129.99373],[32.89807,129.9861],[32.90329,129.97921],[32.91945,129.96266],[32.92282,129.96063],[32.93013,129.95867],[32.94884,129.94849],[32.9579,129.94606],[32.96443,129.94605],[32.97098,129.94748],[32.97769,129.95046],[32.99066,129.95786],[32.99994,129.9602],[33.00909,129.95964],[33.03463,129.95247],[33.04045,129.95225],[33.04744,129.9534],[33.05476,129.95641],[33.06156,129.96127],[33.06625,129.96624],[33.08262,129.98797],[33.08818,129.99285],[33.095,129.99662],[33.10204,129.99859],[33.1087,129.99889],[33.13126,129.99415],[33.14778,129.99342],[33.15453,129.99388],[33.16205,129.99561],[33.16872,129.9983],[33.18303,130.00616],[33.18781,130.00979],[33.19216,130.01531],[33.21088,130.04731],[33.21118,130.05617],[33.21655,130.07445],[33.21642,130.08127],[33.21244,130.10449],[33.21239,130.11915],[33.21291,130.12303],[33.21966,130.14813],[33.21951,130.16683],[33.22062,130.17007],[33.22821,130.18331],[33.23026,130.18449],[33.2407,130.18722],[33.24305,130.18926],[33.25367,130.21531],[33.25733,130.24158],[33.25983,130.27568],[33.26589,130.30578],[33.26773,130.30902],[33.30999,130.36151],[33.31962,130.38315],[33.32191,130.39293],[33.32688,130.40339],[33.32873,130.40583],[33.33687,130.41339],[33.33868,130.41604],[33.34253,130.43005],[33.34927,130.44789],[33.35151,130.45657],[33.35273,130.4582],[33.35652,130.46076],[33.36468,130.47081],[33.36547,130.47322],[33.36651,130.48229],[33.36974,130.49154],[33.3868,130.48083],[33.41781,130.45422],[33.424,130.45023],[33.43203,130.44673],[33.44245,130.44458],[33.45819,130.44454],[33.46482,130.44518],[33.47754,130.44778],[33.48579,130.44769],[33.49175,130.44601],[33.50374,130.44072],[33.53118,130.43275],[33.53941,130.43308],[33.55439,130.43665],[33.55919,130.42646]],
  'Nagasaki|Takeshita':[[32.75217,129.86888],[32.75897,129.86968],[32.76638,129.87389],[32.77534,129.88219],[32.78095,129.89003],[32.78443,129.89803],[32.78625,129.90559],[32.7896,129.9523],[32.79174,129.96263],[32.79505,129.97184],[32.81443,130.00925],[32.81968,130.01767],[32.82673,130.02518],[32.83872,130.03379],[32.84506,130.04012],[32.84739,130.04145],[32.85028,130.04149],[32.86595,130.03674],[32.87197,130.03331],[32.87754,130.02842],[32.88152,130.02341],[32.88485,130.01757],[32.89403,129.99373],[32.89807,129.9861],[32.90329,129.97921],[32.91945,129.96266],[32.92282,129.96063],[32.93013,129.95867],[32.94884,129.94849],[32.9579,129.94606],[32.96443,129.94605],[32.97098,129.94748],[32.97769,129.95046],[32.99066,129.95786],[32.99994,129.9602],[33.00909,129.95964],[33.03463,129.95247],[33.04045,129.95225],[33.04744,129.9534],[33.05476,129.95641],[33.06156,129.96127],[33.06625,129.96624],[33.08262,129.98797],[33.08818,129.99285],[33.095,129.99662],[33.10204,129.99859],[33.1087,129.99889],[33.13126,129.99415],[33.14778,129.99342],[33.15453,129.99388],[33.16205,129.99561],[33.16872,129.9983],[33.18303,130.00616],[33.18781,130.00979],[33.19216,130.01531],[33.21088,130.04731],[33.21118,130.05617],[33.21655,130.07445],[33.21642,130.08127],[33.21244,130.10449],[33.21239,130.11915],[33.21291,130.12303],[33.21966,130.14813],[33.21951,130.16683],[33.22062,130.17007],[33.22821,130.18331],[33.23026,130.18449],[33.2407,130.18722],[33.24305,130.18926],[33.25367,130.21531],[33.25733,130.24158],[33.25983,130.27568],[33.26589,130.30578],[33.26773,130.30902],[33.30999,130.36151],[33.31962,130.38315],[33.32191,130.39293],[33.32688,130.40339],[33.32873,130.40583],[33.33687,130.41339],[33.33868,130.41604],[33.34253,130.43005],[33.34927,130.44789],[33.35151,130.45657],[33.35273,130.4582],[33.35652,130.46076],[33.36468,130.47081],[33.36547,130.47322],[33.36651,130.48229],[33.36974,130.49154],[33.3868,130.48083],[33.41781,130.45422],[33.424,130.45023],[33.43203,130.44673],[33.44245,130.44458],[33.45819,130.44454],[33.46482,130.44518],[33.47754,130.44778],[33.48503,130.44778],[33.49175,130.44601],[33.50374,130.44072],[33.53066,130.43285],[33.53763,130.43278],[33.55684,130.43676],[33.5643,130.43457],[33.56895,130.43156]],
  'Nakasu-Kawabata|Nishitetsu-Fukuoka':[[33.5947,130.40647],[33.59311,130.40483],[33.59283,130.40449],[33.59239,130.40377],[33.59225,130.40336],[33.59151,130.4],[33.58925,130.39942]],
  'Nakasu-Kawabata|Tenjin':[[33.59428,130.40598],[33.59314,130.4048],[33.59287,130.40445],[33.59243,130.40374],[33.59229,130.40334],[33.59139,130.39927],[33.59123,130.39828]],
  'Nakasu-Kawabata|Tenjin-minami':[[33.59473,130.40641],[33.59314,130.4048],[33.59287,130.40445],[33.59243,130.40374],[33.59236,130.40372],[33.59229,130.40349],[33.58963,130.4048],[33.5886,130.40238]],
  'Nishijin|Ohorikoen':[[33.58372,130.35947],[33.58418,130.36031],[33.58555,130.36254],[33.58758,130.36552],[33.58979,130.36925],[33.5901,130.36987],[33.59024,130.37058],[33.59044,130.37363],[33.59028,130.37681],[33.59018,130.37815],[33.59008,130.37875]],
  'Nishitetsu-Dazaifu|Nishitetsu-Ohashi':[[33.51849,130.53116],[33.51687,130.53064],[33.51528,130.52974],[33.51271,130.52819],[33.51174,130.52726],[33.51078,130.52541],[33.50993,130.52276],[33.5088,130.52077],[33.5077,130.51939],[33.50657,130.51842],[33.5064,130.51507],[33.50765,130.51411],[33.50879,130.51279],[33.51819,130.49782],[33.52106,130.49137],[33.52231,130.48941],[33.53468,130.47642],[33.54554,130.46564],[33.54649,130.46442],[33.54739,130.462],[33.54926,130.44845],[33.55286,130.44183],[33.55602,130.43244],[33.55922,130.42647]],
  'Nishitetsu-Dazaifu|Takeshita':[[33.51849,130.53116],[33.51687,130.53064],[33.51528,130.52974],[33.51271,130.52819],[33.51174,130.52726],[33.51078,130.52541],[33.50993,130.52276],[33.5088,130.52077],[33.5077,130.51939],[33.50657,130.51842],[33.5064,130.51507],[33.50765,130.51411],[33.50879,130.51279],[33.51819,130.49782],[33.52106,130.49137],[33.52231,130.48941],[33.53468,130.47642],[33.54626,130.46478],[33.54701,130.46334],[33.54739,130.462],[33.54866,130.45207],[33.55025,130.45064],[33.55537,130.44722],[33.56133,130.44142],[33.56288,130.43958],[33.56708,130.43325],[33.56936,130.43064]],
  'Nishitetsu-Fukuoka|Nishitetsu-Yakuin':[[33.59151,130.4],[33.58922,130.39955],[33.58807,130.40055],[33.58611,130.40138],[33.58509,130.40158],[33.58263,130.40168],[33.5817,130.40181]],
  'Nishitetsu-Fukuoka|Tenjin-minami':[[33.58925,130.39942],[33.58817,130.40038],[33.58816,130.40163],[33.58838,130.40188],[33.58865,130.40246]],
  'Nishitetsu-Hirao|Nishitetsu-Ohashi':[[33.57415,130.40574],[33.5726,130.40767],[33.57097,130.40987],[33.56625,130.41573],[33.56155,130.42229],[33.56102,130.42317],[33.55919,130.42646]],
  'Nishitetsu-Hirao|Nishitetsu-Yakuin':[[33.57415,130.40574],[33.57507,130.40458],[33.57615,130.40343],[33.57702,130.40278],[33.57762,130.40244],[33.57857,130.40206],[33.57955,130.40181],[33.58243,130.40165]],
  'Nishitetsu-Yakuin|Tenjin':[[33.58243,130.40165],[33.58509,130.40153],[33.58611,130.40135],[33.58786,130.4006],[33.58817,130.40038],[33.58918,130.39947],[33.59126,130.39863]],
  'Nishitetsu-Yakuin|Tenjin-minami':[[33.5817,130.40181],[33.58263,130.40168],[33.58509,130.40158],[33.58611,130.40138],[33.58677,130.40111],[33.58736,130.40166],[33.58783,130.40165],[33.58811,130.40181],[33.58833,130.40206],[33.58856,130.40255]],
  'Sasebo|Takeshita':[[33.16371,129.7261],[33.15827,129.73487],[33.15816,129.73677],[33.15901,129.7403],[33.15902,129.74805],[33.15601,129.75382],[33.15634,129.75624],[33.15997,129.76356],[33.16011,129.76565],[33.15935,129.76889],[33.15795,129.77112],[33.15389,129.77385],[33.15152,129.7798],[33.1429,129.78775],[33.1422,129.78991],[33.14197,129.79547],[33.14094,129.79754],[33.14125,129.80036],[33.14377,129.80247],[33.14487,129.8058],[33.14394,129.81153],[33.14488,129.81948],[33.14432,129.82333],[33.14574,129.82704],[33.14707,129.8281],[33.15802,129.83218],[33.16023,129.83485],[33.16327,129.8363],[33.16629,129.84067],[33.17387,129.84601],[33.1771,129.85211],[33.18535,129.8548],[33.18672,129.85628],[33.18737,129.85834],[33.18805,129.86389],[33.18791,129.87262],[33.18242,129.88427],[33.18208,129.886],[33.18278,129.89018],[33.18377,129.89248],[33.18964,129.89961],[33.19021,129.90504],[33.19216,129.91196],[33.19235,129.91787],[33.19064,129.92211],[33.18892,129.92439],[33.18857,129.92629],[33.19387,129.94036],[33.19714,129.97283],[33.19571,129.97798],[33.19043,129.98331],[33.18535,129.99241],[33.18495,129.9944],[33.18762,129.99941],[33.18969,130.00528],[33.19057,130.01135],[33.1918,130.01464],[33.19764,130.02532],[33.21062,130.04657],[33.21115,130.04895],[33.21118,130.05617],[33.21632,130.07289],[33.21648,130.08084],[33.21244,130.10449],[33.21239,130.11915],[33.21291,130.12303],[33.21966,130.14813],[33.21926,130.16422],[33.21977,130.16786],[33.22821,130.18331],[33.23026,130.18449],[33.2407,130.18722],[33.24305,130.18926],[33.25367,130.21531],[33.25733,130.24158],[33.25983,130.27568],[33.26542,130.30418],[33.26635,130.30687],[33.30999,130.36151],[33.31962,130.38315],[33.32191,130.39293],[33.32688,130.40339],[33.32873,130.40583],[33.33687,130.41339],[33.33868,130.41604],[33.34253,130.43005],[33.34927,130.44789],[33.35151,130.45657],[33.35273,130.4582],[33.35652,130.46076],[33.36468,130.47081],[33.36547,130.47322],[33.36651,130.48229],[33.36974,130.49154],[33.3868,130.48083],[33.41781,130.45422],[33.424,130.45023],[33.43203,130.44673],[33.44245,130.44458],[33.45819,130.44454],[33.46482,130.44518],[33.47754,130.44778],[33.48503,130.44778],[33.49175,130.44601],[33.50374,130.44072],[33.53066,130.43285],[33.53763,130.43278],[33.55684,130.43676],[33.5643,130.43457],[33.56895,130.43156]],
  'Tenjin|Tenjin-minami':[[33.59126,130.39863],[33.58922,130.39955],[33.58822,130.40046],[33.58816,130.40163],[33.58838,130.40188],[33.5886,130.40238]]
};
const RAILCHAIN = {
  'Akasaka|Gion':['Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Akasaka|Hakata':['Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Hakata'],
  'Akasaka|Nakasu-Kawabata':['Akasaka->Tenjin','Tenjin->Nakasu-Kawabata'],
  'Akasaka|Nishijin':['Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Akasaka|Nishitetsu-Fukuoka':['Akasaka->Nishitetsu-Fukuoka'],
  'Akasaka|Nishitetsu-Yakuin':['Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin'],
  'Akasaka|Tenjin':['Akasaka->Tenjin'],
  'Akasaka|Tenjin-minami':['Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Tenjin-minami'],
  'Beppu|Gion':['Beppu->Yoshizuka','Yoshizuka->Gion'],
  'Beppu|Hakata':['Beppu->Yoshizuka','Yoshizuka->Hakata'],
  'Beppu|Nakasu-Kawabata':['Beppu->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata'],
  'Beppu|Nishijin':['Beppu->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Beppu|Nishitetsu-Fukuoka':['Beppu->Yoshizuka','Yoshizuka->Hakata','Hakata->Tenjin-minami','Tenjin-minami->Nishitetsu-Fukuoka'],
  'Beppu|Tenjin':['Beppu->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin'],
  'Beppu|Tenjin-minami':['Beppu->Yoshizuka','Yoshizuka->Hakata','Hakata->Tenjin-minami'],
  'Beppu|Yufuin':['Beppu->Yufuin'],
  'Fukuoka Airport|Gion':['Fukuoka Airport->Hakata','Hakata->Gion'],
  'Fukuoka Airport|Hakata':['Fukuoka Airport->Hakata'],
  'Fukuoka Airport|Nakasu-Kawabata':['Fukuoka Airport->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata'],
  'Fukuoka Airport|Nishijin':['Fukuoka Airport->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Fukuoka Airport|Nishitetsu-Fukuoka':['Fukuoka Airport->Hakata','Hakata->Tenjin-minami','Tenjin-minami->Nishitetsu-Fukuoka'],
  'Fukuoka Airport|Tenjin':['Fukuoka Airport->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin'],
  'Fukuoka Airport|Tenjin-minami':['Fukuoka Airport->Hakata','Hakata->Tenjin-minami'],
  'Gion|Akasaka':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka'],
  'Gion|Beppu':['Gion->Yoshizuka','Yoshizuka->Beppu'],
  'Gion|Fukuoka Airport':['Gion->Hakata','Hakata->Fukuoka Airport'],
  'Gion|Hakata':['Gion->Hakata'],
  'Gion|Hiroshima':['Gion->Yoshizuka','Yoshizuka->Kokura','Kokura->Hiroshima'],
  'Gion|Kagoshima-Chuo':['Gion->Hakata','Hakata->Takeshita','Takeshita->Kurume','Kurume->Kumamoto','Kumamoto->Kagoshima-Chuo'],
  'Gion|Karatsu':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Karatsu'],
  'Gion|Kokura':['Gion->Yoshizuka','Yoshizuka->Kokura'],
  'Gion|Kumamoto':['Gion->Hakata','Hakata->Takeshita','Takeshita->Kurume','Kurume->Kumamoto'],
  'Gion|Meinohama':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama'],
  'Gion|Nagasaki':['Gion->Hakata','Hakata->Takeshita','Takeshita->Nagasaki'],
  'Gion|Nakasu-Kawabata':['Gion->Nakasu-Kawabata'],
  'Gion|Nishijin':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Gion|Nishitetsu-Dazaifu':['Gion->Hakata','Hakata->Takeshita','Takeshita->Nishitetsu-Dazaifu'],
  'Gion|Nishitetsu-Fukuoka':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Nishitetsu-Fukuoka'],
  'Gion|Nishitetsu-Yakuin':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin'],
  'Gion|Ohorikoen':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen'],
  'Gion|Sasebo':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Sasebo'],
  'Gion|Tenjin':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin'],
  'Gion|Tenjin-minami':['Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin-minami'],
  'Gion|Yanagawa':['Gion->Hakata','Hakata->Takeshita','Takeshita->Kurume','Kurume->Yanagawa'],
  'Gion|Yufuin':['Gion->Hakata','Hakata->Takeshita','Takeshita->Kurume','Kurume->Yufuin'],
  'Hakata|Akasaka':['Hakata->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka'],
  'Hakata|Beppu':['Hakata->Yoshizuka','Yoshizuka->Beppu'],
  'Hakata|Fukuoka Airport':['Hakata->Fukuoka Airport'],
  'Hakata|Gion':['Hakata->Gion'],
  'Hakata|Hiroshima':['Hakata->Yoshizuka','Yoshizuka->Kokura','Kokura->Hiroshima'],
  'Hakata|Kagoshima-Chuo':['Hakata->Takeshita','Takeshita->Kurume','Kurume->Kumamoto','Kumamoto->Kagoshima-Chuo'],
  'Hakata|Karatsu':['Hakata->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Karatsu'],
  'Hakata|Kokura':['Hakata->Yoshizuka','Yoshizuka->Kokura'],
  'Hakata|Kumamoto':['Hakata->Takeshita','Takeshita->Kurume','Kurume->Kumamoto'],
  'Hakata|Meinohama':['Hakata->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama'],
  'Hakata|Nagasaki':['Hakata->Takeshita','Takeshita->Nagasaki'],
  'Hakata|Nakasu-Kawabata':['Hakata->Gion','Gion->Nakasu-Kawabata'],
  'Hakata|Nishijin':['Hakata->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Hakata|Nishitetsu-Dazaifu':['Hakata->Takeshita','Takeshita->Nishitetsu-Dazaifu'],
  'Hakata|Nishitetsu-Fukuoka':['Hakata->Tenjin-minami','Tenjin-minami->Nishitetsu-Fukuoka'],
  'Hakata|Nishitetsu-Yakuin':['Hakata->Tenjin-minami','Tenjin-minami->Nishitetsu-Yakuin'],
  'Hakata|Ohorikoen':['Hakata->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen'],
  'Hakata|Sasebo':['Hakata->Takeshita','Takeshita->Sasebo'],
  'Hakata|Tenjin':['Hakata->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin'],
  'Hakata|Tenjin-minami':['Hakata->Tenjin-minami'],
  'Hakata|Yanagawa':['Hakata->Takeshita','Takeshita->Kurume','Kurume->Yanagawa'],
  'Hakata|Yufuin':['Hakata->Takeshita','Takeshita->Kurume','Kurume->Yufuin'],
  'Hiroshima|Gion':['Hiroshima->Kokura','Kokura->Yoshizuka','Yoshizuka->Gion'],
  'Hiroshima|Hakata':['Hiroshima->Kokura','Kokura->Yoshizuka','Yoshizuka->Hakata'],
  'Hiroshima|Nakasu-Kawabata':['Hiroshima->Kokura','Kokura->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata'],
  'Hiroshima|Nishijin':['Hiroshima->Kokura','Kokura->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Hiroshima|Nishitetsu-Fukuoka':['Hiroshima->Kokura','Kokura->Yoshizuka','Yoshizuka->Hakata','Hakata->Tenjin-minami','Tenjin-minami->Nishitetsu-Fukuoka'],
  'Hiroshima|Tenjin':['Hiroshima->Kokura','Kokura->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin'],
  'Hiroshima|Tenjin-minami':['Hiroshima->Kokura','Kokura->Yoshizuka','Yoshizuka->Hakata','Hakata->Tenjin-minami'],
  'Kagoshima-Chuo|Gion':['Kagoshima-Chuo->Kumamoto','Kumamoto->Kurume','Kurume->Takeshita','Takeshita->Hakata','Hakata->Gion'],
  'Kagoshima-Chuo|Hakata':['Kagoshima-Chuo->Kumamoto','Kumamoto->Kurume','Kurume->Takeshita','Takeshita->Hakata'],
  'Kagoshima-Chuo|Nakasu-Kawabata':['Kagoshima-Chuo->Kumamoto','Kumamoto->Kurume','Kurume->Takeshita','Takeshita->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata'],
  'Kagoshima-Chuo|Nishijin':['Kagoshima-Chuo->Kumamoto','Kumamoto->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Kagoshima-Chuo|Nishitetsu-Fukuoka':['Kagoshima-Chuo->Kumamoto','Kumamoto->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka'],
  'Kagoshima-Chuo|Tenjin':['Kagoshima-Chuo->Kumamoto','Kumamoto->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin'],
  'Kagoshima-Chuo|Tenjin-minami':['Kagoshima-Chuo->Kumamoto','Kumamoto->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin-minami'],
  'Karatsu|Gion':['Karatsu->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Karatsu|Hakata':['Karatsu->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Hakata'],
  'Karatsu|Nakasu-Kawabata':['Karatsu->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata'],
  'Karatsu|Nishijin':['Karatsu->Meinohama','Meinohama->Nishijin'],
  'Karatsu|Nishitetsu-Fukuoka':['Karatsu->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka'],
  'Karatsu|Tenjin':['Karatsu->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin'],
  'Karatsu|Tenjin-minami':['Karatsu->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Tenjin-minami'],
  'Kokura|Gion':['Kokura->Yoshizuka','Yoshizuka->Gion'],
  'Kokura|Hakata':['Kokura->Yoshizuka','Yoshizuka->Hakata'],
  'Kokura|Nakasu-Kawabata':['Kokura->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata'],
  'Kokura|Nishijin':['Kokura->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Kokura|Nishitetsu-Fukuoka':['Kokura->Yoshizuka','Yoshizuka->Hakata','Hakata->Tenjin-minami','Tenjin-minami->Nishitetsu-Fukuoka'],
  'Kokura|Tenjin':['Kokura->Yoshizuka','Yoshizuka->Gion','Gion->Nakasu-Kawabata','Nakasu-Kawabata->Tenjin'],
  'Kokura|Tenjin-minami':['Kokura->Yoshizuka','Yoshizuka->Hakata','Hakata->Tenjin-minami'],
  'Kumamoto|Gion':['Kumamoto->Kurume','Kurume->Takeshita','Takeshita->Hakata','Hakata->Gion'],
  'Kumamoto|Hakata':['Kumamoto->Kurume','Kurume->Takeshita','Takeshita->Hakata'],
  'Kumamoto|Nakasu-Kawabata':['Kumamoto->Kurume','Kurume->Takeshita','Takeshita->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata'],
  'Kumamoto|Nishijin':['Kumamoto->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Kumamoto|Nishitetsu-Fukuoka':['Kumamoto->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka'],
  'Kumamoto|Tenjin':['Kumamoto->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin'],
  'Kumamoto|Tenjin-minami':['Kumamoto->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin-minami'],
  'Meinohama|Gion':['Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Meinohama|Hakata':['Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Hakata'],
  'Meinohama|Nakasu-Kawabata':['Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata'],
  'Meinohama|Nishijin':['Meinohama->Nishijin'],
  'Meinohama|Nishitetsu-Fukuoka':['Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka'],
  'Meinohama|Tenjin':['Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin'],
  'Meinohama|Tenjin-minami':['Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Tenjin-minami'],
  'Nagasaki|Gion':['Nagasaki->Takeshita','Takeshita->Hakata','Hakata->Gion'],
  'Nagasaki|Hakata':['Nagasaki->Takeshita','Takeshita->Hakata'],
  'Nagasaki|Nakasu-Kawabata':['Nagasaki->Takeshita','Takeshita->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata'],
  'Nagasaki|Nishijin':['Nagasaki->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Nagasaki|Nishitetsu-Fukuoka':['Nagasaki->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka'],
  'Nagasaki|Tenjin':['Nagasaki->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin'],
  'Nagasaki|Tenjin-minami':['Nagasaki->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin-minami'],
  'Nakasu-Kawabata|Akasaka':['Nakasu-Kawabata->Tenjin','Tenjin->Akasaka'],
  'Nakasu-Kawabata|Beppu':['Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Beppu'],
  'Nakasu-Kawabata|Fukuoka Airport':['Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Fukuoka Airport'],
  'Nakasu-Kawabata|Gion':['Nakasu-Kawabata->Gion'],
  'Nakasu-Kawabata|Hakata':['Nakasu-Kawabata->Gion','Gion->Hakata'],
  'Nakasu-Kawabata|Hiroshima':['Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Kokura','Kokura->Hiroshima'],
  'Nakasu-Kawabata|Kagoshima-Chuo':['Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Takeshita','Takeshita->Kurume','Kurume->Kumamoto','Kumamoto->Kagoshima-Chuo'],
  'Nakasu-Kawabata|Karatsu':['Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Karatsu'],
  'Nakasu-Kawabata|Kokura':['Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Kokura'],
  'Nakasu-Kawabata|Kumamoto':['Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Takeshita','Takeshita->Kurume','Kurume->Kumamoto'],
  'Nakasu-Kawabata|Meinohama':['Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama'],
  'Nakasu-Kawabata|Nagasaki':['Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Takeshita','Takeshita->Nagasaki'],
  'Nakasu-Kawabata|Nishijin':['Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Nakasu-Kawabata|Nishitetsu-Dazaifu':['Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Takeshita','Takeshita->Nishitetsu-Dazaifu'],
  'Nakasu-Kawabata|Nishitetsu-Fukuoka':['Nakasu-Kawabata->Nishitetsu-Fukuoka'],
  'Nakasu-Kawabata|Nishitetsu-Yakuin':['Nakasu-Kawabata->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin'],
  'Nakasu-Kawabata|Ohorikoen':['Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen'],
  'Nakasu-Kawabata|Sasebo':['Nakasu-Kawabata->Tenjin','Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Sasebo'],
  'Nakasu-Kawabata|Tenjin':['Nakasu-Kawabata->Tenjin'],
  'Nakasu-Kawabata|Tenjin-minami':['Nakasu-Kawabata->Tenjin-minami'],
  'Nakasu-Kawabata|Yanagawa':['Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Takeshita','Takeshita->Kurume','Kurume->Yanagawa'],
  'Nakasu-Kawabata|Yufuin':['Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Takeshita','Takeshita->Kurume','Kurume->Yufuin'],
  'Nishijin|Akasaka':['Nishijin->Ohorikoen','Ohorikoen->Akasaka'],
  'Nishijin|Beppu':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Beppu'],
  'Nishijin|Fukuoka Airport':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Fukuoka Airport'],
  'Nishijin|Gion':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Nishijin|Hakata':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Hakata'],
  'Nishijin|Hiroshima':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Kokura','Kokura->Hiroshima'],
  'Nishijin|Kagoshima-Chuo':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Kumamoto','Kumamoto->Kagoshima-Chuo'],
  'Nishijin|Karatsu':['Nishijin->Meinohama','Meinohama->Karatsu'],
  'Nishijin|Kokura':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Kokura'],
  'Nishijin|Kumamoto':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Kumamoto'],
  'Nishijin|Meinohama':['Nishijin->Meinohama'],
  'Nishijin|Nagasaki':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nagasaki'],
  'Nishijin|Nakasu-Kawabata':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata'],
  'Nishijin|Nishitetsu-Dazaifu':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Dazaifu'],
  'Nishijin|Nishitetsu-Fukuoka':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka'],
  'Nishijin|Nishitetsu-Yakuin':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin'],
  'Nishijin|Ohorikoen':['Nishijin->Ohorikoen'],
  'Nishijin|Sasebo':['Nishijin->Meinohama','Meinohama->Sasebo'],
  'Nishijin|Tenjin':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin'],
  'Nishijin|Tenjin-minami':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Tenjin-minami'],
  'Nishijin|Yanagawa':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Yanagawa'],
  'Nishijin|Yufuin':['Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Yufuin'],
  'Nishitetsu-Dazaifu|Gion':['Nishitetsu-Dazaifu->Takeshita','Takeshita->Hakata','Hakata->Gion'],
  'Nishitetsu-Dazaifu|Hakata':['Nishitetsu-Dazaifu->Takeshita','Takeshita->Hakata'],
  'Nishitetsu-Dazaifu|Nakasu-Kawabata':['Nishitetsu-Dazaifu->Takeshita','Takeshita->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata'],
  'Nishitetsu-Dazaifu|Nishijin':['Nishitetsu-Dazaifu->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Nishitetsu-Dazaifu|Nishitetsu-Fukuoka':['Nishitetsu-Dazaifu->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka'],
  'Nishitetsu-Dazaifu|Tenjin':['Nishitetsu-Dazaifu->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin'],
  'Nishitetsu-Dazaifu|Tenjin-minami':['Nishitetsu-Dazaifu->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin-minami'],
  'Nishitetsu-Fukuoka|Akasaka':['Nishitetsu-Fukuoka->Akasaka'],
  'Nishitetsu-Fukuoka|Beppu':['Nishitetsu-Fukuoka->Tenjin-minami','Tenjin-minami->Hakata','Hakata->Yoshizuka','Yoshizuka->Beppu'],
  'Nishitetsu-Fukuoka|Fukuoka Airport':['Nishitetsu-Fukuoka->Tenjin-minami','Tenjin-minami->Hakata','Hakata->Fukuoka Airport'],
  'Nishitetsu-Fukuoka|Gion':['Nishitetsu-Fukuoka->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Nishitetsu-Fukuoka|Hakata':['Nishitetsu-Fukuoka->Tenjin-minami','Tenjin-minami->Hakata'],
  'Nishitetsu-Fukuoka|Hiroshima':['Nishitetsu-Fukuoka->Tenjin-minami','Tenjin-minami->Hakata','Hakata->Yoshizuka','Yoshizuka->Kokura','Kokura->Hiroshima'],
  'Nishitetsu-Fukuoka|Kagoshima-Chuo':['Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Kumamoto','Kumamoto->Kagoshima-Chuo'],
  'Nishitetsu-Fukuoka|Karatsu':['Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Karatsu'],
  'Nishitetsu-Fukuoka|Kokura':['Nishitetsu-Fukuoka->Tenjin-minami','Tenjin-minami->Hakata','Hakata->Yoshizuka','Yoshizuka->Kokura'],
  'Nishitetsu-Fukuoka|Kumamoto':['Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Kumamoto'],
  'Nishitetsu-Fukuoka|Meinohama':['Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama'],
  'Nishitetsu-Fukuoka|Nagasaki':['Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nagasaki'],
  'Nishitetsu-Fukuoka|Nakasu-Kawabata':['Nishitetsu-Fukuoka->Nakasu-Kawabata'],
  'Nishitetsu-Fukuoka|Nishijin':['Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Nishitetsu-Fukuoka|Nishitetsu-Dazaifu':['Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Dazaifu'],
  'Nishitetsu-Fukuoka|Ohorikoen':['Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen'],
  'Nishitetsu-Fukuoka|Sasebo':['Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Sasebo'],
  'Nishitetsu-Fukuoka|Tenjin-minami':['Nishitetsu-Fukuoka->Tenjin-minami'],
  'Nishitetsu-Fukuoka|Yanagawa':['Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Yanagawa'],
  'Nishitetsu-Fukuoka|Yufuin':['Nishitetsu-Fukuoka->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Yufuin'],
  'Nishitetsu-Yakuin|Akasaka':['Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka'],
  'Nishitetsu-Yakuin|Gion':['Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Nishitetsu-Yakuin|Hakata':['Nishitetsu-Yakuin->Tenjin-minami','Tenjin-minami->Hakata'],
  'Nishitetsu-Yakuin|Nakasu-Kawabata':['Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nakasu-Kawabata'],
  'Nishitetsu-Yakuin|Nishijin':['Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Nishitetsu-Yakuin|Ohorikoen':['Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen'],
  'Ohorikoen|Gion':['Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Ohorikoen|Hakata':['Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Hakata'],
  'Ohorikoen|Nakasu-Kawabata':['Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata'],
  'Ohorikoen|Nishijin':['Ohorikoen->Nishijin'],
  'Ohorikoen|Nishitetsu-Fukuoka':['Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka'],
  'Ohorikoen|Nishitetsu-Yakuin':['Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Nishitetsu-Yakuin'],
  'Ohorikoen|Tenjin':['Ohorikoen->Akasaka','Akasaka->Tenjin'],
  'Ohorikoen|Tenjin-minami':['Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Tenjin-minami'],
  'Sasebo|Gion':['Sasebo->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Sasebo|Hakata':['Sasebo->Takeshita','Takeshita->Hakata'],
  'Sasebo|Nakasu-Kawabata':['Sasebo->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin','Tenjin->Nakasu-Kawabata'],
  'Sasebo|Nishijin':['Sasebo->Meinohama','Meinohama->Nishijin'],
  'Sasebo|Nishitetsu-Fukuoka':['Sasebo->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka'],
  'Sasebo|Tenjin':['Sasebo->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Tenjin'],
  'Sasebo|Tenjin-minami':['Sasebo->Meinohama','Meinohama->Nishijin','Nishijin->Ohorikoen','Ohorikoen->Akasaka','Akasaka->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Tenjin-minami'],
  'Tenjin-minami|Akasaka':['Tenjin-minami->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka'],
  'Tenjin-minami|Beppu':['Tenjin-minami->Hakata','Hakata->Yoshizuka','Yoshizuka->Beppu'],
  'Tenjin-minami|Fukuoka Airport':['Tenjin-minami->Hakata','Hakata->Fukuoka Airport'],
  'Tenjin-minami|Gion':['Tenjin-minami->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Tenjin-minami|Hakata':['Tenjin-minami->Hakata'],
  'Tenjin-minami|Hiroshima':['Tenjin-minami->Hakata','Hakata->Yoshizuka','Yoshizuka->Kokura','Kokura->Hiroshima'],
  'Tenjin-minami|Kagoshima-Chuo':['Tenjin-minami->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Kumamoto','Kumamoto->Kagoshima-Chuo'],
  'Tenjin-minami|Karatsu':['Tenjin-minami->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Karatsu'],
  'Tenjin-minami|Kokura':['Tenjin-minami->Hakata','Hakata->Yoshizuka','Yoshizuka->Kokura'],
  'Tenjin-minami|Kumamoto':['Tenjin-minami->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Kumamoto'],
  'Tenjin-minami|Meinohama':['Tenjin-minami->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama'],
  'Tenjin-minami|Nagasaki':['Tenjin-minami->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nagasaki'],
  'Tenjin-minami|Nakasu-Kawabata':['Tenjin-minami->Nakasu-Kawabata'],
  'Tenjin-minami|Nishijin':['Tenjin-minami->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Tenjin-minami|Nishitetsu-Dazaifu':['Tenjin-minami->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Dazaifu'],
  'Tenjin-minami|Nishitetsu-Fukuoka':['Tenjin-minami->Nishitetsu-Fukuoka'],
  'Tenjin-minami|Ohorikoen':['Tenjin-minami->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen'],
  'Tenjin-minami|Sasebo':['Tenjin-minami->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Sasebo'],
  'Tenjin-minami|Tenjin':['Tenjin-minami->Tenjin'],
  'Tenjin-minami|Yanagawa':['Tenjin-minami->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Yanagawa'],
  'Tenjin-minami|Yufuin':['Tenjin-minami->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Yufuin'],
  'Tenjin|Akasaka':['Tenjin->Akasaka'],
  'Tenjin|Beppu':['Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Beppu'],
  'Tenjin|Fukuoka Airport':['Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Hakata','Hakata->Fukuoka Airport'],
  'Tenjin|Gion':['Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion'],
  'Tenjin|Hakata':['Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Hakata'],
  'Tenjin|Hiroshima':['Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Kokura','Kokura->Hiroshima'],
  'Tenjin|Kagoshima-Chuo':['Tenjin->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Kumamoto','Kumamoto->Kagoshima-Chuo'],
  'Tenjin|Karatsu':['Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Karatsu'],
  'Tenjin|Kokura':['Tenjin->Nakasu-Kawabata','Nakasu-Kawabata->Gion','Gion->Yoshizuka','Yoshizuka->Kokura'],
  'Tenjin|Kumamoto':['Tenjin->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Kumamoto'],
  'Tenjin|Meinohama':['Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama'],
  'Tenjin|Nagasaki':['Tenjin->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nagasaki'],
  'Tenjin|Nakasu-Kawabata':['Tenjin->Nakasu-Kawabata'],
  'Tenjin|Nishijin':['Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Tenjin|Nishitetsu-Dazaifu':['Tenjin->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Dazaifu'],
  'Tenjin|Ohorikoen':['Tenjin->Akasaka','Akasaka->Ohorikoen'],
  'Tenjin|Sasebo':['Tenjin->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin','Nishijin->Meinohama','Meinohama->Sasebo'],
  'Tenjin|Tenjin-minami':['Tenjin->Tenjin-minami'],
  'Tenjin|Yanagawa':['Tenjin->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Yanagawa'],
  'Tenjin|Yufuin':['Tenjin->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Kurume','Kurume->Yufuin'],
  'Yanagawa|Gion':['Yanagawa->Kurume','Kurume->Takeshita','Takeshita->Hakata','Hakata->Gion'],
  'Yanagawa|Hakata':['Yanagawa->Kurume','Kurume->Takeshita','Takeshita->Hakata'],
  'Yanagawa|Nakasu-Kawabata':['Yanagawa->Kurume','Kurume->Takeshita','Takeshita->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata'],
  'Yanagawa|Nishijin':['Yanagawa->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Yanagawa|Nishitetsu-Fukuoka':['Yanagawa->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka'],
  'Yanagawa|Tenjin':['Yanagawa->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin'],
  'Yanagawa|Tenjin-minami':['Yanagawa->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin-minami'],
  'Yufuin|Beppu':['Yufuin->Beppu'],
  'Yufuin|Gion':['Yufuin->Kurume','Kurume->Takeshita','Takeshita->Hakata','Hakata->Gion'],
  'Yufuin|Hakata':['Yufuin->Kurume','Kurume->Takeshita','Takeshita->Hakata'],
  'Yufuin|Nakasu-Kawabata':['Yufuin->Kurume','Kurume->Takeshita','Takeshita->Hakata','Hakata->Gion','Gion->Nakasu-Kawabata'],
  'Yufuin|Nishijin':['Yufuin->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka','Nishitetsu-Fukuoka->Akasaka','Akasaka->Ohorikoen','Ohorikoen->Nishijin'],
  'Yufuin|Nishitetsu-Fukuoka':['Yufuin->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Nishitetsu-Fukuoka'],
  'Yufuin|Tenjin':['Yufuin->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin'],
  'Yufuin|Tenjin-minami':['Yufuin->Kurume','Kurume->Nishitetsu-Ohashi','Nishitetsu-Ohashi->Nishitetsu-Hirao','Nishitetsu-Hirao->Nishitetsu-Yakuin','Nishitetsu-Yakuin->Tenjin-minami']
};
