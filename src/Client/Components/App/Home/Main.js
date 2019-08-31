import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col, Image, Container } from 'react-bootstrap';
import easyprocess from '../../../Assets/Images/easyprocess.svg';
import friendlystaff from '../../../Assets/Images/friendlystaff.svg';
import price from '../../../Assets/Images/price.svg';
import qualitycleaning from '../../../Assets/Images/qualitycleaning.svg';
import paper from '../../../Assets/Images/paper.svg';
import water from '../../../Assets/Images/water.svg';
import aboutus from '../../../Assets/Images/aboutus.png';
import './Main.css';

const Ease = props => {
	return (
		<>
			<h1 className='ease-title'>Why Choose <span>Ease</span></h1>
			<Row className='ease'>
				<Col className='easy-process d-flex justify-content-center'>
					<div>
						<Image src={easyprocess} />
					</div>
					<h4>Easy Process</h4>
				</Col>

				<Col className='friendly-staff d-flex justify-content-center'>
					<div>
						<Image src={friendlystaff} />
					</div>
					<h4>Friendly Staffs</h4>
				</Col>

				<Col className='qu	ality-cleaning d-flex justify-content-center'>
					<div>
						<Image src={qualitycleaning} />
					</div>
					<h4>Quality Cleaning</h4>
				</Col>

				<Col className='price d-flex justify-content-center'>
					<div>
						<Image src={price} />
					</div>
					<h4>Affordable Prices</h4>
				</Col>
			</Row>
		</>
	);
}

const FreeToilet = props => {
	return (
		<>
			<h4 className='free-toilet-title'>With every booking, we’ll provide with you <span>free</span> toilet paper and Incenses!</h4>
			<div className='free-toilet d-flex justify-content-center'>
				<Row className='free-toilet-body'>
					<Col className='paper d-flex justify-content-center'>
						<div>
							<Image src={paper} className='paper-water' />
						</div>
					</Col>

					<Col className='water d-flex justify-content-center'>
						<div>
							<Image src={water} className='paper-water' />
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
}

const AboutUs = props => {
	return (
		<div className="about-us" id='aboutUs'>
			<h1 className='about-us-title'>About Us</h1>
			<Row className='about-us-body'>
				<Col md={6} sm={12} xs={12} className='about-us-image d-flex justify-content-center' style={{ padding: 0 }}>
					<div>
						<Image src={aboutus} style={{ maxWidth: 513, maxHeight: 513, width: '100%' }} />
					</div>
				</Col>

				<Col md={6} sm={12} xs={12} className='about-us-context d-flex justify-content-center' style={{ flexDirection: 'column' }}>
					<div className='our-staff' style={{ marginBottom: 45 }}>
						<h4 className='our-staff-title'>Our Staff</h4>
						<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
					</div>

					<div className='company'>
						<h4 className='company-title'>The Company</h4>
						<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
					</div>
				</Col>
			</Row>
		</div>
	);
}

const AboutUsMobile = props => {
	return (
		<div className="about-us">
			<h1 className='about-us-title'>About Us</h1>
			<Row className='about-us-body' style={{ textAlign: 'center' }}>
				<div className='about-us-image' 	>
					<Image src={aboutus} style={{ maxWidth: 513, maxHeight: 513, width: '100%' }} />
				</div>
				<div className='our-staff' style={{ marginBottom: 45 }}>
					<h4 className='our-staff-title'>Our Staff</h4>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
				</div>
				<div className='company'>
					<h4 className='company-title'>The Company</h4>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
				</div>
			</Row>
		</div>
	);
}


class Main extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 0,
			height: 0
		}
	}

	componentDidMount = () => {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}	

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	render() {
		const width = this.state.width;
	    return (
	      <div className="page-body">
	      	<Container fluid>
	        	<Ease />
	        	<FreeToilet />
	        	{
	        		width > 767 ? <AboutUs /> : <AboutUsMobile />
	        	}
	        </Container>
	      </div>
	    );
	}
}

export default withRouter(Main);