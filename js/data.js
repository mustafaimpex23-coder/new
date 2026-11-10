/* =====================================================================
   Luxora Packaging: site content
   ---------------------------------------------------------------------
   ONE data object holding every piece of repeated content on the site.
   Pages render cards, menus, selects, FAQs etc. from this object, so
   later it can be replaced by a response from an API, e.g.
     fetch('/api/site-content').then(r => r.json()).then(render)
   Keep the shape of this object the same when the backend is added.
   ===================================================================== */
window.LUXORA = {

  /* ---------- Company & contact ---------- */
  contact: {
    brand: 'Luxora Packaging',
    team: 'The Luxora Packaging Team',
    email: 'LuxorapackagingGlobal@gmail.com',
    whatsappDisplay: '+44 7394 499329',
    whatsappNumber: '447394499329',
    whatsappText: 'Hi Luxora Packaging, I would like a quote for custom boxes.',
    facebook: 'https://www.facebook.com/profile.php?id=61596191672381',
    uk: {
      label: 'United Kingdom',
      intro: 'In the UK we operate as WNP Enterprise Ltd',
      company: 'WNP Enterprise Ltd',
      address: ['Unit 5, Industrial Estate', 'Wednesfield Way, Well Lane', 'Wolverhampton WV11 1XP, UK'],
      email: 'wnpenterpriseuk@gmail.com',
      registration: 'Registered in England & Wales, Company No. 16012866'
    },
    usa: {
      label: 'United States',
      intro: 'In the USA we operate as The Providers LLC',
      company: 'The Providers LLC',
      address: ['Registered address:', '2335 Broadway, Astoria', 'NY 11106, United States'],
      email: 'info.theprovidersllc@gmail.com',
      registration: ''
    }
  },

  /* ---------- Announcement ticker ---------- */
  ticker: [
    'Christmas orders are open – book your gift boxes now',
    'Custom rigid boxes from just 50 pieces',
    'Paid samples available before you order',
    'Free quote within 24 hours',
    'Gold foil, embossing and fitted inserts',
    'Delivered to the UK, USA, Canada and Europe'
  ],

  /* ---------- Main navigation (mobile menu is rendered from this) ---------- */
  nav: [
    { label: 'Home', url: 'index.html' },
    { label: 'Box Styles', mega: 'styles' },
    { label: 'Packaging For', mega: 'categories' },
    { label: 'Portfolio', url: 'portfolio.html' },
    { label: 'Samples', url: 'samples.html' },
    { label: 'About', url: 'about.html' },
    { label: 'Blog', url: 'blog.html' },
    { label: 'FAQ', url: 'faq.html' },
    { label: 'Contact', url: 'contact.html' }
  ],

  /* Links shown above the box styles in the "Box Styles" mega menu */
  styleLinks: [
    { label: 'All rigid boxes', url: 'rigid-boxes.html' },
    { label: 'Perfume boxes', url: 'perfume-boxes.html' }
  ],

  /* ---------- Box styles (+ variants used in the quote form) ---------- */
  boxStyles: [
    {
      id: 'flip-top',
      name: 'Magnetic Flip-Top Box',
      shortName: 'Flip-Top',
      url: 'magnetic-flip-top-perfume-box.html',
      designs: 6,
      summary: 'Attached lid that flips open and closes with hidden magnets.',
      description: 'A one-piece rigid box with an attached lid that flips open and snaps shut on hidden magnets. Our most asked-for style for perfume, cosmetics, jewellery and PR boxes.',
      image: 'assets/img/magnetic-flip-top-perfume-box-1200.webp',
      imageAlt: 'Magnetic Flip-Top Box – custom rigid box with logo, made to your size',
      art: 'flipTop',
      variants: ['Leatherette', 'Foam Insert', 'Window', 'Classic', 'Satin-Lined', 'Gold Foil']
    },
    {
      id: 'double-door',
      name: 'Double-Door Box',
      shortName: 'Double-Door',
      url: 'double-door-perfume-box.html',
      designs: 3,
      summary: 'Two panels open from the centre like doors.',
      description: 'Two panels open from the centre like doors to show the product standing inside. A real unboxing moment for perfume bottles, spirits and premium gift sets.',
      image: 'assets/img/double-door-perfume-box-1200.webp',
      imageAlt: 'Double-Door Box – custom rigid box with logo, made to your size',
      art: 'doubleDoor',
      variants: ['Classic', 'Ribbon-Tie', 'Gold Foil']
    },
    {
      id: 'drawer',
      name: 'Sliding Drawer Box',
      shortName: 'Drawer',
      url: 'drawer-box.html',
      designs: 2,
      summary: 'A sleeve with a tray that slides out; great for sets and gifts.',
      description: 'A rigid sleeve with a tray that slides out, finished with a ribbon pull or a thumb cut. Great for sets, gifts, candles and chocolates.',
      image: 'assets/img/drawer-box-1-1200.webp',
      imageAlt: 'Ribbon-Pull Drawer – custom sliding drawer box with logo',
      art: 'drawer',
      variants: ['Ribbon-Pull', 'Thumb-Cut']
    },
    {
      id: 'lid-base',
      name: 'Two-Piece Lid & Base Box',
      shortName: 'Lid & Base',
      url: 'lid-and-base-box.html',
      designs: 3,
      summary: 'Classic rigid box with a separate lid.',
      description: 'The classic rigid box with a separate lid. Choose a full-depth lid, a half lid or a shoulder-neck build for a stepped, premium look.',
      image: 'assets/img/lid-and-base-box-1200.webp',
      imageAlt: 'Two-Piece Lid & Base Box – custom rigid box with logo, made to your size',
      art: 'lidBase',
      variants: ['Full-Lid', 'Half-Lid', 'Shoulder-Neck']
    },
    {
      id: 'book',
      name: 'Book-Style Magnetic Box',
      shortName: 'Book-Style',
      url: 'book-style-box.html',
      designs: 3,
      summary: 'Opens from the side like a book, hidden magnets.',
      description: 'Opens from the side like a book and closes on hidden magnets. The wide front cover gives your logo plenty of room.',
      image: 'assets/img/book-style-box-1200.webp',
      imageAlt: 'Book-Style Magnetic Box – custom rigid box with logo, made to your size',
      art: 'book',
      variants: ['Classic', 'Ribbon', 'Foam Insert']
    },
    {
      id: 'display',
      name: 'Rigid Display Box',
      shortName: 'Display',
      url: 'display-box.html',
      designs: 3,
      summary: 'Showcase boxes for counters and shelves.',
      description: 'Rigid showcase boxes for counters and shelves, built to hold products upright and keep your brand at eye level.',
      image: 'assets/img/display-box-1200.webp',
      imageAlt: 'Rigid Display Box – custom rigid box with logo, made to your size',
      art: 'display',
      variants: ['Counter', 'Tray', 'Open-Front Showcase']
    }
  ],

  /* ---------- Packaging categories ---------- */
  /* Full category content lives in the PHASE 2 section at the bottom of this file */
  categories: [],

  /* ---------- Homepage industry tiles ---------- */
  industries: [
    { name: 'Perfume & fragrance', url: 'perfume-boxes.html', image: 'assets/img/magnetic-flip-top-perfume-box-2-1200.webp', alt: 'Perfume & fragrance packaging' },
    { name: 'Candles & diffusers', url: 'candle-boxes.html', image: 'assets/img/lid-and-base-box-3-1200.webp', alt: 'Candles & diffusers packaging' },
    { name: 'Cosmetics & skincare', url: 'cosmetic-boxes.html', image: 'assets/img/magnetic-flip-top-perfume-box-4-1200.webp', alt: 'Cosmetics & skincare packaging' },
    { name: 'Jewellery & watches', url: 'jewellery-boxes.html', image: 'assets/img/magnetic-flip-top-perfume-box-5-1200.webp', alt: 'Jewellery & watches packaging' },
    { name: 'Chocolates & sweets', url: 'chocolate-boxes.html', image: 'assets/img/magnetic-flip-top-perfume-box-6-1200.webp', alt: 'Chocolates & sweets packaging' },
    { name: 'Corporate & luxury gifts', url: 'corporate-boxes.html', image: 'assets/img/double-door-perfume-box-2-1200.webp', alt: 'Corporate & luxury gifts packaging' },
    { name: 'Hampers & gift sets', url: 'hamper-boxes.html', image: 'assets/img/magnetic-flip-top-perfume-box-3-1200.webp', alt: 'Hampers & gift sets packaging' },
    { name: 'Retail display boxes', url: 'display-boxes.html', image: 'assets/img/display-box-1200.webp', alt: 'Retail display boxes packaging' }
  ],

  /* ---------- Finishes (homepage tabs) ---------- */
  finishes: [
    { id: 'foil', tab: 'Foil', title: 'Gold & silver foil', art: 'foil',
      description: 'Hot-foil stamping in gold, silver, rose gold or copper on your logo, borders or lettering. It catches the light the moment the lid opens.' },
    { id: 'embossing', tab: 'Embossing', title: 'Embossing & debossing', art: 'emboss',
      description: 'Raise your logo out of the board or press it in. Lovely on its own for a quiet look, or paired with foil for extra depth.' },
    { id: 'spot-uv', tab: 'Spot UV', title: 'Spot UV', art: 'spotuv',
      description: 'A clear gloss coat on chosen areas, such as the logo or a pattern, so they shine against a matt background.' },
    { id: 'papers', tab: 'Papers', title: 'Soft-touch & textured papers', art: 'papers',
      description: 'Matt, soft-touch, linen, leatherette or kraft wrapping papers. The paper sets the feel of the box before anything is printed on it.' },
    { id: 'inserts', tab: 'Inserts', title: 'Velvet, satin & EVA foam inserts', art: 'inserts',
      description: 'Inserts cut to the exact shape of your product so nothing moves in transit: EVA foam, velvet-wrapped or satin-lined.' },
    { id: 'magnets', tab: 'Magnets & Ribbons', title: 'Magnets, ribbons & windows', art: 'magnets',
      description: 'Hidden magnets for a clean close, ribbon pulls and ties, and clear windows that show what is inside.' }
  ],

  /* ---------- Key facts (stats row) ---------- */
  stats: [
    { value: 50, suffix: '', label: 'Boxes minimum order' },
    { value: 24, suffix: 'h', label: 'Quote reply' },
    { value: 6, suffix: '+', label: 'Box styles' },
    { text: 'UK & US', label: 'Registered companies' },
    { value: 4, suffix: '', label: 'Regions delivered' }
  ],

  /* ---------- Quantity bands (quick quote) ---------- */
  quantities: [
    { value: '50-100', label: '50 to 100', min: 50 },
    { value: '100-500', label: '100 to 500', min: 100 },
    { value: '500-1000', label: '500 to 1,000', min: 500 },
    { value: '1000+', label: 'More than 1,000', min: 1000 }
  ],

  /* ---------- Countries (quote form) ---------- */
  countries: [
    'United Kingdom', 'United States', 'Canada', 'Ireland', 'France', 'Germany',
    'Netherlands', 'Belgium', 'Spain', 'Italy', 'Sweden', 'Other (Europe)', 'Other'
  ],

  /* ---------- Real videos (Our work) ---------- */
  videos: [
    { title: 'Shoe box with debossed logo', src: 'assets/video/logo-shoe-box-opening.mp4', poster: 'assets/img/work/logo-shoe-box-opening-poster.webp' },
    { title: 'Double-door box opening', src: 'assets/video/double-door-box-opening.mp4', poster: 'assets/img/work/double-door-box-opening-poster.webp' },
    { title: 'Gift box with foam insert', src: 'assets/video/gift-box-foam-insert.mp4', poster: 'assets/img/work/gift-box-foam-insert-poster.webp' },
    { title: 'Kraft lid-and-base box', src: 'assets/video/kraft-box-opening.mp4', poster: 'assets/img/work/kraft-box-opening-poster.webp' }
  ],

  /* ---------- How an order goes ---------- */
  process: [
    { title: 'You send the details', text: 'Box size (or product size), quantity and finish. We usually price it within a day, then send a dieline and proof for you to sign off.' },
    { title: 'Sample, if you want one', text: 'Not required. Samples are paid and made one-off, so you can check the box before the full run.' },
    { title: 'We make the boxes', text: 'Board cut to size, wrapped, foiled or embossed, inserts fitted, exactly as the approved proof.' },
    { title: 'We check them', text: 'Each order is checked against your proof before it is packed.' },
    { title: 'They arrive at your door', text: 'Packed in strong export cartons and delivered to the UK, USA, Canada or Europe.' }
  ],

  /* ---------- Blog preview ---------- */
  /* Blog posts: newest first. The first post is the featured post on blog.html. */
  blogCategories: ['Planning', 'Sizing', 'Finishes', 'Marketing'],
  blog: [
    { title: 'Christmas Gift Boxes for Brands: Plan Your Holiday Packaging', slug: 'christmas-gift-boxes-for-brands',
      url: 'blog/christmas-gift-boxes-for-brands.html', category: 'Planning', date: '2026-10-20', readTime: '3 min read', art: 'drawer',
      excerpt: 'When to order, which styles suit gifting, and how to keep the budget in check before the Christmas rush.',
      image: 'assets/img/magnetic-flip-top-perfume-box-5-1200.webp', alt: 'Christmas Gift Boxes for Brands: How to Plan Your Holiday Packaging' },
    { title: 'How to Size a Perfume Box for 30 ml, 50 ml and 100 ml Bottles', slug: 'how-to-size-a-perfume-box-30ml-50ml-100ml',
      url: 'blog/how-to-size-a-perfume-box-30ml-50ml-100ml.html', category: 'Sizing', date: '2026-09-15', readTime: '3 min read', art: 'flipTop',
      excerpt: 'Measure the bottle, allow for the insert and the cap, and pick a style that shows the bottle off.',
      image: 'assets/img/double-door-perfume-box-2-1200.webp', alt: 'How to Size a Perfume Box for 30 ml, 50 ml and 100 ml Bottles' },
    { title: 'PR Boxes and Influencer Packaging: How to Make Boxes People Film', slug: 'pr-boxes-influencer-packaging-guide',
      url: 'blog/pr-boxes-influencer-packaging-guide.html', category: 'Marketing', date: '2026-08-28', readTime: '3 min read', art: 'doubleDoor',
      excerpt: 'Openings, inserts and finishes that look good on camera, and what to skip.',
      image: 'assets/img/drawer-box-1-1200.webp', alt: 'PR Boxes and Influencer Packaging: How to Make Boxes People Film' }
  ],

  /* ---------- FAQs (homepage shows these 5) ---------- */
  faqs: [
    { q: 'What is the minimum order?', a: 'The minimum order is 50 pieces per design. The more boxes you order, the lower the price per box.' },
    { q: 'How much do the boxes cost?', a: 'Every box is custom, so the price depends on size, material, finishes and quantity. Send us your details through Get a Quote and we will give you an exact price.' },
    { q: 'Can I get a sample first?', a: 'Yes, paid samples are available. The price depends on size, style and finishes, and it is confirmed before you pay.' },
    { q: 'Can you print my logo?', a: 'Yes. We can add your logo in foil, embossing, debossing, spot UV or full-colour print.' },
    { q: 'Which countries do you deliver to?', a: 'We deliver to the UK, USA, Canada and Europe. Bulk quotes include delivery; sample shipping is quoted separately.' }
  ],

  /* ---------- Footer columns ---------- */
  footer: {
    styleExtras: [
      { label: 'Magnetic closure boxes', url: 'magnetic-closure-boxes.html' },
      { label: 'Boxes with inserts', url: 'rigid-boxes-with-inserts.html' },
      { label: 'Shoulder-neck boxes', url: 'shoulder-neck-rigid-boxes.html' },
      { label: 'Low minimum order (50)', url: 'low-moq-rigid-boxes.html' },
      { label: 'Custom boxes with logo', url: 'custom-logo-boxes.html' }
    ],
    company: [
      { label: 'Portfolio', url: 'portfolio.html' },
      { label: 'About us', url: 'about.html' },
      { label: 'Paid samples', url: 'samples.html' },
      { label: 'Shipping & delivery', url: 'shipping.html' },
      { label: 'FAQ', url: 'faq.html' },
      { label: 'Blog', url: 'blog.html' },
      { label: 'UK', url: 'uk.html' },
      { label: 'USA', url: 'usa.html' },
      { label: 'Canada', url: 'canada.html' },
      { label: 'Europe', url: 'europe.html' },
      { label: 'Get a quote', url: 'quote.html' }
    ]
  }
};

