export interface frenchApp {
  name: string;
  category:
    | 'Books'
    | 'Business'
    | 'Developer Tools'
    | 'Education'
    | 'Entertainment'
    | 'Finance'
    | 'Food & Drink'
    | 'Games'
    | 'Graphics & Design'
    | 'Health & Fitness'
    | 'Lifestyle'
    | 'Kids (iOS and iPadOS only)'
    | 'Magazines & Newspapers'
    | 'Medical'
    | 'Music'
    | 'Navigation'
    | 'News'
    | 'Photo & Video'
    | 'Productivity'
    | 'Reference'
    | 'Shopping'
    | 'Social Networking'
    | 'Sports'
    | 'Travel'
    | 'Utilities'
    | 'Weather';
  logo_url: string;
  ios_url?: string | null;
  android_url?: string | null;
  website_url?: string | null;
  podcast_url?: string | null;
}

export interface frenchApps {
  records: frenchApp[];
}

export type filteredApp = Omit<frenchApp, 'category'>;

export const frenchAppsFixture: frenchApps = {
  records: [
    // Dupplicate and uncomment the following lines to add a new app
    // {
    //   name: '',
    //   category: '',
    //   website_url: '',
    //   android_url: '',
    //   ios_url: '',
    //   logo_url: '', // get it from https://www.apple.com/fr/search/
    //   podcast_url: '', // get it from https://open.spotify.com/show/69dZrIeMZ2S2QELCGp6gW1
    // },
    {
      name: 'SaxoTools',
      category: 'Music',
      website_url: 'https://www.saxotools.com/',
      android_url:
        'https://play.google.com/store/apps/details?id=com.saxotools&hl=fr',
      ios_url: 'https://apps.apple.com/fr/app/saxotools/id6448632359',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/0a/52/fa/0a52fa97-f0e0-9b31-879d-65b1bcf3ced1/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      podcast_url:
        'https://open.spotify.com/episode/3tYS4XStjhwtqqPenqRL2m?si=c18878edf75f48bc',
    },
    {
      name: 'Osly Solutions',
      category: 'Utilities',
      website_url: 'https://oslysolutions.fr/',
      android_url:
        'https://play.google.com/store/apps/details?id=com.oslysolutions&hl=fr',
      ios_url: 'https://apps.apple.com/fr/app/osly-solutions/id6462306150',
      logo_url:
        'https://play-lh.googleusercontent.com/oYXDBmmS787ECAwswssYo5gsyKWb2_gBaSNke0ZHnLRo3CJAsTqnEruyzf1KJ7gKfd-ejR9R8JGPX8bsaATNxg=w480-h960',
      podcast_url:
        'https://open.spotify.com/episode/2qQDkRi66lzMSKnZA39YOj?si=d8549c280ab74432',
    },
    {
      name: 'KicksFolio',
      category: 'Shopping',
      website_url: 'https://www.kicksfolio.com/',
      android_url:
        'https://play.google.com/store/apps/details?id=app.kicksfolio&hl=fr',
      ios_url: 'https://apps.apple.com/fr/app/kicksfolio/id6740185181',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a3/2e/e1/a32ee136-3d13-baf8-16bd-8df2ce42cc45/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      podcast_url:
        'https://open.spotify.com/episode/5O89q9TOfDhsJNCC9H89xV?si=177c75f197ee4878',
    },
    {
      name: 'Odisei Play',
      category: 'Music',
      website_url: 'https://odiseimusic.com/fr/odisei-play/',
      android_url:
        'https://play.google.com/store/apps/details?id=com.travelsaxv2',
      ios_url: 'https://apps.apple.com/fr/app/odisei-play/id6748117099',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/8f/52/bd/8f52bdf6-2921-4f8d-1067-c9a819650162/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      podcast_url:
        'https://open.spotify.com/episode/1ym8Ydg6M3QTuP5xiThsIQ?si=b86c19c9ec12453b',
    },
    {
      name: 'Rosk',
      category: 'Business',
      website_url: 'https://www.rosk.com/',
      android_url:
        'https://play.google.com/store/apps/details?id=com.rosk&hl=fr',
      ios_url: 'https://apps.apple.com/fr/app/rosk/id6741195304',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/19/4f/1c/194f1c93-84aa-517e-d989-5958ce66f60b/AppIcon-0-0-1x_U007epad-0-1-85-220.png/246x0w.webp',
      podcast_url:
        'https://open.spotify.com/episode/7oDLs8BUb1TFYUeBZ4Cnys?si=0af04e2dfe2e4596',
    },
    {
      name: 'ControlResell',
      category: 'Shopping',
      android_url:
        'https://play.google.com/store/apps/details?id=com.lyesbenchoubane.controlresell&hl=en',
      ios_url:
        'https://apps.apple.com/fr/app/controlresell-stock-inventaire/id6447619941',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/25/f8/fd/25f8fd8f-f7ad-7f3b-f804-0bd64c124532/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/460x0w.webp',
      website_url: 'https://www.controlresell.com/',
      podcast_url:
        'https://open.spotify.com/episode/1Pet3tskRm0E64ftDt00n9?si=6fc1dcfdb4734c65',
    },
    {
      name: 'Mangacollec',
      category: 'Books',
      android_url:
        'https://play.google.com/store/apps/details?id=com.mangacollec',
      ios_url: 'https://apps.apple.com/fr/app/mangacollec/id1178656045',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/13/60/fc/1360fc54-4755-0359-adab-2414d735ec68/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
      website_url: 'https://www.mangacollec.com/',
      podcast_url:
        'https://open.spotify.com/episode/6guQ03HE7yadwX369y0zjn?si=ee5c8f18db7c4595',
    },
    {
      name: 'Pacevisor',
      category: 'Health & Fitness',
      android_url:
        'https://pacevisor.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fandroid-download.9e23af6e.png&w=640&q=75',
      ios_url:
        'https://apps.apple.com/fr/app/pacevisor-convertisseur-course/id1488948143',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4b/f4/41/4bf4416f-f939-83ac-7d2b-d18f7fd888c2/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      website_url: 'https://pacevisor.com/',
      podcast_url:
        'https://open.spotify.com/episode/4VyluvJMpxAOvTPS0Cbj3k?si=1e9e942c1cc64ee9',
    },
    {
      name: 'Mūcho',
      category: 'Lifestyle',
      android_url:
        'https://play.google.com/store/apps/details?id=fr.getmucho.app&pcampaignid=web_share',
      ios_url: 'https://apps.apple.com/fr/app/mucho/id6737886597',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e8/fb/dd/e8fbdd06-cdf2-bc6c-7e3c-f9853f82aa1b/AppIcon-0-0-1x_U007epad-0-85-220.png/460x0w.webp',
      website_url: 'https://www.getmucho.fr/',
      podcast_url:
        'https://open.spotify.com/episode/1uF2VZH5rs5eXeUAPpVNQQ?si=e8fbd76d663642ef',
    },
    {
      name: 'Swan',
      category: 'Finance',
      android_url:
        'https://play.google.com/store/apps/dev?id=5935141824663336810',
      ios_url: 'https://apps.apple.com/fr/app/swan/id1536581956',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ec/ca/c7/eccac76a-0a83-5ff4-d878-1b0915922572/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
      website_url: 'https://swan.io/',
      podcast_url:
        'https://open.spotify.com/episode/6OFwNSER1iNx1K5Scoge4t?si=d05827ceda464775',
    },
    {
      name: 'Cdiscount',
      category: 'Shopping',
      android_url:
        'https://play.google.com/store/apps/details?id=cdiscount.mobile',
      ios_url: 'https://apps.apple.com/fr/app/cdiscount/id398364165',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/50/72/01/507201ee-d376-6f51-c94d-cf9d3bdd3c7b/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      podcast_url:
        'https://open.spotify.com/episode/4u0RkE3y1gkCpFtpppk25t?si=a6ed852bde0b4dfa',
      website_url: 'https://www.cdiscount.com/',
    },
    {
      name: 'Finary',
      category: 'Finance',
      android_url:
        'https://play.google.com/store/apps/details?id=com.finary.main',
      ios_url:
        'https://apps.apple.com/fr/app/finary-patrimoine-bitcoin/id1569413444',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c2/36/b9/c236b9c8-e3cf-42e0-9570-e486c4637995/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      website_url: 'https://finary.com/',
    },
    {
      name: 'Hivebrite',
      category: 'Social Networking',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/8d/24/e1/8d24e1ae-3675-0673-2d98-17e19f580ea7/AppIcon-0-0-1x_U007ephone-0-85-220.png/460x0w.webp',
      website_url: 'https://hivebrite.io/mobile-app',
    },
    {
      name: 'Ledger',
      category: 'Finance',
      android_url:
        'https://play.google.com/store/apps/details?id=com.ledger.live&hl=en&gl=US',
      ios_url:
        'https://apps.apple.com/us/app/ledger-live-crypto-nft-app/id1361671700',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/dd/4b/6f/dd4b6f3c-a3e2-ed8d-0fc6-bea54a6be730/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/460x0w.webp',
      website_url: 'https://www.ledger.com/ledger-live',
    },
    {
      name: 'Ornikar',
      category: 'Education',
      android_url:
        'https://play.google.com/store/apps/details?id=com.ornikar.learning&hl=fr',
      ios_url:
        'https://apps.apple.com/fr/app/ornikar-code-et-permis/id1612432450',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/fc/6e/17/fc6e171e-cd14-d36a-91e7-387da9c61439/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/460x0w.webp',
      website_url: 'https://www.ornikar.com/a-propos/app-mobile',
      podcast_url:
        'https://open.spotify.com/episode/7nKJ4uxFPnhv2TMf28eqEJ?si=c84fbf441ad04acf',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.meero.realtors&hl=en_US',
      category: 'Photo & Video',
      ios_url: 'https://apps.apple.com/fr/app/meero-realtors/id1608365779',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/86/4b/ec/864becdb-e575-a1af-79d2-8b893b92e9ae/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/146x0w.webp',
      name: 'Meero',
      website_url: 'https://www.meero.com/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=air.ugc.fr.ugcdirect&hl=en',
      category: 'Entertainment',
      ios_url: 'https://apps.apple.com/be/app/ugc/id503875877',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/32/d3/d0/32d3d0f3-9947-d31d-4059-adf282bf7f92/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/460x0w.webp',
      name: 'UGC',
      website_url: 'https://www.ugc.fr/',
    },
    {
      android_url: 'https://play.google.com/store/apps/details?id=com.manomano',
      category: 'Shopping',
      ios_url:
        'https://apps.apple.com/fr/app/manomano-bricolage-et-jardin/id1503142603',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/33/8b/01/338b0105-8f27-34c0-45c7-c1bd4d205876/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/460x0w.webp',
      name: 'ManoMano',
      website_url: 'https://www.manomano.fr/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.spendesk.spendesk',
      category: 'Finance',
      ios_url: 'https://apps.apple.com/fr/app/spendesk/id1189271166',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d3/a7/47/d3a7471f-253c-c061-ce4d-a1bbcfd62129/AppIcon-0-0-1x_U007epad-0-1-0-85-220.png/460x0w.webp',
      name: 'Spendesk',
      website_url: 'https://www.spendesk.com/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=fr.pmu.sports&hl=fr&gl=FR',
      category: 'Sports',
      ios_url:
        'https://apps.apple.com/fr/app/pmu-sport-paris-sportifs/id587844598',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b2/ce/f6/b2cef64f-4b47-7da5-7168-ad382eb42288/appicon-0-0-1x_U007emarketing-0-7-0-85-220.png/460x0w.webp',
      name: 'PMU',
      website_url: 'https://www.pmu.fr/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=app.blank.mobile&hl=fr',
      category: 'Finance',
      ios_url:
        'https://apps.apple.com/fr/app/blank-compte-professionnel/id1522046776',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b2/48/b5/b248b56a-996d-11c6-b56c-898d4f9f0c85/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/460x0w.webp',
      name: 'Blank',
      website_url: 'https://landing.blank.app/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.shoootin.mobile',
      category: 'Photo & Video',
      ios_url: 'https://apps.apple.com/app/shoootin/id1408602189',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple125/v4/f1/3e/39/f13e3997-a86a-56b7-e462-5725fe760ccc/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp',
      name: 'Shoootin',
      website_url: 'https://shoootin.com/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.morphy.app',
      category: 'Sports',
      ios_url:
        'https://apps.apple.com/fr/app/morphy-programme-musculation/id1667787113',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/99/35/84/9935840f-3804-e3cf-a1b6-60ea4a80c137/AppIcon-0-0-1x_U007ephone-0-85-220.png/460x0w.webp',
      name: 'Morphy',
      website_url: 'https://morphy.fr/',
    },
    {
      name: 'Shine',
      android_url:
        'https://play.google.com/store/apps/details?id=com.shine.app',
      category: 'Finance',
      ios_url:
        'https://apps.apple.com/fr/app/shine-compte-pro-en-ligne/id1159779855',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/24/4e/af/244eaf1e-fa84-898a-535b-2a2fa7abd8dc/AppIcon-0-0-1x_U007epad-0-85-220.png/460x0w.webp',
      website_url: 'https://www.shine.fr/',
    },
    {
      name: 'Matera',
      android_url:
        'https://play.google.com/store/apps/details?id=eu.matera.app',
      category: 'Business',
      ios_url: 'https://apps.apple.com/fr/app/matera/id1501663391',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2f/56/b7/2f56b72d-237c-98fe-94ae-9189b7d7a9f4/AppIcon-production-0-0-1x_U007emarketing-0-7-0-0-85-220.png/460x0w.webp',
      website_url: 'https://matera.eu/fr',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.smartnsoft.metro&hl=fr',
      category: 'News',
      ios_url:
        'https://apps.apple.com/us/app/tf1-info-lci-actualit%C3%A9s/id426125722',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f6/30/31/f6303121-110d-afc1-8190-3e48d7e9051d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
      name: 'TF1 Info - LCI',
      website_url: 'https://www.tf1info.fr/',
    },
    {
      android_url: 'https://play.google.com/store/apps/details?id=com.karnott',
      category: 'Productivity',
      ios_url: 'https://apps.apple.com/ca/app/karnott/id1451207222',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/36/49/67/3649675f-bd1c-6a2c-5972-87f49f34f9c7/AppIcon-0-0-1x_U007ephone-0-85-220.png/460x0w.webp',
      name: 'Karnott',
      podcast_url:
        'https://open.spotify.com/episode/4dyRNiw7xuSGpdQXkwb3GW?si=8790eede701746d6',
      website_url: 'https://www.karnott.fr/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=fr.doctolib.www&hl=en&gl=US',
      category: 'Health & Fitness',
      ios_url:
        'https://apps.apple.com/fr/app/doctolib-trouvez-un-m%C3%A9decin/id925339063',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9a/09/4b/9a094bd4-54b6-4f58-9c1c-c5cff1135deb/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/460x0w.webp',
      name: 'Doctolib',
      website_url: 'https://www.doctolib.fr/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=hr.lunc.client&hl=fr&pli=1',
      category: 'Finance',
      ios_url: 'https://apps.apple.com/us/app/swile/id1190612035',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4f/77/1c/4f771cb7-fbea-c144-986c-d42a1a294411/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/460x0w.webp',
      name: 'Swile',
      website_url: 'https://www.swile.co/fr-fr',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=co.sharelock.app&hl=fr',
      category: 'Lifestyle',
      ios_url: 'https://apps.apple.com/fr/app/sharelock/id1540289966',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/9c/a7/a4/9ca7a47f-c6ef-41ea-4965-c746df6505df/AppIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/460x0w.webp',
      name: 'ShareLock',
      website_url: 'https://www.sharelock.co/',
      podcast_url:
        'https://open.spotify.com/episode/2zOddvp0or5uyg97FSGMkA?si=e6ace9e1ae6a4caf',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=co.brigad&hl=fr',
      category: 'Business',
      ios_url:
        'https://apps.apple.com/fr/app/brigad-travailler-librement/id1232220717',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/15/77/f7/1577f708-b52e-6bf3-8cd2-e2808cb87018/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      name: 'Brigad',
      website_url: 'https://www.brigad.co/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.comuto&hl=en',
      category: 'Travel',
      ios_url:
        'https://apps.apple.com/fr/app/blablacar-covoiturage-et-bus/id341329033',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ba/d3/e4/bad3e466-e404-4ac0-2c5f-51c540c8b2f3/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/460x0w.webp',
      name: 'BlaBlaCar',
      website_url: 'https://www.blablacar.com/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.wecasa&hl=fr',
      category: 'Lifestyle',
      ios_url:
        'https://apps.apple.com/fr/app/m%C3%A9nage-et-bien-%C3%AAtre-wecasa/id1339647526',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/13/41/9c/13419c38-d086-b356-0370-2f45bd99e295/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/460x0w.webp',
      name: 'Wecasa',
      website_url: 'https://www.wecasa.fr/',
    },
    {
      android_url:
        'https://play.google.com/store/search?q=sarenza&c=apps&hl=fr',
      category: 'Shopping',
      ios_url:
        'https://apps.apple.com/fr/app/sarenza-mode-chaussures/id712216051',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/b4/c0/07/b4c007c8-34b5-b668-381b-30b1240a80ea/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp',
      name: 'Sarenza',
      website_url: 'https://www.sarenza.com/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=fr.airweb.psg&hl=fr',
      category: 'Sports',
      ios_url: 'https://apps.apple.com/fr/app/psg-officiel/id515968212',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/e0/99/d3/e099d379-09ed-b0dd-1994-fc684f9629be/AppIcon-0-0-1x_U007emarketing-0-5-0-sRGB-85-220.png/460x0w.webp',
      name: 'PSG',
      website_url:
        'https://store.psg.fr/fr/paris-saint-germain-football-kits/o-54862513+t-70869215+d-450775+z-8-3911137895?_s=gppc&utm_campaign=Soccer+-+PSG+-+GKs+-+FR+-+FR%7C18825107224&utm_medium=ppc&ks_id=7083_kw32890784&utm_term=psg%20kits&matchtype=b&utm_source=g&target=kwd-295074732380&pcrid=633252623436&adposition=&gad_source=1&gclid=CjwKCAjw5v2wBhBrEiwAXDDoJUY_mJ_3QBeVjPdwh5TFTXNj-zge19MqvueijxBGT5hw0i1RhnKhTxoCyr8QAvD_BwE',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.appchoose.choose.android&hl=fr&gl=FR',
      category: 'Shopping',
      ios_url:
        'https://itunes.apple.com/fr/app/choose-concept-store/id985799982',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/83/0b/c9/830bc98b-89f6-b277-33b3-c2e57b4bd8d2/AppIcon-prod-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      name: 'Choose',
      website_url: 'https://www.appchoose.io/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=app.passculture.webapp&hl=fr',
      category: 'Entertainment',
      ios_url: 'https://apps.apple.com/fr/app/pass-culture/id1557887412',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/1a/e2/1d/1ae21df3-7c50-dbfa-feb2-4d8f6dc1f56f/AppIcon-0-0-1x_U007emarketing-0-10-0-0-sRGB-85-220.png/460x0w.webp',
      name: 'Pass Culture',
      website_url: 'https://pass.culture.fr/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.edf.edfetmoi&hl=fr',
      category: 'Utilities',
      ios_url: 'https://apps.apple.com/fr/app/edf-moi/id563799142',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/51/49/95/51499550-5381-c386-66cd-3ebfbd91603d/AppIcon-1x_U007emarketing-0-11-0-85-220-0.png/460x0w.webp',
      name: 'EDF (Électricité de France)',
      website_url: 'https://www.edf.fr/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.getluko.cover.app&hl=fr',
      category: 'Finance',
      ios_url:
        'https://apps.apple.com/fr/app/luko-n%C3%A9o-assurance-n-1/id1436300089',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/41/51/01/4151014b-a86e-c8f2-2c1c-c25a0f9416e2/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/460x0w.webp',
      name: 'Luko',
      website_url: 'https://fr.luko.eu/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=io.vhive.vhive_ground.release&hl=en&gl=US',
      category: 'Utilities',
      logo_url:
        'https://play-lh.googleusercontent.com/7A5YEJrg4N08VkfSsD84ICF9TVl0p0uMekVfvn5uk5yiucl-D5BpqjH8pcE5SP8CeRw=w240-h480-rw',
      name: 'VHive',
      website_url: 'https://www.vhive.ai/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.alanmobile',
      category: 'Health & Fitness',
      ios_url:
        'https://apps.apple.com/fr/app/alan-france-assurance-sant%C3%A9/id1277025964',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/15/ff/24/15ff24da-3615-8cf9-d4ea-f621f9851fc8/AppIcon-0-0-1x_U007emarketing-0-1-85-220.png/460x0w.webp',
      name: 'Alan',
      podcast_url:
        'https://open.spotify.com/episode/7GxdKx5EsfhTwnhCBitOau?si=0645c020f5754e58',
      website_url: 'https://alan.com/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=revyze.google&hl=en&gl=US',
      category: 'Education',
      ios_url:
        'https://apps.apple.com/bj/app/revyze-ton-bac-entre-potes/id1614818005',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ce/2e/65/ce2e65b3-4704-3b61-5f0e-bd820aee75d1/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      name: 'Revyze',
      website_url: 'https://revyze.fr/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.venteprivee',
      category: 'Shopping',
      ios_url:
        'https://apps.apple.com/fr/app/veepee-by-vente-privee/id906681058',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/26/1b/96/261b966d-0ff6-2b85-50f8-a90a58858f5a/VeepeeAppIcon-0-0-1x_U007emarketing-0-8-0-sRGB-85-220.png/460x0w.webp',
      name: 'Veepee',
      website_url: 'https://www.veepee.fr/',
    },
    {
      android_url: 'https://play.google.com/store/apps/details?id=com.ekklo',
      category: 'Sports',
      ios_url: 'https://apps.apple.com/fr/app/ekklo/id1540289966',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/f3/a2/6df3a215-ea30-6e7a-9994-8c10c37327ab/AppIcon-0-0-1x_U007epad-0-1-85-220.png/460x0w.webp',
      name: 'Ekklo',
      website_url: 'https://www.ekklo.com/',
    },
    {
      android_url:
        'https://play.google.com/store/apps/details?id=com.transpole.mobi&hl=fr',
      category: 'Navigation',
      ios_url: 'https://apps.apple.com/fr/app/il%C3%A9via/id429143032',
      logo_url:
        'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d9/02/d6/d902d64d-7b2b-bff6-bb72-2e13adbf6b12/AppIcon_ilevia-0-0-1x_U007epad-0-1-0-85-220.png/460x0w.webp',
      name: 'Ilévia',
      website_url: 'https://www.ilevia.com/',
    },
  ],
};
