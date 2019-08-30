import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Form, Col, Button, Modal, Image } from 'react-bootstrap';
import './Booking.css';
import mail from '../../../Assets/Images/mail1.png';
import { connect } from 'react-redux';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body className='d-flex justify-content-center' style={{ flexDirection: 'column' }}>
        <div className='modal-body-inside d-flex' style={{ border: 'none', margin: '0 auto', justifyContent: 'center', flexDirection: 'row' }}>
      		<Image src={mail} style={{ maxWidth: 173, maxHeight: 143, width: '100%' }} />
        </div>
      	<h4 style={{ textAlign: 'center', marginBottom: 25 }}>We sent you an email!</h4>
      	<p style={{ textAlign: 'center', marginBottom: 45 }}>Please check your inbox for an email with a link to edit your booking</p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-center' style={{ flexDirection: 'column' }}>
      	<div className='modal-footer-inside d-flex' style={{ justifyContent: 'center' }}>
      		<div className='left'>
      			<Button variant="primary" className='later' onClick={props.onHide}>
			        Ok
			    </Button>
      		</div>
        </div>
        <div style={{ marginTop: '30px' }}>
        	<p>Need further assistance? <a href='#' style={{ color: '#374354', textDecoration: 'underline' }}>Contact Us</a> </p>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

class BookingConfirming extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			modalShow: false
		}
	}

	render() {
		return (
			<>
				<h4 className='booking2-title'>We found 2 bookings matching your email and phone number</h4>
				<div className='booking-confirming d-flex'>
					<div className='booking-confirming-date d-flex'>
						<p>THU</p>
						<p>July 29</p>
						<p>9 AM</p>
					</div>
					<div className=''>
						<div className='booking-confirming-data d-flex'>
							<div className='name-state-numberofrooms d-flex'>
								<div className='full-name'>	
									<h6>Full Name</h6>
									<h5>{this.props.data.name}</h5>
								</div>
								<div className='state'>
									<h6>State</h6>
									<h5>{this.props.data.state}</h5>
								</div>
								<div className='rooms'>
									<h6>Number of rooms</h6>
									<h5>{this.props.data.rooms}</h5>
								</div>
							</div>

							<div className='state-city-address d-flex'>
								<div className='phone-number'>
									<h6>Phone Number</h6>
									<h5>{this.props.data.phone_no}</h5>
								</div>
								<div className='city'>
									<h6>City</h6>
									<h5>{this.props.data.city}</h5>
								</div>
								<div className='Number of bathrooms'>
									<h6>Number of bathrooms</h6>
									<h5>{this.props.data.bathrooms}</h5>
								</div>							
							</div>

							<div className='rooms-bathrooms d-flex'>
								<div className='address'>
									<h6>123, St name, lorem ipsum.</h6>
									<h5>{this.props.data.address}</h5>
								</div>
							</div>
						</div>
						<div className='request-edit d-flex'>
							<h6>Looking to edit your booking details?</h6>
							<a href='#' onClick={() => this.setState({modalShow: true})}>Request Edit</a>
							<MyVerticallyCenteredModal
								show={this.state.modalShow}
								onHide={() => this.setState({modalShow: false})}
							/>
						</div>
					</div>
				</div>
			</>
		)
	}	
}

class BookingConfirmingMobile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			modalShow: false
		}
	}

	render() {
		return (
			<>
				<h4 className='booking2-title'>We found 2 bookings matching your email and phone number</h4>
				<div className='confirmation d-flex'>
					<div className='confirming-date d-flex'>
						<p>THU</p>
						<p>July 29</p>
						<p>9 AM</p>
					</div>
					<div className='confirming-data'>
						<div className='name-phone d-flex'>
							<div className='full-name'>
								<h6>Full Name</h6>
								<h5>{this.props.data.name}</h5>
							</div>
							<div className='phone-number'>
								<h6>Phone Number</h6>
								<h5>{this.props.data.phone_no}</h5>
							</div>
						</div>

						<div className='state-city-address d-flex'>
							<div className='state'>
								<h6>State</h6>
								<h5>{this.props.data.state}</h5>
							</div>
							<div className='city'>
								<h6>City</h6>
								<h5>{this.props.data.city}</h5>
							</div>
							<div className='address'>
								<h6>123, St name, lorem ipsum.</h6>
								<h5>{this.props.data.address}</h5>
							</div>
						</div>

						<div className='rooms-bathrooms d-flex'>
							<div className='rooms'>
								<h6>Number of rooms</h6>
								<h5>{this.props.data.rooms}</h5>
							</div>
							<div className='Number of bathrooms'>
								<h6>Number of bathrooms</h6>
								<h5>{this.props.data.bathrooms}</h5>
							</div>
						</div>
						<div className='request-edit' style={{marginTop: 30}}>
							<h6>Looking to edit your booking details?</h6>
							<a href='#' onClick={() => this.setState({modalShow: true})}>Request Edit</a>
							<MyVerticallyCenteredModal
								show={this.state.modalShow}
								onHide={() => this.setState({modalShow: false})}
							/>
						</div>
					</div>
				</div>
			</>
		)
	}
}

class Booking2 extends React.Component {
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
		const bookedData = this.props.bookedInformation || [];
		return (
			<div style={{ maxWidth: '860px', padding: '0 15px' }} className="booking2">
				<Row style={{ marginBottom: 50, marginTop: 120 }} className='booking2-row'>
					<Col>
						<Form.Group controlId='formBasicEmailAddress'>
							<Form.Label>Email Address*</Form.Label>
							<Form.Control type='email' />
						</Form.Group>
					</Col>

					<Col>
						<Form.Group controlId='formBasicPhoneNumber'>
							<Form.Label>Phone Number*</Form.Label>
							<Form.Control type='text' />
						</Form.Group>
					</Col>
					<Col style={{ alignSelf: 'flex-end', paddingBottom: '15px' }}>
						<Button variant="primary" className='find'>
					        Find
					    </Button>
					</Col>
				</Row>
				{ width <=	 650 ?  <a href='/Booking1' style={{ color: '#393c40', fontSize: '18px' }}>Back</a>  : <div /> }
				{
					bookedData.length > 0 ?
						bookedData.map(booked => 
							width > 650 ?  <BookingConfirming data={booked} /> : <BookingConfirmingMobile data={booked} />
						) : <>No Data</>
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	bookedInformation: state.booking.bookedInformation
});

export default withRouter(connect(mapStateToProps, { })(Booking2));