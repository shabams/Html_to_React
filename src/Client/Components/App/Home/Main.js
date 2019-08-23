import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col, Image, Container } from 'react-bootstrap';
import easyprocess from '../../../Assets/Images/easyprocess.png';
import friendlystaff from '../../../Assets/Images/friendlystaff.png';
import price from '../../../Assets/Images/price.png';
import qualitycleaning from '../../../Assets/Images/qualitycleaning.png';
import paper from '../../../Assets/Images/paper.png';
import water from '../../../Assets/Images/water.png';
import aboutus from '../../../Assets/Images/aboutus.png';
import './Main.css';

const Ease = props => {
	return (
		<>
			<h1 className='ease-title'>Why Choose <span>Ease</span></h1>
			<Row className='ease'>
				<Col className='easy-process d-flex justify-content-center'>
					<div>
						<Image src={easyprocess} style={{ width: 194, height: 194 }} />
						<h4>Easy Process</h4>
					</div>
				</Col>

				<Col className='friendly-staff d-flex justify-content-center'>
					<div>
						<Image src={friendlystaff} style={{ width: 194, height: 194 }} />
						<h4>Friendly Staffs</h4>
					</div>
				</Col>

				<Col className='quality-cleaning d-flex justify-content-center'>
					<div>
						<Image src={qualitycleaning} style={{ width: 194, height: 194 }} />
						<h4>Quality Cleaning</h4>
					</div>
				</Col>

				<Col className='price d-flex justify-content-center'>
					<div>
						<Image src={price} style={{ width: 194, height: 194 }} />
						<h4>Affordable Prices</h4>
					</div>
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
							<Image src={paper} style={{ width: 230, height: 214 }} />
						</div>
					</Col>

					<Col className='water d-flex justify-content-center'>
						<div>
							<Image src={water} style={{ width: 230, height: 214 }} />
						</div>
					</Col>
				</Row>
			</div>
		</>
	);
}

const AboutUs = props => {
	return (
		<div className="about-us">
			<h1 className='about-us-title'>About Us</h1>
			<Row className='about-us-body d-flex justify-content-center'>
				<Col className='about-us-image d-flex justify-content-center'>
					<div>
						<Image src={aboutus} style={{ maxWidth: 513, maxHeight: 513 }} />
					</div>
				</Col>

				<Col className='about-us-context d-flex justify-content-center' style={{ flexDirection: 'column' }}>
					<div className='our-staff' style={{ marginBottom: 45 }}>
						<h4 className='our-staff-title'>Our Staff</h4>
						<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
					</div>

					<div className='company'>
						<h4 className='company-title'>Our Staff</h4>
						<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.</p>
					</div>
				</Col>
			</Row>
		</div>
	);
}

class Main extends Component {
	render() {
    return (
      <div className="page-body">
      	<Container fluid>
        	<Ease />
        	<FreeToilet />
        	<AboutUs />
        </Container>
      </div>
    );
	}
}

export default withRouter(Main);