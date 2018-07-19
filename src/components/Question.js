import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Question extends Component {
	render() {
		const { user, data } = this.props;
		return (
			<Card>
				<Card.Content header={`${user.name} asks:`} />
				<Card.Content className="question-content">
					<img src={user.avatarURL} />
					<h3>Would you rather</h3>
					<p>...{data.optionOne.text}...</p>
					<Link to={`/questions/${this.props.id}`}><Button fluid inverted color="red">View Poll</Button></Link>
				</Card.Content>
				<Card.Content extra>
				<Icon name='user' />
				 {data.optionOne.votes.length + data.optionTwo.votes.length} Answers
				</Card.Content>
			</Card>
		);
	}
}

export default Question;