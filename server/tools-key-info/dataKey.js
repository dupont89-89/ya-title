const commerceMarker = [
  "магазин",
  "онлайн",
  "покупк",
  "куплю",
  "продам",
  "цена",
  "цены",
  "стоимость",
  "цене",
  "доставка",
  "доставкой",
  "доставку",
  "ассортимент",
  "каталог",
  "услуга",
  "услуги",
  "купить",
  "скидки",
  "скидка",
  "самовывоз",
  "оплата",
  "оплату",
  "catalog",
  "katalog",
  "card",
  "product",
  "item",
  "заказ",
  "shop",
  "market",
  "дешево",
  "недорого",
  "опт",
  "оптом",
  "оптовик",
  "от производителя",
  "производитель",
  "где купить",
  "заказать",
  "заказать в",
  "фабрика",
  "поставщик",
  "поставка",
  "поставщиков",
  "не дорого",
];

const infoMarker = [
  "каков",
  "идеи",
  "что лучше",
  "шрифт",
  "вакансии",
  "вид",
  "виды",
  "каковой",
  "какой",
  "который",
  "кто",
  "нахуя",
  "чей",
  "что",
  "кем",
  "кому",
  "чему",
  "как",
  "отчего",
  "или",
  "неужели",
  "разве",
  "почему",
  "куда",
  "когда",
  "всегда",
  "любой",
  "это",
  "возможно",
  "зачем",
  "значение",
  "сколько",
  "история",
  "истории",
  "справочник",
  "справочника",
  "справочнику",
  "справочником",
  "справочнике",
  "справочники",
  "справочников",
  "справочникам",
  "справочниками",
  "справочниках",
  "правочник",
  "сравочник",
  "спавочник",
  "спрвочник",
  "спраочник",
  "справчник",
  "справоник",
  "справочик",
  "справочнк",
  "справочни",
  "словия",
  "уловия",
  "усовия",
  "услвия",
  "услоия",
  "условя",
  "услови",
  "хабр",
  "хабра",
  "хабрхабр",
  "факью",
  "faq",
  "чаво",
  "чавошка",
  "чавошку",
  "чавошки",
  "хак",
  "хаки",
  "hack",
  "уловка",
  "уловки",
  "принцип",
  "принципа",
  "принципу",
  "принципом",
  "принципе",
  "принципы",
  "принципов",
  "принципам",
  "принципами",
  "принципах",
  "ринцип",
  "пинцип",
  "прнцип",
  "прицип",
  "принип",
  "принцп",
  "принци",
  "метод",
  "метода",
  "методу",
  "методом",
  "методе",
  "методы",
  "методов",
  "методам",
  "методами",
  "методах",
  "методой",
  "методою",
  "сам",
  "самого",
  "самому",
  "самим",
  "самом",
  "сама",
  "самой",
  "самоё",
  "саму",
  "само",
  "самостоятельно",
  "сами",
  "самих",
  "самими",
  "рука",
  "руки",
  "руке",
  "руку",
  "рукой",
  "рукою",
  "рук",
  "рукам",
  "руками",
  "руках",
  "статья",
  "статьи",
  "способ",
  "способа",
  "способу",
  "способом",
  "способе",
  "способы",
  "способов",
  "способам",
  "способами",
  "способах",
  "инструкция",
  "инструкции",
  "инструкцию",
  "инструкцией",
  "инструкциею",
  "инструкций",
  "инструкциям",
  "инструкциями",
  "инструкциях",
  "нструкция",
  "иструкция",
  "интрукция",
  "инсрукция",
  "инстукция",
  "инстркция",
  "инструция",
  "инструкия",
  "инструкця",
  "инструкци",
  "собственный",
  "собственного",
  "собственному",
  "собственным",
  "собственном",
  "собственная",
  "собственной",
  "собственную",
  "собственною",
  "собственное",
  "собственные",
  "собственных",
  "собственными",
  "собствен",
  "собственен",
  "собственна",
  "собственно",
  "собственны",
  "собственнее",
  "собственней",
  "пособственнее",
  "пособственней",
  "обственный",
  "сбственный",
  "соственный",
  "собтвенный",
  "собсвенный",
  "собстенный",
  "собствнный",
  "собственый",
  "собственнй",
  "свой",
  "своего",
  "своему",
  "своим",
  "своём",
  "своя",
  "своей",
  "свою",
  "своею",
  "своё",
  "свои",
  "своих",
  "своими",
  "вой",
  "сой",
  "свй",
  "сво",
  "дом",
  "дома",
  "дому",
  "домом",
  "доме",
  "домов",
  "домам",
  "домами",
  "домах",
  "домашний",
  "домашнего",
  "домашнему",
  "домашним",
  "домашнем",
  "домашняя",
  "домашней",
  "домашнюю",
  "домашнею",
  "домашнее",
  "домашние",
  "домашних",
  "домашними",
  "домашня",
  "домашне",
  "домашни",
  "подомашнее",
  "подомашней",
  "домашний",
  "дмашний",
  "доашний",
  "домшний",
  "доманий",
  "домаший",
  "домашнй",
  "самодельный",
  "вакансия",
];