/* =====================================================================
   PHASE 2 CONTENT: style pages, categories, portfolio, samples, about
   ===================================================================== */
(function (D) {

  /* ---------- Shared spec rows (style pages) ---------- */
  D.specs = {
    board: '1.5 mm / 2 mm / 2.5 mm greyboard',
    papers: 'Matt, soft-touch, linen, leatherette, kraft or full-colour printed art paper',
    finishes: 'Gold & silver foil, embossing, debossing, spot UV, full-colour print',
    moq: '50 pieces per design',
    sizes: 'Made to your size, in mm or inches'
  };

  /* ---------- Extra detail per box style (keyed by style id) ---------- */
  D.styleDetails = {
    'flip-top': {
      bestFor: ['perfume', 'cosmetic', 'jewellery', 'corporate', 'gift', 'watch'],
      closure: 'Hidden magnets in the lid flap and front wall',
      inserts: 'EVA foam, card, velvet-wrapped or satin-lined trays',
      variants: {
        'Leatherette': 'Leather-grain wrap paper with a debossed or foiled logo. Feels heavy and expensive in the hand.',
        'Foam Insert': 'EVA foam cut to the exact shape of your product, so bottles and jars sit tight.',
        'Window': 'A clear window in the lid so the product is on show before the box is opened.',
        'Classic': 'Plain soft-touch or matt wrap with a single foil logo. Simple and hard to get wrong.',
        'Satin-Lined': 'Satin fabric lining over a soft pad, the classic look for perfume and jewellery.',
        'Gold Foil': 'Large gold-foil artwork across the lid and sides for a bold, festive look.'
      },
      faqs: [
        { q: 'How strong are the magnets?', a: 'Strong enough to snap the lid shut and keep it closed in transit, but easy to open with one hand. The magnets are hidden under the wrap paper, so you never see them.' },
        { q: 'Can the box ship flat?', a: 'No. A flip-top box is rigid and ships fully built, which is why it feels so solid. If you need flat-packed boxes, ask us about collapsible versions.' },
        { q: 'Can I have a ribbon pull on the lid?', a: 'Yes. A small ribbon tab on the front edge of the lid is a popular addition and makes the box easier to open.' },
        { q: 'What size perfume bottle will fit?', a: 'Any size. We make the box to your bottle, so send us the bottle size (or the bottle itself for a sample) and we will size the insert around it.' }
      ]
    },
    'double-door': {
      bestFor: ['perfume', 'gift', 'corporate', 'presentation', 'cosmetic'],
      closure: 'Hidden magnets where the two doors meet, or a ribbon tie',
      inserts: 'Upright EVA foam or card cradles that hold the product standing',
      variants: {
        'Classic': 'Two magnetic doors that meet in the middle, with a plain soft-touch wrap.',
        'Ribbon-Tie': 'Satin ribbons fixed to each door and tied in a bow at the front.',
        'Gold Foil': 'Gold-foil artwork that lines up across both doors when they are closed.'
      },
      faqs: [
        { q: 'Does the product stand up inside?', a: 'Yes. Double-door boxes are usually built tall, with an insert that holds the product standing, so it is the first thing you see when the doors open.' },
        { q: 'How do the doors stay closed?', a: 'With hidden magnets where the doors meet, or with a ribbon tie for a gift look. Both keep the doors closed in transit.' },
        { q: 'Can you print inside the doors?', a: 'Yes. Printing a message or pattern inside the doors is a nice touch and costs less than most people expect.' },
        { q: 'Is it more expensive than a flip-top box?', a: 'A little, because there are more panels and magnets. We will give you both prices if you are deciding between them.' }
      ]
    },
    'drawer': {
      bestFor: ['candle', 'chocolate', 'jewellery', 'apparel', 'gift', 'bridesmaid'],
      closure: 'Sliding tray in a rigid sleeve, with a ribbon pull or a thumb cut',
      inserts: 'Card dividers, EVA foam, or a crinkle-paper bed',
      variants: {
        'Ribbon-Pull': 'A satin ribbon fixed to the tray end so it slides out with a gentle pull.',
        'Thumb-Cut': 'A half-moon cut in the sleeve so the tray can be pushed out with a thumb.'
      },
      faqs: [
        { q: 'Will the tray slide out by itself?', a: 'No. We size the tray to the sleeve so it slides smoothly but stays put until you pull it.' },
        { q: 'Can the sleeve and tray be different colours?', a: 'Yes. A black sleeve with a coloured tray, or the other way round, is a popular choice.' },
        { q: 'Can the tray have dividers?', a: 'Yes. We can fit card dividers or a foam insert to hold several items, which is why drawer boxes are so good for sets.' },
        { q: 'Is a drawer box good for chocolates?', a: 'Very good. Food-safe inner trays and liners are available, and the drawer keeps the chocolates flat and protected.' }
      ]
    },
    'lid-base': {
      bestFor: ['gift', 'apparel', 'hamper', 'corporate', 'presentation', 'paper'],
      closure: 'Separate lid that sits over the base: full lid, half lid or shoulder-neck',
      inserts: 'Card or foam inserts, tissue, or a raised platform',
      variants: {
        'Full-Lid': 'The lid covers the whole base. Strong, simple and great for heavier items.',
        'Half-Lid': 'A shallower lid that shows part of the base, often in a contrast colour.',
        'Shoulder-Neck': 'A raised neck inside the base that the lid sits on, giving a stepped, premium edge.'
      },
      faqs: [
        { q: 'What is a shoulder-neck box?', a: 'A lid and base box with an extra inner wall (the neck) that sticks up from the base. The lid sits on the shoulder, so you see a band of the neck when the box is closed.' },
        { q: 'Will the lid fall off?', a: 'No. We size the lid to the base so it slides on smoothly with a little air resistance, which keeps it in place.' },
        { q: 'Is this good for clothing?', a: 'Yes. Lid and base boxes are the classic choice for shirts, scarves and knitwear, especially with tissue paper and a sticker seal.' },
        { q: 'Can the lid and base be different colours?', a: 'Yes. A contrast lid or a printed base is an easy way to make a simple box look special.' }
      ]
    },
    'book': {
      bestFor: ['jewellery', 'watch', 'cosmetic', 'presentation', 'corporate', 'bridesmaid'],
      closure: 'Front cover opens from the side and closes on hidden magnets',
      inserts: 'EVA foam, velvet or satin trays; printed message inside the cover',
      variants: {
        'Classic': 'A hard cover that opens from the side, with a soft-touch wrap and a foil logo.',
        'Ribbon': 'A ribbon pull or tie on the open edge, so it feels like opening a gift book.',
        'Foam Insert': 'Fitted EVA foam with cut-outs for each product, ideal for sets.'
      },
      faqs: [
        { q: 'What is the difference from a flip-top box?', a: 'A flip-top box opens upwards from the back. A book-style box opens from the side like a book, which gives you a full front cover for your logo and an inner cover for a message.' },
        { q: 'Can I print a message inside the cover?', a: 'Yes. A thank-you note or brand story inside the cover is one of the best things about this style.' },
        { q: 'Is it good for jewellery sets?', a: 'Very good. A foam or velvet insert with slots for each piece keeps a ring, necklace and earrings neat and in place.' },
        { q: 'How thick can the box be?', a: 'From slim (around 20 mm) for cards and jewellery to deep (80 mm or more) for cosmetics sets. We size it to what goes inside.' }
      ]
    },
    'display': {
      bestFor: ['display', 'cosmetic', 'chocolate', 'candle', 'hair', 'perfume'],
      closure: 'Open front or tray; optional lid for shipping',
      inserts: 'Card dividers or slotted risers that hold products upright',
      variants: {
        'Counter': 'A tray with a raised header card for your logo, made to sit next to the till.',
        'Tray': 'A low open tray with dividers, for shelves and display cabinets.',
        'Open-Front Showcase': 'A rigid box with an open or windowed front, so products are seen from the front.'
      },
      faqs: [
        { q: 'Do display boxes ship flat?', a: 'Rigid display boxes ship built, so they arrive ready to use. Many brands also ship their products inside them.' },
        { q: 'Can the header card show my logo?', a: 'Yes. The header card is the best place for your logo and can be foiled, embossed or printed in full colour.' },
        { q: 'How many products can it hold?', a: 'As many as you need. Tell us the product size and how many you want on show, and we will size the box and dividers.' },
        { q: 'Is it strong enough for heavy products?', a: 'Yes. For heavier items we use 2.5 mm greyboard and add dividers, which also stiffen the box.' }
      ]
    }
  };

  /* Photo for each design, exactly as on the live style pages (key = variant name) */
  D.variantImages = {
    'flip-top': {
      'Leatherette': { src: 'assets/img/magnetic-flip-top-perfume-box-4-1200.webp', alt: 'Leatherette Flip-Top – custom magnetic flip-top box with logo' },
      'Foam Insert': { src: 'assets/img/magnetic-flip-top-perfume-box-2-1200.webp', alt: 'Foam Insert Flip-Top – custom magnetic flip-top box with logo' },
      'Window': { src: 'assets/img/magnetic-flip-top-perfume-box-3-1200.webp', alt: 'Window Flip-Top – custom magnetic flip-top box with logo' },
      'Classic': { src: 'assets/img/magnetic-flip-top-perfume-box-1-1200.webp', alt: 'Classic Flip-Top – custom magnetic flip-top box with logo' },
      'Satin-Lined': { src: 'assets/img/magnetic-flip-top-perfume-box-5-1200.webp', alt: 'Satin-Lined Flip-Top – custom magnetic flip-top box with logo' },
      'Gold Foil': { src: 'assets/img/magnetic-flip-top-perfume-box-6-1200.webp', alt: 'Gold Foil Flip-Top – custom magnetic flip-top box with logo' }
    },
    'double-door': {
      'Classic': { src: 'assets/img/double-door-perfume-box-1-1200.webp', alt: 'Classic Double-Door – custom double-door box with logo' },
      'Ribbon-Tie': { src: 'assets/img/double-door-perfume-box-2-1200.webp', alt: 'Ribbon-Tie Double-Door – custom double-door box with logo' },
      'Gold Foil': { src: 'assets/img/double-door-perfume-box-3-1200.webp', alt: 'Gold Foil Double-Door – custom double-door box with logo' }
    },
    'drawer': {
      'Ribbon-Pull': { src: 'assets/img/drawer-box-1-1200.webp', alt: 'Ribbon-Pull Drawer – custom sliding drawer box with logo' },
      'Thumb-Cut': { src: 'assets/img/drawer-box-2-1200.webp', alt: 'Thumb-Cut Drawer – custom sliding drawer box with logo' }
    },
    'lid-base': {
      'Full-Lid': { src: 'assets/img/lid-and-base-box-1-1200.webp', alt: 'Full-Lid Box – custom two-piece lid & base box with logo' },
      'Half-Lid': { src: 'assets/img/lid-and-base-box-2-1200.webp', alt: 'Half-Lid Box – custom two-piece lid & base box with logo' },
      'Shoulder-Neck': { src: 'assets/img/lid-and-base-box-3-1200.webp', alt: 'Shoulder-Neck Box – custom two-piece lid & base box with logo' }
    },
    'book': {
      'Classic': { src: 'assets/img/book-style-box-1-1200.webp', alt: 'Classic Book Box – custom book-style magnetic box with logo' },
      'Ribbon': { src: 'assets/img/book-style-box-2-1200.webp', alt: 'Ribbon Book Box – custom book-style magnetic box with logo' },
      'Foam Insert': { src: 'assets/img/book-style-box-1200.webp', alt: 'Book-Style Magnetic Box – custom rigid box with logo, made to your size' }
    },
    'display': {
      'Counter': { src: 'assets/img/display-box-1-1200.webp', alt: 'Counter Display – custom rigid display box with logo' },
      'Tray': { src: 'assets/img/display-box-2-1200.webp', alt: 'Tray Display – custom rigid display box with logo' },
      'Open-Front Showcase': { src: 'assets/img/display-box-3-1200.webp', alt: 'Open-Front Showcase – custom rigid display box with logo' }
    }
  };

  /* Comparison table on rigid-boxes.html (feel = premium feel out of 5) */
  D.styleCompare = {
    'flip-top':    { opening: 'Lid flips up from the back', bestFor: 'Perfume, cosmetics, PR boxes', feel: 4 },
    'double-door': { opening: 'Two doors open from the centre', bestFor: 'Perfume, spirits, gift sets', feel: 5 },
    'drawer':      { opening: 'Tray slides out of a sleeve', bestFor: 'Candles, chocolates, sets', feel: 4 },
    'lid-base':    { opening: 'Separate lid lifts off', bestFor: 'Clothing, gifts, hampers', feel: 3 },
    'book':        { opening: 'Cover opens from the side', bestFor: 'Jewellery, watches, sets', feel: 4 },
    'display':     { opening: 'Open front or tray', bestFor: 'Counters and shelves', feel: 3 }
  };

  /* ---------- Packaging categories ---------- */
  D.categories = [
    {
      id: 'perfume', name: 'Perfume boxes', title: 'Perfume', url: 'perfume-boxes.html',
      intro: 'A perfume box sets the mood before the first spray. We make rigid perfume boxes with fitted inserts that hold 30 ml, 50 ml and 100 ml bottles tight, so the bottle arrives upright and the box opens beautifully.',
      styles: ['flip-top', 'double-door', 'book'],
      finishes: [
        { name: 'Gold foil logo', text: 'Foil on a black or deep-colour wrap is the classic fragrance look and reads well on shelf and in photos.' },
        { name: 'Soft-touch wrap', text: 'A velvety matt paper that feels premium in the hand and shows off foil and embossing.' },
        { name: 'Satin lining', text: 'Satin over a soft pad around the bottle for a traditional, luxurious opening.' }
      ],
      inserts: [
        { name: '30 ml bottle insert', text: 'A snug foam cut-out for travel and discovery sizes, often in a slim flip-top box.' },
        { name: '50 ml bottle insert', text: 'The most common size. We cut the insert to your bottle and cap, so nothing rattles.' },
        { name: '100 ml bottle insert', text: 'A deeper cradle, often in a double-door box so the bottle stands up when the doors open.' },
        { name: 'Bottle + sample vials', text: 'A main bottle with two or three vial slots beside it for gift sets.' }
      ],
      faqs: [
        { q: 'Do you need my bottle to make the insert?', a: 'The bottle size is enough for a quote. For samples and bulk, a bottle (or a detailed drawing) helps us get the cut-out exact.' },
        { q: 'Can the box hold a bottle and a cap separately?', a: 'Yes. We can cut separate slots so the cap sits beside the bottle, which is common with heavy designer caps.' },
        { q: 'Which style is best for a new fragrance launch?', a: 'A magnetic flip-top box is the most popular and best value. A double-door box gives a bigger reveal if the budget allows.' }
      ]
    },
    {
      id: 'jewellery', name: 'Jewellery boxes', title: 'Jewellery', url: 'jewellery-boxes.html',
      intro: 'Small boxes, big moment. Our rigid jewellery boxes hold rings, necklaces, earrings and bracelets in velvet or foam slots, so each piece is presented properly from the first opening.',
      styles: ['book', 'flip-top', 'drawer'],
      finishes: [
        { name: 'Velvet lining', text: 'Velvet-wrapped inserts in black, navy or burgundy make metal and stones stand out.' },
        { name: 'Debossed logo', text: 'A pressed-in logo on a soft-touch lid looks quiet and expensive.' },
        { name: 'Silver foil', text: 'Silver foil suits silver and white-gold collections and photographs well.' }
      ],
      inserts: [
        { name: 'Ring slot', text: 'A single slit or roll that grips the ring band and keeps the stone facing up.' },
        { name: 'Necklace pad', text: 'A raised pad with a hook or slots so the chain lies flat and does not tangle.' },
        { name: 'Earring card', text: 'Holes or slits for studs and drops, set side by side.' },
        { name: 'Set insert', text: 'Ring, necklace and earrings in one foam or velvet tray, for gift sets.' }
      ],
      faqs: [
        { q: 'What is the smallest box you can make?', a: 'Ring boxes can be as small as about 50 × 50 mm. We make each box to your piece, so there is no fixed size.' },
        { q: 'Can I mix ring and necklace boxes in one order?', a: 'Yes, but each size counts as its own design, with a minimum of 50 pieces per design.' },
        { q: 'Do you make boxes for luxury watches too?', a: 'Yes, see our watch boxes. They use a pillow or cuff insert instead of slots.' }
      ]
    },
    {
      id: 'display', name: 'Display boxes', title: 'Display', url: 'display-boxes.html',
      intro: 'A good display box sells while you are not there. We make rigid counter and shelf displays with a header card for your logo and dividers that keep products upright and easy to pick.',
      styles: ['display', 'lid-base', 'drawer'],
      finishes: [
        { name: 'Full-colour print', text: 'Bright, printed artwork on the header card catches the eye at the till.' },
        { name: 'Spot UV logo', text: 'A gloss logo on a matt header card shines under shop lighting.' },
        { name: 'Laminated wrap', text: 'A tough laminated finish that wipes clean and handles daily use.' }
      ],
      inserts: [
        { name: 'Card dividers', text: 'Slotted dividers that keep each product in its own row.' },
        { name: 'Stepped riser', text: 'Raised rows at the back so every product is seen.' },
        { name: 'Tube holders', text: 'Round cut-outs for lip glosses, pens or small bottles.' }
      ],
      faqs: [
        { q: 'Can I ship products inside the display box?', a: 'Yes. Many brands ship stock in the display box with a lid or sleeve over it, then remove the lid in store.' },
        { q: 'How tall can the header card be?', a: 'Usually 80–150 mm above the tray, so it is seen without blocking the products. We will suggest a height for your counter.' },
        { q: 'Do you make cardboard displays as well?', a: 'Our display boxes are rigid greyboard, which lasts much longer than corrugated card on a busy counter.' }
      ]
    },
    {
      id: 'corporate', name: 'Corporate boxes', title: 'Corporate', url: 'corporate-boxes.html',
      intro: 'Client gifts, staff welcome packs and event boxes that look like your company, not a catalogue. We make rigid corporate boxes in your brand colours with inserts for exactly what goes inside.',
      styles: ['flip-top', 'book', 'lid-base'],
      finishes: [
        { name: 'Brand-colour wrap', text: 'We match the wrap paper as closely as possible to your brand colour.' },
        { name: 'Embossed logo', text: 'A raised logo with no ink looks smart and works on any colour.' },
        { name: 'Printed inside lid', text: 'A welcome message or your values printed inside the lid.' }
      ],
      inserts: [
        { name: 'Welcome kit insert', text: 'Slots for a notebook, pen, bottle and a card.' },
        { name: 'Tech gift insert', text: 'Foam cut-outs for earbuds, chargers or power banks.' },
        { name: 'Bottle insert', text: 'A secure cradle for wine, spirits or a candle.' }
      ],
      faqs: [
        { q: 'Can each box have a different name on it?', a: 'Personalised names need a different process. Ask us and we will tell you what is possible for your quantity.' },
        { q: 'Can you deliver to several offices?', a: 'Bulk orders are delivered to one address. We can quote for splitting the delivery across the UK, USA, Canada or Europe.' },
        { q: 'How far ahead should we order for an event?', a: 'Allow time for the proof, an optional sample and production. Tell us the event date in your enquiry and we will tell you if it is realistic.' }
      ]
    },
    {
      id: 'gift', name: 'Gift boxes', title: 'Rigid Gift', url: 'rigid-gift-boxes.html',
      intro: 'Strong rigid gift boxes that people keep long after the gift is gone. Pick a style, a colour and a finish, and we make it to the size of what goes inside, from just 50 pieces.',
      styles: ['flip-top', 'drawer', 'lid-base'],
      finishes: [
        { name: 'Ribbon', text: 'A ribbon pull or a tied bow makes the box feel ready to give.' },
        { name: 'Gold or rose-gold foil', text: 'A foil logo or pattern for seasonal and Christmas gifting.' },
        { name: 'Textured paper', text: 'Linen or leatherette wrap for a gift that feels special before it is opened.' }
      ],
      inserts: [
        { name: 'Crinkle-paper bed', text: 'Shredded paper fill for mixed gifts and hampers.' },
        { name: 'Foam cut-outs', text: 'Fitted slots for each item in a gift set.' },
        { name: 'Card dividers', text: 'Simple compartments to keep items apart.' }
      ],
      faqs: [
        { q: 'Can I order gift boxes for Christmas?', a: 'Yes, Christmas orders are open now. Book early, as the weeks before December are our busiest.' },
        { q: 'Can the boxes be reused?', a: 'Yes. Rigid boxes are strong enough to be kept and reused for storage, which keeps your brand in the home.' },
        { q: 'Do you sell plain boxes without a logo?', a: 'Every box is custom, but a plain box with no logo is fine. You still choose the size, colour and finish.' }
      ]
    },
    {
      id: 'presentation', name: 'Presentation boxes', title: 'Presentation', url: 'presentation-boxes.html',
      intro: 'For awards, certificates, pens, medals and anything that is handed over in person. Our presentation boxes open cleanly in front of an audience and hold the item exactly where it should be.',
      styles: ['book', 'flip-top', 'double-door'],
      finishes: [
        { name: 'Leatherette wrap', text: 'The traditional presentation look: rich, textured and hard-wearing.' },
        { name: 'Foil crest or logo', text: 'A gold or silver crest on the lid for awards and schools.' },
        { name: 'Velvet lining', text: 'Velvet inside the lid and base frames the item nicely.' }
      ],
      inserts: [
        { name: 'Certificate folder', text: 'A flat recess inside the cover to hold an A4 or A5 certificate.' },
        { name: 'Medal or coin slot', text: 'A round cut-out sized to your medal or coin.' },
        { name: 'Pen channel', text: 'A long groove that holds one or two pens.' }
      ],
      faqs: [
        { q: 'Can the box hold a certificate and an award together?', a: 'Yes. A book-style box can hold a certificate in the cover and the award in a foam slot in the base.' },
        { q: 'Do you make boxes for schools and clubs?', a: 'Yes. From 50 pieces, which suits most award evenings.' },
        { q: 'Can the box be engraved?', a: 'We do not engrave, but a foil or debossed crest gives a similar, lasting effect.' }
      ]
    },
    {
      id: 'candle', name: 'Candle boxes', title: 'Candle', url: 'candle-boxes.html',
      intro: 'Candles are heavy and their jars are fragile, so the box has to work as hard as it looks. Our rigid candle boxes have fitted inserts for your jar size and a finish that matches your scent story.',
      styles: ['drawer', 'lid-base', 'flip-top'],
      finishes: [
        { name: 'Kraft or linen wrap', text: 'Natural textures suit soy and botanical candle brands.' },
        { name: 'Foil scent name', text: 'Foil the scent name on each box so one design works across a range.' },
        { name: 'Window', text: 'A small window so the colour of the wax is visible.' }
      ],
      inserts: [
        { name: 'Small jar (up to 8 cl)', text: 'Snug foam ring for travel candles and minis.' },
        { name: 'Medium jar (20–30 cl)', text: 'The most common size, with a deep cradle so the jar cannot move.' },
        { name: 'Large jar (40–60 cl)', text: 'A sturdier 2.5 mm board and a thicker insert for the extra weight.' },
        { name: 'Candle + diffuser set', text: 'Two cut-outs side by side for a candle and a reed diffuser.' }
      ],
      faqs: [
        { q: 'Will the jar break in the post?', a: 'Not if the insert fits. We cut it to your jar, and bulk orders ship in strong export cartons.' },
        { q: 'Can one box design work for several scents?', a: 'Yes. Keep the box the same and add a scent label or sticker, or foil each scent name if the quantity allows.' },
        { q: 'Do you make boxes for wax melts?', a: 'Yes. A slim drawer or lid-and-base box suits wax melt bars well.' }
      ]
    },
    {
      id: 'watch', name: 'Watch boxes', title: 'Watch', url: 'watch-boxes.html',
      intro: 'A watch box should feel as precise as the watch. We make rigid watch boxes with a cushion or cuff insert, a clean magnetic close and room for the warranty card and spare links.',
      styles: ['flip-top', 'book', 'double-door'],
      finishes: [
        { name: 'Leatherette wrap', text: 'A classic watch-box finish that hides fingerprints.' },
        { name: 'Debossed logo', text: 'A pressed logo on the lid, quiet and precise.' },
        { name: 'Contrast lining', text: 'A light lining inside a dark box makes the watch the focus.' }
      ],
      inserts: [
        { name: 'Watch pillow', text: 'A soft cushion the strap wraps around, standard for most watches.' },
        { name: 'Cuff insert', text: 'A C-shaped holder for bracelets and metal straps.' },
        { name: 'Card and links tray', text: 'A shallow tray under the pillow for papers, tools and spare links.' }
      ],
      faqs: [
        { q: 'Can the box hold two watches?', a: 'Yes. We can make double pillows or two cuff slots side by side.' },
        { q: 'Do you make smartwatch boxes?', a: 'Yes. We cut the insert for the watch face, the strap and the charger.' },
        { q: 'Can there be a hidden drawer for papers?', a: 'Yes. A slim drawer under the main box is a nice premium detail.' }
      ]
    },
    {
      id: 'chocolate', name: 'Chocolate boxes', title: 'Chocolate', url: 'chocolate-boxes.html',
      intro: 'Chocolates deserve a box people do not want to throw away. We make rigid chocolate boxes with food-safe trays and dividers, in sizes from four truffles to a full sharing box.',
      styles: ['drawer', 'lid-base', 'book'],
      finishes: [
        { name: 'Foil pattern', text: 'A foil pattern across the lid for gifting and seasonal ranges.' },
        { name: 'Embossed logo', text: 'A raised logo that suits artisan and heritage chocolatiers.' },
        { name: 'Ribbon wrap', text: 'A ribbon around the box for Valentine’s, Easter and Christmas.' }
      ],
      inserts: [
        { name: '4 / 9 / 16 truffle trays', text: 'Food-safe cavity trays sized to your chocolates.' },
        { name: 'Bar sleeve', text: 'A flat recess for one or more chocolate bars.' },
        { name: 'Mixed gift insert', text: 'Truffles on one side, a bar or a jar on the other.' }
      ],
      faqs: [
        { q: 'Are the trays food-safe?', a: 'Yes. Chocolates sit in food-safe trays or liners, never directly on the board.' },
        { q: 'Can I order the boxes empty and fill them myself?', a: 'Yes. We only make the packaging; you fill it in your own kitchen.' },
        { q: 'Can the lid have a window?', a: 'Yes. A window lets the chocolates sell themselves on a shop shelf.' }
      ]
    },
    {
      id: 'apparel', name: 'Apparel boxes', title: 'Apparel', url: 'apparel-boxes.html',
      intro: 'For clothing brands that want an unboxing worth posting. Our rigid apparel boxes hold folded shirts, knitwear, scarves and accessories flat, with room for tissue paper and a thank-you card.',
      styles: ['lid-base', 'drawer', 'flip-top'],
      finishes: [
        { name: 'Matt black wrap', text: 'A clean base that lets a foil or embossed logo stand out.' },
        { name: 'Printed inside', text: 'A pattern or message inside the lid for the unboxing video.' },
        { name: 'Ribbon pull', text: 'A neat way to open a drawer or lift a lid.' }
      ],
      inserts: [
        { name: 'Tissue and sticker', text: 'The simplest way to present folded clothing.' },
        { name: 'Card platform', text: 'A raised card base so the garment sits flush with the top.' },
        { name: 'Accessory slots', text: 'Small compartments for socks, ties, caps or belts.' }
      ],
      faqs: [
        { q: 'How deep should a box for a T-shirt be?', a: 'Usually 40–60 mm for a folded T-shirt and 70–100 mm for knitwear. Send us the folded size and we will advise.' },
        { q: 'Do rigid boxes cost more to post?', a: 'They weigh more than mailer boxes, so think about postage. Many brands use a rigid box inside a plain shipping carton.' },
        { q: 'Can you make shoe boxes?', a: 'Yes. One of the clips on our homepage is a shoe box with a debossed logo.' }
      ]
    },
    {
      id: 'cosmetic', name: 'Cosmetic & skincare boxes', title: 'Cosmetic & Skincare', url: 'cosmetic-boxes.html',
      intro: 'Serums, creams, palettes and gift sets need a box that looks clean and holds every jar and bottle in place. We make rigid cosmetic boxes with fitted foam and a finish that matches your shelf.',
      styles: ['flip-top', 'book', 'display'],
      finishes: [
        { name: 'Soft-touch wrap', text: 'The skincare favourite: matt, smooth and calm.' },
        { name: 'Spot UV pattern', text: 'A gloss pattern on matt board for a subtle, modern look.' },
        { name: 'Pastel colour wraps', text: 'Soft colours that match most beauty brand palettes.' }
      ],
      inserts: [
        { name: 'Serum dropper slot', text: 'A tall slot for 15 ml or 30 ml dropper bottles.' },
        { name: 'Jar cradle', text: 'A round cut-out for 30–50 ml cream jars.' },
        { name: 'Routine set', text: 'Three or four cut-outs for cleanser, serum, cream and a tool.' }
      ],
      faqs: [
        { q: 'Can the box hold a full skincare routine?', a: 'Yes. A book-style or flip-top box with a foam insert holds three to five products neatly.' },
        { q: 'Do you make PR boxes for influencers?', a: 'Yes, and our blog has tips on making boxes people want to film.' },
        { q: 'Can the box be recycled?', a: 'The greyboard and paper are recyclable. Foam inserts can be swapped for card if you want a paper-only box.' }
      ]
    },
    {
      id: 'hamper', name: 'Hamper boxes', title: 'Hamper', url: 'hamper-boxes.html',
      intro: 'A strong rigid hamper box replaces the wicker basket and looks far smarter on a desk or doorstep. We make them deep enough for bottles, jars and treats, with dividers that stop everything rolling around.',
      styles: ['lid-base', 'flip-top', 'drawer'],
      finishes: [
        { name: 'Ribbon and bow', text: 'The classic hamper finish, perfect for Christmas.' },
        { name: 'Foil logo', text: 'Your brand or the occasion foiled on the lid.' },
        { name: 'Kraft wrap', text: 'A natural look for food and farm-shop hampers.' }
      ],
      inserts: [
        { name: 'Bottle + jar divider', text: 'A card divider that holds a bottle beside two or three jars.' },
        { name: 'Crinkle-paper fill', text: 'Shredded paper that fills gaps and looks generous.' },
        { name: 'Removable tray', text: 'A top tray for small treats over larger items below.' }
      ],
      faqs: [
        { q: 'How heavy can a hamper box be?', a: 'With 2.5 mm board and dividers, rigid hamper boxes hold several kilos comfortably.' },
        { q: 'Can I order hamper boxes for Christmas?', a: 'Yes. Book as early as you can, as hamper season fills up fast.' },
        { q: 'Do you fill the hampers?', a: 'No, we only make the packaging. You or your packer fill them.' }
      ]
    },
    {
      id: 'bridesmaid', name: 'Bridesmaid & wedding boxes', title: 'Bridesmaid & Wedding', url: 'bridesmaid-proposal-boxes.html',
      intro: '“Will you be my bridesmaid?” deserves more than a gift bag. We make proposal boxes, wedding favour boxes and thank-you boxes in your wedding colours, from 50 pieces for planners and gift brands.',
      styles: ['flip-top', 'drawer', 'book'],
      finishes: [
        { name: 'Rose-gold foil', text: 'The most requested wedding finish, lovely on blush and white wraps.' },
        { name: 'Satin ribbon', text: 'A ribbon pull or tie in the wedding colours.' },
        { name: 'Linen wrap', text: 'A soft, textured paper that photographs beautifully.' }
      ],
      inserts: [
        { name: 'Glass and bottle slot', text: 'For a champagne flute and a mini bottle.' },
        { name: 'Jewellery and card', text: 'A slot for a bracelet or earrings and a proposal card.' },
        { name: 'Crinkle-paper bed', text: 'For mixed favours, candles and treats.' }
      ],
      faqs: [
        { q: 'Can I order just five boxes for my bridesmaids?', a: 'Our minimum is 50 pieces per design, so we mainly work with wedding planners, gift shops and brands.' },
        { q: 'Can each box have a different name?', a: 'Personalised names are usually added with a sticker or tag. Ask us about other options for your quantity.' },
        { q: 'Which style is most popular?', a: 'A white or blush magnetic flip-top box with rose-gold foil and a ribbon.' }
      ]
    },
    {
      id: 'hair', name: 'Hair extension & wig boxes', title: 'Hair Extension & Wig', url: 'hair-extension-boxes.html',
      intro: 'Hair is a premium product and the box should say so. We make rigid hair extension and wig boxes with satin linings, hanger hooks and windows, sized for bundles, clip-ins and full wigs.',
      styles: ['flip-top', 'drawer', 'display'],
      finishes: [
        { name: 'Satin lining', text: 'Soft and smooth, it protects the hair and looks luxurious.' },
        { name: 'Holographic or foil logo', text: 'Bold foils that suit beauty and hair brands.' },
        { name: 'Window lid', text: 'Shows the colour and texture of the hair before opening.' }
      ],
      inserts: [
        { name: 'Bundle tray', text: 'A shallow tray for 1–4 hair bundles laid flat.' },
        { name: 'Hanger hook', text: 'A small hook or tab to hang the extensions inside the box.' },
        { name: 'Wig head space', text: 'A deep box with room for a wig on a form or folded flat.' }
      ],
      faqs: [
        { q: 'Can the box hold a wig on a stand?', a: 'Yes, with a deep box and a support insert. Send us the wig and stand size.' },
        { q: 'Do you make boxes for lashes too?', a: 'Yes. Small magnetic lash boxes work well alongside hair boxes in one range.' },
        { q: 'Can the satin colour match my brand?', a: 'We can usually get close. Send us your brand colour and we will show you the nearest options.' }
      ]
    },
    {
      id: 'paper', name: 'Paper & kraft boxes', title: 'Paper & Kraft', url: 'paper-boxes.html',
      intro: 'Natural, plastic-free and still premium. Our paper and kraft rigid boxes use kraft wrap and card inserts in place of foam, for brands that want a box that looks honest and recycles easily.',
      styles: ['lid-base', 'drawer', 'flip-top'],
      finishes: [
        { name: 'Kraft wrap', text: 'Brown or white kraft paper with a natural, slightly rough feel.' },
        { name: 'One-colour print', text: 'A single black or white ink print suits kraft perfectly.' },
        { name: 'Blind emboss', text: 'A raised logo with no ink or foil at all.' }
      ],
      inserts: [
        { name: 'Card insert', text: 'Folded card cut to your product in place of foam.' },
        { name: 'Paper-pulp tray', text: 'A moulded pulp tray for bottles and jars.' },
        { name: 'Shredded kraft fill', text: 'Natural paper fill for gift boxes.' }
      ],
      faqs: [
        { q: 'Is a kraft box fully recyclable?', a: 'With card inserts and no foil or lamination, the whole box can go in paper recycling.' },
        { q: 'Can kraft boxes still have a magnetic closure?', a: 'Yes, but the magnets need to be removed before recycling. A lid-and-base box avoids magnets altogether.' },
        { q: 'Does kraft cost less?', a: 'Often a little, especially with one-colour print and card inserts.' }
      ]
    }
  ];

  /* ---------- Portfolio (photos added later; line art shown until then) ---------- */
  /* Same 12 workshop photos, in the same order, as the live portfolio page */
  D.portfolio = [
    { style: 'double-door', variant: '', title: 'Double-door box, doors lifted', shape: 'tall', image: 'assets/img/work/double-door-box-doors-lifted-1200.webp', alt: 'Double-door box, doors lifted made by Luxora Packaging' },
    { style: 'flip-top', variant: '', title: 'Magnetic gift box with foam insert', shape: 'square', image: 'assets/img/work/magnetic-gift-box-foam-insert-1200.webp', alt: 'Magnetic gift box with foam insert made by Luxora Packaging' },
    { style: 'lid-base', variant: '', title: 'Kraft box with printed logo band', shape: 'tall', image: 'assets/img/work/kraft-box-logo-band-1200.webp', alt: 'Kraft box with printed logo band made by Luxora Packaging' },
    { style: 'book', variant: '', title: 'Clamshell box, opened flat', shape: 'wide', image: 'assets/img/work/clamshell-gate-fold-open-1200.webp', alt: 'Clamshell box, opened flat made by Luxora Packaging' },
    { style: 'double-door', variant: '', title: 'Double-door box with side compartments', shape: 'square', image: 'assets/img/work/double-door-box-fully-open-1200.webp', alt: 'Double-door box with side compartments made by Luxora Packaging' },
    { style: 'lid-base', variant: '', title: 'Black shoe box with debossed logo', shape: 'wide', image: 'assets/img/work/black-shoe-box-open-1200.webp', alt: 'Black shoe box with debossed logo made by Luxora Packaging' },
    { style: 'double-door', variant: '', title: 'Gate-fold box, both doors open', shape: 'square', image: 'assets/img/work/gate-fold-both-doors-open-1200.webp', alt: 'Gate-fold box, both doors open made by Luxora Packaging' },
    { style: 'display', variant: '', title: 'Printed display tray', shape: 'tall', image: 'assets/img/work/display-tray-blue-1200.webp', alt: 'Printed display tray made by Luxora Packaging' },
    { style: 'flip-top', variant: '', title: 'Matte black rigid box', shape: 'tall', image: 'assets/img/work/black-rigid-box-standing-1200.webp', alt: 'Matte black rigid box made by Luxora Packaging' },
    { style: 'book', variant: '', title: 'Clamshell box, closed', shape: 'square', image: 'assets/img/work/clamshell-closed-1200.webp', alt: 'Clamshell box, closed made by Luxora Packaging' },
    { style: 'double-door', variant: '', title: 'Gate-fold box, one door open', shape: 'wide', image: 'assets/img/work/gate-fold-one-door-open-1200.webp', alt: 'Gate-fold box, one door open made by Luxora Packaging' },
    { style: 'lid-base', variant: '', title: 'Matte black lid-and-base box', shape: 'square', image: 'assets/img/work/black-rigid-box-plain-1200.webp', alt: 'Matte black lid-and-base box made by Luxora Packaging' }
  ];


  /* Extra clips shown on portfolio.html (same as the live portfolio) */
  D.videosMore = [
    { title: 'Magnetic closure box', src: 'assets/video/black-magnetic-box-opening.mp4', poster: 'assets/img/work/black-magnetic-box-opening-poster.webp' },
    { title: 'Black lid-and-base box', src: 'assets/video/black-box-lid-opening.mp4', poster: 'assets/img/work/black-box-lid-opening-poster.webp' },
    { title: 'A display tray on our production floor', src: 'assets/video/display-tray-factory.mp4', poster: 'assets/img/work/display-tray-factory-poster.webp' },
    { title: 'Display trays packed for export', src: 'assets/video/packing-display-trays.mp4', poster: 'assets/img/work/packing-display-trays-poster.webp' }
  ];

  /* Quote form: box type dropdown (value sent to the backend) and quantity chips */
  D.quoteBoxTypes = [
    { id: 'flip-top', label: 'Magnetic Flip-Top' }, { id: 'double-door', label: 'Double-Door' },
    { id: 'drawer', label: 'Sliding Drawer' }, { id: 'lid-base', label: 'Lid & Base' },
    { id: 'book', label: 'Book-Style' }, { id: 'display', label: 'Display Box' }, { id: 'not-sure', label: 'Not sure' }
  ];
  D.quoteQuantities = [
    { value: '50-100', label: '50–100' }, { value: '100-500', label: '100–500' },
    { value: '500-1000', label: '500–1,000' }, { value: '1000+', label: '1,000+' }
  ];

  /* ---------- Samples ---------- */
  D.samples = {
    rules: [
      'The sample price depends on size, style and finishes, and is confirmed before you pay.',
      'A single sample costs more per piece than bulk.',
      'The minimum bulk order is 50 pieces, and the higher the quantity, the lower the price per box.',
      'Sample shipping is charged separately.'
    ],
    steps: [
      { title: 'Tell us what you need', text: 'Send the style, size and finishes with the form below or on WhatsApp.' },
      { title: 'Confirm the price', text: 'We confirm the sample price and shipping before you pay anything.' },
      { title: 'We make and send it', text: 'Your one-off sample is made, checked and posted to you.' }
    ]
  };

  /* ---------- About: values (reference tab style) ---------- */
  D.values = [
    { id: 'craft', tab: 'Craftsmanship', title: 'Made by hand, checked by eye', art: 'emboss',
      text: 'Rigid boxes are still largely handmade: board cut, papers wrapped and corners turned by people who do it every day. It is the reason they feel the way they do.' },
    { id: 'delivery', tab: 'On-Time Delivery', title: 'Dates we can actually keep', art: 'magnets',
      text: 'We tell you a realistic date up front and keep you posted. If something will be late, you hear it from us first, not when the boxes do not arrive.' },
    { id: 'quality', tab: 'Quality Checked', title: 'Checked against your proof', art: 'foil',
      text: 'Every order is checked against the proof you approved, from the foil position to the insert fit, before it is packed in export cartons.' },
    { id: 'pricing', tab: 'Transparent Pricing', title: 'No surprises on the invoice', art: 'papers',
      text: 'Your quote lists the box, the finishes and the delivery. Samples and sample shipping are priced separately and confirmed before you pay.' }
  ];

  /* ---------- Quote wizard: "What happens next" ---------- */
  D.nextSteps = [
    'We review your request.',
    'We send you a price within 24 hours.',
    'You approve a proof before production starts.'
  ];

})(window.LUXORA);

