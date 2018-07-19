import React from 'react';
import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import { withRouter } from 'react-router';

export default (ProtectedRoute) => {
	class AuthHOC extends React.Component {
		render() {
			if(this.props.auth) {
				return <ProtectedRoute {...this.props} />
			} else {
				return <LoginPage />
			}
		}
	}

	return connect(mapStateToProps)(withRouter(AuthHOC));
};

function mapStateToProps({auth}) {
	return { auth };
}