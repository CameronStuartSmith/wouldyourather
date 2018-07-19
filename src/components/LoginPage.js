import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Segment } from '../../node_modules/semantic-ui-react';
import { login } from '../actions/auth';
import Logo from './logo.svg';

class LoginPage extends Component {
	state = {
		value: '',
		loading: false
	}

	getOptions = () => {
		const arr = _.map(this.props.users, obj => {
			return { value: obj.id, label: obj.name }
		})
		console.log(arr);
		return arr;
	}

	updateValue = (newValue) => {
		this.setState({
			value: newValue,
		});
	}

	submit = async () => {
		if(this.state.value) {
			this.setState({ loading: true });
			await this.props.login(this.state.value);
			this.setState({ loading: false });
		}
	}

	render() {

		if(!this.props.users) {
			return <div>Loading....</div>
		}

		const options = this.getOptions();

		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
				<Segment attached='top' style={{ width: '600px', backgroundColor: '#eee' }}>
					<h2>Are you ready to Play Would You Rather?</h2>
					<h3 style={{ marginTop: 0 }}>Please sign in to continue</h3>
				</Segment>
				<Segment attached style={{ width: '600px' }}>
					<img src={Logo} />
					<h2>LOG-IN</h2>
					<Select
						id="state-select"
						placeholder="Select User..."
						options={options}
						simpleValue
						name="selected-state"
						value={this.state.value}
						onChange={this.updateValue}
						searchable={true}
					/>
					<Button fluid color="blue" onClick={this.submit} loading={this.state.loading} style={{ marginTop: '1rem'}}>LOGIN</Button>
				</Segment>	
			</div>
		);
	}
}

function mapStateToProps({users}) {
	return { users };
}

export default connect(mapStateToProps, { login })(LoginPage);