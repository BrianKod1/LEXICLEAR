import sql from "@/app/api/utils/sql";
import { sendEmail } from "@/app/api/utils/send-email";
import Stripe from "stripe";

export const POST = async (request) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err.message);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // Subscription created, updated, or renewed
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer;
        const status = subscription.status; // active, trialing, past_due, canceled, etc.

        await sql`
          UPDATE auth_users
          SET subscription_status = ${status},
              last_check_subscription_status_at = NOW()
          WHERE stripe_id = ${stripeCustomerId}
        `;

        // If subscription just became active (trial converted to paid), send welcome email
        if (
          status === "active" &&
          event.data.previous_attributes?.status === "trialing"
        ) {
          const [user] =
            await sql`SELECT email, name FROM auth_users WHERE stripe_id = ${stripeCustomerId}`;
          if (user?.email) {
            await sendEmail({
              to: user.email,
              from: "LexiClear <noreply@lexiclear.app>",
              subject: "You're now a LexiClear Pro member! 🎉",
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #111827;">
                  <div style="width: 40px; height: 40px; background: #2563EB; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                    <span style="color: white; font-size: 20px;">⚡</span>
                  </div>
                  <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 8px;">Welcome to LexiClear Pro!</h1>
                  <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                    Your free trial has converted to a full Pro subscription. You now have unlimited access to AI-powered legal document analysis.
                  </p>
                  <a href="${process.env.AUTH_URL || "https://lexiclear.app"}" style="display: inline-block; background: #2563EB; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                    Go to Dashboard →
                  </a>
                  <p style="color: #9CA3AF; font-size: 12px; margin-top: 32px;">
                    You can manage your subscription anytime from the dashboard. Questions? Reply to this email.
                  </p>
                </div>
              `,
            }).catch((err) =>
              console.error("Failed to send welcome email:", err),
            );
          }
        }
        break;
      }

      // Subscription canceled or deleted
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer;

        await sql`
          UPDATE auth_users
          SET subscription_status = 'canceled',
              last_check_subscription_status_at = NOW()
          WHERE stripe_id = ${stripeCustomerId}
        `;

        // Send cancellation email
        const [user] =
          await sql`SELECT email, name FROM auth_users WHERE stripe_id = ${stripeCustomerId}`;
        if (user?.email) {
          await sendEmail({
            to: user.email,
            from: "LexiClear <noreply@lexiclear.app>",
            subject: "Your LexiClear Pro subscription has ended",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #111827;">
                <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 8px;">Subscription ended</h1>
                <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                  Your LexiClear Pro subscription has been canceled. You'll no longer have access to document analysis. We're sorry to see you go!
                </p>
                <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                  If you'd like to resubscribe in the future, we'll be right here.
                </p>
                <a href="${process.env.AUTH_URL || "https://lexiclear.app"}/pricing" style="display: inline-block; background: #2563EB; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                  Resubscribe →
                </a>
              </div>
            `,
          }).catch((err) =>
            console.error("Failed to send cancellation email:", err),
          );
        }
        break;
      }

      // Trial ending in 3 days — send reminder
      case "customer.subscription.trial_will_end": {
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer;
        const trialEnd = new Date(subscription.trial_end * 1000);

        const [user] =
          await sql`SELECT email, name FROM auth_users WHERE stripe_id = ${stripeCustomerId}`;
        if (user?.email) {
          const daysLeft = Math.ceil(
            (trialEnd - new Date()) / (1000 * 60 * 60 * 24),
          );
          await sendEmail({
            to: user.email,
            from: "LexiClear <noreply@lexiclear.app>",
            subject: `Your free trial ends in ${daysLeft} day${daysLeft !== 1 ? "s" : ""} ⏰`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #111827;">
                <div style="background: #FEF9C3; border: 1px solid #FDE047; border-radius: 10px; padding: 16px 20px; margin-bottom: 28px;">
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: #713F12;">
                    ⏰ Your trial ends ${daysLeft === 1 ? "tomorrow" : `in ${daysLeft} days`} — ${trialEnd.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                  </p>
                </div>
                <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 8px;">Don't lose access to LexiClear Pro</h1>
                <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                  Your free trial is almost up. Add a payment method to keep your full access to unlimited AI-powered legal document analysis — just $19/month.
                </p>
                <a href="${process.env.AUTH_URL || "https://lexiclear.app"}" style="display: inline-block; background: #2563EB; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                  Add Payment Method →
                </a>
                <div style="margin-top: 32px; border-top: 1px solid #E5E7EB; padding-top: 24px;">
                  <p style="color: #6B7280; font-size: 13px; margin: 0 0 8px;">What you'll keep with Pro:</p>
                  <ul style="color: #374151; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                    <li>Unlimited document analyses</li>
                    <li>AI-powered plain English summaries</li>
                    <li>Red/Yellow/Green risk assessment</li>
                    <li>Legal jargon glossary for every clause</li>
                  </ul>
                </div>
                <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">Cancel anytime. No contracts, no tricks.</p>
              </div>
            `,
          }).catch((err) =>
            console.error("Failed to send trial warning email:", err),
          );
        }
        break;
      }

      // Payment failed — notify user
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const stripeCustomerId = invoice.customer;

        const [user] =
          await sql`SELECT email FROM auth_users WHERE stripe_id = ${stripeCustomerId}`;
        if (user?.email) {
          await sendEmail({
            to: user.email,
            from: "LexiClear <noreply@lexiclear.app>",
            subject: "Action needed: Payment failed for LexiClear Pro",
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #111827;">
                <div style="background: #FEF2F2; border: 1px solid #FECACA; border-radius: 10px; padding: 16px 20px; margin-bottom: 28px;">
                  <p style="margin: 0; font-size: 14px; font-weight: 600; color: #991B1B;">
                    ⚠️ We couldn't process your payment
                  </p>
                </div>
                <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 8px;">Update your payment method</h1>
                <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                  We had trouble charging your card for your LexiClear Pro subscription. Please update your payment method to keep your access.
                </p>
                <a href="${process.env.AUTH_URL || "https://lexiclear.app"}" style="display: inline-block; background: #DC2626; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                  Update Payment Method →
                </a>
                <p style="color: #9CA3AF; font-size: 12px; margin-top: 32px;">
                  Click "Manage Plan" in the dashboard header to update your billing details.
                </p>
              </div>
            `,
          }).catch((err) =>
            console.error("Failed to send payment failed email:", err),
          );
        }

        // Update status in DB
        await sql`
          UPDATE auth_users
          SET subscription_status = 'past_due',
              last_check_subscription_status_at = NOW()
          WHERE stripe_id = ${stripeCustomerId}
        `;
        break;
      }

      default:
        // Unhandled event type — ignore
        break;
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return Response.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
};
