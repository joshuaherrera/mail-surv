import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import SurveyDelete from './surveys/SurveyDelete';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route path="/" component={Landing} exact />
						<Route path="/surveys" component={Dashboard} exact />
						<Route path="/surveys/new" component={SurveyNew} />
						<Route
							path="/surveys/delete"
							component={SurveyDelete}
						/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(
	null,
	actions
)(App);
