const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.makePayment = async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};
