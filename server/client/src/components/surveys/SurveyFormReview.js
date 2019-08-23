//shows user inputs to their form for review
import React from 'react';
import { connect } from 'react-redux';

const SurveyFormReview = ({ onCancel }) => {
	return (
		<div>
			<h5>Please confirm your entires</h5>
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);