import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../actions/users';
import { getQuestions } from '../actions/questions';
import Navbar from './Navbar';
import HomePage from './HomePage';
import NewQuestionPage from './NewQuestionPage';
import LeaderboardPage from './LeaderboardPage';
import QuestionPage from './QuestionPage';
import withAuth from './withAuth';
import Page404 from './Page404';

class App extends Component {
	componentDidMount() {
		this.props.getUsers();
		this.props.getQuestions();
	}

	render() {

		if(!this.props.users || !this.props.questions) {
			// Load all the data
			return <div></div>
		}

		return (
			<div className="App">
				<Router>
					<Fragment>
						<Navbar />
						<Switch>
							<Route exact path='/' component={withAuth(HomePage)} />
							<Route exact path='/add' component={withAuth(NewQuestionPage)} />
							<Route exact path='/leaderboard' component={withAuth(LeaderboardPage)} />
							<Route exact path='/questions/:id' component={withAuth(QuestionPage)} />
							<Route path='/' component={Page404} />
						</Switch>
					</Fragment>
				</Router>
			</div>
		);
	}
}

function mapStateToProps({ auth, users, questions }) {
	return {
		auth, users, questions
	}
}

export default connect(mapStateToProps, { getUsers, getQuestions })(App);
