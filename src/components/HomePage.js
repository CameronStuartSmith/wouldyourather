import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Question from './Question';
import { Tab, Container } from 'semantic-ui-react';

class HomePage extends Component {

	renderQuestions = (questions, type) => {
		if(questions.length) {
			return questions.map(question => {
				const user = this.props.users[question.author];
				return <Question id={question.id} data={question} user={user}/>
			});
		} else {
			return (
				<h3 style={{textAlign: 'center'}}>
					{type ? 'You havent answered any questions yet!' : 'There are no more Questions left to be answered!'}
				</h3>
			)
		}
	}

	getPanes = () => {
		const { answeredQuestions, unansweredQuestions } = this.props;
		return [
			{ menuItem: 'Unanswered Polls', render: () => <Tab.Pane>{this.renderQuestions(unansweredQuestions, 0)}</Tab.Pane> },
			{ menuItem: 'Answered Polls', render: () => <Tab.Pane>{this.renderQuestions(answeredQuestions, 1)}</Tab.Pane> },
		];
	}

	render() {
		const panes = this.getPanes();
		return (
			<Container>
				<Tab panes={panes} />
			</Container>
		);
	}
}

function sortByTime(a, b) {
	return b.timestamp - a.timestamp;
}

function mapStateToProps({ questions, auth, users }) {
	let answeredQuestions = [];
	let unansweredQuestions = [];

	_.forEach(questions, (value, key) => {
		if(auth.answers[key]) {
			answeredQuestions.push(value);
		} else {
			unansweredQuestions.push(value);
		}
	});

	answeredQuestions = answeredQuestions.sort(sortByTime);
	unansweredQuestions = unansweredQuestions.sort(sortByTime);

	return {
		answeredQuestions,
		unansweredQuestions,
		questions,
		auth,
		users
	}; 
}

export default connect(mapStateToProps)(HomePage);