//shows user survey details for deletion review
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import formFields from './formFields';
import { deleteSurvey } from '../../actions';

class SurveyDelete extends Component {
	render() {
		const survey = this.props.location.state.survey;
		const reviewDeletion = _.map(formFields, ({ name, label }) => {
			return (
				<div key={name}>
					<label>{label === 'Recipient List' ? null : label}</label>
					<div>{survey[name]}</div>
				</div>
			);
		});
		return (
			<div>
				<h5>Please confirm deletion of survey</h5>
				{reviewDeletion}
				<label>Date Sent</label>
				<div>{new Date(survey['dateSent']).toLocaleDateString()}</div>
				<Link
					className="yellow darken-3 btn-flat white-text"
					to="/surveys"
				>
					Cancel
				</Link>
				<button
					className="red btn-flat right white-text"
					onClick={() =>
						this.props.deleteSurvey(
							{ id: survey._id },
							this.props.history
						)
					}
				>
					Delete
					<i className="material-icons right">delete</i>
				</button>
			</div>
		);
	}
}

export default connect(
	null,
	{ deleteSurvey }
)(withRouter(SurveyDelete));
