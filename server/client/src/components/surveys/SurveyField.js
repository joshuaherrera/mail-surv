// surveyfield containts logic to render a single label and text input
import React from 'react';

export default ({ input }) => {
	//reduxform passes props which contain event handlers
	return (
		<div>
			<input {...input} />
		</div>
	);
};
