import { Router, type IRouter } from "express";
import {
  SubmitContactFormBody,
  SubmitContactFormResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const GYM_EMAIL = "krrishai0916@gmail.com";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactFormBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      message: "Please check the form details and try again.",
    });
    return;
  }

  const apiKey = process.env["BREVO_API_KEY"];
  if (!apiKey) {
    req.log.error("BREVO_API_KEY is not configured");
    res.status(503).json({
      message: "Email service is not configured. Please try again later.",
    });
    return;
  }

  const { name, email, phone, interest, message } = parsed.data;
  const interestLabel = {
    membership: "General Membership",
    pt: "Personal Training",
    crossfit: "CrossFit",
    zumba: "Zumba & Dance",
  }[interest];

  const htmlContent = [
    "<h2>New Fitness Temple contact request</h2>",
    `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
    `<p><strong>Interest:</strong> ${escapeHtml(interestLabel)}</p>`,
    `<p><strong>Message:</strong><br />${escapeHtml(message ?? "").replaceAll("\n", "<br />") || "No message provided."}</p>`,
  ].join("");

  try {
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: GYM_EMAIL,
          name: "Fitness Temple Website",
        },
        to: [{ email: GYM_EMAIL, name: "Fitness Temple" }],
        replyTo: { email, name },
        subject: `New Fitness Temple contact: ${name}`,
        htmlContent,
      }),
    });

    if (!brevoResponse.ok) {
      const errorBody = await brevoResponse.text();
      req.log.error(
        { status: brevoResponse.status, body: errorBody.slice(0, 500) },
        "Brevo rejected contact email",
      );
      res.status(503).json({
        message: "We could not send your message right now. Please try again.",
      });
      return;
    }

    const response = SubmitContactFormResponse.parse({
      message: "Your message was sent successfully.",
    });
    res.json(response);
  } catch (error) {
    req.log.error({ err: error }, "Brevo request failed");
    res.status(503).json({
      message: "We could not send your message right now. Please try again.",
    });
  }
});

export default router;