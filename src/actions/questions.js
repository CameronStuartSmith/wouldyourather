export const GET_QUESTIONS = "GET_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

const API = require('../utils/api');

export const getQuestions = () => (dispatch) => {
	return API._getQuestions().then(questions => {
		dispatch({
			type: GET_QUESTIONS,
			payload: questions
		})
	});
}

export const saveQuestion = ({ optionOneText, optionTwoText, author }) => (dispatch) => {
	return API._saveQuestion({ optionOneText, optionTwoText, author }).then(question => {
		dispatch({
			type: SAVE_QUESTION,
			payload: question
		})
	});
}

export const saveQuestionAnswer = ({ authedUser, qid, answer }) => (dispatch) => {
	return API._saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
		dispatch({
			type: SAVE_QUESTION_ANSWER,
			payload: { authedUser, qid, answer }
		})
	});
}