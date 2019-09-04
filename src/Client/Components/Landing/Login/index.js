import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import logo from './logo.png';
import './index.css';
import { login } from '../../../Actions/Admin';
import {ToastsContainer, ToastsStore} from 'react-toasts';

class Login extends Component {
	constructor(props) {
		super(props);
	}

	login = () => {
		if (this.username.value.length === 0 || this.password.value.length === 0){
			ToastsStore.error('Please fill in the required fields.')
		}
		else {
			const data = {
				username: this.username.value,
				password: this.password.value
			};

			const { login } = this.props;
			login(data, this.props);
		}
	}

	componentDidMount = () => {
		if(localStorage.getItem('token')) {
			this.props.history.push('/admin/panel');
		}
	}

	render() {
		return (
			<div className='login-back'>
				<div className="login-page">
			        <div className="form">
		                <h1 className="company-name">Company Name</h1>
		                <Image className="logo" src={logo} alt="" />
		                <br />
		                <i className="fas fa-user user-logo"></i>
			            <form className="login-form">
			                <input  type="text" id="username" placeholder="username" ref={input => this.username = input} />
			                <input  type="password" id="password" placeholder="password" ref={input => this.password = input} />
			                <button type="button" onClick={this.login}>login</button>
			            </form>
			        </div>
	               	<ToastsContainer store={ToastsStore}/>
			    </div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
});

export default withRouter(connect(mapStateToProps, { login })(Login));