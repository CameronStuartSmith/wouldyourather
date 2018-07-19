export const GET_USERS = "GET_USERS";

const API = require('../utils/api');

export const getUsers = () => (dispatch) => {
	return API._getUsers().then(users => {
		dispatch({
			type: GET_USERS,
			payload: users
		})
	});
}