import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
	//redux-thunk sees a returned fcn and inputs dispatch fcn as arg
	//allows for async action input
	return function(dispatch) {
		axios
			.get('/api/current_user')
			.then((res) => dispatch({ type: FETCH_USER, payload: res }));
	};
};
