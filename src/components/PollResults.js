import React, { Component } from 'react';
import { Card, Segment, Progress, Label } from 'semantic-ui-react';

function determineColor(percentage) {
	if(percentage < 50) {
		return 'red';
	} else if(percentage > 50) {
		return 'blue'
	}

	return 'purple';
}

class PollResults extends Component {
	render() {
		const { question, auth, user } = this.props;

		const optionOneVotes = question.optionOne.votes.length;
		const optionTwoVotes = question.optionTwo.votes.length;
		const totalVotes = optionOneVotes + optionTwoVotes;

		const optionOnePercentage = Number((optionOneVotes/totalVotes*100).toFixed(2));
		const optionTwoPercentage = Number((optionTwoVotes/totalVotes*100).toFixed(2));

		return (
			<Card className="poll-results">
				<Card.Content header={`Asked by ${user.name}:`} />
				<Card.Content className="poll-results-content">
					<div>
						<img src={user.avatarURL} />
					</div>
					<div>
						<h3>Results:</h3>
						<Segment>
							<h2>Would you rather {question.optionOne.text}?</h2>
							<Progress percent={optionOnePercentage} color={determineColor(optionOnePercentage)} progress />
							{ auth.answers[question.id] === 'optionOne' && <Label attached='bottom right'>Your Vote</Label> }
							<p>{optionOneVotes} out of {totalVotes} votes</p>
						</Segment>
						<Segment>
							<h2>Would you rather {question.optionTwo.text}?</h2>
							<Progress percent={optionTwoPercentage} color={determineColor(optionTwoPercentage)} progress />
							{ auth.answers[question.id] === 'optionTwo' && <Label attached='bottom right'>Your Vote</Label> }
							<p>{optionTwoVotes} out of {totalVotes} votes</p>
						</Segment>
					</div>
					
				</Card.Content>
			</Card>
		);
	}
}

export default PollResults;