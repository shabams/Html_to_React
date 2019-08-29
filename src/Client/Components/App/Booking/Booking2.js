import React from 'react';
import { withRouter } from 'react-router-dom';
import './Booking.css';

const BookingConfirming = props => {
	return (
		<div className='booking-confirming d-flex'>
			<div className='booking-confirming-date d-flex'>
				<p>THU</p>
				<p>July 29</p>
				<p>9 AM</p>
			</div>
			<div className='booking-confirming-data d-flex'>
				<div className='name-state-numberofrooms d-flex'>
					<div className='full-name'>	
						<h6>Full Name</h6>
						<h5>Fulan Al Fulani</h5>
					</div>
					<div className='state'>
						<h6>State</h6>
						<h5>Ohio</h5>
					</div>
					<div className='rooms'>
						<h6>Number of rooms</h6>
						<h5>3</h5>
					</div>
				</div>

				<div className='state-city-address d-flex'>
					<div className='phone-number'>
						<h6>Phone Number</h6>
						<h5>+1 123 456 789</h5>
					</div>
					<div className='city'>
						<h6>City</h6>
						<h5>Oxford</h5>
					</div>
					<div className='Number of bathrooms'>
						<h6>Number of bathrooms</h6>
						<h5>1</h5>
					</div>							
				</div>

				<div className='rooms-bathrooms d-flex'>
					<div className='address'>
						<h6>123, St name, lorem ipsum.</h6>
						<h5>Oxford</h5>
					</div>
				</div>
			</div>
		</div>
	)
}

const BookingConfirmingMobile = props => {
	return (
		<>
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
							<h5>Fulan Al Fulani</h5>
						</div>
						<div className='phone-number'>
							<h6>Phone Number</h6>
							<h5>+1 123 456 789</h5>
						</div>
					</div>

					<div className='state-city-address d-flex'>
						<div className='state'>
							<h6>State</h6>
							<h5>Ohio</h5>
						</div>
						<div className='city'>
							<h6>City</h6>
							<h5>Oxford</h5>
						</div>
						<div className='address'>
							<h6>123, St name, lorem ipsum.</h6>
							<h5>Oxford</h5>
						</div>
					</div>

					<div className='rooms-bathrooms d-flex'>
						<div className='rooms'>
							<h6>Number of rooms</h6>
							<h5>3</h5>
						</div>
						<div className='Number of bathrooms'>
							<h6>Number of bathrooms</h6>
							<h5>1</h5>
						</div>
					</div>
				</div>
			</div>
		</>
	)
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
		return (
			<>
				{ width > 650 ?  <BookingConfirming /> : <BookingConfirmingMobile /> }
				{ width > 650 ?  <BookingConfirming /> : <BookingConfirmingMobile /> }
			</>
		)
	}
}

export default withRouter(Booking2);