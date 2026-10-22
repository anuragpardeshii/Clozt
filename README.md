# Clozt

Clozt is a React storefront with an Express and MongoDB API. Customers and admins use the same login. The API reads the user's role from MongoDB on every protected request; public registration always creates a customer.

## Run with Docker

1. Copy `.env.example` to `.env`. Set `MONGO_URI` to your MongoDB connection string and `JWT_SECRET` to a long random value. Do not commit `.env`.
2. Run `make up` (or `docker compose up --build -d`). The storefront is at <http://localhost:8080> and the admin app is at <http://localhost:8081>. This default setup uses `MONGO_URI` and does not start a local MongoDB container.
3. Run `make migrate` for an existing database. It migrates legacy admin accounts, backfills customer roles and order item details, creates the checkout, product-review, and coupon indexes, and initializes customer address books.
4. If the database has no legacy admin account, register a normal user and run `make promote-admin EMAIL=you@example.com` from the project root. Sign out and sign in again.

`make logs`, `make build`, and `make down` manage the containers. Local product uploads are kept in a Docker volume. Product uploads use local storage in the Docker development environment. Configure the Cloudinary variables in `.env` for production uploads.

To use a MongoDB container instead, set `MONGO_ROOT_USER`, `MONGO_ROOT_PASSWORD`, `MONGO_APP_USER`, and `MONGO_APP_PASSWORD` in `.env` and run `make up-local`. Use different random passwords (for example, `openssl rand -hex 32`). The local setup uses `compose.local.yaml`, ignores `MONGO_URI`, and keeps MongoDB data in the `mongo_data` volume. Use `make migrate-local`, `make promote-admin-local EMAIL=...`, and `make down-local` for that setup.

## Upgrade an existing Docker database

MongoDB's image creates users only for a new data directory. If the `mongo_data` volume already contains an unauthenticated database, **do not run `make up` with the new configuration first**: MongoDB would enable authentication without creating the configured users.

1. Add `MONGO_ROOT_USER`, `MONGO_ROOT_PASSWORD`, `MONGO_APP_USER`, `MONGO_APP_PASSWORD`, and `MONGO_DB` to the root `.env` as shown in `.env.example`. Use different, random passwords and keep `MONGO_DB=clozt` unless your existing database has another name. Do not restart containers yet.
2. Stop app writes with `docker compose -f compose.yaml -f compose.local.yaml stop api web admin`, keep the old MongoDB container running, and back up its data: `docker compose -f compose.yaml -f compose.local.yaml exec -T mongo mongodump --archive > /secure/path/clozt-before-auth.archive`. Use a private destination with enough free space.
3. While the old MongoDB container is still running without authentication, run `make mongo-auth-bootstrap`. This creates a root user and a `readWrite` application user in the existing database; it does not delete data or change existing passwords.
4. Run `make up-local` to recreate MongoDB and the API with authentication. Check `docker compose -f compose.yaml -f compose.local.yaml ps` and `docker compose -f compose.yaml -f compose.local.yaml logs mongo api`. Never run `docker compose down -v` during the upgrade.

If the database already has users or authentication enabled, do not run the bootstrap command. Use the existing database administrator to create or verify the application user and set matching credentials in `.env` before restarting.
Changing passwords in `.env` later does not rotate database users on an existing volume; change the MongoDB user passwords first.

The MongoDB INFO message `Connection not authenticating` may still appear for a `mongosh` connection even when access control is enabled. Verify security by running `docker compose -f compose.yaml -f compose.local.yaml exec -T mongo mongosh --quiet --eval 'db.getSiblingDB(process.env.MONGO_DB).getCollectionNames()'` without credentials: it must fail with `Unauthorized`. The authenticated healthcheck and API should remain healthy.

## Migrate an existing database

For Docker with an external database, set `MONGO_URI` and run `make migrate`; use `make migrate-local` for local MongoDB. Without Docker, set `MONGO_URI` and run `npm run migrate` from `backend/`. Back up the database first. Each versioned migration is recorded in `app_migrations` and skipped on subsequent runs. Failed migrations can be retried, and the legacy `admins` collection is not deleted.

Legacy admin accounts with no matching user account become admin users with their existing password hash. If an admin email already belongs to a customer user, the migration stops and reports the email without granting access. Verify who owns that account before running `make promote-admin EMAIL=...`. Legacy `adminToken` cookies are no longer used; migrated admins sign in through `/login`.

