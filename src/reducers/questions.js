import { GET_QUESTIONS, SAVE_QUESTION, SAVE_QUESTION_ANSWER  } from "../actions/questions";

export default function auth(state = null, action) {
	switch (action.type) {
		case GET_QUESTIONS:
			return action.payload;
		case SAVE_QUESTION:
			return {
				...state,
				[action.payload.id]: action.payload
			};
		case SAVE_QUESTION_ANSWER:
			const { authedUser, qid, answer } = action.payload;
			return {
				...state,
				[qid]: {
					...state[qid],
					[answer]: {
						...state[qid][answer],
						votes: state[qid][answer].votes.concat([authedUser])
					}
				}
			};
		default:
			return state;
	}
}