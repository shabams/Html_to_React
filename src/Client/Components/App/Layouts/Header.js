import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import AboveHeader from './AboveHeader';
import Works from './Works';
import './Header.css';

class Header extends Component {
	render() {
		return(
			<div className="header">
				<Container fluid>
					<div className="page-header">
						<NavBar />
						<AboveHeader />
						<Works />
					</div>
				</Container>
			</div>
		)
	}
}

export default Header