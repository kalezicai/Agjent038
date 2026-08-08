/// <reference types="@cloudflare/workers-types" />

export interface Env {
  RETELL_API_KEY: string;
  RETELL_AGENT_ID: string;
  DEMO_QUOTA: KVNamespace;
  ALLOWED_ORIGINS?: string;
  MAX_CALLS_PER_IP?: string;
  QUOTA_WINDOW_HOURS?: string;
}

const RETELL_ENDPOINT = "https://api.retellai.com/v2/create-web-call";
const DEFAULT_LIMIT = 3;
const DEFAULT_WINDOW_HOURS = 24;

type Ctx = {
  env: Env;
  corsOrigin: string | null;
  limit: number;
  windowMs: number;
};

function jsonResponse(data: unknown, status: number, ctx: Ctx): Response {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (ctx.corsOrigin) {
    headers["Access-Control-Allow-Origin"] = ctx.corsOrigin;
    headers["Vary"] = "Origin";
  }
  return new Response(JSON.stringify(data), { status, headers });
}

function optionsResponse(ctx: Ctx): Response {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
  if (ctx.corsOrigin) {
    headers["Access-Control-Allow-Origin"] = ctx.corsOrigin;
    headers["Vary"] = "Origin";
  }
  return new Response(null, { status: 204, headers });
}

async function readCalls(ctx: Ctx, key: string): Promise<string[]> {
  const raw = await ctx.env.DEMO_QUOTA.get(key);
  let calls: string[] = [];
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        calls = parsed.filter((t): t is string => typeof t === "string");
      }
    } catch {
      calls = [];
    }
  }
  return calls.filter((t) => Date.now() - Number(t) < ctx.windowMs);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const allowed = (env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const corsOrigin = allowed.length === 0 || (origin !== "" && allowed.includes(origin)) ? origin : null;

    const ctx: Ctx = {
      env,
      corsOrigin,
      limit: Number(env.MAX_CALLS_PER_IP ?? "") || DEFAULT_LIMIT,
      windowMs: (Number(env.QUOTA_WINDOW_HOURS ?? "") || DEFAULT_WINDOW_HOURS) * 3_600_000,
    };

    const url = new URL(request.url);
    const isStatus = url.pathname === "/api/demo/status";
    const isToken = url.pathname === "/api/demo/token";
    if (!isStatus && !isToken) {
      return jsonResponse({ error: "Not found" }, 404, ctx);
    }

    if (request.method === "OPTIONS") {
      return optionsResponse(ctx);
    }
    if (!isStatus && request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, ctx);
    }

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const key = `quota:${ip}`;
    const calls = await readCalls(ctx, key);

    if (isStatus) {
      return jsonResponse(
        {
          remaining: Math.max(0, ctx.limit - calls.length),
          limit: ctx.limit,
          windowHours: Math.round(ctx.windowMs / 3_600_000),
        },
        200,
        ctx,
      );
    }

    if (calls.length >= ctx.limit) {
      return jsonResponse({ error: "quota_exceeded", remaining: 0, limit: ctx.limit }, 429, ctx);
    }

    const retellResponse = await fetch(RETELL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: env.RETELL_AGENT_ID,
        metadata: { source: "agjent038-hero-demo", ip },
      }),
    });

    if (!retellResponse.ok) {
      const detail = await retellResponse.text();
      return jsonResponse({ error: "retell_failed", detail: detail.slice(0, 200) }, 502, ctx);
    }

    const data = (await retellResponse.json()) as { access_token?: string };
    if (!data.access_token) {
      return jsonResponse({ error: "retell_no_token" }, 502, ctx);
    }

    calls.push(String(Date.now()));
    await env.DEMO_QUOTA.put(key, JSON.stringify(calls));

    return jsonResponse(
      { accessToken: data.access_token, remaining: Math.max(0, ctx.limit - calls.length), limit: ctx.limit },
      200,
      ctx,
    );
  },
};

export default worker;
