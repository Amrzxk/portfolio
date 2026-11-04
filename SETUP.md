# Setup guide: from repo to live site ($0)

This takes about 20–30 minutes, done once. After that you edit everything at **`https://amr.<your-subdomain>.workers.dev/admin`**.

| # | Step | Where | Time |
|---|------|-------|------|
| 1 | Create a Cloudflare account | dash.cloudflare.com | 3 min |
| 2 | Deploy the site on Cloudflare (Workers + Git) | Cloudflare dashboard | 5 min |
| 3 | Admin login: deploy the auth Worker + GitHub OAuth App | Cloudflare + GitHub | 10 min |
| 4 | Point the config at your real URLs | Admin panel / repo | 2 min |
| 5 | Contact form → Gmail (Google Apps Script) | Google Sheets | 7 min |

---

## 1. Create a Cloudflare account (free, no card)

1. Go to **https://dash.cloudflare.com/sign-up**.
2. Enter your email and a password, then verify the email Cloudflare sends you.
3. If it asks you to add a domain or pick a plan, skip it. You don't need a domain; you get a free `*.workers.dev` address.

## 2. Deploy the site (Cloudflare Workers + Git)

The repo includes `wrangler.jsonc`, which tells Cloudflare to serve the built `dist/` folder as a static site.

1. In the dashboard, open **Workers & Pages → Create application → Import a repository**.
2. Click **Connect GitHub**, sign in, and allow Cloudflare access to the **`Amrzxk/portfolio`** repository.
3. On **Set up your application**, keep these values:
   - **Project name:** `amr`. It **must match** `"name"` in `wrangler.jsonc`. If you pick another name, change that file too.
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Advanced settings:** leave Path `/` and *Create new token* as they are. No variables are needed.
4. Click **Deploy**. The first build takes about 1–2 minutes. Your site is then live at `https://amr.<your-subdomain>.workers.dev`, shown on the project page.

From now on, every commit to `main`, including every save in the admin panel, rebuilds and redeploys automatically. If a build ever fails (for example a required field was left empty), Cloudflare keeps serving the last working version, and the error shows under **Deployments**.

## 3. Admin login ("Sign in with GitHub")

The admin panel (Sveltia CMS) saves content by committing to your GitHub repo. GitHub login needs a tiny OAuth helper. It runs as a free Cloudflare Worker.

### 3a. Deploy the auth Worker

**Easiest:** open **https://github.com/sveltia/sveltia-cms-auth** and click **Deploy to Cloudflare**. Follow the prompts and keep the default name `sveltia-cms-auth`.

**Or from this computer** (Claude can do this for you):

```bash
npx wrangler login
git clone https://github.com/sveltia/sveltia-cms-auth ../sveltia-cms-auth
cd ../sveltia-cms-auth && npm install && npx wrangler deploy
```

Note the Worker URL it prints, e.g. `https://sveltia-cms-auth.<your-subdomain>.workers.dev`.

### 3b. Register a GitHub OAuth App

1. Go to **https://github.com/settings/developers → OAuth Apps → New OAuth App**.
2. Fill in:
   - **Application name:** `Portfolio CMS`
   - **Homepage URL:** your site URL, e.g. `https://amr.<your-subdomain>.workers.dev`
   - **Authorization callback URL:** `https://sveltia-cms-auth.<your-subdomain>.workers.dev/callback`
3. Click **Register application**, copy the **Client ID**, then **Generate a new client secret** and copy it too.

### 3c. Give the Worker the secrets

Cloudflare dashboard → **Workers & Pages → sveltia-cms-auth → Settings → Variables and Secrets** → add:

