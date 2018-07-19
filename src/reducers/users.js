import { GET_USERS } from "../actions/users";
import { SAVE_QUESTION, SAVE_QUESTION_ANSWER  } from "../actions/questions";

export default function users(state = null, action) {
	switch (action.type) {
		case GET_USERS:
			return action.payload;
		case SAVE_QUESTION:
			const { author, id } = action.payload;
			return {
				...state,
				[author]: {
					...state[author],
					questions: state[author].questions.concat([id])
				}
			}
		case SAVE_QUESTION_ANSWER:
			const { authedUser, qid, answer } = action.payload;
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer
					}
				}
			}
		default:
			return state;
	}
}