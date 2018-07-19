import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import LeaderboardItem from './LeaderboardItem';

class LeaderboardPage extends Component {

	renderLeaderboardItems = () => {
		return this.props.users.map((user, index) => {
			return <LeaderboardItem id={user.id} user={user} position={index+1} />
		})
	}

	render() {
		return (
			<div className="leaderboard-page">
				{this.renderLeaderboardItems()}
			</div>
		);
	}
}




function mapStateToProps({ users }) {
	let usersArray = [];

	_.forEach(users, (value, key) => {
		const answered = Object.keys(value.answers).length;
		const questions = value.questions.length;

		usersArray.push({
			answered, questions,
			id: value.id,
			name: value.name,
			total: answered + questions,
			url: value.avatarURL
		})
	})

	usersArray = usersArray.sort((a, b) => {
		return b.total - a.total;
	})

	console.log(usersArray);

	return { users: usersArray };
}

export default connect(mapStateToProps)(LeaderboardPage);