// Public base URL of the deployed site, used for SEO (robots, sitemap, OG tags).
// Set NEXT_PUBLIC_SITE_URL on Render to your live URL (e.g. your custom domain).
// Falls back to the default Render URL for this service.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://phorlearn-app.onrender.com"
).replace(/\/+$/, "");
