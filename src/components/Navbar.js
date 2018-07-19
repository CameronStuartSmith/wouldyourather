import React, { Component } from 'react'
import { Container, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { Link } from 'react-router-dom';

class Navbar extends Component {

	renderAuth = () => {
		if(this.props.auth) {
			console.log(this.props.auth);
			return (
				<Menu.Menu position='right'>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<p style={{ margin: 'auto' }}>Welcome {this.props.auth.name}</p>
						<img width={32} height={32} src={this.props.auth.avatarURL} />
					</div>
					<Menu.Item as='a' onClick={this.props.logout}>Logout</Menu.Item>
				</Menu.Menu>
			)
		}
	}

	render() {
		return (
			<Menu borderless className="navbar-style">
			<Container>
              <Link to="/"><Menu.Item header as='a'>Would You Rather</Menu.Item></Link>
              <Link to="/add"><Menu.Item as='a'>New Question</Menu.Item></Link>
              <Link to="/leaderboard"><Menu.Item as='a'>Leaderboard</Menu.Item></Link>
			  {this.renderAuth()}
			  </Container>
          </Menu>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps, { logout })(Navbar);