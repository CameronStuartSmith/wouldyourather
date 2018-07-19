import React, { Component } from 'react';
import { Card, Button, Form, Checkbox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveQuestionAnswer } from '../actions/questions';

class AnswerPoll extends Component {
	state = {
		value: '',
		loading: false,
	}

	onSubmit = async (e) => {
		e.preventDefault();

		const { question, auth } = this.props;

		if(this.state.value) {
			this.setState({ loading: true });
			await this.props.saveQuestionAnswer({
				authedUser: auth.id,
				qid: question.id,
				answer: this.state.value,
			})
			this.setState({ loading: false });
		}
	}

	handleChange = (e, { value }) => this.setState({ value })

	renderForm = () => {
		const { question } = this.props;
		return (
			<Form onSubmit={this.onSubmit} loading={this.state.loading}>
				<Form.Field>
					<Checkbox
						radio
						label={question.optionOne.text}
						name='checkboxRadioGroup'
						value='optionOne'
						checked={this.state.value === 'optionOne'}
						onChange={this.handleChange}
					/>
				</Form.Field>
				<Form.Field>
					<Checkbox
						radio
						label={question.optionTwo.text}
						name='checkboxRadioGroup'
						value='optionTwo'
						checked={this.state.value === 'optionTwo'}
						onChange={this.handleChange}
					/>
				</Form.Field>
				<Button fluid color="blue" inverted type="submit">Submit</Button>
			</Form>
		)
	}

	render() {
		const { question, auth, user } = this.props;
		return (
			<Card className="poll-answer">
				<Card.Content header={`${user.name} asks:`} />
				<Card.Content className="question-content">
					<img src={user.avatarURL} />
					<h3>Would you rather...</h3>
					{this.renderForm()}
				</Card.Content>
			</Card>
		);
	}
}

export default connect(null, { saveQuestionAnswer })(AnswerPoll);