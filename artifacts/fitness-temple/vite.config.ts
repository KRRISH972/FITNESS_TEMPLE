import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv, type Plugin } from 'vite';

const rawPort = process.env.PORT ?? '5173';

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? '/';

const SYSTEM_PROMPT = `You are the friendly AI assistant for Fitness Temple The Gym, Pundri, Haryana, India.

GYM OVERVIEW:
Fitness Temple is a premium, high-energy gym known for its dark motivating atmosphere, professional Fitline-brand equipment, and strong community. Top-rated gym in Pundri — 4.7 stars, 130+ Google reviews, 500+ members, 5+ years active.

GYM DETAILS:
- Name    : Fitness Temple The Gym
- Tagline : "Unleash Your Inner Power" / "Step into the darkness, forge your best self"
- Address : Near Bus Stand, Main Market, Pundri, Haryana 136026
- Phone   : 7206060744
- Email   : krrishai0916@gmail.com
- Hours   : Mon–Sat 5:00 AM – 10:00 PM | Sunday: CLOSED
- Owner & Head Trainer: Vikas Saini

PROGRAMS:
1. Strength Training – Free weights up to 50 kg, squat racks, Smith machines, Fitline premium equipment. (Daily 5 AM–10 PM)
2. CrossFit / Functional – Kettlebells, plyo boxes, battle ropes, tire flips, sleds, HIIT circuits. (Mon/Wed/Fri 6–8 PM)
3. Zumba & Dance – Fun cardio group classes; burns calories to rhythm; all fitness levels welcome. (Tue/Thu 7–8 PM)
4. Personal Training – 1-on-1 with Vikas Saini; custom program + diet plan included. (By appointment)
5. Cardio Zone – Dedicated cardio equipment. (Daily 5 AM–10 PM)

MEMBERSHIP PLANS:
- Basic Monthly  : ₹800/month
- Premium Monthly: ₹1200/month — includes personal guidance
- Quarterly Plan : ₹2100 for 3 months
- Annual Plan    : ₹7000/year — best value
- Personal Training (per session): ₹500/session

WEBSITE SECTIONS:
• Home (/)           : Hero "Unleash Your Inner Power", stats bar, program teasers, trainer preview, testimonials, CTA.
• Programs (/programs): Full detail for Strength, CrossFit, Zumba.
• About (/about)     : Vikas Saini's story, philosophy ("sweat is fat crying"), credentials.
• Gallery (/gallery) : Photos of gym interior, equipment, atmosphere.
• Membership (/membership): All plans and pricing. Join online or visit the gym.
• Contact (/contact) : Contact form, address, phone, email, Google Map of Pundri.

BEHAVIOR:
- Friendly, energetic, motivating — match the dark serious gym vibe.
- Keep replies SHORT (2–4 sentences max) unless user asks for full detail.
- For pricing: always suggest calling 7206060744 or visiting /membership.
- Reply in the same language the user writes in — Hindi and English both fine.
- Add a short motivating phrase where natural ("No excuses!", "Let's go!", "The Temple awaits!").
- Never mention you are an AI or language model. You ARE the Fitness Temple assistant.`;

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function apiPlugin({ GROQ_API_KEY, GROQ_MODEL, BREVO_API_KEY, GYM_EMAIL }: {
  GROQ_API_KEY: string;
  GROQ_MODEL: string;
  BREVO_API_KEY: string;
  GYM_EMAIL: string;
}): Plugin {
  return {
    name: 'api-routes',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ message: 'Method not allowed' }));
          return;
        }

        let body = '';
        for await (const chunk of req) body += chunk;

        try {
          const { messages } = JSON.parse(body);
          if (!messages || !Array.isArray(messages) || messages.length === 0) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: 'Invalid request.' }));
            return;
          }

          const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model: GROQ_MODEL,
              messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
              max_tokens: 300,
              temperature: 0.7,
            }),
          });

          if (!groqRes.ok) {
            const errText = await groqRes.text();
            console.error('Groq API error:', groqRes.status, errText.slice(0, 300));
            res.statusCode = 503;
            res.end(JSON.stringify({ message: 'AI unavailable right now. Please try again shortly.' }));
            return;
          }

          const data = await groqRes.json() as {
            choices?: Array<{ message?: { content?: string; reasoning?: string } }>;
          };
          const reply = data.choices?.[0]?.message?.content ?? 'I could not generate a response.';
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ reply }));
        } catch (err) {
          console.error('Chat API error:', err);
          res.statusCode = 503;
          res.end(JSON.stringify({ message: 'AI service error. Please try again.' }));
        }
      });

      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ message: 'Method not allowed' }));
          return;
        }

        let body = '';
        for await (const chunk of req) body += chunk;

        try {
          const data = JSON.parse(body);
          const { name, email, phone, interest, message } = data;

          if (!name || !email || !phone || !interest) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: 'Please check the form details and try again.' }));
            return;
          }

          const interestLabel: Record<string, string> = {
            membership: 'General Membership',
            pt: 'Personal Training',
            crossfit: 'CrossFit',
            zumba: 'Zumba & Dance',
          };

          console.log(`\n[CONTACT FORM SUBMISSION]`);
          console.log(`  Name: ${name}`);
          console.log(`  Email: ${email}`);
          console.log(`  Phone: ${phone}`);
          console.log(`  Interest: ${interestLabel[interest] || interest}`);
          console.log(`  Message: ${message || '(none)'}\n`);

          let emailSent = false;

          try {
            const htmlContent = [
              '<h2>New Fitness Temple contact request</h2>',
              `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
              `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
              `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
              `<p><strong>Interest:</strong> ${escapeHtml(interestLabel[interest] || interest)}</p>`,
              `<p><strong>Message:</strong><br />${escapeHtml(message || '').replaceAll('\n', '<br />') || 'No message provided.'}</p>`,
            ].join('');

            const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
              method: 'POST',
              headers: {
                accept: 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                sender: { email: GYM_EMAIL, name: 'Fitness Temple Website' },
                to: [{ email: GYM_EMAIL, name: 'Fitness Temple' }],
                replyTo: { email, name },
                subject: `New Fitness Temple contact: ${name}`,
                htmlContent,
              }),
            });

            if (brevoRes.ok) {
              emailSent = true;
            } else {
              console.error('Brevo API returned:', brevoRes.status);
            }
          } catch (e) {
            console.error('Brevo email failed, form data saved locally');
          }

          const responseMsg = emailSent
            ? 'Your message was sent successfully!'
            : 'Your message has been received! We will get back to you soon.';

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: responseMsg }));
        } catch (err) {
          console.error('Contact API error:', err);
          res.statusCode = 503;
          res.end(JSON.stringify({ message: 'Something went wrong. Please try again.' }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname, '..', '..'), '');
  const GROQ_API_KEY = env.GROQ_API_KEY ?? '';
  const GROQ_MODEL = env.GROQ_MODEL ?? 'openai/gpt-oss-120b';
  const BREVO_API_KEY = env.BREVO_API_KEY ?? '';
  const GYM_EMAIL = env.GYM_EMAIL ?? 'krrishai0916@gmail.com';

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      apiPlugin({ GROQ_API_KEY, GROQ_MODEL, BREVO_API_KEY, GYM_EMAIL }),
    ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  };
});