const navigationMarker = [
  "aliexpress",
  "taobao",
  "aeroflot",
  "ulmart",
  "citilink",
  "exist",
  "ebay",
  "ozon",
  "otto",
  "dns-shop",
  "onetwotrip",
  "anywayanyday",
  "s7",
  "svyaznoy",
  "wildberries",
  "emex",
  "biletix",
  "biglion",
  "sotmarket",
  "eldorado",
  "holodilnik",
  "technopoint",
  "transaero",
  "enter",
  "220-volt",
  "techport",
  "kupivip",
  "utkonos",
  "mvideo",
  "euroset",
  "lamoda",
  "groupon",
  "wikimart",
  "pixel24",
  "pososhok",
  "foto",
  "delivery-club",
  "vseinstrumenti",
  "komus",
  "molotok",
  "terminal",
  "shopotam",
  "sewtech",
  "quelle",
  "vasko",
  "mediamarkt",
  "cyberry",
  "key",
  "notik",
  "utair",
  "oldi",
  "agent",
  "xcom-shop",
  "shinservice",
  "onlinetrade",
  "homeme",
  "rendez-vous",
  "regard",
  "tehnosila",
  "dostavka",
  "softkey",
  "esky",
  "fcenter",
  "yakitoriya",
  "tanuki",
  "domprom",
  "laredoute",
  "nabortu",
  "pleer",
  "4tochki",
  "aviacassa",
  "dostami",
  "electrovenik",
  "pult",
  "mts",
  "digital",
  "kolesa-darom",
  "ticketland",
  "audiomania",
  "butik",
  "planetashop",
  "kupinatao",
  "nix",
  "newmans",
  "pokrishka",
  "vigoda",
  "airbnb",
  "sportmaster",
  "e2e4online",
  "kupikupon",
  "sendflowers",
  "stolplit",
  "ponominalu",
  "labirint",
  "sindbad",
  "allcables",
  "brand-in-trend",
  "velodrive",
  "e5",
  "velosite",
  "egazon",
  "nakolesah",
  "onno",
  "mosautoshina",
  "digitalshop",
  "mladenec",
  "fott",
  "asos",
  "top-shop",
  "i-on",
  "technopark",
  "domosed",
  "sidex",
  "apteka-ifk",
  "letu",
  "club-sale",
  "chipdip",
  "cplaza",
  "alltime",
  "my-shop",
  "yves-rocher",
  "livemaster",
  "maxidom",
  "compumir",
  "shatura",
  "hoff",
  "detmir",
  "ellos",
  "allsoft",
  "babysecret",
  "realxenon",
  "electrozon",
  "florist",
  "nord24",
  "yoox",
  "shoppinglive",
  "electrogor",
  "idei74",
  "air-gun",
  "flashcom",
  "shinaexpert",
  "dom-sad",
  "petshop",
  "bestwatch",
  "shopbop",
  "topbrands",
  "vsemayki",
  "avtogsm",
  "piluli",
  "shina",
  "computermarket",
  "euromaxx",
  "htc-online",
  "s-shina",
  "toool",
  "vipmoda",
  "electroklad",
  "santehnika-online",
  "kupi-kolyasku",
  "tiktok",
  "тик ток",
  "artaban",
  "digimarket",
  "mrdom",
  "ricaud",
  "cifrus",
  "avsale",
  "beeline",
  "all-4u",
  "baby-country",
  "3suisses",
  "e-xpedition",
  "kupongid",
  "papajohns",
  "superstroy",
  "123magazin",
  "boutique",
  "proskater",
  "apteka",
  "sotovikmobile",
  "splav",
  "elefantenok",
  "fotoplus",
  "videoigr",
  "bsplus",
  "kant",
  "ogo1",
  "read",
  "kupibonus",
  "nama",
  "technohit",
  "zakazi24",
  "aeroexpress",
  "chinawebshop",
  "elitdress",
  "pop-music",
  "pum-pu",
  "activizm",
  "alpindustria",
  "becompact",
  "cifrocity",
  "europe-tv",
  "shoescribe",
  "thecorner",
  "avcafe",
  "bigtv",
  "sapato",
  "bonprix",
  "utinet",
  "e96",
  "foroffice",
  "avito",
  "авиакасса",
  "авито",
  "али экспресс",
  "аллтайм",
  "анивэй",
  "асос",
  "аудиомания",
  "аэрофлот",
  "бебисикрет",
  "биглион",
  "брендинтренд",
  "бутик",
  "вайлберис",
  "васко",
  "велосайт",
  "викимарт",
  "вип мода",
  "все инструменты",
  "всемайки",
  "выгода",
  "групон",
  "детмир",
  "диджитал",
  "дилевери",
  "днс шоп",
  "домосед",
  "домпром",
  "доставка.ру",
  "достами",
  "е5",
  "евросеть",
  "егазон",
  "ив роше",
  "ион",
  "клуб сале",
  "комус",
  "купи коляску",
  "купи купон",
  "купи на тао",
  "купивип",
  "лабиринт",
  "лайв мастер",
  "ламода",
  "м видео",
  "майшоп",
  "максидом",
  "медиамарт",
  "младенец.ру",
  "молоток.ру",
  "мтс",
  "никс",
  "нотик.ру",
  "ньюменс",
  "озон",
  "олди",
  "отто",
  "петшоп",
  "пиксель",
  "пилюли",
  "планеташоп",
  "плеер.ру",
  "посошок",
  "пульт.ру",
  "сантехника онлайн",
  "сапато",
  "связной",
  "сидекс",
  "сингбад",
  "ситилинк",
  "сотмаркет",
  "софткей",
  "спортмастер",
  "столплит",
  "тануки",
  "таобао",
  "терминал.ру",
  "технопарк",
  "технопойнт",
  "техносила",
  "техпорт",
  "тикетленд",
  "топ брэндс",
  "топ-шоп",
  "трансаэро",
  "утконос",
  "флорист",
  "форофис",
  "фото.ру",
  "хомими",
  "хофф",
  "чипидип",
  "шатура",
  "шопбоп",
  "шопотам",
  "эбэй",
  "эксист",
  "электровеник",
  "электрозон",
  "эллос",
  "эльдорадо",
  "энтер",
  "юлмарт",
  "ютинет",
  "ютэйр",
  "якитория",
  "алиэкспрес",
  "амазон",
  "анидэй",
  "бренд ин тренд",
  "все майки",
  "детский мир",
  "днс-шоп",
  "ебэй",
  "купикупон",
  "купинатао",
  "ла мода",
  "мвидео",
  "медиамаркт",
  "ной-хау",
  "тао бао",
  "улмарт",
  "хомеме",
  "экзист",
  "магнит",
  "метро",
  "metro",
  "вк",
  "вконтакте",
  "одноклассники",
];

