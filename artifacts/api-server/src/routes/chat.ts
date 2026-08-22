import { Router, type IRouter } from "express";
import { z } from "zod";

const router: IRouter = Router();

// ═══════════════════════════════════════════════════════════════
//  PLACEHOLDERS — search this file for "PLACEHOLDER" to fill in
// ═══════════════════════════════════════════════════════════════
const GYM_ADDRESS =
  "[PLACEHOLDER: e.g. Near Bus Stand, Main Market, Pundri, Haryana 136026]";

const MEMBERSHIP_PLANS = `\
- Basic Monthly  : [PLACEHOLDER: e.g. ₹800/month]
- Premium Monthly: [PLACEHOLDER: e.g. ₹1200/month — includes personal guidance]
- Quarterly Plan : [PLACEHOLDER: e.g. ₹2100 for 3 months]
- Annual Plan    : [PLACEHOLDER: e.g. ₹7000/year — best value]
- Personal Training (per session): [PLACEHOLDER: e.g. ₹500/session]`;

const CLASS_SCHEDULE = `\
- Strength Training (open gym) : Everyday 5:00 AM – 10:00 PM
- CrossFit / Functional        : Mon, Wed, Fri — 6:00 PM – 8:00 PM
- Zumba & Dance                : [PLACEHOLDER: e.g. Tue & Thu 7:00 PM – 8:00 PM]
- Personal Training            : [PLACEHOLDER: e.g. By appointment, call 7206060744]`;
// ═══════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `You are the friendly AI assistant for Fitness Temple The Gym, Pundri, Haryana, India.

GYM OVERVIEW:
Fitness Temple is a premium, high-energy gym known for its dark motivating atmosphere,
professional Fitline-brand equipment, and strong community. Top-rated gym in Pundri —
4.7 stars, 130+ Google reviews, 500+ members, 5+ years active.

GYM DETAILS:
- Name    : Fitness Temple The Gym
- Tagline : "Unleash Your Inner Power" / "Step into the darkness, forge your best self"
- Address : ${GYM_ADDRESS}
- Phone   : 7206060744
- Email   : krrishai0916@gmail.com
- Hours   : Mon–Sat 5:00 AM – 10:00 PM | Sunday: CLOSED
- Owner & Head Trainer: Vikas Saini

PROGRAMS:
1. Strength Training – Free weights up to 50 kg, squat racks, Smith machines, isolation machines, Fitline premium equipment.
2. CrossFit / Functional – Kettlebells, plyo boxes, battle ropes, tire flips, sleds, HIIT circuits.
3. Zumba & Dance – Fun cardio group classes; burns calories to rhythm; all fitness levels welcome.
4. Personal Training – 1-on-1 with Vikas Saini; custom program + diet plan included.
5. Cardio Zone – Dedicated cardio equipment.

CLASS SCHEDULE:
${CLASS_SCHEDULE}

MEMBERSHIP PLANS:
${MEMBERSHIP_PLANS}
(For confirmed pricing always suggest calling 7206060744 or visiting the Membership page.)

WEBSITE SECTIONS — use this for "tour" requests:
• Home (/)           : Hero "Unleash Your Inner Power", stats bar, 3 program teasers, Vikas Saini trainer preview, member testimonials carousel, CTA "Ready to Commit?".
• Programs (/programs): Full detail — features, images, schedules for Strength, CrossFit, Zumba.
• About (/about)     : Vikas Saini's story, philosophy ("sweat is fat crying"), credentials.
• Gallery (/gallery) : Photos of gym interior, equipment, exterior, atmosphere.
• Membership (/membership): All plans and pricing. Join online or visit the gym.
• Contact (/contact) : Contact form, address, phone, email, embedded Google Map of Pundri.

BEHAVIOR:
- Friendly, energetic, motivating — match the "dark, serious gym" vibe.
- Keep replies short (2–4 sentences) unless the user asks for a full tour or more detail.
- For a "tour": describe each page in 1 line and tell the user which route to navigate to.
- For pricing: always direct to the Membership page or "call 7206060744".
- Do NOT invent information not in this prompt. When unsure say: "For the most accurate info, call us at 7206060744 or use the Contact page."
- Reply in the same language the user writes in — Hindi and English both fine.
- Add a short motivating phrase where natural ("No excuses!", "Let's go!", "The Temple awaits!").`;

const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const ChatRequestSchema = z.object({
  messages: z.array(ChatMessageSchema).min(1).max(50),
});

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

router.post("/chat", async (req, res) => {
  const parsed = ChatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid request." });
    return;
  }

  const apiKey = process.env["FITNESS_TEMPLE"];
  if (!apiKey) {
    req.log.error("FITNESS_TEMPLE (Groq API key) is not configured");
    res.status(503).json({ message: "AI service is not configured." });
    return;
  }

  const { messages } = parsed.data;

  try {
    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      req.log.error(
        { status: groqRes.status, body: errText.slice(0, 500) },
        "Groq API error",
      );
      res.status(503).json({
        message: "AI unavailable right now. Please try again shortly.",
      });
      return;
    }

    const data = (await groqRes.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply =
      data.choices?.[0]?.message?.content ??
      "I couldn't generate a response. Please try again.";

    res.json({ reply });
  } catch (err) {
    req.log.error({ err }, "Groq request failed");
    res.status(503).json({ message: "AI service error. Please try again." });
  }
});

export default router;
