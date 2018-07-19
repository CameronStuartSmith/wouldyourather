export const LOGGING_IN = "LOGGING_IN";
export const LOGGING_OUT = "LOGGING_OUT";

const API = require('../utils/api');

export const login = (id) => (dispatch) => {
	return API._getUsers().then(users => {
		if(users[id]) {
			dispatch({
				type: LOGGING_IN,
				payload: users[id]
			})
		}
	});
}

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGGING_OUT,
	})
}