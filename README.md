# Lucas Bunt's personal website

Work, writing, and hobbies, with an owner workspace at `/admin`.

## Owner workspace

- Sign in with the configured owner username and password.
- Create writings or entries in any hobby category.
- Save drafts, preview, publish updates, unpublish, and delete entries.
- Upload JPG, PNG, WebP, and PDF attachments (10 MB each, up to 20 per entry).
- Add photo descriptions and recipe ingredients, instructions, servings, and time.
- Import recipe text from `.txt` or `.md`; PDF recipes can be attached for download.

Saving a draft does not alter the published snapshot. Draft attachments are private. Publishing makes only that entry's published content and attachments available to readers. The editor detects conflicting saves from another window.

## Runtime

The existing React / Next App Router pages run through Vinext on Cloudflare Workers. Sites provisions D1 (`DB`) for content and sessions, and R2 (`BUCKET`) for files. The former static export cannot provide authenticated editing or uploads; `npm run build` now produces a Worker artifact in `dist`.

The Work page retains its LinkedIn-derived content and optional existing Prisma/Postgres read path. The owner workspace currently manages writing and hobby entries; it does not edit the Work profile.

## Local setup

1. Run `npm ci` and `npm run build`.
2. Apply each pending migration from `drizzle/` in filename order:

   ```sh
   node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_omniscient_sandman.sql
   node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_known_black_knight.sql
   ```

   Apply each only once to that local database. Hosting applies production migrations separately.
3. Create an ignored `.dev.vars` with `OWNER_USERNAME` and `OWNER_PASSWORD_HASH`. Use the same values as your Sites runtime settings; never commit credentials.
4. Run `npm run dev -- --port 3000` and open `http://localhost:3000/admin`.

Login uses a salted PBKDF2-SHA256 password hash (100,000 iterations, supported by Workers Web Crypto). The format is `pbkdf2-sha256$100000$<hex salt>$<hex derived key>`, with the salt's UTF-8 text as the KDF salt. Only the hash is stored in runtime secrets. A changed hash invalidates existing sessions.

Sessions use random 256-bit tokens, stored hashed in D1, with HttpOnly, SameSite=Strict cookies (Secure on HTTPS), a seven-day expiry, and revocation on logout. Mutation endpoints enforce same-origin requests. Failed sign-in attempts are limited to ten per fifteen minutes per connecting IP (or a shared bucket when the trusted IP header is unavailable). There is no public registration or password-reset endpoint; rotate the hash in runtime settings to change the owner's password.

## Validation

- `npx tsc --noEmit`
- `npm run build`
- With the local server running, set `OWNER_TEST_USERNAME` and `OWNER_TEST_PASSWORD` in your shell, then run `node scripts/test-owner.mjs`.

The integration check runs only against localhost, creates and deletes a temporary entry, and tests authorization, draft privacy, file publication, conflicting saves, recipe validation, logout, and login throttling. It intentionally leaves the local login IP throttled for fifteen minutes. Clear local `login_attempts` after testing if you need to sign in immediately. Test image uploads remain in the local R2 store.

## Hosting and GitHub

Reuse the project ID in `.openai/hosting.json`. Configure `OWNER_USERNAME` and secret `OWNER_PASSWORD_HASH` in Sites before publishing the Worker. Never put their values in source code, build artifacts, or the hosting manifest. A GitHub push does not itself deploy this Site.