/* =====================================================================
   PHASE 3 CONTENT: full FAQ, region pages, footer landing pages
   ===================================================================== */
(function (D) {

  /* ---------- Full FAQ (faq.html). Includes the 5 homepage questions. ---------- */
  D.faqGroups = [
    { id: 'ordering', tab: 'Ordering', items: [
      D.faqs[0],
      { q: 'Can I order different sizes in one order?', a: 'Yes. Each size or design counts as its own item with a minimum of 50 pieces, but they can be made and shipped together.' },
      { q: 'How long does an order take?', a: 'It depends on the style, finishes and quantity. We give you a realistic production and delivery time with your quote, and confirm it when you approve the proof.' },
      { q: 'What do you need from me to start?', a: 'The box size or your product size, the quantity, the style you like and your logo. A rough idea is fine; we will ask about anything that is missing.' },
      { q: 'Can I reorder the same box later?', a: 'Yes. We keep your dieline and artwork on file, so a repeat order is quick to price and set up.' },
      { q: 'Who will I deal with?', a: 'The same Luxora Packaging team from your first message to delivery, by email or WhatsApp.' }
    ] },
    { id: 'pricing', tab: 'Pricing', items: [
      D.faqs[1],
      { q: 'Why does a larger quantity lower the price per box?', a: 'Setting up cutting, foiling and wrapping takes the same time for 50 or 1,000 boxes, so the set-up cost is shared across more boxes.' },
      { q: 'Does the quote include delivery?', a: 'Yes. Bulk quotes include delivery to your address in the UK, USA, Canada or Europe. Sample shipping is quoted separately.' },
      { q: 'Which currency do you quote in?', a: 'GBP for UK customers, USD for US customers, and GBP, EUR or USD for Canada and Europe, whichever suits you.' },
      { q: 'Are there any hidden costs?', a: 'No. Your quote lists the box, finishes and delivery. Import duties or taxes in your country, if any, are explained before you order.' },
      { q: 'How do I pay?', a: 'We confirm payment terms and methods with your quote. Production starts once the proof is approved and the agreed deposit is paid.' }
    ] },
    { id: 'samples', tab: 'Samples', items: [
      D.faqs[2],
      { q: 'Is a sample required before ordering?', a: 'No. Many customers order straight from the proof. A sample is useful if you want to check the board, fit and finish in your hands first.' },
      { q: 'Why does a sample cost more per piece?', a: 'A sample is made one-off by hand with the same set-up as a bulk run, so the cost is not shared across many boxes.' },
      { q: 'Is sample shipping included?', a: 'No. Sample shipping is charged separately and confirmed before you pay.' },
      { q: 'Can the sample include my logo and finishes?', a: 'Yes. We make the sample with your logo and chosen finishes, so it looks like the final box.' }
    ] },
    { id: 'design', tab: 'Design & Printing', items: [
      D.faqs[3],
      { q: 'Do you provide a dieline?', a: 'Yes. Once you are happy with the price, we send a dieline and a digital proof for you to approve before production.' },
      { q: 'What file format should my logo be?', a: 'A vector file (AI, EPS, PDF or SVG) is best. If you only have a PNG or JPG, send it and we will tell you if it works.' },
      { q: 'Can you match my brand colour?', a: 'We match wrap papers and print as closely as possible to your Pantone or brand colour and show you options on the proof.' },
      { q: 'Can I print inside the box?', a: 'Yes. Printing inside the lid or doors is a popular way to add a message or pattern.' },
      { q: 'Do you design the box for me?', a: 'We help with the structure, size and finish. If you need full graphic design, tell us and we will advise.' }
    ] },
    { id: 'shipping', tab: 'Shipping', items: [
      D.faqs[4],
      { q: 'How are the boxes packed?', a: 'Rigid boxes ship built, packed in strong export cartons so the corners and finishes arrive undamaged.' },
      { q: 'Do you ship to Amazon FBA?', a: 'Yes, for US customers we can deliver to your address or prepare cartons for Amazon FBA. Tell us your requirements with your quote.' },
      { q: 'Will I get a tracking number?', a: 'Yes. You get tracking details as soon as your order is dispatched.' },
      { q: 'What if a box arrives damaged?', a: 'Take photos and contact us within 7 days of delivery. See our Returns page for how we put it right.' }
    ] }
  ];

  /* ---------- Region pages ---------- */
  D.regions = [
    {
      id: 'uk', url: 'uk.html', name: 'United Kingdom', h1: 'Luxury Packaging for UK Brands', company: 'uk', art: 'flipTop',
      meta: 'Millimetres · GBP · WNP Enterprise Ltd',
      intro: 'Bespoke rigid boxes, gift boxes, perfume boxes and hamper boxes for UK businesses, from 50 pieces. Sizes in millimetres, prices in GBP, delivered anywhere in the UK through WNP Enterprise Ltd, our UK company in Wolverhampton.',
      why: [
        { name: 'A UK registered company', text: 'You deal with WNP Enterprise Ltd, registered in England & Wales, Company No. 16012866.' },
        { name: 'Sizes in mm, prices in GBP', text: 'No conversions, no currency surprises. Your quote is in pounds.' },
        { name: 'From 50 pieces', text: 'Small runs for launches, gifting and seasonal ranges are welcome.' },
        { name: 'Delivered UK-wide', text: 'From the Highlands to Cornwall, delivered to your door or warehouse.' }
      ],
      styles: ['flip-top', 'lid-base', 'drawer'],
      shipping: [
        { title: 'Quote in GBP', text: 'Your price includes delivery to your UK address.' },
        { title: 'Proof and approval', text: 'We send a dieline and proof. Production starts when you approve.' },
        { title: 'Made and checked', text: 'Each order is checked against your proof before packing.' },
        { title: 'Delivered with tracking', text: 'Packed in export cartons and delivered to your door.' }
      ],
      faqs: [
        { q: 'Are prices in GBP?', a: 'Yes. UK quotes are in pounds and include delivery to your UK address.' },
        { q: 'Who is my contract with?', a: 'WNP Enterprise Ltd, Unit 5, Industrial Estate, Wednesfield Way, Well Lane, Wolverhampton WV11 1XP. Company No. 16012866.' },
        { q: 'Do you deliver to Northern Ireland and the islands?', a: 'Yes. Some remote postcodes take a little longer, and we will tell you with your quote.' }
      ]
    },
    {
      id: 'usa', url: 'usa.html', name: 'United States', h1: 'Custom Setup Boxes for US Brands', company: 'usa', art: 'doubleDoor',
      meta: 'Inches · USD · The Providers LLC',
      intro: 'Rigid setup boxes, magnetic gift boxes and custom printed boxes with your logo for American brands and Amazon sellers. Sizes in inches, prices in USD, shipped to all 50 states through The Providers LLC.',
      why: [
        { name: 'A US registered company', text: 'You deal with The Providers LLC, registered in New York.' },
        { name: 'Inches and USD', text: 'Send sizes in inches and get your quote in dollars.' },
        { name: 'Amazon seller friendly', text: 'Cartons can be prepared for your warehouse or Amazon FBA requirements.' },
        { name: 'All 50 states', text: 'Delivered to your business, home or fulfilment center.' }
      ],
      styles: ['flip-top', 'double-door', 'book'],
      shipping: [
        { title: 'Quote in USD', text: 'Your price includes delivery to your US address.' },
        { title: 'Proof and approval', text: 'Dieline and proof in inches for you to sign off.' },
        { title: 'Made and checked', text: 'Every order is checked against your approved proof.' },
        { title: 'Shipped to any state', text: 'Export cartons, tracking, delivered to your door or FBA.' }
      ],
      faqs: [
        { q: 'Can you ship to Amazon FBA?', a: 'Yes. Tell us your FBA requirements and we will prepare and label the cartons accordingly.' },
        { q: 'Who is my contract with?', a: 'The Providers LLC, 2335 Broadway, Astoria, NY 11106, United States.' },
        { q: 'Do you ship to Alaska and Hawaii?', a: 'Yes, to all 50 states. Delivery times to Alaska and Hawaii are a little longer.' }
      ]
    },
    {
      id: 'canada', url: 'canada.html', name: 'Canada', h1: 'Luxury Rigid Boxes for Canadian Brands', company: '', art: 'drawer',
      meta: 'mm or inches · CAD-friendly quotes · Export cartons',
      intro: 'Custom rigid boxes for Canadian brands from 50 pieces, delivered to every province. Send your sizes in mm or inches; we quote with delivery included and pack everything in strong export cartons.',
      why: [
        { name: 'From 50 pieces', text: 'Small runs for Canadian launches, gifting and retail.' },
        { name: 'mm or inches', text: 'Whichever you prefer; we work in both.' },
        { name: 'Export cartons', text: 'Double-wall cartons and corner protection for the longer journey.' },
        { name: 'Customs paperwork', text: 'We prepare the commercial invoice and export documents for you.' }
      ],
      styles: ['flip-top', 'drawer', 'lid-base'],
      shipping: [
        { title: 'Quote with delivery', text: 'Your price includes delivery to your Canadian address.' },
        { title: 'Proof and approval', text: 'We send a dieline and proof to sign off.' },
        { title: 'Export packing', text: 'Boxes packed in strong export cartons, ready for the journey.' },
        { title: 'Tracked delivery', text: 'Tracking details as soon as your order ships.' }
      ],
      faqs: [
        { q: 'Will I pay import duties?', a: 'Duties and taxes depend on your import status. We explain what to expect before you order.' },
        { q: 'Do you deliver to all provinces?', a: 'Yes, to every province and territory. Remote areas may take a little longer.' },
        { q: 'Can I get a sample shipped to Canada?', a: 'Yes. Sample shipping is quoted separately and confirmed before you pay.' }
      ]
    },
    {
      id: 'europe', url: 'europe.html', name: 'Europe', h1: 'Luxury Rigid Boxes for European Brands', company: '', art: 'book',
      meta: 'Millimetres · EUR or GBP quotes · Export cartons',
      intro: 'Custom rigid boxes for brands across Europe, from 50 pieces. Sizes in millimetres, quotes with delivery included, and everything packed in strong export cartons with the paperwork prepared.',
      why: [
        { name: 'From 50 pieces', text: 'Ideal for boutique perfume, jewellery and cosmetics brands.' },
        { name: 'Millimetres', text: 'Standard European sizing, with no conversions needed.' },
        { name: 'Export cartons', text: 'Strong cartons and corner protection on every shipment.' },
        { name: 'Paperwork prepared', text: 'Commercial invoice and export documents included.' }
      ],
      styles: ['flip-top', 'book', 'double-door'],
      shipping: [
        { title: 'Quote with delivery', text: 'In EUR or GBP, with delivery to your address.' },
        { title: 'Proof and approval', text: 'Dieline and proof in mm for you to approve.' },
        { title: 'Export packing', text: 'Export cartons and documents prepared for you.' },
        { title: 'Tracked delivery', text: 'Delivered to your door with tracking.' }
      ],
      faqs: [
        { q: 'Which European countries do you deliver to?', a: 'Most of Europe, including Ireland, France, Germany, the Netherlands, Belgium, Spain, Italy and the Nordics. Ask us about your country.' },
        { q: 'Will I pay import VAT or duties?', a: 'This depends on your country and import status. We explain what to expect before you order.' },
        { q: 'Can you quote in euros?', a: 'Yes, we can quote in EUR or GBP, whichever you prefer.' }
      ]
    }
  ];

  /* ---------- Footer landing pages (use the category template) ---------- */
  D.landings = [
    {
      id: 'magnetic', name: 'Magnetic closure boxes', title: 'Magnetic Closure', url: 'magnetic-closure-boxes.html',
      intro: 'The quiet snap of a magnetic lid is half the reason people keep these boxes. We hide the magnets under the wrap paper, so you get a clean closure with no visible hardware, from 50 pieces.',
      styles: ['flip-top', 'book', 'double-door'],
      finishes: [
        { name: 'Soft-touch wrap', text: 'Pairs perfectly with the smooth, satisfying close.' },
        { name: 'Foil logo on the flap', text: 'The flap is the first thing people see and touch.' },
        { name: 'Ribbon pull', text: 'Makes a strong magnet easy to open.' }
      ],
      inserts: [
        { name: 'Foam cut-outs', text: 'Hold products tight so the lid closes flat.' },
        { name: 'Satin lining', text: 'A soft finish under the lid for perfume and jewellery.' },
        { name: 'Card platform', text: 'Lifts the product to meet the lid.' }
      ],
      faqs: [
        { q: 'Will the magnets damage my product?', a: 'They are small, flat magnets hidden in the board. They are not strong enough to affect most products, but tell us if yours is magnet-sensitive.' },
        { q: 'Can a lid-and-base box have magnets?', a: 'Not usually. Magnets suit flip-top, book-style and double-door boxes, where a flap closes onto a wall.' },
        { q: 'How many magnets are used?', a: 'Usually two, set into the flap and the front wall. Larger boxes may use more.' }
      ]
    },
    {
      id: 'inserts', name: 'Boxes with inserts', title: 'Rigid', h1: 'Custom Rigid Boxes with Inserts', url: 'rigid-boxes-with-inserts.html',
      intro: 'An insert turns a nice box into a box that fits. We cut EVA foam, card and velvet inserts to your exact product, so bottles, jars and gift sets arrive exactly as you packed them.',
      styles: ['flip-top', 'book', 'drawer'],
      finishes: [
        { name: 'Velvet-wrapped foam', text: 'A soft, premium surface for jewellery and watches.' },
        { name: 'Satin lining', text: 'The classic finish for perfume and gifts.' },
        { name: 'Printed card insert', text: 'A plastic-free option that can carry your branding.' }
      ],
      inserts: [
        { name: 'EVA foam', text: 'Firm foam cut to shape. The most protective option.' },
        { name: 'Card insert', text: 'Folded card that holds products in slots, fully recyclable.' },
        { name: 'Multi-product set', text: 'Several cut-outs for a full routine or gift set.' }
      ],
      faqs: [
        { q: 'Do you need my product to cut the insert?', a: 'Exact dimensions are enough for a quote. For a sample or bulk run, the product itself helps us get the fit perfect.' },
        { q: 'What colour can the foam be?', a: 'Black and white are standard; foam can also be velvet-wrapped in other colours.' },
        { q: 'Can the insert be removed?', a: 'Yes, inserts are usually loose so customers can take the product out easily.' }
      ]
    },
    {
      id: 'shoulder', name: 'Shoulder-neck boxes', title: 'Shoulder-Neck', h1: 'Custom Shoulder-Neck Rigid Boxes', url: 'shoulder-neck-rigid-boxes.html',
      intro: 'A shoulder-neck box has a raised inner neck that the lid sits on, leaving a band of contrast colour when it is closed. It is one of the most premium-looking box styles there is, and we make it from 50 pieces.',
      styles: ['lid-base', 'book', 'flip-top'],
      finishes: [
        { name: 'Contrast neck colour', text: 'A gold, black or brand-colour band that shows when the box is closed.' },
        { name: 'Foil logo on the lid', text: 'Keeps the look clean and focused.' },
        { name: 'Textured wrap', text: 'Linen or leatherette for a tactile finish.' }
      ],
      inserts: [
        { name: 'Bottle cradle', text: 'Ideal for perfume, spirits and candles.' },
        { name: 'Foam set insert', text: 'Holds several items in place.' },
        { name: 'Platform insert', text: 'Raises a single product to the top.' }
      ],
      faqs: [
        { q: 'What is the neck?', a: 'A second inner wall that stands up from the base. The lid slides down over it and rests on the shoulder.' },
        { q: 'Is it more expensive than a normal lid and base box?', a: 'A little, because of the extra wall. It is often worth it for the premium look.' },
        { q: 'Can the neck be a different colour?', a: 'Yes. A contrast neck is the signature feature of this style.' }
      ]
    },
    {
      id: 'lowmoq', name: 'Low minimum order (50)', title: 'Low MOQ Rigid', h1: 'Low MOQ Rigid Boxes from 50 Pieces', url: 'low-moq-rigid-boxes.html',
      intro: 'Most rigid box factories start at 500 or 1,000 pieces. We start at 50, so new brands, limited editions and seasonal ranges can have a proper rigid box without ordering a garage full.',
      styles: ['flip-top', 'lid-base', 'drawer'],
      finishes: [
        { name: 'One foil logo', text: 'The best value way to make a small run look premium.' },
        { name: 'Standard colour wraps', text: 'Black, white and kraft papers keep small runs affordable.' },
        { name: 'Simple insert', text: 'A card or foam insert adds fit without much cost.' }
      ],
      inserts: [
        { name: 'Card insert', text: 'Lowest cost and fully recyclable.' },
        { name: 'Foam cut-out', text: 'Best protection for fragile items.' },
        { name: 'Tissue and sticker', text: 'Simple presentation for clothing and gifts.' }
      ],
      faqs: [
        { q: 'Is 50 the minimum per design or per order?', a: 'Per design. Each size and artwork combination needs at least 50 pieces.' },
        { q: 'Is a small order much more expensive per box?', a: 'Per box, yes, because the set-up cost is shared over fewer boxes. It is still far cheaper than ordering stock you do not need.' },
        { q: 'Can I start with 50 and reorder more later?', a: 'Yes. We keep your dieline and artwork on file for repeat orders.' }
      ]
    },
    {
      id: 'logo', name: 'Custom boxes with logo', title: 'Logo', h1: 'Custom Logo Boxes', url: 'custom-logo-boxes.html',
      intro: 'Your logo is the one thing every box needs. We add it in gold or silver foil, embossing, debossing, spot UV or full-colour print, on any of our six rigid box styles, from 50 pieces.',
      styles: ['flip-top', 'lid-base', 'book'],
      finishes: [
        { name: 'Foil stamping', text: 'Gold, silver, rose gold or copper. The most popular choice.' },
        { name: 'Emboss or deboss', text: 'A raised or pressed logo, with or without foil.' },
        { name: 'Spot UV', text: 'A glossy logo on a matt box, subtle and modern.' }
      ],
      inserts: [
        { name: 'Logo inside the lid', text: 'A second logo or message for the moment the box opens.' },
        { name: 'Printed insert card', text: 'Branding on the insert itself.' },
        { name: 'Logo ribbon', text: 'A printed ribbon pull or tie.' }
      ],
      faqs: [
        { q: 'What file do you need for my logo?', a: 'A vector file (AI, EPS, PDF or SVG) is best. Send what you have and we will check it.' },
        { q: 'Can my logo go on more than one side?', a: 'Yes. Lid, sides and inside can all carry your logo; each position is priced separately.' },
        { q: 'How small can the logo be?', a: 'Fine detail under about 0.3 mm can fill in with foil. We will check your artwork and advise.' }
      ]
    }
  ];

})(window.LUXORA);

