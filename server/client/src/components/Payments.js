import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		return (
			//STRIPE FLOW
			//Checkout sends the request to stripe with the stripe key.
			//Stripe returns a token that will give us permission to charge the
			//user, but the user isnt charged until we make the POST req.
			//The token field is the callback function that will use the token
			//returned from stripe.
			//That fcn will make a POST to /api/stripe to finalize the charge at
			//the backend.
			//Backend uses 'stripe' react module to create the charge, then updates
			//the database with the credits.
			//NOTE: the handleToken function calls dispatch to tell redux to update
			//it's store with the new user info sent from /api/stripe route handler.
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 E-mail Credits"
				amount={500} //In cents. need to tell stripe currency. default is USD.
				token={(token) => {
					//console.log(token);
					this.props.handleToken(token);
				}} //expects callback function after recv auth token from stripe
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
}

export default connect(
	null,
	actions
)(Payments);