| Name | Value | Type |
|---|---|---|
| `GITHUB_CLIENT_ID` | the Client ID | Text |
| `GITHUB_CLIENT_SECRET` | the client secret | **Secret** |
| `ALLOWED_DOMAINS` | `amr.<your-subdomain>.workers.dev` (your site's domain) | Text |

Save and redeploy if asked.

## 4. Point the config at your real URLs

Edit **`public/admin/config.yml`**: replace `CHANGE-ME` in `base_url` with your Worker subdomain, and set `site_url` / `display_url` to your site URL. Commit and push. Claude can do this as soon as you share the two URLs.

Then open `https://amr.<your-subdomain>.workers.dev/admin`, click **Sign In with GitHub**, approve, and you're in. Go to **Site settings → General** and set **Site URL** to the same site URL (used for SEO, sitemap and RSS).

> **Fallback:** the login screen also offers **Sign In with Token**. A [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new) with *Contents: Read and write* on `Amrzxk/portfolio` works without the Worker.

## 5. Contact form → your Gmail (Google Apps Script)

1. Signed in to the Google account whose Gmail should receive messages, open **https://sheets.new**. Name the sheet `Portfolio messages`.
2. **Extensions → Apps Script.** Delete the sample code and paste the full contents of **`apps-script/Code.gs`** from this repo. Click **Save** (💾).
3. In the function dropdown pick **`testSetup`** → **Run**. Google asks for permission:
   **Review permissions → choose your account → Advanced → Go to … (unsafe) → Allow.**
   (It says "unsafe" only because you wrote the script yourself and Google hasn't reviewed it.)
   You should get a test email in Gmail, and a `Messages` tab appears in the sheet.
4. **Deploy → New deployment →** ⚙️ **Web app**:
   - **Execute as:** *Me*
   - **Who has access:** *Anyone*
   → **Deploy**, then copy the **Web app URL** (ends in `/exec`).
5. In the admin panel: **Page sections → Contact → Form endpoint**, paste the URL, **Save**. After the rebuild, send yourself a message from the live site.

> Changing the script later? Use **Deploy → Manage deployments → ✏️ → Version: New version**. That keeps the same URL. A *new deployment* creates a new URL.

---

## Day-to-day editing

| I want to… | In the admin go to… |
|---|---|
| Change name, colours, SEO, social links | ⚙️ Site settings → General |
| Reorder / hide sections | ⚙️ Site settings → Sections (drag items, untick *Visible*) |
| Edit hero text, story chapters, stats | 📄 Page sections → Hero & story |
| Update bio / photo | 📄 Page sections → About |
| Add a skill, change levels | 📄 Page sections → Skills |
| Add a job / certification | 📄 Page sections → Experience / Certifications |
| Replace résumé PDF | 📄 Page sections → Résumé → upload a file |
| Add a project or blog post | 🚀 Projects / ✍️ Blog → New |

Changes go live about 1 minute after you click **Save**.

## Optional: custom domain

Cloudflare → your project → Settings → Domains & Routes → **Custom domains → Set up a domain**. Domains cost money from a registrar, but the hosting stays free. Afterwards, update the Site URL in admin and `ALLOWED_DOMAINS` on the Worker.

## Free-tier limits (plenty for a portfolio)

- **Cloudflare Workers (site):** static-asset requests are free and unlimited, and Workers Builds includes 3,000 build minutes/month.
- **Cloudflare Workers (auth):** 100,000 requests/day.
- **GitHub:** public repo, unlimited.
- **Apps Script:** ~100 emails/day.

## Troubleshooting

- **Build failed after an edit.** Open Cloudflare → your project → Deployments → the failed build log. The error names the file and field, e.g. `Invalid content in content/pages/skills.json: domains.0.skills.2.level`.
- **"Sign In with GitHub" popup errors.** Check the callback URL ends in `/callback`, `ALLOWED_DOMAINS` matches your site's domain exactly, and `base_url` in `config.yml` is the Worker URL.
- **Form says "could not be sent".** Open the `/exec` URL in a browser. It should show `{"ok":true,…}`. If not, re-check that the deployment has *Who has access: Anyone*.