Existing order items receive a product name and image from the current product record where available. If a product was deleted, its old name cannot be recovered; the migration labels it `Unavailable product`. The migration also creates a unique partial index for new checkout keys without changing older orders that have no key.

## Run without Docker

The API needs `MONGO_URI` and `JWT_SECRET` in `backend/.env`. Start it with `cd backend && npm ci && npm run dev`. Start the storefront with `cd frontend && npm ci && npm run dev` and the admin app with `cd frontend-admin && npm ci && npm run dev`. They use ports 5173 and 5174, and both Vite servers proxy `/api` to `http://localhost:3000`.

The admin app uses the same `/api/users/login` session as the storefront, not a separate admin login. An admin signed in on the same host can follow the storefront Admin link directly. Product and order lists are server-paginated; orders can move through packing, dispatch, shipping, out-for-delivery, and delivery states. The Users page lists customer sign-up and activity dates. Analytics includes a seven-day storefront traffic chart, current active customers (signed-in visits in the last 30 minutes), new sign-ups and sign-ins, plus catalog and order metrics. Traffic events are retained for 180 days without IP addresses, and historical visits before deployment are unavailable. Run `make migrate` (or `npm run migrate` in `backend/`) to create the new indexes. Production navigation defaults to `https://frontend-admin-inky.vercel.app/` from the storefront and `https://clozt.vercel.app/` from admin; `VITE_ADMIN_URL` and `VITE_STOREFRONT_URL` can override these destinations. Local development still uses ports 5174 and 5173. If you already have a root `.env`, add the admin origin to its comma-separated `FRONTEND_ORIGIN` value.

Both frontends use Tailwind CSS. The admin app uses Tailwind utilities for layout and `frontend-admin/src/styles.css` for its brand-specific details.

For deployments with separate frontend and API origins, set `VITE_API_URL` to the API origin when building each frontend, list both frontend origins in `FRONTEND_ORIGIN` on the API, and set `COOKIE_SAME_SITE=none` with `NODE_ENV=production` so the login cookie is sent over HTTPS. If both apps proxy `/api`, leave `VITE_API_URL` empty. For sibling subdomains, set `COOKIE_DOMAIN` to their shared parent domain to share sign-in; unrelated domains cannot share a cookie and require signing in to each app with the same user credentials.

## Free demo deployment

The existing storefront is at <https://clozt.vercel.app/> and its Render API is at <https://clozt-96k1.onrender.com/>. A no-cost demo setup is an Atlas free cluster for MongoDB, one Render Free web service for `backend/`, and a second Vercel project for `frontend-admin/`. Free plans have usage limits; Vercel Hobby is for personal, non-commercial use, so review the host's terms before taking real orders.

1. In Render, create a **Web Service** from this repository on the Free plan. Set the root directory to `backend`, build command to `npm ci`, and start command to `npm start`. Use its HTTPS `onrender.com` URL as the API origin. Render sets `PORT` for the app.
2. Set Render environment variables: `MONGO_URI` (your existing Atlas URI), `JWT_SECRET` (a newly generated long random value), `NODE_ENV=production`, `COOKIE_SAME_SITE=none`, `FRONTEND_ORIGIN=https://clozt.vercel.app,https://frontend-admin-inky.vercel.app`, and the three `CLOUDINARY_*` values for persistent product images. Leave `COOKIE_DOMAIN` unset for the Render domain. Add Render's outbound access to Atlas's IP access list; if the free service has no fixed egress IP, an allow-all entry is a demo-only compromise and must be paired with a strong, dedicated database user.
3. Test `https://clozt-96k1.onrender.com/` and an API route. Back up the existing Atlas database, then run `npm run migrate` locally from `backend/` with the same `MONGO_URI`; Render Free does not provide one-off shell jobs. If necessary, promote an existing user with `npm run promote-admin` and `ADMIN_EMAIL` set locally.
4. Import this repository into a **new Vercel project** with root directory `frontend-admin`. Use Vite's `npm run build` and `dist` output. Set `VITE_STOREFRONT_URL=https://clozt.vercel.app/` in the admin project's Production environment. Leave `VITE_API_URL` unset: `frontend-admin/vercel.json` proxies `/api` to the Render API and handles refreshes on nested routes.
5. In the existing storefront Vercel project, leave `VITE_API_URL` unset and set `VITE_ADMIN_URL=https://frontend-admin-inky.vercel.app/`. Redeploy both Vercel projects so their `/api` rewrites forward to Render. Set both frontend origins in Render's `FRONTEND_ORIGIN` and redeploy its service. Use origins without paths or trailing slashes in `FRONTEND_ORIGIN`.

