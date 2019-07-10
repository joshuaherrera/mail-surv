import axios from 'axios';
import { FETCH_USER } from './types';

//redux-thunk sees a returned fcn and inputs dispatch fcn as arg
//allows for async action input
export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');
	//next line only occurs after await call above
	dispatch({ type: FETCH_USER, payload: res.data });
};
