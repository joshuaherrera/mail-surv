// surveyfield containts logic to render a single label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
	//reduxform passes props which contain event handlers
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			{/*used for errors if form not filled*/}
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
