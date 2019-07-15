const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
	app.post('/api/stripe', async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500, //frontend just sends credit, here we finalize
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		console.log(charge);
	});
};
