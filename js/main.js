/* =====================================================================
   CONNECTING THE FUTURE BACKEND (read me first)
   ---------------------------------------------------------------------
   The site is front-end only. Two places need to change when an API
   is added; nothing else does:

   1. CONTENT  : js/data.js sets window.LUXORA. To load content from an
                 API, fetch it, assign it to window.LUXORA (same shape),
                 then run this script. Every card, menu, select, FAQ,
                 region and blog list is rendered from that object.
   2. FORMS    : every form (quote, contact, sample) is validated here and
                 sent through ONE function: submitForm(formType, formData)
                 in section 6. Replace its WhatsApp placeholder with a
                 fetch() POST to your endpoint, e.g. /api/forms/:formType.
                 Field names: full_name, email, phone, box_type, quantity,
                 size, details, category, reference_images (files),
                 and for samples: box_style, variant, length, width, height, unit, finishes, country, notes.
   ===================================================================== */

/* =====================================================================
   Luxora Packaging: main script
   ---------------------------------------------------------------------
   1. Helpers
   2. Renderers   (build repeated content from window.LUXORA, js/data.js)
   3. Header      (mega menus, mobile menu)
   4. Tabs, accordion, lightbox, portfolio filter
   5. Motion      (stroke draw, scroll reveal, count-up, videos)
   6. Forms       (quick quote, quote form + upload, validation, submitForm)
   7. Cookie bar
   Page context comes from <body data-page data-style data-category>.
   ===================================================================== */