The admin and storefront share the same account and API. The Vercel `/api` rewrites keep API requests and login cookies on each frontend's own origin, so browser Network panels still show `clozt.vercel.app` or the admin domain while Vercel forwards those requests to Render. Separate Vercel domains cannot share a host-only login cookie, so sign in on each with the same account. Render Free sleeps after inactivity and its filesystem is ephemeral, so Cloudinary and Atlas are required for durable uploads and data.

The API allows `https://clozt.vercel.app` and `https://frontend-admin-inky.vercel.app` by default; add any other exact deployed frontend origins to Render's comma-separated `FRONTEND_ORIGIN` setting. Trailing slashes in that setting are normalized, but `/login` is a path, not part of an origin. Rejected writes return `Origin not allowed` with a request ID; find that ID and the rejected origin in Render logs. Every API response includes an `X-Request-Id` header, and request logs omit query strings, bodies, and cookies. If login still fails after an origin fix, check the response status and request ID in Render logs.

If deploying the API on Vercel instead, set the project's Root Directory to `backend` and its Settings → Build and Deployment → Node.js Version to `24.x` before redeploying; Node.js 18 is no longer supported there. The backend's `vercel.json` selects Vercel's Express preset without legacy build rules. Configure the same API environment variables above and use the Vercel API URL in each frontend's `VITE_API_URL`. Vercel functions cannot persist local uploads, so configure Cloudinary for product images.

### Keep Atlas active

When the API is deployed on Vercel, it is configured to run the protected `/api/internal/mongo-keepalive` route once daily at 03:00 UTC. In that project's **Production** environment variables, set `CRON_SECRET` to a new random value of at least 16 characters (generate one with `openssl rand -hex 32`), then redeploy. Vercel supplies it as a bearer token for the scheduled request. Check **Settings → Cron Jobs** and function logs after deployment; a successful request returns `{"ok":true}`. The endpoint returns an error if the secret is missing, incorrect, or MongoDB cannot be reached. Keep this secret only in the API project, never in a `VITE_*` variable.

This Vercel schedule only runs when the API is deployed on Vercel. If you use the Render setup above instead, configure an external scheduler to send a daily GET to `https://YOUR-API.onrender.com/api/internal/mongo-keepalive` with `Authorization: Bearer <CRON_SECRET>` and set the same secret in Render's environment. Do not put the token in the URL. The Vercel-hosted storefront and admin are static builds and do not need keepalive jobs.

### Environment security

Keep `MONGO_URI`, `JWT_SECRET`, `CRON_SECRET`, Cloudinary credentials, and payment credentials in the API host's private environment variables only. `VITE_*` values are compiled into browser JavaScript, so use them only for public API and site URLs. `.env` and `.env.*` files (except `.env.example`) are ignored by Git and Docker; do not add them with `git add -f`. Give local env files owner-only permissions, such as `chmod 600 .env backend/.env`.

**Important:** Earlier public commits included `backend/.env`. Ignoring it now does not make those historical credentials private. Rotate the Atlas database user password, JWT secret, Cloudinary credentials, and any payment credentials that were present there; update local and hosting environment variables before relying on the deployment. Rotation is necessary even if you later remove the file from Git history.

Checkout currently supports Cash on Delivery. It saves an authenticated order with a server calculated total and displays the order in the customer and admin pages. Customers can manage multiple saved addresses at `/addresses`, choose one default address, select any saved address at checkout, or enter a one-time address. A new checkout address can optionally be saved and made the default. Online payments are not offered.

Admins manage percentage and fixed-amount coupons in the admin app. Coupons can have a minimum bag value, an optional discount cap, an expiration date, and an active state. Customers can browse and apply eligible coupons in the bag; the API rechecks the coupon against the current bag at checkout and saves the discount on the order.

Customers select an available size on the product page before adding to cart. The selected size stays with the cart item and order. Existing cart items created before size selection was introduced have no inferred size; remove and re-add them before checkout. Signed-in customers can leave or update one rating and review per product.

The storefront search opens from the navigation bar and searches the catalog by product name, description, color, or category. Catalog and collection pages fetch 12 products at a time as customers scroll; filtering and sorting run on the API before pagination.
