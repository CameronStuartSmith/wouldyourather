import React, { Component } from 'react';
import { Card, Statistic, Label } from '../../node_modules/semantic-ui-react';

class LeaderboardItem extends Component {
	render() {
		const { id, answered, questions, name, total, url } = this.props.user;
		return (
			<Card className="leaderboard-item">
				<Card.Content className="leaderboard-item-content">
					<div>
						<Label attached='top left'># {this.props.position}</Label>
						<img src={url} />
					</div>

					<div className="leaderboard-item-middle">
						<h2>{name}</h2>
						<div>
							<p>Answered Questions</p>
							<p>{answered}</p>
						</div>
						<div>
							<p>Created Questions</p>
							<p>{questions}</p>
						</div>
					</div>

					<div>
						<Statistic>
							<Statistic.Value>{total}</Statistic.Value>
							<Statistic.Label>Score</Statistic.Label>
						</Statistic>
					</div>

				</Card.Content>
			</Card>
		);
	}
}

export default LeaderboardItem;