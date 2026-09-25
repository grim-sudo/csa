// Serverless handler for contact / booking enquiries.
//
// Runs on Vercel as POST /api/enquiry and, in local dev, is mounted by the
// Vite plugin in vite.config.js — the same code path in both environments.
//
// The Resend API key is read from the server environment (RESEND_API_KEY) and
// never reaches the browser. Never hard-code it here.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTEREST_LABELS = {
  football: "Football club",
  party: "Birthday party",
  school: "School clubs (coming soon)",
  camp: "Holiday camps (coming soon)",
};

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

// Read + JSON-parse the request body in a way that works under both the Vercel
// Node runtime (which may pre-parse req.body) and Vite's connect dev server.
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
}

// Escape values before dropping them into the HTML email body.
function esc(v) {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return sendJson(res, 500, { error: "Email service is not configured." });
  }

  let data;
  try {
    data = await readBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid request body." });
  }

  const name = String(data["parent-name"] || "").trim();
  const email = String(data.email || "").trim();
  const phone = String(data.phone || "").trim();
  const childAge = String(data["child-age"] || "").trim();
  const interest = String(data.interest || "").trim();
  const message = String(data.message || "").trim();

  // Server-side validation — never trust the client alone.
  if (!name) return sendJson(res, 400, { error: "Please enter your name." });
  if (!EMAIL_RE.test(email)) return sendJson(res, 400, { error: "Please enter a valid email." });

  const interestLabel = INTEREST_LABELS[interest] || interest || "Not specified";
  const to = process.env.ENQUIRY_TO || "hello@championsportactivities.co.uk";
  const from = process.env.RESEND_FROM || "Champion Sport Activities <onboarding@resend.dev>";

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Child's age", childAge || "—"],
    ["Interested in", interestLabel],
  ]
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`)
    .join("");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#071a3d">
      <h2 style="margin:0 0 12px">New enquiry — Champion Sport Activities</h2>
      <table style="border-collapse:collapse;font-size:15px">${rows}</table>
      ${message ? `<p style="margin:16px 0 4px;font-weight:600">Message</p><p style="white-space:pre-wrap;margin:0">${esc(message)}</p>` : ""}
    </div>`;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New enquiry from ${name} — ${interestLabel}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error("Resend error", resendRes.status, detail);
      return sendJson(res, 502, { error: "We couldn't send your enquiry. Please try again or email us directly." });
    }

    return sendJson(res, 200, { ok: true });
  } catch (err) {
    console.error("Enquiry send failed", err);
    return sendJson(res, 502, { error: "We couldn't send your enquiry. Please try again or email us directly." });
  }
}