/* =====================================================================
   PAGE COVER PHOTOS: one real product photo per page hero.
   Keyed by page file. Neighbouring menu items use different photos.
   ===================================================================== */
window.LUXORA.covers = {
  'magnetic-flip-top-perfume-box.html':{ src: 'assets/img/magnetic-flip-top-perfume-box-1200.webp', w: 736, h: 736, alt: 'Magnetic Flip-Top Box – custom rigid box with logo, made to your size' },
  'double-door-perfume-box.html':      { src: 'assets/img/double-door-perfume-box-1200.webp', w: 736, h: 736, alt: 'Double-Door Box – custom rigid box with logo, made to your size' },
  'drawer-box.html':                   { src: 'assets/img/drawer-box-1-1200.webp', w: 720, h: 720, alt: 'Ribbon-Pull Drawer – custom sliding drawer box with logo' },
  'lid-and-base-box.html':             { src: 'assets/img/lid-and-base-box-1200.webp', w: 900, h: 900, alt: 'Two-Piece Lid & Base Box – custom rigid box with logo, made to your size' },
  'book-style-box.html':               { src: 'assets/img/book-style-box-1200.webp', w: 1200, h: 900, alt: 'Book-Style Magnetic Box – custom rigid box with logo, made to your size' },
  'display-box.html':                  { src: 'assets/img/display-box-1200.webp', w: 500, h: 500, alt: 'Rigid Display Box – custom rigid box with logo, made to your size' },
  'rigid-boxes.html':                  { src: 'assets/img/work/magnetic-gift-box-foam-insert-1200.webp', w: 1200, h: 1200, alt: 'Black magnetic rigid gift box with a foam insert' },
  /* categories, in menu order */
  'perfume-boxes.html':                { src: 'assets/img/double-door-perfume-box-3-1200.webp', w: 900, h: 900, alt: 'Gold double-door perfume box holding a black bottle' },
  'jewellery-boxes.html':              { src: 'assets/img/magnetic-flip-top-perfume-box-6-1200.webp', w: 554, h: 554, alt: 'Gold rigid box with a fitted insert' },
  'display-boxes.html':                { src: 'assets/img/display-box-1200.webp', w: 500, h: 500, alt: 'Pastel rigid display box' },
  'corporate-boxes.html':              { src: 'assets/img/magnetic-flip-top-perfume-box-2-1200.webp', w: 1200, h: 1143, alt: 'Black magnetic box with a two-slot insert' },
  'rigid-gift-boxes.html':             { src: 'assets/img/magnetic-flip-top-perfume-box-3-1200.webp', w: 550, h: 550, alt: 'Red rigid gift box with a window and ribbon' },
  'presentation-boxes.html':           { src: 'assets/img/magnetic-flip-top-perfume-box-1-1200.webp', w: 1200, h: 1200, alt: 'Brown rigid presentation box with an open lid' },
  'candle-boxes.html':                 { src: 'assets/img/lid-and-base-box-3-1200.webp', w: 648, h: 523, alt: 'Red rigid box beside a bottle' },
  'watch-boxes.html':                  { src: 'assets/img/display-box-3-1200.webp', w: 479, h: 639, alt: 'Black branded rigid box with a magnetic lid' },
  'chocolate-boxes.html':              { src: 'assets/img/drawer-box-2-1200.webp', w: 650, h: 650, alt: 'Printed sleeve drawer box' },
  'apparel-boxes.html':                { src: 'assets/img/lid-and-base-box-2-1200.webp', w: 1200, h: 675, alt: 'Half-Lid Box – custom two-piece lid & base box with logo' },
  'cosmetic-boxes.html':               { src: 'assets/img/magnetic-flip-top-perfume-box-4-1200.webp', w: 554, h: 554, alt: 'Pink magnetic flip-top cosmetic box' },
  'hamper-boxes.html':                 { src: 'assets/img/double-door-perfume-box-2-1200.webp', w: 800, h: 800, alt: 'Orange gift boxes tied with ribbon' },
  'bridesmaid-proposal-boxes.html':    { src: 'assets/img/book-style-box-2-1200.webp', w: 900, h: 1200, alt: 'Pink rigid box with a ribbon' },
  'hair-extension-boxes.html':         { src: 'assets/img/magnetic-flip-top-perfume-box-5-1200.webp', w: 1200, h: 1200, alt: 'White magnetic box lined with green satin' },
  'paper-boxes.html':                  { src: 'assets/img/work/kraft-box-logo-band-1200.webp', w: 1200, h: 1200, alt: 'Kraft rigid box with a printed logo band' },
  /* footer landing pages */
  'magnetic-closure-boxes.html':       { src: 'assets/img/magnetic-flip-top-perfume-box-2-1200.webp', w: 1200, h: 1143, alt: 'Foam Insert Flip-Top – custom magnetic flip-top box with logo' },
  'rigid-boxes-with-inserts.html':     { src: 'assets/img/book-style-box-1-1200.webp', w: 800, h: 800, alt: 'Grey rigid box with a fitted insert' },
  'shoulder-neck-rigid-boxes.html':    { src: 'assets/img/lid-and-base-box-1-1200.webp', w: 650, h: 650, alt: 'Black lid and base rigid box' },
  'low-moq-rigid-boxes.html':          { src: 'assets/img/lid-and-base-box-2-1200.webp', w: 1200, h: 675, alt: 'White lid and base rigid box' },
  'custom-logo-boxes.html':            { src: 'assets/img/magnetic-flip-top-perfume-box-1200.webp', w: 736, h: 736, alt: 'Magnetic Flip-Top Box – custom rigid box with logo, made to your size' },
  /* regions */
  'uk.html':                           { src: 'assets/img/double-door-perfume-box-1-1200.webp', w: 1000, h: 1000, alt: 'Classic Double-Door – custom double-door box with logo' },
  'usa.html':                          { src: 'assets/img/double-door-perfume-box-1200.webp', w: 736, h: 736, alt: 'Double-Door Box – custom rigid box with logo, made to your size' },
  'canada.html':                       { src: 'assets/img/double-door-perfume-box-2-1200.webp', w: 800, h: 800, alt: 'Ribbon-Tie Double-Door – custom double-door box with logo' },
  'europe.html':                       { src: 'assets/img/book-style-box-1200.webp', w: 1200, h: 900, alt: 'Book-Style Magnetic Box – custom rigid box with logo, made to your size' },
  /* other pages */
  'portfolio.html':                    { src: 'assets/img/double-door-perfume-box-3-1200.webp', w: 900, h: 900, alt: 'Gold Foil Double-Door – custom double-door box with logo' },
  'samples.html':                      { src: 'assets/img/magnetic-flip-top-perfume-box-5-1200.webp', w: 1200, h: 1200, alt: 'Satin-Lined Flip-Top – custom magnetic flip-top box with logo' },
  'about.html':                        { src: 'assets/img/magnetic-flip-top-perfume-box-1200.webp', w: 736, h: 736, alt: 'Magnetic Flip-Top Box – custom rigid box with logo, made to your size' },
  'contact.html':                      { src: 'assets/img/double-door-perfume-box-1-1200.webp', w: 1000, h: 1000, alt: 'Navy double-door perfume box with a gold bottle' },
  'quote.html':                        { src: 'assets/img/book-style-box-2-1200.webp', w: 900, h: 1200, alt: 'Ribbon Book Box – custom book-style magnetic box with logo' }
};
