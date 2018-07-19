import React, { Component } from 'react';
import { Card, Form, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { saveQuestion } from '../actions/questions';
import { withRouter } from "react-router-dom";

class NewQuestionPage extends Component {
	state = {
		optionOne: '',
		optionTwo: '',
		loading: false,
	}

	optionOneOnChange = (e) => {
		this.setState({ optionOne: e.target.value });
	}

	optionTwoOnChange = (e) => {
		this.setState({ optionTwo: e.target.value });
	}

	onSubmit = async e => {
		e.preventDefault();
		
		if(this.state.optionOne && this.state.optionTwo) {
			this.setState({ loading: true });
			try {
				await this.props.saveQuestion({ 
					optionOneText: this.state.optionOne,
					optionTwoText: this.state.optionTwo,
					author: this.props.auth.id
				})
				this.props.history.push("/");
			} catch (error) {
				alert(error);
				this.setState({ loading: false });
			}
		} else {
			alert('You must enter text for both options!')
		}
	}

	render() {
		return (
			<div className="create-question-page">
				<Card className="create-question-card">
					<Card.Content header='Create New Question' style={{textAlign: 'center', fontSize: '1.3rem'}} />
					<Card.Content>
						<p>Complete the Question:</p>
						<h3>Would you rather...</h3>
						<Form onSubmit={this.onSubmit} loading={this.state.loading}>
							<Form.Field>
								<input placeholder='Enter Option One Text Here' onChange={this.optionOneOnChange} value={this.state.optionOne} />
							</Form.Field>
							<Divider horizontal>Or</Divider>
							<Form.Field>
								<input placeholder='Enter Option Two Text Herew' onChange={this.optionTwoOnChange} value={this.state.optionTwo} />
							</Form.Field>
							<Button color="green" fluid type='submit'>Submit</Button>
						</Form>
					</Card.Content>
				</Card>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default withRouter(connect(mapStateToProps, { saveQuestion })(NewQuestionPage));