# Portfolio site

A single-page portfolio in plain HTML, CSS and JavaScript. There's no framework, no build step and nothing to install. All your content lives in one file.

```
site/
├── index.html          Page structure (you rarely need to touch this)
├── README.md           This file
└── assets/
    ├── config.js       ← YOUR CONTENT: edit this file
    ├── main.js         Rendering, animations, tabs, carousels, contact form
    ├── styles.css      Colors, fonts, layout
    ├── resume.pdf      ← add your résumé here
    └── img/
        ├── favicon.svg Browser-tab icon
        ├── me.jpg      ← add your headshot (portrait, about 5:7)
        ├── og-image.jpg← optional 1200×630 image for link previews
        └── …           ← project screenshots
```

---

## 1. Edit your content

Open `assets/config.js` and replace everything in `[brackets]`.

| Field | What to put |
|---|---|
| `name`, `brand` | Full name, and the wordmark shown top-left ("gagandeep.") |
| `photo` | `"assets/img/me.jpg"`, or `""` to show your initials |
| `rotating` | The phrases typed out under "hello there!" |
| `intro` | Your summary paragraph. `<b>…</b>` makes words bold. |
| `email`, `linkedin`, `github`, `trailhead` | Your links. Set one to `""` to hide its button. |
| `resume` | Already points to `assets/resume.pdf`. Just add the file. |
| `education`, `experience`, `partTime` | One `{ … }` block per entry. Copy a block to add another. |
| `skills` | Six cards. `icon` can be `code`, `cloud`, `bolt`, `link`, `db` or `tools`. |
| `certs` | `arch: true` highlights a credential in blue. |
| `development` | Project cards. `image` is a screenshot path, `link` is a live URL (`""` hides the button). |
| `design` | Carousels. `images` is a list of screenshot paths. |
| `recommendations` | Quotes with the person's name, title and company. |
| `formEndpoint` | Your Formspree URL. See step 3. |

**Editing tips**
- Keep the quotes, commas and brackets intact. If the page goes blank after an edit, a missing comma or quote is almost always the cause. In the browser, press F12 and open the Console tab; it shows the line number.
- An apostrophe inside double quotes is fine, e.g. `"I've built…"`. A double quote inside text needs a backslash: `\"`.
- Images: put them in `assets/img/`, then reference them as `"assets/img/name.jpg"`. Use screenshots about 1600px wide. For project cards, a 16:9 ratio fits without cropping.

## 2. Preview on your computer

Double-click `index.html` to open it in your browser. That's enough to check content.

To test exactly how the live site behaves, run a local server from the `site` folder:

```bash
cd site
python3 -m http.server 8000
# then open http://localhost:8000
```

## 3. Make the contact form deliver to your inbox

Visitors can **send a message** or **send an interview invite** (a date/time picker plus length, in their own timezone).

**Default: FormSubmit (no account needed).** With `formEndpoint` left empty, submissions go to the `email` in `config.js` through https://formsubmit.co.
1. Deploy the site (step 4) and send yourself a test message from the live site.
2. FormSubmit emails you an **activation link** the first time. Click it once. Every later submission arrives in your inbox with the reply-to set to the sender.

**Optional: Formspree.** If you'd rather use Formspree, create a form at https://formspree.io and paste its endpoint into `config.js` (`formEndpoint: "https://formspree.io/f/abcdwxyz"`). It takes priority over FormSubmit.

**Interview invites.** The email you receive includes the proposed time and an `add_to_my_calendar` link. It opens a Google Calendar event with the sender already added as a guest, so saving it sends them a real invite. After sending, the visitor also gets **Google Calendar** and **Outlook / Apple (.ics)** buttons that add the event with you as a guest, so you receive a calendar invite from their side too.

**If delivery fails** (not activated yet, offline, or the service is down), visitors aren't stuck. The form shows their message with an **open in email app** button and a **copy** button, addressed to your email, plus the calendar buttons for invites.

## 4. Deploy

Pick one. All three are free and give you HTTPS.

### Option A: GitHub Pages (recommended)
It keeps a version history, and every edit you push goes live in about a minute.

1. Create a GitHub account if you don't have one.
2. Create a new **public** repository.
   - Name it `<your-username>.github.io` and the site will live at `https://<your-username>.github.io`.
   - Any other name, like `portfolio`, gives `https://<your-username>.github.io/portfolio`.
3. Upload the **contents** of the `site` folder, so that `index.html` sits at the top level of the repo, not inside a subfolder. You can do this either way:
   - **In the browser:** click **Add file → Upload files**, drag everything in, then click **Commit changes**.
   - **From the terminal:**
     ```bash
     cd site
     git init
     git add .
     git commit -m "Portfolio site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```
4. In the repo, go to **Settings → Pages**.
   - Under **Build and deployment**, set Source to **Deploy from a branch**.
   - Pick branch `main`, folder `/ (root)`, and click **Save**.
5. Wait a minute or two, then refresh that settings page. It shows your live URL.

**To update later:** edit `config.js` (the pencil icon on GitHub works) and commit. The site redeploys automatically.

### Option B: Netlify Drop (fastest, about 2 minutes)
1. Go to https://app.netlify.com/drop and sign in.
2. Drag the whole `site` folder onto the page. It's live immediately at a `*.netlify.app` address.
3. Under **Site configuration → Change site name**, pick a readable address.
4. **To update:** open the site in Netlify, go to **Deploys**, and drag the folder in again.

### Option C: Vercel
1. Push the folder to GitHub as in Option A, steps 1–3.
2. At https://vercel.com, click **Add New → Project**, import the repo and click **Deploy**. Don't change any settings.
3. Every push to `main` redeploys automatically.

## 5. Optional: use your own domain

A domain like `gagandeep.dev` looks more polished on a résumé. It costs about $10–15 a year from Cloudflare Registrar, Namecheap or Porkbun.

- **GitHub Pages:** go to **Settings → Pages → Custom domain**, enter the domain and save. Then add the DNS records GitHub lists at your registrar: four `A` records for the bare domain, and a `CNAME` for `www` pointing to `<your-username>.github.io`. Tick **Enforce HTTPS** once it becomes available, which can take up to a day.
- **Netlify / Vercel:** go to **Domains → Add domain** and follow the DNS instructions shown there.

After the domain works, update the two `your-domain.com` lines in `index.html` (`og:url` and `og:image`), so LinkedIn previews show the right link and image.

## 6. After it's live

- **Test the site:**
  - Send yourself a message and an interview invite.
  - Open the site on your phone.
  - Paste the link into a LinkedIn draft to check the preview.
- **Put the link everywhere:**
  - LinkedIn → **Contact info → Website**, and a **Featured** link
  - the header of your résumé
  - your email signature
  - your GitHub profile and Trailhead profile
- **Optional analytics:** Cloudflare Web Analytics and GoatCounter are free and cookie-free. Paste their snippet just before `</body>` in `index.html`.

## Customizing the look

- **Colors:** in `assets/styles.css`, the `:root { … }` block at the top holds the light theme. The two blocks after it hold the dark theme. `--accent` is the blue, and `--warm` is the copper used for the timeline dots and skill icons.
- **Fonts:** Sora (headings), Figtree (text) and JetBrains Mono (labels). They load from Google Fonts in `index.html`.
- **Section order:** each section is a `<section>` block in `index.html`. Move a whole block to reorder.
- **Nav links:** these are in the `<nav>` in `index.html`. A link's `href="#id"` must match the section's `id`.
