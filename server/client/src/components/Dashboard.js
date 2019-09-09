import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
const Dashboard = () => {
	return (
		<div>
			<div className="center">
				<h5>
					To add credits, click above and use 4242-4242-4242-4242 as
					the credit card number to utilize Stripe's test mode!
				</h5>
			</div>
			<SurveyList />
			<div className="fixed-action-btn">
				<Link
					to="/surveys/new"
					className="btn-floating btn-large deep-orange"
				>
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
