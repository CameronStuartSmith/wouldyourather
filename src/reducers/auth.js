import { LOGGING_IN, LOGGING_OUT } from "../actions/auth";
import { SAVE_QUESTION, SAVE_QUESTION_ANSWER  } from "../actions/questions";

export default function auth(state = null, action) {
	switch (action.type) {
		case LOGGING_IN:
			return action.payload;
		case LOGGING_OUT:
			return null;
		case SAVE_QUESTION_ANSWER:
			const { qid, answer } = action.payload;
			return {
				...state,
				answers: {
					...state.answers,
					[qid]: answer
				}
			}
		case SAVE_QUESTION:
			const { id } = action.payload;
			return {
				...state,
				questions: state.questions.concat([id])
			}
		default:
			return state;
	}
}