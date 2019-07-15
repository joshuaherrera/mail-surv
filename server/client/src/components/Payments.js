import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 E-mail Credits"
				amount={500} //In cents. need to tell stripe currency. default is USD.
				token={(token) => this.props.handleToken(token)} //expects callback function after recv auth token from stripe
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
