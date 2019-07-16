const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		//regarding requireLogin:
		//dont want to run when middleware runs. express calls it internally
		//when a request to /api/stripe happens. can have many middleware
		//as long as one processes request with a send fcn
		////////
		// stripe.charges.create finalizes the charge using the token from
		// react-stripe-checkout
		const charge = await stripe.charges.create({
			amount: 500, //frontend just sends credit, here we finalize
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id //contains token created from react-stripe-checkout after user inputs CC info
		});
		//console.log(req.body.id);
		//once charge is made, we need to update user model
		req.user.credits += 5; //passport accesses user model from mongo
		const user = await req.user.save(); //save new user value to our db. Assign value in case our req.user is stale, and need most up to date
		res.send(user);
	});
};
