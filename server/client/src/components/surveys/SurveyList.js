//shows all the surveys created so far
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
	componentDidMount() {
		/*0. Attach fetchSurveys action creator to this component's props, as
			 as well as making sure global store's surveys is passed as a prop
			 to this component, which updates when store updates. Code is at 
			 end of this file with redux's connect function.
		  1. when this component mounts, call fetchSurveys
  		  2. fetch surveys does a get request to the backend at /api/surveys
  		  3. route handler uses user id to query mongo for all surveys by that
  		     id, which is sent back to fetchsurveys
  		  4. fetchsurveys calls reducer to update global store, with surveys.
  		  5. after all this occurs, this components props will have latest 
  		  	 surveys in it's props variable.
		*/
		this.props.fetchSurveys();
	}

	renderSurveys() {
		return this.props.surveys.reverse().map((survey) => {
			return (
				<div className="card blue-grey darken-1" key={survey._id}>
					<div className="card-content white-text">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p className="right">
							Sent On:{' '}
							{new Date(survey.dateSent).toLocaleDateString()}
							{survey.lastResponded
								? ', Last Response On: ' +
								  new Date(
										survey.lastResponded
								  ).toLocaleDateString()
								: null}
						</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
					</div>
				</div>
			);
		});
	}

	render() {
		return <div>{this.renderSurveys()}</div>;
	}
}

function mapStateToProps(state) {
	return { surveys: state.surveys }; //in reducers index.js, mapped mongodb response to surveys
}

export default connect(
	mapStateToProps,
	{ fetchSurveys }
)(SurveyList);
