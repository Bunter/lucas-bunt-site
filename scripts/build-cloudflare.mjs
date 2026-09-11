// Use account-owned resources for a direct Cloudflare deployment.
process.env.CLOUDFLARE_DEPLOY = "1";
process.argv = [process.execPath, new URL('./run-framework.mjs', import.meta.url).pathname, 'build'];
await import('./run-framework.mjs');
