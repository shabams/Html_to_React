import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import { Row, Col, Image, Form, Button, ButtonToolbar, Modal, Toast } from 'react-bootstrap';
import './index.css';
import getEstimationForm from '../../../../Assets/Images/getEstimationForm.png';
import getEstimationPattern from '../../../../Assets/Images/estimation-form-564-325.png';
import getEstimationPatternTop from '../../../../Assets/Images/estimation-form-mobile-top-275-28.png';
import getEstimationPatternBottom from '../../../../Assets/Images/estimation-form-mobile-bottom-125-47.png';
import { connect } from 'react-redux';
import axios from 'axios'
import { getEstimation, fetchtime } from '../../../../Actions/home';

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
      <h4 style={{ textAlign: 'center' }}>Your house cleaning estimate is</h4>
      <Modal.Body className='d-flex justify-content-center'>
        <div className='modal-body-inside d-flex'>
      		<div className='left'>
      			{ props.esti ? <h1>${props.esti.price}</h1> : <h1>$0</h1> }
      			<h6>Estimate Cost</h6>
      		</div>
      		<div className='right'>
      			{props.esti && props.esti.time != 'NaN' ? <h1>{props.esti.time}hours</h1> : <h1>0hours</h1> }
      			<h6>Estimate Time</h6>
      		</div>
        </div>
      </Modal.Body>
      <h4 style={{ textAlign: 'center', marginTop: 20 }}>Ready to Schedule?</h4>
      <Modal.Footer className='d-flex justify-content-center'>
      	<div className='modal-footer-inside d-flex'>
      		<div className='left'>
      			<Button variant="primary" className='later' onClick={props.onHide}>
			        Later
			    </Button>
      		</div>
      		<div className='right'>
      			<Button variant="primary" className='schedule' onClick={props.goSchedulePage}>
			        Schedule Now
			    </Button>
      		</div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

class AboveHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalShow: false,
			width: 0,
			height: 0,
			estimationPrice: 0,
		}
	}

	componentDidMount = () =>  {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}	

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	handleEstimation = async () => {
		if (this.state.value && this.city.value && this.address.value && this.nor.value && this.nobr.value) {
			if (this.state.value !== 'Ohio') ToastsStore.error('Only Ohio state is allowed');
			else {
				const {getEstimation} = this.props;
				const data = {
					state: this.state.value,
					city: this.city.value,
					address: this.address.value,
					rooms: this.nor.value,
					bathrooms: this.nobr.value
				};
				getEstimation(data);
				this.setState({modalShow: true});
			}
		}
		else {
			ToastsStore.error('Please fill all the fields');
		}
	}

	componentWillReceiveProps = (nextProps) => {
		console.log(nextProps);
		if(nextProps && nextProps.esti){
			this.setState({estimationPrice: nextProps.esti});
			console.log(nextProps.esti, "=====================");
		}
	}

	schedule = () => {
		// this.props.history.push('/Schedule2')

		const { fetchtime } = this.props;
		fetchtime(this.props);
	}

	render() {
		const width = this.state.width;
		if (this.props.esti) console.log(this.props.esti.price);
		return(
			<Row className='above-header'>
				<div className='above-header-left'>
					<h1 className='above-header-title'>We handle cleaning,</h1>
					<h1 className='above-header-sub-title'>So you focus on what matters.</h1>
				</div>
				<div className='above-header-right'>
					<div className='get-estimation'>
						{
							width > 767 ? 
								<Image src={getEstimationPattern} className='get-estimation-pattern' /> : 
								<>
									<Image src={getEstimationPatternTop} className='get-estimation-pattern-top' />
									<Image src={getEstimationPatternBottom} className='get-estimation-pattern-bottom' /> 
								</>  
						}
						<div className='get-estimation-form'>
							<h4 className='get-estimation-form-title'>Get your house cleaning estimate instantly!</h4>
							<Form className='get-estimation-form-inside'>
								<Row>
									<Col md={6} sm={12} xs={12}>
									  <Form.Group controlId='formBasicState'>
									    <Form.Label>State</Form.Label>
									    <Form.Control type='text' placeholder='Ohio' ref={input => this.state = input} defaultValue='Ohio' />
									  </Form.Group>
									</Col>
									<Col md={6} sm={12} xs={12}>
									  <Form.Group controlId='formBasicCity'>
									    <Form.Label>City</Form.Label>
									    <Form.Control type='text' placeholder='Oxford' ref={input => this.city = input} defaultValue='Oxford' />
									  </Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
									  <Form.Group controlId='formBasicAddress'>
									    <Form.Label>Address</Form.Label>
									    <Form.Control type='text' ref={input => this.address = input} />
									  </Form.Group>
									</Col>
								</Row>

								<Row>
									<Col md={6} sm={12} xs={12}>
									  <Form.Group controlId='formBasicNumberOfRooms'>
									    <Form.Label>Number of rooms</Form.Label>
									    <Form.Control type='number' ref={input => this.nor = input}/>
									  </Form.Group>
									</Col>
									<Col md={6} sm={12} xs={12}>
									  <Form.Group controlId='formBasicNumberOfBathrooms'>
									    <Form.Label>Number of bathrooms</Form.Label>
									    <Form.Control type='number' ref={input => this.nobr = input}/>
									  </Form.Group>
									</Col>
								</Row>
							 	<div className='d-flex justify-content-center'>
							  	<ButtonToolbar>
							      <Button variant="primary" onClick={this.handleEstimation} className='get-estimate-now-button'>
							        Get Estimate Now
							      </Button>

							      <MyVerticallyCenteredModal
							        show={this.state.modalShow}
							        onHide={() => this.setState({modalShow: false})}
							        goSchedulePage={this.schedule}
							        esti={this.state.estimationPrice}
							      />
							    </ButtonToolbar>
							  </div>
							</Form>
						</div>
					</div>
				</div>
				<ToastsContainer store={ToastsStore}/>
			</Row>
		)
	}
}

const mapStateToProps = state => ({
	esti: state.home.get_estimation_price
});

export default withRouter(connect(mapStateToProps, { getEstimation, fetchtime })(AboveHeader));