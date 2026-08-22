---
name: Email delivery
description: Durable constraints for the Fitness Temple contact form email integration
---

# Email delivery

The contact form sends through Brevo from the API server. The Brevo credential must remain a Replit Secret and must never be exposed in frontend code or browser requests. The configured sender address must be verified in Brevo before delivery can succeed.

**Why:** Email-provider credentials are privileged, and Brevo rejects or suppresses messages when the sender identity is not verified.

**How to apply:** Keep the browser limited to the local contact endpoint, read the credential only from the server environment, and update the sender only to an address verified in the Brevo account.