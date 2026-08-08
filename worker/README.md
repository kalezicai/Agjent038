# Agjent038 demo-call worker

Cloudflare Worker that mints one-time Retell call tokens for the hero demo on the
Agjent038 static site and enforces the free-trial quota (default: **3 calls per IP
in a rolling 24h window**) using Cloudflare KV.

Endpoints:

- `GET  /api/demo/status` → `{ remaining, limit, windowHours }`
- `POST /api/demo/token` → `{ accessToken, remaining, limit }` (429 `quota_exceeded` when out of calls)

The Retell API key and agent ID never leave this worker.

## Deploy

```bash
cd worker
npm install
npx wrangler kv namespace create DEMO_QUOTA
# copy the printed "id" into wrangler.jsonc -> kv_namespaces[0].id

npx wrangler secret put RETELL_API_KEY
# paste the Retell API key (key_...)

npx wrangler secret put RETELL_AGENT_ID
# paste the agent id (agent_4058db34113e9f533fc912e4ef)

npx wrangler deploy
# note the printed https://<name>.<account>.workers.dev URL
```

> Note: `wrangler.jsonc` pins `account_id` (5b8aaa7b1e23843535f08ee0707146e1). If your
> Cloudflare account changes, update it — wrangler may otherwise target a stale
> account stored elsewhere on the machine and fail with `Authentication error [code: 10000]`.

## Wire up the static site

1. In the Render dashboard, add a build-time environment variable:
   `NEXT_PUBLIC_DEMO_WORKER_URL=https://<name>.<account>.workers.dev`
   (or a custom domain like `https://demo.agjent038.com` — add it under
   Cloudflare → Workers → your worker → Settings → Domains & Routes).
2. Redeploy the Render static site. The hero orb will now start live calls.

## Config

| Var | Default | Meaning |
| --- | --- | --- |
| `MAX_CALLS_PER_IP` | `3` | Max calls per IP inside the window |
| `QUOTA_WINDOW_HOURS` | `24` | Rolling window length |
| `ALLOWED_ORIGINS` | empty | Comma-separated allowed origins (empty = allow any) |

## Notes

- Quota is stored as a timestamp list per IP in KV; reads/writes are not
  atomic, so a user spamming parallel requests could theoretically squeeze in
  an extra call or two. Acceptable for a demo; if it ever matters, move the
  counter to D1 with an atomic increment.
- The 2-minute talk limit is enforced client-side (auto-hangup after 120s).
