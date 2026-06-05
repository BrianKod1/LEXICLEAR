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

    const { returnURL } = await request.json().catch(() => ({}));
    const userId = session.user.id;

    const [user] =
      await sql`SELECT stripe_id FROM auth_users WHERE id = ${userId}`;
    const stripeCustomerId = user?.stripe_id;

    if (!stripeCustomerId) {
      return Response.json({ error: "No subscription found" }, { status: 404 });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url:
        returnURL || `${process.env.AUTH_URL || "http://localhost:3000"}/`,
    });

    return Response.json({ url: portalSession.url });
  } catch (error) {
    console.error("Stripe portal error:", error);
    return Response.json(
      { error: "Failed to create portal session" },
      { status: 500 },
    );
  }
};
