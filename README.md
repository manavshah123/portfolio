# Manav Shah — Portfolio

React + Vite portfolio site.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5180
```

## Edit content
All text (projects, skills, education, links) lives in `src/data.js`.
Colors and fonts are CSS variables at the top of `src/styles.css`.

## Deploy
```bash
npm run build      # outputs static, prerendered files to dist/
```
Drop `dist/` on Netlify, Vercel, or GitHub Pages (the build uses relative paths, so it works from a subfolder too).

## Analytics (Umami, free)

[Umami Cloud](https://cloud.umami.is) counts visits and key clicks. The free **Hobby** plan is enough for this site, and Umami uses no cookies, so no consent banner is needed.

The code is already in place. Until a Website ID is set, nothing is loaded and nothing is tracked. Local `npm run dev` is never tracked.

### Set up (once the site is live)

1. Deploy the site first (see **Deploy**). Umami can only count visits on a public URL.
2. Sign up at https://cloud.umami.is and pick the **Hobby** (free) plan.
3. **Add website**: enter a name and the live domain (e.g. `manav-shah.netlify.app`), then save.
4. Open the website's settings and copy its **Website ID** (looks like `a1b2c3d4-...`).
5. Give the ID to the build:
   - **Netlify / Vercel** (they build on their servers): add an environment variable
     `VITE_UMAMI_WEBSITE_ID` = your ID in the site settings, then redeploy.
   - **Building on your machine** (e.g. GitHub Pages): copy `.env.example` to `.env.local`,
     fill in the ID, run `npm run build`, and upload `dist/`. `.env.local` is git-ignored.
6. Check: open the live site, click around, download the resume. Within a minute the Umami
   dashboard should show the visit and a `resume-download` event.

### What gets tracked

| Event | Fired when someone… |
|---|---|
| page view | opens the site (automatic) |
| `resume-download` | clicks **Download resume** |
| `email-hero` / `email-contact` | clicks the email button or the email address in the footer |
| `email-copy` | clicks **Copy email** |
| `linkedin-click` / `github-click` | opens your LinkedIn or GitHub from the footer |
| `repo-click` (property `project`) | opens a side project's GitHub repo |

To track another link or button, add `data-umami-event="some-name"` to it in `src/App.jsx`.

### How it works

`vite.config.js` has a small `umami` plugin. On `npm run build`, if `VITE_UMAMI_WEBSITE_ID` is set, it adds
`<script defer src="https://cloud.umami.is/script.js" data-website-id="...">` to the page head.
Clicks are tracked through the `data-umami-event` attributes in `src/App.jsx`.

### Turn it off

Remove the `VITE_UMAMI_WEBSITE_ID` variable (or empty it) and rebuild.
