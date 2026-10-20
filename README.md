# guydesilva.com

Static site. No build step: upload the whole folder to any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages or cPanel `public_html`).

```
index.html            page markup and copy
css/style.css         all styles
js/main.js            project data, Three.js scenes (hero letters, project wall), photo viewer, pinned nav
assets/work/full/     photos for the viewer (1600px max)
assets/work/wall/     smaller copies used as textures on the 3D wall (1024px max)
assets/work/thumb/    thumbnails for the project list (420px max)
assets/guy-portrait.jpg
assets/fonts/bigshoulders-800.typeface.json   3D letter font (Big Shoulders Display, OFL)
assets/vendor/        Three.js and the two add-ons the site uses
CNAME, .nojekyll      GitHub Pages: custom domain, serve files as-is
```

Three.js 0.160.0 is bundled in `assets/vendor/` and wired up by the import map in `index.html`,
so the site has no CDN dependency.

## Local preview

The 3D needs a local server. A double-clicked `index.html` only shows the plain fallback:

```
npx serve .
```

## Things to confirm before launch

- Name capitalisation: "De Silva" vs "de Silva".
- A proper headshot to replace `assets/guy-portrait.jpg` (keep roughly 370 × 540 ratio).

## Adding a project

1. Export each photo three times into `assets/work/full`, `wall` and `thumb`
   (same file name, sizes above).
2. Add an entry to `PROJECTS` at the top of `js/main.js`: title, location, the text on its
   3D name plate, a short description, scope tags, and each photo's file name, pixel size and caption.
   `feature` lists the two or three photos that hang on the 3D wall.
3. That's it. The wall, caption card, project list and photo viewer all build from that list.
