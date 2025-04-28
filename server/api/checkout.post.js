import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Request body:", body); // Check incoming body data

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: body.currency,
            product_data: {
              name: body.title,
            },
            unit_amount: body.price, // Price in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NUXT_PUBLIC_SITE_URL}/events?paymentSuccess=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NUXT_PUBLIC_SITE_URL}/events`,
      metadata: {
        eventId: body.eventId || "",
      },
    });

    console.log("Stripe session created:", session.url); // Log the created session

    return { url: session.url };
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return { error: "Failed to create Stripe session" };
  }
});
