import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";
import Stripe from "stripe";

export const POST = async (request) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await auth();

    if (!session?.user?.email || !session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { redirectURL } = await request.json().catch(() => ({}));
    const email = session.user.email;
    const userId = session.user.id;

    const [user] =
      await sql`SELECT stripe_id FROM auth_users WHERE id = ${userId}`;
    let stripeCustomerId = user?.stripe_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email });
      stripeCustomerId = customer.id;
      await sql`UPDATE auth_users SET stripe_id = ${stripeCustomerId} WHERE id = ${userId}`;
    }

    const baseURL =
      redirectURL ||
      process.env.NEXT_PUBLIC_CREATE_APP_URL ||
      "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "LexiClear Pro",
              description: "Unlimited AI-powered legal document analysis",
            },
            recurring: { interval: "month" },
            unit_amount: 1900, // $19.00/month
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: {
        trial_period_days: 7,
        trial_settings: {
          end_behavior: {
            missing_payment_method: "cancel",
          },
        },
      },
      payment_method_collection: "if_required",
      success_url: `${baseURL}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseURL}/pricing`,
    });

    return Response.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return Response.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
};