(function () {
  'use strict';

  var D = window.LUXORA;
  var ART = window.LuxoraArt;
  var root = document.documentElement;
  root.classList.add('js');
  var PAGE = document.body.dataset;   // page, style, category

  /* ===================== 1. HELPERS ===================== */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function waLink(text) {
    return 'https://wa.me/' + D.contact.whatsappNumber + '?text=' + encodeURIComponent(text || D.contact.whatsappText);
  }
  /* Escape a URL from data and block script URLs (javascript:, data:, vbscript:) */
  function safeUrl(u) {
    u = String(u == null ? '' : u).trim();
    return /^(javascript|data|vbscript):/i.test(u.replace(/[\s\u0000-\u001f]/g, '')) ? '#' : esc(u);
  }
  function icon(id) { return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  function styleById(id) { return D.boxStyles.filter(function (s) { return s.id === id; })[0]; }
  function catById(id) { return D.categories.concat(D.landings || []).filter(function (c) { return c.id === id; })[0]; }
  function variantPhoto(styleId, variant) {   // { src, alt } for one design (same as the live site), or null
    var m = (D.variantImages || {})[styleId] || {};
    return m[variant] || null;
  }
  function regionById(id) { return (D.regions || []).filter(function (r) { return r.id === id; })[0]; }
  function fmtDate(iso) {
    var d = new Date(iso + 'T12:00:00');
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  function blogCard(b, featured) {
    return '<a class="card reveal' + (featured ? ' card-featured' : '') + '" href="' + safeUrl(b.url) + '" data-cat="' + esc(b.category) + '">' +
      mediaFrame(b.image, b.alt, b.art || 'flipTop', '<span class="badge">' + esc(b.category) + '</span>') +
      '<div class="card-body"><p class="card-meta">' + esc(fmtDate(b.date)) + ' · ' + esc(b.readTime) + '</p><' + (featured ? 'h2' : 'h3') + ' class="h3">' +
      esc(b.title) + '</' + (featured ? 'h2' : 'h3') + '><p>' + esc(b.excerpt) + '</p><span class="card-more">Read article →</span></div></a>';
  }
  function quoteUrl(styleId, variant, extra) {
    var p = new URLSearchParams();
    if (styleId) p.set('style', styleId);
    if (variant) p.set('variant', variant);
    Object.keys(extra || {}).forEach(function (k) { if (extra[k]) p.set(k, extra[k]); });
    return 'quote.html' + (p.toString() ? '?' + p.toString() : '');
  }

  /* Dark frame with a photo, or line art until real photos are added */
  var ART_CYCLE = ['flipTop', 'doubleDoor', 'drawer', 'lidBase', 'book', 'display'];
  function mediaFrame(image, alt, art, extra) {
    var inner = image
      ? '<img src="' + esc(image) + '" alt="' + esc(alt) + '" width="1200" height="900" loading="lazy" decoding="async">'
      : '<div class="art" role="img" aria-label="' + esc(alt) + '">' + ART.render(art) + '</div>';
    return '<div class="media-frame">' + (extra || '') + inner + '</div>';
  }

  /* Accordion markup shared by every FAQ block */
  function faqHtml(list, prefix) {
    return list.map(function (f, i) {
      var id = prefix + '-' + i;
      return '<div class="acc-item"><h3 class="acc-heading">' +
        '<button class="acc-btn" type="button" aria-expanded="false" aria-controls="' + id + '" id="' + id + '-btn" data-acc>' +
        esc(f.q) + '<span class="plus" aria-hidden="true"></span></button></h3>' +
        '<div class="acc-panel" id="' + id + '" role="region" aria-labelledby="' + id + '-btn" hidden><p>' + esc(f.a) + '</p></div></div>';
    }).join('');
  }

  /* Tab row + panels shared by finishes and values blocks */
  function tabsHtml(prefix, label, items, panelFn) {
    var tabs = items.map(function (it, i) {
      return '<button class="tab-btn" type="button" role="tab" id="' + prefix + '-tab-' + it.id + '" aria-controls="' + prefix + '-panel-' + it.id +
        '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(it.tab) + '</button>';
    }).join('');
    var panels = items.map(function (it, i) {
      return '<div class="tab-panel" role="tabpanel" id="' + prefix + '-panel-' + it.id + '" aria-labelledby="' + prefix + '-tab-' + it.id + '"' + (i ? ' hidden' : '') + '>' +
        panelFn(it, i) + '</div>';
    }).join('');
    return '<div class="tab-row tab-row-' + items.length + '" role="tablist" aria-label="' + esc(label) + '">' + tabs + '</div>' + panels;
  }

  /* Style card (used in grids and "other styles" rows) */
  function styleCard(s, compact) {
    return '<a class="card reveal' + (compact ? ' card-compact' : '') + '" href="' + safeUrl(s.url) + '">' +
      mediaFrame(s.image, s.imageAlt, s.art, '<span class="badge">' + s.designs + ' designs</span>') +
      '<div class="card-body"><h3>' + esc(s.name) + '</h3>' + (compact ? '' : '<p>' + esc(s.summary) + '</p>') +
      '<span class="card-more">View designs →</span></div></a>';
  }

  /* ===================== 2. RENDERERS ===================== */
  var R = {};

  R.ticker = function (el) {
    var items = D.ticker.map(function (t) {
      return '<span class="ticker-item">' + esc(t) + '</span><span class="ticker-sep" aria-hidden="true">✦</span>';
    }).join('');
    el.innerHTML = '<div class="ticker-track"><div class="ticker-group">' + items +
      '</div><div class="ticker-group" aria-hidden="true">' + items + '</div></div>';
  };

  R['mega-styles'] = function (el) {
    el.innerHTML =
      '<div class="mega-styles">' +
        '<div><p class="mega-label">Browse</p><ul class="mega-primary">' +
          D.styleLinks.map(function (l) { return '<li><a href="' + safeUrl(l.url) + '">' + esc(l.label) + '<span aria-hidden="true">→</span></a></li>'; }).join('') +
        '</ul></div>' +
        '<div class="mega-divider" aria-hidden="true"></div>' +
        '<div><p class="mega-label">Box styles</p><ul class="mega-grid">' +
          D.boxStyles.map(function (s) {
            // Small real cover photo (600px file); falls back to line art if a style has no photo yet
            var thumb = s.image ? s.image.replace('-1200.webp', '-600.webp') : '';
            var pic = thumb
              ? '<span class="mega-icon mega-photo"><img src="' + esc(thumb) + '" alt="" width="80" height="60" loading="lazy" decoding="async"></span>'
              : '<span class="mega-icon art art-icon">' + ART.render(s.art) + '</span>';
            return '<li><a class="mega-style" href="' + safeUrl(s.url) + '">' + pic +
              '<span><strong>' + esc(s.name) + '</strong><small>' + s.designs + ' designs</small></span></a></li>';
          }).join('') +
        '</ul></div>' +
      '</div>';
  };

  R['mega-categories'] = function (el) {
    el.innerHTML = '<p class="mega-label">Packaging for</p><ul class="mega-cols">' +
      D.categories.map(function (c) { return '<li><a href="' + safeUrl(c.url) + '">' + esc(c.name) + '</a></li>'; }).join('') + '</ul>';
  };

  R['mobile-menu'] = function (el) {
    var html = D.nav.map(function (item, i) {
      if (!item.mega) {
        return '<li><a class="m-link" href="' + safeUrl(item.url) + '"' + (item.url === currentFile ? ' aria-current="page"' : '') + '>' + esc(item.label) + '</a></li>';
      }
      var links = item.mega === 'styles'
        ? D.styleLinks.map(function (l) { return '<a href="' + safeUrl(l.url) + '">' + esc(l.label) + '</a>'; }).join('') +
          '<div class="m-divider"></div>' +
          D.boxStyles.map(function (s) { return '<a href="' + safeUrl(s.url) + '">' + esc(s.name) + '</a>'; }).join('')
        : D.categories.map(function (c) { return '<a href="' + safeUrl(c.url) + '">' + esc(c.name) + '</a>'; }).join('');
      var id = 'm-sub-' + i;
      return '<li><button class="m-trigger" type="button" aria-expanded="false" aria-controls="' + id + '" data-acc>' +
        esc(item.label) + '<span class="plus" aria-hidden="true"></span></button><div class="m-sub" id="' + id + '" hidden>' + links + '</div></li>';
    }).join('');
    el.innerHTML = '<ul class="m-list">' + html + '</ul>' +
      '<div class="m-cta"><a class="btn btn-primary" href="quote.html">Get a quote</a>' +
      '<a class="btn btn-secondary" href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp us</a></div>' +
      '<div class="m-contact"><a href="mailto:' + D.contact.email + '">' + esc(D.contact.email) + '</a><br>' + esc(D.contact.whatsappDisplay) + '</div>';
  };

  /* Quick quote selects; data-default pre-selects a style (category pages) */
  R['quick-style'] = function (el) {
    el.innerHTML = D.boxStyles.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name) + '</option>'; }).join('') +
      '<option value="not-sure">Not sure yet</option>';
    if (el.dataset.default) el.value = el.dataset.default;
  };
  R['quick-qty'] = function (el) {
    el.innerHTML = D.quantities.map(function (q) { return '<option value="' + q.value + '">' + esc(q.label) + '</option>'; }).join('');
  };

  R.stats = function (el) {
    el.innerHTML = D.stats.map(function (s) {
      var num = s.text != null
        ? esc(s.text)
        : '<span data-count="' + s.value + '">' + s.value + '</span>' + esc(s.suffix || '');
      return '<li class="stat"><span class="stat-num">' + num + '</span><span class="stat-label">' + esc(s.label) + '</span></li>';
    }).join('');
  };

  R['styles-grid'] = function (el) {
    el.innerHTML = D.boxStyles.map(function (s) { return styleCard(s); }).join('');
  };

  /* data-source="all" (portfolio) adds the extra live clips */
  R.videos = function (el) {
    var list = el.dataset.source === 'all' ? D.videos.concat(D.videosMore || []) : D.videos;
    el.innerHTML = list.map(function (v) {
      return '<article class="video-card reveal"><div class="video-frame">' +
        '<video muted loop playsinline preload="none" src="' + esc(v.src) + '"' + (v.poster ? ' poster="' + esc(v.poster) + '"' : '') +
        ' width="720" height="900" aria-label="' + esc(v.title) + '"></video>' +
        '<span class="badge video-label">Real video</span><span class="video-play" aria-hidden="true"></span></div>' +
        '<h3>' + esc(v.title) + '</h3></article>';
    }).join('');
  };

  R.industries = function (el) {
    el.innerHTML = D.industries.map(function (t, i) {
      return '<a class="tile reveal" href="' + safeUrl(t.url) + '">' + mediaFrame(t.image, t.alt, ART_CYCLE[i % ART_CYCLE.length]) +
        '<span class="tile-label">' + esc(t.name) + '<span aria-hidden="true">→</span></span></a>';
    }).join('');
  };

  R.finishes = function (el) {
    el.innerHTML = tabsHtml('fin', 'Finishes', D.finishes, function (f, i) {
      return '<div><p class="eyebrow">Finish 0' + (i + 1) + '</p><h3>' + esc(f.title) + '</h3><p>' + esc(f.description) + '</p>' +
        '<p class="callout">Every finish is checked against your approved proof before packing.</p></div>' +
        '<div class="tab-art art art-draw" role="img" aria-label="Layered illustration of a box finish">' + ART.render('layers', { variant: f.art }) + '</div>';
    });
  };

  R.values = function (el) {
    el.innerHTML = tabsHtml('val', 'Our values', D.values, function (v, i) {
      return '<div><p class="eyebrow">Value 0' + (i + 1) + '</p><h3>' + esc(v.title) + '</h3><p>' + esc(v.text) + '</p></div>' +
        '<div class="tab-art art art-draw" role="img" aria-label="Layered line illustration">' + ART.render('layers', { variant: v.art }) + '</div>';
    });
  };

  R.process = function (el) {
    el.innerHTML = D.process.map(function (p, i) {
      return '<li class="step"><span class="step-num">0' + (i + 1) + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></li>';
    }).join('');
  };

  /* Homepage preview: latest 3 posts */
  R.blog = function (el) {
    el.innerHTML = D.blog.slice(0, 3).map(function (b) { return blogCard(b); }).join('');
  };

  /* ---- blog.html ---- */
  R['blog-filters'] = function (el) {
    el.innerHTML = ['All'].concat(D.blogCategories).map(function (c, i) {
      return '<button class="filter-btn" type="button" aria-pressed="' + (i === 0) + '" data-filter="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');
  };
  R['blog-featured'] = function (el) { el.innerHTML = blogCard(D.blog[0], true); };
  R['blog-grid'] = function (el) { el.innerHTML = D.blog.map(function (b) { return blogCard(b); }).join(''); };

  /* ---- Article pages: related articles ---- */
  R.related = function (el) {
    el.innerHTML = D.blog.filter(function (b) { return b.slug !== PAGE.slug; })
      .map(function (b) { return blogCard(b); }).join('');
  };

  /* FAQ: data-source = home (default) | style | category | region */
  R.faq = function (el) {
    var src = el.dataset.source, list = D.faqs;
    if (src === 'style') list = D.styleDetails[PAGE.style].faqs;
    if (src === 'category') list = catById(PAGE.category).faqs;
    if (src === 'region') list = regionById(PAGE.region).faqs;
    el.innerHTML = faqHtml(list, 'faq-' + (src || 'home'));
  };

  /* ---- faq.html: grouped tabs ---- */
  R['faq-groups'] = function (el) {
    el.innerHTML = tabsHtml('faqg', 'FAQ topics', D.faqGroups, function (g) {
      return '<div class="faq-group"><h2 class="faq-group-title">' + esc(g.tab) + '</h2><div class="accordion">' + faqHtml(g.items, 'fq-' + g.id) + '</div></div>';
    });
  };

  /* ---- Region pages ---- */
  R['region-why'] = function (el) {
    el.innerHTML = regionById(PAGE.region).why.map(function (w) {
      return '<li class="info-item reveal"><h3>' + esc(w.name) + '</h3><p>' + esc(w.text) + '</p></li>';
    }).join('');
  };
  R['region-styles'] = function (el) {
    el.innerHTML = regionById(PAGE.region).styles.map(function (id) { return styleCard(styleById(id)); }).join('');
  };
  R['region-steps'] = function (el) {
    el.innerHTML = regionById(PAGE.region).shipping.map(function (p, i) {
      return '<li class="step"><span class="step-num">0' + (i + 1) + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></li>';
    }).join('');
  };
  R['region-company'] = function (el) {
    var r = regionById(PAGE.region), c = D.contact[r.company];
    if (!c) {
      el.innerHTML = '<p class="region-meta">Who you deal with</p><h3>Luxora Packaging</h3><p>Orders for ' + esc(r.name) +
        ' are handled by our UK team at WNP Enterprise Ltd and shipped in export cartons with the paperwork prepared.</p>' +
        '<p><a class="text-link" href="mailto:' + D.contact.email + '">' + esc(D.contact.email) + '</a></p>';
      return;
    }
    el.innerHTML = '<p class="region-meta">Who you deal with</p><h3>' + esc(c.company) + '</h3><p>' + esc(c.intro) + '.</p><p>' +
      c.address.map(esc).join('<br>') + '</p>' + (c.registration ? '<p>' + esc(c.registration) + '</p>' : '') +
      '<p><a class="text-link" href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></p>';
  };

  function companyBlock(c, tag) {
    return '<div class="contact-block"><' + tag + '>' + esc(c.label) + '</' + tag + '><p>' + esc(c.intro) + '.</p><p>' +
      c.address.map(esc).join('<br>') + '</p><p><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></p>' +
      (c.registration ? '<p>' + esc(c.registration) + '</p>' : '') + '</div>';
  }

  R['contact-blocks'] = function (el) {
    var c = D.contact;
    el.innerHTML =
      '<div class="contact-block"><h3>Email</h3><p class="contact-line">' + icon('mail') + '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></p></div>' +
      '<div class="contact-block"><h3>WhatsApp</h3><p class="contact-line">' + icon('whatsapp') + '<a href="' + waLink() + '" target="_blank" rel="noopener">' + esc(c.whatsappDisplay) + '</a></p></div>' +
      companyBlock(c.uk, 'h3') + companyBlock(c.usa, 'h3');
  };

  /* contact.html cards */
  R['contact-cards'] = function (el) {
    var c = D.contact;
    function card(title, ic, body) {
      return '<div class="contact-card reveal"><span class="contact-icon">' + (ic ? icon(ic) : '') + '</span><h2 class="h3">' + esc(title) + '</h2>' + body + '</div>';
    }
    el.innerHTML =
      card('Email', 'mail', '<p><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></p>') +
      card('WhatsApp', 'whatsapp', '<p><a href="' + waLink() + '" target="_blank" rel="noopener">' + esc(c.whatsappDisplay) + '</a></p>') +
      card('Facebook', 'facebook', '<p><a href="' + safeUrl(c.facebook) + '" target="_blank" rel="noopener">Luxora Packaging on Facebook</a></p>') +
      card('UK office', '', '<p>' + esc(c.uk.intro) + '.</p><p>' + c.uk.address.map(esc).join('<br>') + '</p><p><a href="mailto:' + esc(c.uk.email) + '">' + esc(c.uk.email) + '</a></p>') +
      card('USA office', '', '<p>' + esc(c.usa.intro) + '.</p><p>' + c.usa.address.map(esc).join('<br>') + '</p><p><a href="mailto:' + esc(c.usa.email) + '">' + esc(c.usa.email) + '</a></p>');
  };

  /* about.html registered companies */
  R['company-panels'] = function (el) {
    var c = D.contact;
    function panel(r, meta) {
      return '<article class="region reveal"><p class="region-meta">' + esc(meta) + '</p><h3>' + esc(r.company) + '</h3><p>' + esc(r.intro) + '.</p><p>' +
        r.address.map(esc).join('<br>') + '</p>' + (r.registration ? '<p>' + esc(r.registration) + '</p>' : '') +
        '<p><a class="text-link" href="mailto:' + esc(r.email) + '">' + esc(r.email) + '</a></p></article>';
    }
    el.innerHTML = panel(c.uk, 'United Kingdom · Company No. 16012866') + panel(c.usa, 'United States · New York');
  };

  /* =====================================================================
     QUOTE FORM: one short single-step form, used on every page that has a
     quote section (homepage, quote, contact, category and box style pages).
     <div data-render="quote-form" data-style="flip-top" data-category="Perfume boxes"></div>
     data-style pre-selects the box type; ?style= ?qty= ?variant= ?category=
     in the URL also pre-fill it. Fields are sent through submitForm('quote').
     ===================================================================== */
  var qfCount = 0;
  R['quote-form'] = function (el) {
    var n = ++qfCount, id = function (s) { return 'qf' + n + '-' + s; };
    var types = D.quoteBoxTypes.map(function (t) {
      return '<option value="' + esc(t.label) + '" data-id="' + esc(t.id) + '">' + esc(t.label) + '</option>';
    }).join('');
    var qty = D.quoteQuantities.map(function (q, i) {
      return '<label class="chip-choice"><input type="radio" name="quantity" value="' + esc(q.label) + '" data-band="' + esc(q.value) + '"' +
        (i === 0 ? ' required data-msg="Please choose roughly how many boxes you need."' : '') + '><span>' + esc(q.label) + '</span></label>';
    }).join('');
    el.innerHTML =
      '<form class="qform" data-form="quote" novalidate>' +
        '<input type="hidden" name="category" value="' + esc(el.dataset.category || '') + '">' +
        '<div class="qform-grid">' +
          '<div class="field"><label for="' + id('name') + '">Your name <span class="req" aria-hidden="true">*</span></label>' +
            '<input id="' + id('name') + '" name="full_name" type="text" autocomplete="name" required data-msg="Please tell us your name."></div>' +
          '<div class="field"><label for="' + id('email') + '">Email <span class="req" aria-hidden="true">*</span></label>' +
            '<input id="' + id('email') + '" name="email" type="email" autocomplete="email" inputmode="email" required data-msg="Please enter your email so we can send your price."></div>' +
          '<div class="field"><label for="' + id('phone') + '">WhatsApp / phone <span class="opt">(optional)</span></label>' +
            '<input id="' + id('phone') + '" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div>' +
          '<div class="field"><label for="' + id('type') + '">Box type</label>' +
            '<div class="select-wrap"><select id="' + id('type') + '" name="box_type">' + types + '</select></div></div>' +
          '<fieldset class="field field-full"><legend>Quantity <span class="req" aria-hidden="true">*</span></legend>' +
            '<div class="chip-group" role="radiogroup">' + qty + '</div></fieldset>' +
          '<div class="field field-full"><label for="' + id('size') + '">Box size <span class="opt">(optional)</span></label>' +
            '<input id="' + id('size') + '" name="size" type="text" placeholder="e.g. 10 x 8 x 4 cm, or my 50 ml perfume bottle"></div>' +
          '<div class="field field-full"><label for="' + id('details') + '">Tell us what you need <span class="opt">(optional)</span></label>' +
            '<textarea id="' + id('details') + '" name="details" rows="2" placeholder="Colour, logo, foil, insert, anything you have in mind"></textarea></div>' +
          '<div class="field field-full upload-field">' +
            '<span class="upload-label" id="' + id('up-label') + '">Reference images <span class="opt">(optional)</span></span>' +
            '<label class="dropzone" for="' + id('files') + '">' +
              '<input class="sr-only" id="' + id('files') + '" type="file" name="reference_images" multiple ' +
                'accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf" aria-describedby="' + id('up-hint') + '">' +
              '<span class="dz-icon" aria-hidden="true"></span>' +
              '<span class="dz-text"><strong>Have a picture of the box you want? Add it here (optional)</strong>' +
              '<span id="' + id('up-hint') + '">Drag &amp; drop or click to browse · JPG, PNG, WEBP or PDF · up to 3 files, 5 MB each</span></span>' +
            '</label>' +
            '<ul class="thumbs" aria-label="Attached files"></ul>' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-primary qform-submit" type="submit">Get my free quote</button>' +
        '<p class="qform-note">We reply within 24 hours · Minimum 50 boxes · No obligation</p>' +
        '<p class="qform-alt"><a class="text-link" href="' + waLink() + '" target="_blank" rel="noopener">Prefer WhatsApp? Chat with us</a></p>' +
        '<p class="form-consent">By sending this form you agree that Luxora Packaging may use these details to reply to your enquiry, as explained in our <a href="privacy.html">Privacy Policy</a>.</p>' +
      '</form>' +
      '<div class="form-success qform-success" data-success-for="quote" role="status" tabindex="-1" hidden></div>';
  };

  /* Plain style select (sample form); pairs with a [data-render="variant-select"] */
  R['style-select'] = function (el) {
    el.innerHTML = '<option value="">Choose a style</option>' + D.boxStyles.map(function (s) {
      return '<option value="' + esc(s.name) + '" data-id="' + s.id + '">' + esc(s.name) + '</option>';
    }).join('') + '<option value="Not sure / Other">Not sure / Other</option>';
  };
  R['variant-select'] = function (el) { el.innerHTML = '<option value="">Choose a style first</option>'; };

  R.countries = function (el) {
    el.innerHTML = '<option value="">Select country</option>' + D.countries.map(function (c) {
      return '<option value="' + esc(c) + '">' + esc(c) + '</option>';
    }).join('');
  };

  /* Finish checkboxes (sample form) */
  R['finish-checks'] = function (el) {
    el.innerHTML = D.finishes.map(function (f, i) {
      var id = (el.id || 'fc') + '-' + i;
      return '<label class="check" for="' + id + '"><input type="checkbox" id="' + id + '" name="finishes" value="' + esc(f.title) + '"><span>' + esc(f.title) + '</span></label>';
    }).join('');
  };

  /* ---- Box style pages ---- */
  R.variants = function (el) {
    var s = styleById(PAGE.style), info = D.styleDetails[s.id].variants;
    el.innerHTML = s.variants.map(function (v) {
      var ph = variantPhoto(s.id, v) || { src: s.image, alt: s.imageAlt };
      return '<button class="card variant-card reveal" type="button" data-lightbox data-style-id="' + s.id + '" data-variant="' + esc(v) + '" data-text="' + esc(info[v]) +
        '" data-image="' + esc(ph.src) + '" data-alt="' + esc(ph.alt) + '">' +
        mediaFrame(ph.src, ph.alt, s.art, '<span class="badge">' + esc(v) + '</span>') +
        '<span class="card-body"><span class="h3">' + esc(v) + '</span><span class="card-text">' + esc(info[v]) + '</span><span class="card-more">View design →</span></span></button>';
    }).join('');
  };

  R['best-for'] = function (el) {
    el.innerHTML = D.styleDetails[PAGE.style].bestFor.map(function (id) {
      var c = catById(id);
      return '<li><a href="' + safeUrl(c.url) + '">' + esc(c.name) + '</a></li>';
    }).join('');
  };

  R.specs = function (el) {
    var d = D.styleDetails[PAGE.style], sp = D.specs;
    var rows = [
      ['Board', sp.board], ['Wrap papers', sp.papers], ['Inserts', d.inserts], ['Closure', d.closure],
      ['Finishes', sp.finishes], ['Minimum order', sp.moq], ['Sizes', sp.sizes]
    ];
    el.innerHTML = '<caption class="sr-only">Specifications</caption><tbody>' + rows.map(function (r) {
      return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(r[1]) + '</td></tr>';
    }).join('') + '</tbody>';
  };

  R['other-styles'] = function (el) {
    el.innerHTML = D.boxStyles.filter(function (s) { return s.id !== PAGE.style; })
      .map(function (s) { return styleCard(s, true); }).join('');
  };

  /* ---- rigid-boxes.html ---- */
  R.compare = function (el) {
    el.innerHTML = '<caption class="sr-only">Box style comparison</caption><thead><tr><th scope="col">Style</th><th scope="col">Opening style</th><th scope="col">Best for</th><th scope="col">Premium feel</th></tr></thead><tbody>' +
      D.boxStyles.map(function (s) {
        var c = D.styleCompare[s.id], dots = '';
        for (var i = 1; i <= 5; i++) dots += '<span class="dot' + (i <= c.feel ? ' is-on' : '') + '"></span>';
        return '<tr><th scope="row"><a href="' + safeUrl(s.url) + '">' + esc(s.name) + '</a></th><td>' + esc(c.opening) + '</td><td>' + esc(c.bestFor) +
          '</td><td><span class="feel" role="img" aria-label="' + c.feel + ' out of 5">' + dots + '</span></td></tr>';
      }).join('') + '</tbody>';
  };

  /* ---- Category pages ---- */
  R['cat-styles'] = function (el) {
    el.innerHTML = catById(PAGE.category).styles.map(function (id) { return styleCard(styleById(id)); }).join('');
  };
  function infoList(list) {
    return list.map(function (f) {
      return '<li class="info-item reveal"><h3>' + esc(f.name) + '</h3><p>' + esc(f.text) + '</p></li>';
    }).join('');
  }
  R['cat-finishes'] = function (el) { el.innerHTML = infoList(catById(PAGE.category).finishes); };
  R['cat-inserts'] = function (el) { el.innerHTML = infoList(catById(PAGE.category).inserts); };

  /* ---- Portfolio ---- */
  R['portfolio-filters'] = function (el) {
    el.innerHTML = '<button class="filter-btn" type="button" aria-pressed="true" data-filter="all">All</button>' +
      D.boxStyles.map(function (s) {
        return '<button class="filter-btn" type="button" aria-pressed="false" data-filter="' + s.id + '">' + esc(s.shortName) + '</button>';
      }).join('');
  };
  R['portfolio-grid'] = function (el) {
    el.innerHTML = D.portfolio.map(function (p) {
      var s = styleById(p.style);
      return '<button class="card masonry-item shape-' + p.shape + '" type="button" data-cat="' + p.style + '" data-lightbox data-style-id="' + p.style +
        '" data-variant="' + esc(p.variant) + '" data-title="' + esc(p.title) + '" data-text="' + esc(D.styleDetails[p.style].variants[p.variant] || s.summary) +
        '" data-image="' + esc(p.image) + '" data-alt="' + esc(p.alt || p.title) + '">' +
        mediaFrame(p.image, p.alt || p.title, s.art, '<span class="badge">' + esc(s.shortName) + '</span>') +
        '<span class="card-body"><span class="h3">' + esc(p.title) + '</span><span class="card-meta">' + esc(s.name) + (p.variant ? ' · ' + esc(p.variant) : '') + '</span></span></button>';
    }).join('');
  };

  /* ---- Samples ---- */
  R['sample-rules'] = function (el) { el.innerHTML = D.samples.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join(''); };
  R['sample-steps'] = function (el) {
    el.innerHTML = D.samples.steps.map(function (p, i) {
      return '<li class="step"><span class="step-num">0' + (i + 1) + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p></li>';
    }).join('');
  };

  /* ---- Quote page sidebar ---- */
  R['next-steps'] = function (el) {
    el.innerHTML = D.nextSteps.map(function (t, i) {
      return '<li><span class="step-num">0' + (i + 1) + '</span><span>' + esc(t) + '</span></li>';
    }).join('');
  };

  /* ---- Footer ---- */
  function linkList(list, labelKey) {
    return list.map(function (l) { return '<li><a href="' + safeUrl(l.url) + '">' + esc(l[labelKey || 'label']) + '</a></li>'; }).join('');
  }
  R['footer-styles'] = function (el) {
    el.innerHTML = D.boxStyles.map(function (s) { return '<li><a href="' + safeUrl(s.url) + '">' + esc(s.name) + '</a></li>'; }).join('') + linkList(D.footer.styleExtras);
  };
  R['footer-categories'] = function (el) { el.innerHTML = linkList(D.categories, 'name'); };
  R['footer-company'] = function (el) { el.innerHTML = linkList(D.footer.company); };
  R['footer-contact'] = function (el) {
    var c = D.contact;
    function block(r) {
      return '<p><strong>' + esc(r.intro) + '</strong><br>' + r.address.map(esc).join('<br>') +
        '<br><a href="mailto:' + esc(r.email) + '">' + esc(r.email) + '</a></p>';
    }
    el.innerHTML =
      '<p><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a><br><a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp ' + esc(c.whatsappDisplay) + '</a></p>' +
      block(c.uk) + block(c.usa) +
      '<p><a href="' + safeUrl(c.facebook) + '" target="_blank" rel="noopener">Facebook</a></p>';
  };

  /* Pages in sub-folders (blog/) or served from any path (404) set data-root
     ("../" or "/") so relative links built from data.js still resolve. */
  var ROOT = PAGE.root || '';
  var REL = /^(?!https?:|mailto:|tel:|data:|#|\/)/;
  function u(url) { return ROOT && REL.test(url) ? ROOT + url : url; }
  function fixLinks(scope) {
    if (!ROOT) return;
    $$('a[href], img[src], video[src]', scope).forEach(function (n) {
      var attr = n.hasAttribute('href') ? 'href' : 'src', v = n.getAttribute(attr);
      if (REL.test(v) && v.indexOf(ROOT) !== 0) n.setAttribute(attr, ROOT + v);
    });
  }

  $$('[data-render]').forEach(function (el) {
    var fn = R[el.getAttribute('data-render')];
    if (fn) { fn(el); fixLinks(el); }
  });

  // Static line-art slots (hero, samples, style heroes)
  $$('[data-art]').forEach(function (el) { el.innerHTML = ART.render(el.getAttribute('data-art')); });

  // Keep every WhatsApp link in sync with data.js
  $$('[data-wa]').forEach(function (a) { a.href = waLink(); });

  // Active section in the main nav (orange underline): mega triggers for style / category pages
  var activeMega = { style: 'mega-styles', rigid: 'mega-styles', category: 'mega-categories' }[PAGE.page];
  if (activeMega) {
    var trig = $('.nav-trigger[aria-controls="' + activeMega + '"]');
    if (trig) trig.classList.add('is-active');
  }
  if (PAGE.page === 'article') { var bl = $('.nav-link[href$="blog.html"]'); if (bl) bl.setAttribute('aria-current', 'page'); }

  // Header shrinks slightly on scroll; back-to-top button appears
  var header = $('.site-header'), toTop = $('.to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 40);
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    var skip = $('#main'); if (skip) { skip.setAttribute('tabindex', '-1'); skip.focus({ preventScroll: true }); }
  });

  // Table of contents (articles, legal pages): highlight the section in view
  var tocLinks = $$('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var tocIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    tocLinks.forEach(function (a) { var t = document.getElementById(a.getAttribute('href').slice(1)); if (t) tocIO.observe(t); });
  }

  /* ===================== 3. HEADER ===================== */
  var menu = $('#mobile-menu'), menuBtn = $('.menu-toggle'), menuClose = $('.menu-close');
  var megaItems = $$('.has-mega');
  function closeMegas(except) {
    megaItems.forEach(function (li) {
      if (li === except) return;
      li.classList.remove('is-open');
      $('.nav-trigger', li).setAttribute('aria-expanded', 'false');
    });
  }
  function setMega(li, open) {
    closeMegas(open ? li : null);
    li.classList.toggle('is-open', open);
    $('.nav-trigger', li).setAttribute('aria-expanded', String(open));
  }
  var canHover = window.matchMedia('(hover: hover)').matches;
  megaItems.forEach(function (li) {
    var trigger = $('.nav-trigger', li), timer;
    trigger.addEventListener('click', function () { setMega(li, !li.classList.contains('is-open')); });
    if (canHover) {
      li.addEventListener('mouseenter', function () { clearTimeout(timer); setMega(li, true); });
      li.addEventListener('mouseleave', function () { timer = setTimeout(function () { setMega(li, false); }, 160); });
    }
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) setMega(li, false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = $('.has-mega.is-open');
    if (open) { setMega(open, false); $('.nav-trigger', open).focus(); }
    if (menu && menu.classList.contains('is-open')) toggleMenu(false);
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.has-mega')) closeMegas(); });

  function toggleMenu(open) {
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('no-scroll', open);
    (open ? menuClose : menuBtn).focus();
  }
  if (menu) {
    menuBtn.addEventListener('click', function () { toggleMenu(true); });
    menuClose.addEventListener('click', function () { toggleMenu(false); });
    menu.addEventListener('keydown', function (e) {   // keep focus inside the open menu
      if (e.key !== 'Tab') return;
      var f = $$('a, button', menu).filter(function (x) { return x.offsetParent !== null; });
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1180 && menu.classList.contains('is-open')) toggleMenu(false); });
  }

  /* ===================== 4. TABS, ACCORDION, LIGHTBOX, FILTER ===================== */

  // Stroke-draw: when finished, drop .art-draw so lines go back to crisp 1px strokes
  function endDraw(el) {
    clearTimeout(el._drawTimer);
    var count = $$('polygon, line', el).length;
    el._drawTimer = setTimeout(function () { el.classList.remove('art-draw'); }, reduceMotion ? 0 : count * 22 + 1300);
  }
  $$('.art-draw').forEach(function (el) { el.setAttribute('data-draw', ''); endDraw(el); });
  function replayDraw(panel) {
    $$('[data-draw]', panel).forEach(function (a) {
      a.classList.remove('art-draw'); void a.offsetWidth; a.classList.add('art-draw'); endDraw(a);
    });
  }

  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    var vertical = list.getAttribute('aria-orientation') === 'vertical';
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        panel.hidden = !on;
        if (on) replayDraw(panel);
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab); });
      tab.addEventListener('keydown', function (e) {
        var next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (e.key === 'Home') next = -i;
        if (e.key === 'End') next = tabs.length - 1 - i;
        if (next == null) return;
        if (!vertical && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) return;
        e.preventDefault();
        select(tabs[(i + next + tabs.length) % tabs.length], true);
      });
    });
  });

  // Accordions (FAQ + mobile sub-menus)
  $$('[data-acc]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
    });
  });

  // Lightbox (variant cards, portfolio) built on <dialog>
  var lightbox = null, lastTrigger = null;
  function getLightbox() {
    if (lightbox) return lightbox;
    lightbox = document.createElement('dialog');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('aria-labelledby', 'lb-title');
    lightbox.innerHTML =
      '<div class="lb-inner">' +
        '<button class="lb-close" type="button" aria-label="Close"><span></span><span></span></button>' +
        '<div class="lb-media"></div>' +
        '<div class="lb-body"><p class="eyebrow lb-style"></p><h2 class="h3" id="lb-title"></h2><p class="lb-text"></p>' +
        '<div class="btn-row"><a class="btn btn-primary lb-quote" href="quote.html">Quote this design</a>' +
        '<a class="btn btn-secondary lb-style-link" href="#">View style</a></div></div>' +
      '</div>';
    document.body.appendChild(lightbox);
    $('.lb-close', lightbox).addEventListener('click', function () { lightbox.close(); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.close(); });  // backdrop click
    lightbox.addEventListener('close', function () {
      document.body.classList.remove('no-scroll');
      if (lastTrigger) lastTrigger.focus();
    });
    return lightbox;
  }
  function openLightbox(trigger) {
    var s = styleById(trigger.dataset.styleId), v = trigger.dataset.variant, lb = getLightbox();
    lastTrigger = trigger;
    var ph = variantPhoto(s.id, v), img = trigger.dataset.image || (ph ? ph.src : s.image);
    $('.lb-media', lb).innerHTML = mediaFrame(u(img), trigger.dataset.alt || (ph ? ph.alt : s.imageAlt), s.art);
    $('.lb-style', lb).textContent = s.name;
    $('#lb-title', lb).textContent = trigger.dataset.title || (v + ' design');
    $('.lb-text', lb).textContent = trigger.dataset.text || '';
    $('.lb-quote', lb).href = u(quoteUrl(s.id, v));
    var styleLink = $('.lb-style-link', lb);
    styleLink.href = u(s.url);
    styleLink.hidden = PAGE.style === s.id;
    if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
    document.body.classList.add('no-scroll');
  }
  $$('[data-lightbox]').forEach(function (btn) {
    btn.addEventListener('click', function () { openLightbox(btn); });
  });

  // Portfolio filter
  var filterBar = $('[data-render="portfolio-filters"]');
  if (filterBar) {
    var items = $$('.masonry-item'), status = $('[data-filter-status]');
    $$('.filter-btn', filterBar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.dataset.filter, shown = 0;
        $$('.filter-btn', filterBar).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        items.forEach(function (it) {
          var on = f === 'all' || it.dataset.cat === f;
          it.hidden = !on;
          if (on) shown++;
        });
        if (status) status.textContent = 'Showing ' + shown + ' boxes';
      });
    });
  }

  // Blog category filter (featured post shows only under "All")
  var blogBar = $('[data-render="blog-filters"]');
  if (blogBar) {
    var posts = $$('[data-render="blog-grid"] .card'), featured = $('[data-render="blog-featured"]');
    var empty = $('[data-blog-empty]'), firstSlug = D.blog[0].url;
    function applyBlogFilter(f) {
      var shown = 0;
      posts.forEach(function (p) {
        var on = f === 'All' ? p.getAttribute('href').indexOf(firstSlug) === -1 : p.dataset.cat === f;
        p.hidden = !on;
        if (on) shown++;
      });
      if (featured) featured.hidden = f !== 'All';
      if (empty) empty.hidden = shown > 0 || f === 'All';
    }
    $$('.filter-btn', blogBar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        $$('.filter-btn', blogBar).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        applyBlogFilter(btn.dataset.filter);
      });
    });
    applyBlogFilter('All');
  }

  // FAQ live search: while typing, every group is shown and non-matching questions hide
  var faqSearch = $('[data-faq-search]');
  if (faqSearch) {
    var faqWrap = $('[data-render="faq-groups"]'), faqEmpty = $('[data-faq-empty]'), faqCount = $('[data-faq-count]');
    faqSearch.addEventListener('input', function () {
      var q = faqSearch.value.trim().toLowerCase(), total = 0;
      faqWrap.classList.toggle('is-searching', !!q);
      $$('.faq-group', faqWrap).forEach(function (g) {
        var hits = 0;
        $$('.acc-item', g).forEach(function (it) {
          var on = !q || it.textContent.toLowerCase().indexOf(q) !== -1;
          it.hidden = !on;
          if (on) hits++;
        });
        g.hidden = q && !hits;
        total += hits;
      });
      if (faqEmpty) faqEmpty.hidden = !q || total > 0;
      if (faqCount) faqCount.textContent = q ? total + (total === 1 ? ' question matches' : ' questions match') : '';
    });
  }

  /* ===================== 5. MOTION ===================== */
  var hasIO = 'IntersectionObserver' in window;

  // Fade-up on scroll, staggered for items that sit side by side in a grid
  var reveals = $$('.reveal');
  reveals.forEach(function (el) {
    var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains('reveal'); });
    var i = sibs.indexOf(el);
    if (sibs.length > 2 && i > 0) el.style.transitionDelay = Math.min(i, 6) * 70 + 'ms';
  });
  if (hasIO && !reduceMotion) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); revealIO.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { revealIO.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Count-up numbers in the stats row
  var counters = $$('[data-count]');
  function countUp(el) {
    var end = +el.getAttribute('data-count'), start = null, dur = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (hasIO && !reduceMotion) {
    counters.forEach(function (el) { el.textContent = '0'; });
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { countUp(en.target); countIO.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countIO.observe(el); });
  }

  // Hero animation: plays only while on screen and the tab is visible.
  // Reduced motion: no autoplay, controls shown so the visitor can choose.
  // If the browser blocks autoplay (e.g. iPhone Low Power Mode), controls appear.
  var heroVideo = $('.hero-video');
  if (heroVideo) {
    heroVideo.muted = true;   // required for autoplay on mobile
    var heroPlay = function () {
      var p = heroVideo.play();
      if (p && p.catch) p.catch(function () { heroVideo.setAttribute('controls', ''); });
    };
    if (reduceMotion) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
      heroVideo.setAttribute('controls', '');
    } else {
      if (hasIO) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) heroPlay(); else heroVideo.pause(); });
        }, { threshold: 0.15 }).observe(heroVideo);
      } else { heroPlay(); }
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) heroVideo.pause(); else if (heroVideo.getBoundingClientRect().bottom > 0) heroPlay();
      });
    }
  }

  // Videos: play when visible / hovered, click toggles
  $$('.video-card').forEach(function (card) {
    var v = $('video', card), frame = $('.video-frame', card);
    function play() { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    v.addEventListener('playing', function () { card.classList.add('is-playing'); });
    v.addEventListener('pause', function () { card.classList.remove('is-playing'); });
    frame.addEventListener('click', function () { v.paused ? play() : v.pause(); });
    if (!reduceMotion) {
      frame.addEventListener('mouseenter', play);
      if (hasIO) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { en.isIntersecting ? play() : v.pause(); });
        }, { threshold: 0.6 }).observe(v);
      }
    }
  });

  /* ===================== 6. FORMS ===================== */
  var params = new URLSearchParams(window.location.search);

  // Quick quote -> quote.html?style=...&qty=...(&category=...)
  $$('[data-quick-quote]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var p = new URLSearchParams({ style: form.elements.style.value, qty: form.elements.qty.value });
      if (form.elements.category && form.elements.category.value) p.set('category', form.elements.category.value);
      window.location.href = u('quote.html') + '?' + p.toString();
    });
  });

  // Style select -> variant select (sample form)
  $$('select[data-render="style-select"]').forEach(function (sel) {
    var vSel = sel.form && sel.form.querySelector('[data-render="variant-select"]');
    if (!vSel) return;
    sel.addEventListener('change', function () {
      var opt = sel.selectedOptions[0], s = opt ? styleById(opt.getAttribute('data-id')) : null;
      vSel.innerHTML = s
        ? '<option value="">Any / not sure</option>' + s.variants.map(function (v) { return '<option value="' + esc(v) + '">' + esc(v) + '</option>'; }).join('')
        : '<option value="">Choose a style first</option>';
    });
    var st = styleById(params.get('style'));
    if (st) {
      sel.value = st.name; sel.dispatchEvent(new Event('change'));
      if (params.get('variant')) vSel.value = params.get('variant');
    }
  });

  // Length limits on every form field (stops oversized input / abuse; the backend should re-check)
  var MAX_LEN = { text: 120, email: 160, tel: 40, number: 9, textarea: 2000 };
  $$('form[data-form] input, form[data-form] textarea').forEach(function (f) {
    var t = f.tagName === 'TEXTAREA' ? 'textarea' : f.type;
    if (MAX_LEN[t] && !f.hasAttribute('maxlength')) f.setAttribute('maxlength', MAX_LEN[t]);
  });

  /* ---- Quote form: pre-fill (page's box type, then the URL) ---- */
  $$('[data-render="quote-form"]').forEach(function (wrap) {
    var form = $('form', wrap);
    if (!form) return;
    var sel = form.elements.box_type;
    function pickType(styleId) {
      var o = $$('option', sel).filter(function (x) { return x.getAttribute('data-id') === styleId; })[0];
      if (o) sel.value = o.value;
    }
    pickType(params.get('style') || wrap.dataset.style || 'not-sure');
    var band = params.get('qty');
    if (band) {
      var r = $$('input[name="quantity"]', form).filter(function (x) { return x.getAttribute('data-band') === band; })[0];
      if (r) r.checked = true;
    }
    var variant = params.get('variant'), st = styleById(params.get('style'));
    if (variant && st && st.variants.indexOf(variant) !== -1) {
      form.elements.details.value = 'Design I like: ' + variant + ' (' + st.name + ')';
    }
    if (params.get('category')) form.elements.category.value = params.get('category').slice(0, 80);
    initUpload(form);
  });

  /* ---- Reference image upload (front end only: nothing is uploaded until the form is sent) ---- */
  var UPLOAD = { max: 3, maxBytes: 5 * 1024 * 1024, ext: /\.(jpe?g|png|webp|pdf)$/i, types: /^(image\/(jpeg|png|webp)|application\/pdf)$/ };
  function initUpload(form) {
    var input = form.querySelector('input[type="file"]');
    if (!input) return;
    var zone = input.closest('.dropzone'), list = $('.thumbs', form), field = input.closest('.field');
    form._files = [];
    function setErr(msg) { errorEl(input).textContent = msg || ''; }
    function render() {
      list.innerHTML = '';
      form._files.forEach(function (f, i) {
        var li = document.createElement('li');
        li.className = 'thumb';
        if (/^image\//.test(f.type)) {
          var img = document.createElement('img');
          img.alt = ''; img.width = 72; img.height = 72;
          img.src = f._url || (f._url = URL.createObjectURL(f));   // local preview only
          li.appendChild(img);
        } else {
          var ic = document.createElement('span');
          ic.className = 'thumb-file'; ic.setAttribute('aria-hidden', 'true'); ic.textContent = 'PDF';
          li.appendChild(ic);
        }
        var name = document.createElement('span');
        name.className = 'thumb-name'; name.textContent = f.name;
        var rm = document.createElement('button');
        rm.type = 'button'; rm.className = 'thumb-remove'; rm.setAttribute('aria-label', 'Remove ' + f.name); rm.textContent = '×';
        rm.addEventListener('click', function () {
          if (f._url) URL.revokeObjectURL(f._url);
          form._files.splice(i, 1); setErr(''); render(); input.focus();
        });
        li.appendChild(name); li.appendChild(rm);
        list.appendChild(li);
      });
      field.classList.toggle('has-files', form._files.length > 0);
    }
    function add(files) {
      var errs = [];
      Array.prototype.forEach.call(files, function (f) {
        if (form._files.length >= UPLOAD.max) { errs.push('You can add up to 3 files.'); return; }
        if (!UPLOAD.ext.test(f.name) || (f.type && !UPLOAD.types.test(f.type))) { errs.push('"' + f.name + '" is not a JPG, PNG, WEBP or PDF file.'); return; }
        if (f.size > UPLOAD.maxBytes) { errs.push('"' + f.name + '" is larger than 5 MB.'); return; }
        if (form._files.some(function (x) { return x.name === f.name && x.size === f.size; })) return;   // same file twice
        form._files.push(f);
      });
      setErr(errs.filter(function (e, i) { return errs.indexOf(e) === i; }).join(' '));
      render();
    }
    input.addEventListener('change', function () { add(input.files); input.value = ''; });
    ['dragenter', 'dragover'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.add('is-dragging'); });
    });
    ['dragleave', 'dragend', 'drop'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.remove('is-dragging'); });
    });
    zone.addEventListener('drop', function (e) { if (e.dataTransfer && e.dataTransfer.files) add(e.dataTransfer.files); });
    form._resetFiles = function () {
      form._files.forEach(function (f) { if (f._url) URL.revokeObjectURL(f._url); });
    };
  }

  /* ---- Validation (generic: required, email, number min, required radio groups) ---- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function errorEl(field) {
    var wrap = field.closest('.field') || field.parentNode;
    var out = wrap.querySelector('.field-error');
    if (!out) {
      out = document.createElement('p');
      out.className = 'field-error';
      out.id = 'err-' + (field.id || field.name) + '-' + Math.random().toString(36).slice(2, 6);
      out.setAttribute('aria-live', 'polite');
      wrap.appendChild(out);
    }
    var ids = (field.getAttribute('aria-describedby') || '').split(' ');
    if (ids.indexOf(out.id) === -1) field.setAttribute('aria-describedby', (ids.join(' ') + ' ' + out.id).trim());
    return out;
  }
  function validateFields(fields) {
    var firstBad = null, doneRadio = {};
    fields.forEach(function (f) {
      if (f.type === 'hidden' || f.type === 'checkbox' || f.type === 'file' || f.disabled) return;
      var msg = '';
      if (f.type === 'radio') {
        if (!f.required || doneRadio[f.name]) return;
        doneRadio[f.name] = true;
        var group = $$('input[name="' + f.name + '"]', f.form);
        if (!group.some(function (r) { return r.checked; })) msg = f.dataset.msg || 'Please choose an option.';
        errorEl(f).textContent = msg;
        f.closest('.field').classList.toggle('is-invalid', !!msg);
        if (msg && !firstBad) firstBad = f;
        return;
      }
      var v = f.value.trim();
      if (f.required && !v) msg = f.dataset.msg || 'Please fill in this field.';
      else if (v && f.type === 'email' && !EMAIL_RE.test(v)) msg = 'Please check your email address, it looks incomplete.';
      else if (v && f.type === 'number' && f.min !== '' && +v < +f.min) msg = f.dataset.minMsg || ('Please enter at least ' + f.min + '.');
      errorEl(f).textContent = msg;
      f.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (msg && !firstBad) firstBad = f;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }
  // Clear a field's error as soon as it is fixed
  document.addEventListener('input', function (e) {
    var f = e.target;
    if (!f.form || !f.form.hasAttribute('data-form') || f.type === 'file') return;
    var wrap = f.closest('.field'), out = wrap && wrap.querySelector('.field-error');
    if (out && out.textContent) { out.textContent = ''; f.removeAttribute('aria-invalid'); wrap.classList.remove('is-invalid'); }
  });
  document.addEventListener('change', function (e) {
    var f = e.target;
    if (f.type !== 'radio' || !f.form || !f.form.hasAttribute('data-form')) return;
    var wrap = f.closest('.field'), out = wrap && wrap.querySelector('.field-error');
    if (out) { out.textContent = ''; wrap.classList.remove('is-invalid'); }
  });

  /* ---- Submit every form[data-form] through submitForm ---- */
  $$('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form._sending) return;   // no double submits
      if (!validateFields($$('input, select, textarea', form))) return;
      var fd = new FormData(form);
      if (form._files) {
        // BACKEND: the future API receives these as multipart "reference_images" (max 3, 5 MB each) and stores them.
        fd.delete('reference_images');
        form._files.forEach(function (f) { fd.append('reference_images', f, f.name); });
      }
      var btn = form.querySelector('[type="submit"]');
      form._sending = true;
      if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
      submitForm(form.dataset.form, fd).then(function (res) {
        showSuccess(form, res);
      }).catch(function () {
        var out = errorEl(btn);
        out.textContent = 'Sorry, something went wrong. Please try again or message us on WhatsApp.';
      }).then(function () {
        form._sending = false;
        if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); }
      });
    });
  });

  var FIELD_LABELS = {
    full_name: 'Name', email: 'Email', phone: 'WhatsApp / phone', category: 'Packaging for',
    box_type: 'Box type', box_style: 'Box style', variant: 'Design', quantity: 'Quantity',
    size: 'Box size', finishes: 'Finishes', details: 'What I need', notes: 'Notes', country: 'Country'
  };
  var INTRO = {
    quote: D.contact.whatsappText,
    sample: 'Hi Luxora Packaging, I would like to order a sample box.'
  };

  function buildMessage(formType, data) {
    var lines = [INTRO[formType] || D.contact.whatsappText, ''];
    if (data.length || data.width || data.height) {
      data.size = [data.length || '?', data.width || '?', data.height || '?'].join(' × ') + ' ' + (data.unit || '');
    }
    Object.keys(FIELD_LABELS).forEach(function (k) {
      if (data[k]) lines.push(FIELD_LABELS[k] + ': ' + data[k]);
    });
    if (data.files && data.files.length) {
      lines.push('', 'I have ' + data.files.length + ' reference image' + (data.files.length > 1 ? 's' : '') + ' (' + data.files.join(', ') + '). I will attach ' + (data.files.length > 1 ? 'them' : 'it') + ' here.');
    }
    return lines.join('\n');
  }

  /* =====================================================================
     submitForm(formType, formData)
     ---------------------------------------------------------------------
     THE ONLY PLACE where form data leaves the page.
     formType: 'quote' | 'sample'
     formData: every field by name, plus the reference image files under
               "reference_images" (quote form, up to 3 files, 5 MB each).

     FRONT-END PLACEHOLDER (current behaviour): nothing is sent anywhere.
     It returns the cleaned values so the page can show the success box
     and a pre-filled "Send on WhatsApp too" button.

     >>> BACKEND TODO: send formData (multipart, including the files) to the
         API and resolve with the same shape, e.g.
       return fetch('/api/forms/' + formType, { method: 'POST', body: formData })
         .then(function (r) { if (!r.ok) throw new Error('Send failed'); return { ok: true, formType: formType, data: data }; });
     ===================================================================== */
  function submitForm(formType, formData) {
    var data = { files: [] };
    formData.forEach(function (v, k) {
      if (typeof File !== 'undefined' && v instanceof File) {   // files are kept in formData for the backend
        if (v.name && v.size) data.files.push(v.name.slice(0, 120));
        return;
      }
      v = String(v).trim().slice(0, 2000);   // hard cap, even if maxlength was bypassed
      if (!v) return;
      data[k] = data[k] ? data[k] + ', ' + v : v;   // checkboxes with the same name are joined
    });
    return Promise.resolve({ ok: true, formType: formType, data: data });
  }

  /* Success box: replaces the form, shows a summary and a WhatsApp button */
  function showSuccess(form, res) {
    var data = res.data, done = form.parentNode.querySelector('[data-success-for]');
    var wa = waLink(buildMessage(res.formType, data));
    if (done && done.classList.contains('qform-success')) {
      var rows = ['full_name', 'email', 'phone', 'box_type', 'quantity', 'size', 'details'].filter(function (k) { return data[k]; })
        .map(function (k) { return '<div><dt>' + esc(FIELD_LABELS[k]) + '</dt><dd>' + esc(data[k]) + '</dd></div>'; });
      if (data.files.length) rows.push('<div><dt>Reference images</dt><dd>' + data.files.map(esc).join(', ') + '</dd></div>');
      done.innerHTML =
        '<p class="eyebrow">Request received</p>' +
        '<p class="h3">Thank you! Your quote request has been received. We\'ll reply within 24 hours.</p>' +
        '<dl class="qs-summary">' + rows.join('') + '</dl>' +
        (data.files.length
          ? '<div class="callout qs-files"><p>Please also send your reference image on WhatsApp so our team can see it. Tap the button below and attach the image in the chat.</p>' +
            '<a class="btn btn-secondary" href="' + wa + '" target="_blank" rel="noopener">WhatsApp</a></div>'
          : '') +
        '<a class="btn btn-primary qs-wa" href="' + wa + '" target="_blank" rel="noopener">Send on WhatsApp too</a>';
    } else if (done && !done.querySelector('.qs-wa')) {
      done.insertAdjacentHTML('beforeend', '<p><a class="btn btn-primary qs-wa" href="' + wa + '" target="_blank" rel="noopener">Send on WhatsApp too</a></p>');
    }
    if (form._resetFiles) form._resetFiles();
    form.hidden = true;
    if (done) {
      done.hidden = false;
      done.focus({ preventScroll: true });
      done.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }
  }

  // Expose for later pages / backend wiring
  window.Luxora = { submitForm: submitForm, waLink: waLink };

  /* ===================== 7. COOKIE BAR ===================== */
  var COOKIE_KEY = 'luxora_cookie_consent';
  var bar = $('.cookie-bar');
  function readConsent() { try { return localStorage.getItem(COOKIE_KEY); } catch (e) { return null; } }
  function saveConsent(v) { try { localStorage.setItem(COOKIE_KEY, v); } catch (e) { /* storage blocked */ } }
  function loadAnalytics() {
    /* Google Analytics goes here once the site is live (only after "Accept"). */
  }
  if (bar) {
    var consent = readConsent();
    if (!consent) bar.hidden = false;
    else if (consent === 'accepted') loadAnalytics();
    $$('[data-cookie]', bar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-cookie');
        saveConsent(v);
        bar.hidden = true;
        if (v === 'accepted') loadAnalytics();
      });
    });
  }
})();