const mediaMarker = [
  "видео",
  "видос",
  "смотреть",
  "смотреть онлайн",
  "сотреть",
  "смтреть",
  "смореть",
  "смотеть",
  "смотрть",
  "смотреь",
  "ютуб",
  "youtube",
  "фото",
  "фотка",
  "фотографии",
  "картинка",
  "слушать",
  "фильм",
  "песня",
  "трек",
  "скачать",
  "окко",
  "кинопоиск",
  "иви",
];

const domenInfo = [
  "journal.tinkoff.ru",
  "maket.laserbiz.ru",
  "cnchub.ru",
  "models.rsbis.com",
  "1laser.ru",
  "laserweb.ru",
  "rezkalaser.ru",
  "cutme.info",
  "www.tiktok.com",
  "dzen.ru",
  "youtube.com",
  "irecommend.ru",
  "www.kp.ru",
  "ru.wikipedia.org",
  "probolezny.ru",
  "en.wikipedia.org",
  "dasreda.ru",
  "journal.tarasovkn.ru",
  "club.dns-shop.ru",
  "ru.wiktionary.org",
  "www.bolshoyvopros.ru",
  "searchengines.guru",
  "www.rusprofile.ru",
  "www.orgpage.ru",
  "dic.academic.ru",
  "2gis.ru",
  "www.yell.ru",
  "smotrim.ru",
  "m.ok.ru",
  "aif.ru",
  "vc.ru",
  "trends.rbc.ru",
  "delat-delo.ru",
  "blog.salesai.ru",
  "economy-ru.com",
  "kdelu.vtb.ru",
  "ru.pinterest.com",
  "www.youtube.com",
  "www.pinterest.com",
  "www.pinterest.ca",
  "ru.freepik.com",
  "www.forumhouse.ru",
  "ria.ru",
  "znaet.petrovich.ru",
  "pikabu.ru",
  "www.drive2.ru",
  "rb.ru",
  "www.rbc.ru",
  "journal.citilink.ru",
  "hi-tech.mail.ru",
  "moya-planeta.ru",
  "m.fishki.net",
  "otvet.mail.ru",
  "calc.expert",
  "forum.ixbt.com",
  "lenta.ru",
  "blog.eldorado.ru",
  "lifehacker.ru",
  "rutube.ru",
  "fb.ru",
  "my.mail.ru",
  "www.shutterstock.com",
  "ru.wikiquote.org",
  "wildfauna.ru",
  "vk.com",
  "ok.ru",
  "fotostrana.ru",
  "love.mail.ru",
  "badoo.com",
  "www.mamba.ru",
  "tabor.ru",
  "loveplanet.ru",
  "mylove.ru",
  "rus.mp3lalala.site",
  "rus.mp3xa.me",
  "rus.hitmotop.com",
  "mus.zvukofon.com",
  "rutube.ru",
  "hh.ru",
  "www.superjob.ru",
  "www.rabota.ru",
  "moskva.gorodrabot.ru",
  "www.bibliofond.ru",
  "referatbank.ru",
  "nsportal.ru",
  "infourok.ru",
  "rusneb.ru",
  "elibrary.ru",
  "cyberleninka.ru",
  "studfile.net",
  "kampus.ai",
  "habr.com",
  "netology.ru",
  "www.menshealth.com",
  "www.woman.ru",
  "health.mail.ru",
  "ru.stackoverflow.com",
  "qna.habr.com",
  "cyberforum.ru",
];

