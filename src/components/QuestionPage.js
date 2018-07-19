import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollResults from './PollResults';
import AnswerPoll from './AnswerPoll';
import Page404 from './Page404';

class QuestionPage extends Component {

	renderPoll = () => {
		const { question, auth, answered, user } = this.props;
		if(answered) {
			return(
				<PollResults question={question} auth={auth} user={user}/>
			)
		} else {
			return(
				<AnswerPoll question={question} auth={auth} user={user}/>
			)
		}
	}

	render() {
		if(this.props.error) {
			return <Page404 />
		}

		return (
			<div className="question-page">
				{this.renderPoll()}
			</div>
		);
	}
}

function mapStateToProps({ questions, auth, users }, props) {
	const id = props.match.params.id;
	const question = questions[id];
	if(question) {
		return {
			question,
			auth,
			answered: !!auth.answers[id],
			user: users[question.author]
		}
	} else {
		// Route not Found
		return {
			error: 1
		}
	}
}

export default connect(mapStateToProps)(QuestionPage);