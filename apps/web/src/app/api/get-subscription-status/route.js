import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";
import Stripe from "stripe";

export const POST = async () => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await auth();

    if (!session?.user?.email) {
      return Response.json({ status: "unauthenticated" });
    }

    const results = await sql`
      SELECT subscription_status, stripe_id, last_check_subscription_status_at
      FROM auth_users
      WHERE email = ${session.user.email}
    `;

    if (!results.length) {
      return Response.json({ status: "not_found" });
    }

    const {
      subscription_status,
      stripe_id,
      last_check_subscription_status_at,
    } = results[0];

    // Re-check with Stripe if we have a customer but status is stale or missing
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const isStale =
      !last_check_subscription_status_at ||
      new Date(last_check_subscription_status_at) < oneHourAgo;

    if (stripe_id && (!subscription_status || isStale)) {
      try {
        const customer = await stripe.customers.retrieve(stripe_id, {
          expand: ["subscriptions"],
        });

        const activeSub = customer?.subscriptions?.data?.find(
          (s) => s.status === "active" || s.status === "trialing",
        );
        const newStatus = activeSub
          ? activeSub.status
          : customer?.subscriptions?.data[0]?.status || "none";

        await sql`
          UPDATE auth_users
          SET subscription_status = ${newStatus}, last_check_subscription_status_at = NOW()
          WHERE email = ${session.user.email}
        `;

        return Response.json({ status: newStatus, stripeId: stripe_id });
      } catch (stripeErr) {
        console.error("Stripe lookup error:", stripeErr);
      }
    }

    return Response.json({
      status: subscription_status || "none",
      stripeId: stripe_id,
    });
  } catch (error) {
    console.error("Subscription status error:", error);
    return Response.json({ status: "error" }, { status: 500 });
  }
};
