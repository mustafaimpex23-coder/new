/* =====================================================================
   Luxora Packaging: line-art illustrations
   ---------------------------------------------------------------------
   Draws the thin white "blueprint" box illustrations as inline SVG.
   Everything is built from simple isometric boxes, so the drawings
   stay crisp at any size. Colours are NEVER written here: each shape
   only gets a class (see "LINE ART" in css/style.css):
     a-face  : face filled with --bg, stroked with --art
     a-face2 : face filled with --surface (inner linings)
     a-o     : face filled with the locked orange
     a-line  : stroke only
     a-grid  : ground grid, stroked with --line
   Usage: LuxoraArt.render('flipTop')  ->  '<svg ...>...</svg>'
   ===================================================================== */
(function () {
  'use strict';

  var COS = 0.8660254;   // cos 30deg
  var SIN = 0.5;         // sin 30deg
  var uid = 0;           // unique ids for clip paths across the page

  /* 3D point [x, y, z] -> 2D isometric screen point */
  function proj(p) {
    return [(p[0] - p[1]) * COS, (p[0] + p[1]) * SIN - p[2]];
  }
  function fmt(n) { return Math.round(n * 10) / 10; }
  function toPoints(pr) { return pr.map(function (q) { return fmt(q[0]) + ',' + fmt(q[1]); }).join(' '); }

  /* Flat rectangles lying on one plane */
  function rectX(x, y0, y1, z0, z1) { return [[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]]; }
  function rectY(y, x0, x1, z0, z1) { return [[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]]; }
  function rectZ(z, x0, x1, y0, y1) { return [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z]]; }

  /* The three visible faces of a box (viewer looks from +x, +y, +z) */
  function faces(x, y, z, w, d, h) {
    return {
      top: rectZ(z + h, x, x + w, y, y + d),
      front: rectY(y + d, x, x + w, z, z + h),   // lower-left face
      side: rectX(x + w, y, y + d, z, z + h)     // lower-right face
    };
  }

  /* ---------- Scene: collects shapes, tracks bounds, outputs SVG ---------- */
  function Scene() {
    this.out = [];
    this.defs = [];
    this.min = [Infinity, Infinity];
    this.max = [-Infinity, -Infinity];
    this.n = 0;
  }

  Scene.prototype.track = function (pr) {
    for (var i = 0; i < pr.length; i++) {
      this.min[0] = Math.min(this.min[0], pr[i][0]);
      this.min[1] = Math.min(this.min[1], pr[i][1]);
      this.max[0] = Math.max(this.max[0], pr[i][0]);
      this.max[1] = Math.max(this.max[1], pr[i][1]);
    }
  };

  /* A filled polygon; --i drives the staggered stroke-draw animation */
  Scene.prototype.poly = function (points, cls, noBounds) {
    var pr = points.map(proj);
    if (!noBounds) this.track(pr);
    this.out.push('<polygon class="' + cls + '" points="' + toPoints(pr) + '" pathLength="1" style="--i:' + (this.n++) + '"/>');
    return this;
  };

  Scene.prototype.line = function (a, b, cls, noBounds) {
    var p = proj(a), q = proj(b);
    if (!noBounds) this.track([p, q]);
    this.out.push('<line class="' + (cls || 'a-line') + '" x1="' + fmt(p[0]) + '" y1="' + fmt(p[1]) +
      '" x2="' + fmt(q[0]) + '" y2="' + fmt(q[1]) + '" pathLength="1" style="--i:' + (this.n++) + '"/>');
    return this;
  };

  /* Draw everything inside fn() clipped to a polygon (used for openings) */
  Scene.prototype.clip = function (points, fn) {
    var id = 'lx-clip-' + (++uid);
    this.defs.push('<clipPath id="' + id + '"><polygon points="' + toPoints(points.map(proj)) + '"/></clipPath>');
    this.out.push('<g clip-path="url(#' + id + ')">');
    fn(this);
    this.out.push('</g>');
    return this;
  };

  /* Closed or open-topped box. o: { top, front, side, open, inner, wall, depth } */
  Scene.prototype.box = function (x, y, z, w, d, h, o) {
    o = o || {};
    var f = faces(x, y, z, w, d, h);
    this.poly(f.front, o.front || 'a-face');
    this.poly(f.side, o.side || 'a-face');
    if (!o.open) {
      this.poly(f.top, o.top || 'a-face');
      return this;
    }
    // Open top: rim, opening, then the two inner walls we can see
    var k = o.wall || 4, dep = o.depth || 14, t = z + h;
    var hole = rectZ(t, x + k, x + w - k, y + k, y + d - k);
    this.poly(f.top, 'a-face');
    this.poly(hole, o.inner || 'a-face2');
    this.clip(hole, function (s) {
      s.poly(rectY(y + k, x + k, x + w - k, t - dep, t), 'a-face', true);
      s.poly(rectX(x + k, y + k, y + d - k, t - dep, t), 'a-face', true);
    });
    return this;
  };

  /* Isometric ground grid (not counted in the bounds) */
  Scene.prototype.ground = function (x0, x1, y0, y1, step) {
    for (var x = x0; x <= x1; x += step) this.line([x, y0, 0], [x, y1, 0], 'a-grid', true);
    for (var y = y0; y <= y1; y += step) this.line([x0, y, 0], [x1, y, 0], 'a-grid', true);
    return this;
  };

  Scene.prototype.svg = function (o) {
    o = o || {};
    var pad = o.pad == null ? 12 : o.pad;
    var minx = this.min[0] - pad, miny = this.min[1] - pad;
    var w = this.max[0] - this.min[0] + pad * 2, h = this.max[1] - this.min[1] + pad * 2;
    if (o.ratio) {                       // grow the view box to a fixed aspect ratio
      if (w / h < o.ratio) { var nw = h * o.ratio; minx -= (nw - w) / 2; w = nw; }
      else { var nh = w / o.ratio; miny -= (nh - h) / 2; h = nh; }
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + [minx, miny, w, h].map(fmt).join(' ') +
      '" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
      '<defs>' + this.defs.join('') + '</defs>' + this.out.join('') + '</svg>';
  };

  /* =================================================================
     BOX DRAWINGS: each takes a scene and an origin (x, y)
     ================================================================= */

  /* Magnetic flip-top box, lid open, perfume bottle in a lined tray */
  function flipTop(s, x, y) {
    var w = 120, d = 90, h = 45;
    s.box(x, y - 6, h, w, 6, d);                                   // lid, flipped up
    s.poly(rectY(y, x + 8, x + w - 8, h + 8, h + d - 8), 'a-face2'); // lid lining
    s.poly(rectY(y, x + 22, x + w - 22, h + d - 20, h + d - 13), 'a-o'); // magnet strip
    s.box(x, y, 0, w, d, h, { open: true, inner: 'a-o', depth: 8 });
    s.box(x + 45, y + 30, h, 30, 30, 46);                           // bottle
    s.box(x + 55, y + 40, h + 46, 10, 10, 6);                       // neck
    s.box(x + 51, y + 36, h + 52, 18, 18, 16);                      // cap
  }

  /* Double-door box, both doors swung open */
  function doubleDoor(s, x, y) {
    var w = 100, d = 90, h = 130, dw = w / 2, k = 6, deep = 60;
    var f = faces(x, y, 0, w, d, h);
    s.poly(f.side, 'a-face');
    s.poly(f.top, 'a-face');
    s.poly(f.front, 'a-face');
    var opening = rectY(y + d, x + k, x + w - k, k, h - k);
    s.poly(opening, 'a-face2');
    s.clip(opening, function (c) {
      c.poly(rectY(y + d - deep, x + k, x + w - k, k, h - k), 'a-face2', true);  // back wall
      c.poly(rectZ(k, x + k, x + w - k, y + d - deep, y + d), 'a-face', true);    // floor
      c.poly(rectX(x + k, y + d - deep, y + d, k, h - k), 'a-face', true);        // inner wall
      c.box(x + 36, y + d - 46, k, 28, 28, 62);                                    // bottle
      c.box(x + 44, y + d - 38, k + 62, 12, 12, 14);                               // cap
    });
    s.box(x - 4, y + d, 0, 4, dw, h, { side: 'a-o' });            // left door (orange inside)
    s.box(x + w, y + d, 0, 4, dw, h);                              // right door
    s.poly(rectX(x + w + 4, y + d + dw - 12, y + d + dw - 8, h / 2 - 16, h / 2 + 16), 'a-face'); // handle
  }

  /* Sliding drawer box, tray pulled half out */
  function drawer(s, x, y) {
    var w = 150, d = 100, h = 46, out = 75;
    s.box(x, y, 0, w, d, h);                                        // sleeve
    s.poly(rectX(x + w, y + 4, y + d - 4, 3, h - 3), 'a-face2');    // sleeve mouth
    s.box(x + w, y + 6, 4, out, d - 12, h - 9, { open: true, inner: 'a-o', depth: 12 });
    s.box(x + w + out, y + d / 2 - 6, h / 2 - 4, 12, 12, 3, { top: 'a-o', front: 'a-o', side: 'a-o' }); // ribbon pull
  }

  /* Two-piece lid & base box, lid lifted */
  function lidBase(s, x, y) {
    var w = 120, d = 120, h = 40;
    s.box(x, y, 0, w, d, h, { open: true, inner: 'a-o', depth: 12 });
    s.poly(rectZ(h - 12, x + 34, x + w - 30, y + 34, y + d - 30), 'a-face2'); // product cut-out
    s.line([x + w, y + d, h + 6], [x + w, y + d, h + 80], 'a-line a-dash');
    s.box(x - 4, y - 4, h + 92, w + 8, d + 8, 24);                // lid
  }

  /* Book-style box, front cover opened flat */
  function book(s, x, y) {
    var w = 110, d = 140, h = 32;
    s.box(x - 126, y, 0, 118, d, 3);                                // front cover lying open
    s.poly(rectZ(3, x - 120, x - 113, y + 22, y + d - 22), 'a-o'); // magnet strip
    s.box(x - 8, y, 0, 8, d, h + 4);                                // spine
    s.box(x, y, 0, w, d, h, { open: true, inner: 'a-o', depth: 10 });
    s.poly(rectZ(h - 10, x + 30, x + w - 26, y + 34, y + d - 30), 'a-face2'); // cut-out
  }

  /* Counter display box with header card and products */
  function display(s, x, y) {
    var w = 170, d = 90, h = 30;
    s.box(x, y, 0, w, 6, 130);                                      // header card
    s.poly(rectY(y + 6, x + 45, x + w - 45, 92, 116), 'a-o');       // logo panel
    s.box(x, y + 6, 0, w, d, h, { open: true, depth: 10 });         // tray
    [[x + 14, 'a-face'], [x + 64, 'a-o'], [x + 114, 'a-face']].forEach(function (p) {
      s.box(p[0], y + 26, 10, 42, 50, 50, { top: p[1] });
    });
    var f = faces(x, y + 6, 0, w, d, h);                              // tray walls in front
    s.poly(f.front, 'a-face');
    s.poly(f.side, 'a-face');
  }

  /* Layered isometric stack for the finishes section */
  function layers(s, variant) {
    var w = 170, d = 170, gap = 34, t = 6, top = gap * 3 + t;
    [[0, 0], [w, 0], [w, d], [0, d]].forEach(function (c) {
      s.line([c[0], c[1], 0], [c[0], c[1], top], 'a-line a-dash');
    });
    for (var i = 0; i < 4; i++) s.box(0, 0, i * gap, w, d, t, { top: i === 3 ? 'a-o' : 'a-face' });
    var z = top, j;
    switch (variant) {
      case 'foil':      // nested frames, like a foiled border and monogram
        s.poly(rectZ(z, 22, w - 22, 22, d - 22), 'a-line');
        s.poly(rectZ(z, 58, w - 58, 58, d - 58), 'a-line');
        break;
      case 'emboss':    // raised panel
        s.box(50, 50, z, 70, 70, 6, { top: 'a-o', front: 'a-o', side: 'a-o' });
        break;
      case 'spotuv':    // grid of glossy squares
        for (j = 0; j < 9; j++) {
          var gx = 26 + (j % 3) * 44, gy = 26 + Math.floor(j / 3) * 44;
          s.poly(rectZ(z, gx, gx + 30, gy, gy + 30), 'a-line');
        }
        break;
      case 'papers':    // texture lines
        for (j = 18; j < d; j += 14) s.line([12, j, z], [w - 12, j, z], 'a-line');
        break;
      case 'inserts':   // cut-out in foam
        s.poly(rectZ(z, 40, w - 40, 40, d - 40), 'a-face');
        s.poly(rectZ(z, 66, w - 66, 66, d - 66), 'a-line');
        break;
      case 'magnets':   // magnet strip and ribbon
        s.poly(rectZ(z, 20, w - 20, d - 30, d - 20), 'a-face');
        s.line([w / 2, 0, z], [w / 2, d, z], 'a-line');
        s.line([w / 2 + 8, 0, z], [w / 2 + 8, d, z], 'a-line');
        break;
    }
  }

  /* 404: an empty open box (orange inner tray) with its lid set down beside it */
  function emptyBox(s, x, y) {
    var w = 140, d = 120, h = 60;
    s.box(x - 30, y - 150, 0, w + 8, d + 8, 20);                    // lid, set down behind
    s.box(x, y, 0, w, d, h, { open: true, inner: 'a-o', depth: 34 });
  }

  var DRAWINGS = { flipTop: flipTop, doubleDoor: doubleDoor, drawer: drawer, lidBase: lidBase, book: book, display: display, emptyBox: emptyBox };

  /* =================================================================
     PUBLIC API
     ================================================================= */
  function render(name, opts) {
    opts = opts || {};
    var s = new Scene();

    if (name === 'hero') {
      s.ground(-60, 640, -360, 160, 40);
      flipTop(s, 0, 0);
      doubleDoor(s, 160, -160);
      drawer(s, 300, -264);
      return s.svg({ ratio: 16 / 9, pad: 30 });
    }
    if (name === 'layers') {
      layers(s, opts.variant);
      return s.svg({ pad: 10 });
    }
    if (DRAWINGS[name]) {
      if (opts.ground) s.ground(-160, 300, -120, 260, 40);
      DRAWINGS[name](s, 0, 0);
      return s.svg({ pad: opts.pad == null ? 10 : opts.pad, ratio: opts.ratio });
    }
    return '';
  }

  window.LuxoraArt = { render: render };
})();
