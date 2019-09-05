import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//redux-thunk sees a returned fcn and inputs dispatch fcn as arg
//allows for async action input
//NOTE: dispatch() is what updates the redux store!
export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');
	//next line only occurs after await call above
	dispatch({ type: FETCH_USER, payload: res.data });
};

//sends req to /api/stripe to finalize the charge.
export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post('/api/stripe', token);
	//NOTE: res.data is what is sent from the /api/stripe route handler.
	//remember at the end we send back the new user model.
	//console.log(res.data);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
