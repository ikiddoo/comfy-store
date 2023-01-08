// url/domain: http://localhost:8888/.netlify/functions/create-payment-intent
// import dotenv package
require('dotenv').config();

// import stripe
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {

    if (event.body) {
        // get cart data from event body & parse as JSON
        const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
        // log the post event sent by create payment intent function.
        console.log(cart);

        // create function to communicate with backend.
        const calculateOrderAmount = () => {
            return shipping_fee + total_amount
        }
        // create payment intent and get client secret key
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: 'usd'
            })
            return {
                statusCode: 200,
                // body: JSON.stringify(cart) // stringify cart
                body: JSON.stringify({ clientSecret: paymentIntent.client_secret }) // send client secret to StripeCheckout
            }
        } catch (error) {
            // return server error on error exception
            return {
                statusCode: 500,
                body: JSON.stringify({ msg: error.message })
            }
        }
    }
    // if there is no error, return 200
    return {
        statusCode: 200,
        body: 'Create Payment Intent'
    }
}