const domenCommerce = [
  "market.yandex.ru",
  "bertech.ru",
  "amur-stan.ru",
  "opti-cut.ru",
  "3dtool.ru",
  "senfeng.ru",
  "lasercut.ru",
  "unimatic.ru",
  "www.stanki.ru",
  "laserstore.ru",
  "резка-лазером.москва",
  "mnitek.ru",
  "www.claser.ru",
  "gmzistra.ru",
  "rezka.elit-metal.ru",
  "lazrez.ru",
  "www.ozon.ru",
  "www.wildberries.ru",
  "www.wildberries.by",
  "www.avito.ru",
  "aliexpress.ru",
  "www.dns-shop.ru",
  "www.dolina-podarkov.ru",
  "www.mvideo.ru",
  "www.sima-land.ru",
  "leroymerlin.ru",
  "market-delivery.yandex.ru",
  "practicum.yandex.ru",
  "skillbox.ru",
  "netology.ru",
  "uslugi.yandex.ru",
  "m.avito.ru",
  "uslugio.com",
  "zoon.ru",
  "moscow.petrovich.ru",
  "www.vseinstrumenti.ru",
  "megamarket.ru",
  "moskva.satom.ru",
  "satom.ru",
  "msk.blizko.ru",
  "www.citilink.ru",
  "www.eldorado.ru",
  "www.kuvalda.ru",
  "rasp.yandex.ru",
  "loukoster.com",
  "afisha.yandex.ru",
  "msk.kassy.ru",
  "kassy.ru",
  "www.sportmaster.ru",
  "megacvet24.ru",
  "rus-buket.ru",
  "www.lamoda.ru",
  "www.labirint.ru",
  "www.detmir.ru",
  "www.onlinetrade.ru",
  "www.holodilnik.ru",
  "e96.ru",
  "www.top-shop.ru",
  "petrovich.ru",
  "www.vsemayki.ru",
  "www.petshop.ru",
  "exist.ru",
  "www.autodoc.ru",
  "baza.drom.ru",
  "star-tex.ru",
  "printbar.ru",
  "www.joom.ru",
  "tvoe.ru",
  "www.pult.ru",
  "www.muztorg.ru",
  "eda.yandex.ru",
  "sbermarket.ru",
  "www.litres.ru",
  "book24.ru",
  "kari.com",
  "1001prof.ru",
  "my-shop.ru",
  "www.auchan.ru",
  "video-shoper.ru",
  "shop.mts.ru",
  "www.technopark.ru",
  "kotofoto.ru",
  "moscow.shop.megafon.ru",
  "www.fotosklad.ru",
  "biggeek.ru",
  "www.123.ru",
  "www.pleer.ru",
  "www.notik.ru",
  "www.techport.ru",
  "www.rbt.ru",
  "kcentr.ru",
  "multivarka.pro",
  "tefal.ru",
  "vasko.ru",
  "braun-russia.ru",
  "www.rusklimat.ru",
  "www.bork.ru",
  "domotekhnika.ru",
  "azbuka-techniki.ru",
  "elecity.ru",
  "pro-komfort.com",
  "hoff.ru",
  "www.stolplit.ru",
  "zvet.ru",
  "lazurit.com",
  "www.bestmebelshop.ru",
  "divanboss.ru",
  "shop.galerie46.com",
  "imodern.ru",
  "hypermarketmebel.ru",
  "pm.ru",
  "yourroom.ru",
  "www.shatura.com",
  "www.triya.ru",
  "www.angstrem-mebel.ru",
  "store.rerooms.ru",
  "www.mebelaero.ru",
  "mebelidomanet.ru",
  "rf.petrovich.ru",
  "www.castorama.ru",
  "obi.ru",
  "www.220-volt.ru",
  "poryadok.ru",
  "www.epool.ru",
  "tvoydom.ru",
  "gardengear.ru",
  "www.garshinka.ru",
  "sad-i-ogorod.ru",
  "www.gardenstock.ru",
  "www.agrotreding.ru",
  "www.ncsemena.ru",
  "mirdachnika.net",
  "www.tsum.ru",
  "ru.benetton.com",
  "henderson.ru",
  "zarina.ru",
  "elyts.ru",
  "lacoste.ru",
  "incanto.eu",
  "www.laredoute.ru",
  "vipavenue.ru",
  "www.sela.ru",
  "belleyou.ru",
  "www.gloria-jeans.ru",
  "befree.ru",
  "ostin.com",
  "tvoe.ru",
  "www.charuel.ru",
  "brandshop.ru",
  "ecco.ru",
  "zenden.ru",
  "www.rendez-vous.ru",
  "respect-shoes.ru",
  "ralf.ru",
  "ekonika.ru",
  "rieker-shop.ru",
  "www.noone.ru",
  "superstep.ru",
  "salamander.ru",
  "thomas-muenz.ru",
  "marioberlucci.ru",
  "mascotte.ru",
  "askent.ru",
  "fetichebrand.ru",
  "street-beat.ru",
  "www.brd.ru",
  "fitness-place.ru",
  "www.domsporta.com",
  "www.planeta-sport.ru",
  "barfits.ru",
  "www.gipersport.ru",
  "www.kant.ru",
  "sportpoint.ru",
  "www.velostrana.ru",
  "www.velosklad.ru",
  "trial-sport.ru",
  "sportmarket.su",
  "www.brd.ru",
  "redfoxmsk.ru",
  "sport-marafon.ru",
  "www.sportkult.ru",
  "alpindustria.ru",
  "www.akusherstvo.ru",
  "www.gulliver.ru",
  "www.toy.ru",
  "www.keng.ru",
  "www.bebakids.ru",
  "www.korablik.ru",
  "richfamily.ru",
  "trignoma.ru",
  "danielonline.ru",
  "www.nils.ru",
  "www.berito.ru",
  "www.toyway.ru",
  "umnitsa.ru",
  "www.crockid.ru",
  "www.votonia.ru",
  "playtoday.ru",
  "goldapple.ru",
  "www.letu.ru",
  "www.yves-rocher.ru",
  "randewoo.ru",
  "www.podrygka.ru",
  "mixit.ru",
  "christinacosmetics.ru",
  "okbeauty.store",
  "aromacode.ru",
  "kikocosmetics.ru",
  "rivegauche.ru",
  "www.proficosmetics.ru",
  "siberina.ru",
  "www.beauty-shop.ru",
  "aravia.ru",
  "iledebeaute.ru",
  "teana-labs.ru",
  "professionalhair.ru",
  "apteka.ru",
  "www.rigla.ru",
  "zdravcity.ru",
  "366.ru",
  "www.med-magazin.ru",
  "www.asna.ru",
  "www.ochkov.net",
  "ochkarik.ru",
  "www.linzi.ru",
  "minicen.ru",
  "sklad-zdorovo.ru",
  "www.oxy2.ru",
  "ozerki.ru",
  "monastirev.ru",
  "zhivika.ru",
  "aptekiplus.ru",
  "www.budzdorov.ru",
  "wer.ru",
  "miuz.ru",
  "adamas.ru",
  "epldiamond.ru",
  "shop-krastsvetmet.ru",
  "panclubrussia.ru",
  "www.bronnitsy.com",
  "sokolov.ru",
  "sunlight.net",
  "nebo.ru",
  "www.585zolotoy.ru",
  "kamnevedy.ru",
  "liniilubvi.ru",
  "liniilubvi.ru",
  "zoloto585.ru",
  "nikawatches.ru",
  "diamant-online.ru",
  "www.bethowen.ru",
  "4lapy.ru",
  "lemurrr.ru",
  "www.royalcanin.com",
  "www.dogeat.ru",
  "www.mirkorma.ru",
  "msk.zapovednik96.ru",
  "magizoo.ru",
  "zoopassage.ru",
  "www.petonline.pro",
  "zoomag.ru",
  "samizoo.ru",
  "emex.ru",
  "autopiter.ru",
  "www.kolesa-darom.ru",
  "koleso.ru",
  "dvizhcom.ru",
  "carvilleshop.ru",
  "www.avtoall.ru",
  "carcam.ru",
  "mosautoshina.ru",
  "akbmag.ru ",
  "www.megazip.ru",
  "euro-diski.ru",
  "автошиныдиски.рф",
  "www.amag.ru",
  "autoprofi.ru",
  "www.starline.ru",
  "p-food.ru",
  "general-food.ru",
  "www.justfood.pro",
  "elementaree.ru",
  "partiyaedi.ru",
  "nuzhnaeda.ru",
  "www.chefmarket.ru",
  "cookathome.ru",
  "www.utkonos.ru",
  "samokat.ru",
  "igooods.ru",
  "www.perekrestok.ru",
  "av.ru",
  "www.cian.ru",
  "realty.yandex.ru",
  "domclick.ru",
  "youla.ru",
  "www.mirkvartir.ru",
  "www.farpost.ru",
  "move.ru",
  "www.restate.ru",
  "msk.etagi.com",
  "msk.n1.ru",
  "yavitrina.ru",
  "meshok.net",
  "unibo.ru",
  "au.ru",
  "rudos.ru",
  "kupiprodai.ru",
  "gde.ru",
  "allcedo.ru",
  "www.tutu.ru",
  "city.travel",
  "www.onetwotrip.com",
  "oktogo.ru",
  "travelbelka.ru",
  "travelata.ru",
  "level.travel",
  "www.onlinetours.ru",
  "www.aviasales.ru",
  "www.biletik.aero",
  "www.kupibilet.ru",
  "airlines.aero",
  "pass.rzd.ru",
  "poezd.ru",
  "www.omio.ru",
  "ostrovok.ru",
  "bronevik.com",
  "tvil.ru",
  "kassa.one",
  "касса-жд.рф",
  "www.putevka.com",
  "search.hotellook.com",
  "sutochno.ru",
  "www.sanatoriums.com",
  "mirturbaz.ru",
  "sanatory.ru",
  "www.alean.ru",
  "kwork.ru",
  "work-zilla.com",
  "profi.ru",
  "youdo.com",
  "www.fl.ru",
  "prodoctorov.ru",
  "docdoc.ru",
  "health.yandex.ru",
  "gemotest.ru",
  "www.invitro.ru",
  "www.cmd-online.ru",
  "lab4u.ru",
  "yasno.live",
  "alter.ru",
  "www.b17.ru",
  "www.sravni.ru",
];

export {
  commerceMarker,
  infoMarker,
  navigationMarker,
  mediaMarker,
  domenCommerce,
  domenInfo,
};
