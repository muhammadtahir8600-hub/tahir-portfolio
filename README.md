# Muhammad Tahir — SEO + WordPress Portfolio

A complete standalone 12-section, responsive portfolio website built from the supplied visual direction, CV, website screenshots, and real Search Console evidence.

## Run locally

Open `index.html` directly, or (recommended) start a local server from this directory:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000/ . No installation, paid service or build process is required.

## Files

- `index.html` — full 12-section website, semantics, content and SEO metadata
- `styles.css` — design system, layouts, responsive styling and animations
- `script.js` — mobile navigation, filters, case-study tabs, evidence lightbox, modal, progress indicator and contact email-draft workflow
- `assets/` — provided authentic evidence, desktop/mobile website screenshots, portrait, logos and cropped hero artwork
- `docs/Muhammad-Tahir-CV.pdf` — original supplied CV

## Important: hero character

The hero uses a *static, cropped visual* from the approved working-at-the-desk mockup, with a subtle breathing/parallax visual effect. It has **no chair turning**. A real rigged 3D workstation and live typing hands would require separate 3D production assets and have **not** been implemented; the website does not falsely claim that it has a real 3D model.

## Contact form

The project inquiry form validates required inputs and opens the visitor's email application with a pre-filled message addressed to `muhammadtahir8600@gmail.com`. It **does not** send messages server-side. Visitors must press Send in their email client.

To support form submission directly inside the website, connect a form provider or backend endpoint and add proper spam protection and privacy disclosures. Never commit API secrets to frontend files.

## Content and evidence accuracy

- Your Own Rides Search Console data compares the latest three months of the supplied report with the previous three months. The screenshots do not disclose complete date boundaries; no calendar dates were invented.
- The site-wide and page-level metrics are kept separate.
- Performance changes are not attributed exclusively to any one action.
- Four finished website screenshot sets are shown as **final** views, not before/after pairs.
- All eight individual page examples link to the real URLs provided; no fabricated page-level screenshots were generated.
- Experience and tool familiarity are based on the supplied CV.
- The additional tool logos provided but not confirmed in the CV were not presented as verified competencies.

## Before publishing

1. **Confirm you have permission** to display the supplied client screenshots, analytics and branding publicly.
2. Check the factual wording of each project contribution and update it as needed.
3. Connect a direct-submission form backend if you need form submissions without an email application.
4. Add your final portfolio domain to a canonical tag, Open Graph image/URL, sitemap and indexing configuration.
5. Verify phone, WhatsApp, email and LinkedIn details.
6. Test live website links; external websites can change independently.
7. Consider making a custom real 3D rigged workstation in a later phase if you want a true interactive 3D scene.

## Deployment

Upload the contents of this directory (not just the ZIP) to any static website host such as GitHub Pages, Netlify, Cloudflare Pages, or a regular web host's public directory. `index.html` is the site entry point.

This is an editable static website, not a WordPress theme. It can be converted later if required.
