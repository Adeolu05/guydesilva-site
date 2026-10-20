# guydesilva.com

Static site. No build step: upload the whole folder to any static host
(GitHub Pages, Netlify, Vercel, Cloudflare Pages or cPanel `public_html`).

```
index.html            page markup and copy
css/style.css         all styles
js/main.js            project data, the Three.js hanging signs, carousel, photo grid, viewer, menu
assets/work/full/     photos for the photo viewer (1600px max)
assets/work/wall/     medium photos for the carousel and the hanging signs (1024px max)
assets/work/thumb/    thumbnails for the More work grid (420px max)
assets/vendor/        Three.js 0.160.0, wired up by the import map in index.html (no CDN needed)
CNAME, .nojekyll      GitHub Pages: custom domain, serve files as-is
```

Fonts: Barlow and Barlow Semi Condensed (a typeface drawn from California highway signage), from Google Fonts.
Accent colour: wayfinding yellow #ffcd00 on sign black #111111.

## Local preview

The 3D needs a local server. A double-clicked `index.html` shows a static fallback:

```
npx serve .
```

## Things to confirm before launch

- Name capitalisation: "De Silva" vs "de Silva".
- Optional: a headshot, if Guy wants his photo on the site.

## Adding a project

1. Export each photo three times into `assets/work/full`, `wall` and `thumb`
   (same file name, sizes above).
2. Add an entry to `PROJECTS` at the top of `js/main.js`: title, location, the short label
   for its yellow ID plate (plus `place` if the location is too long for the plate), a description, scope tags, and each photo's file name, pixel size and caption.
   `feature[0]` is the cover photo used in the Featured work carousel.
3. That's it. The carousel, the More work grid and the photo viewer all build from that list.

To change the photos hanging in the hero, edit the `SIGNS` list in `js/main.js`
(`SIGNS_NARROW` picks three of them for phones), and the matching fallback images in `index.html`.
