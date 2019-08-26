import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Row, Col, Image, Form, Button, ButtonToolbar, Modal } from 'react-bootstrap';
import './index.css';
import getEstimationForm from '../../../../Assets/Images/getEstimationForm.png';
import getEstimationPattern from '../../../../Assets/Images/estimation-form-564-325.png';
import getEstimationPatternTop from '../../../../Assets/Images/estimation-form-mobile-top-275-28.png';
import getEstimationPatternBottom from '../../../../Assets/Images/estimation-form-mobile-bottom-125-47.png';

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
      			<h1>$39.99</h1>
      			<h6>Estimate Cost</h6>
      		</div>
      		<div className='right'>
      			<h1>2 hours</h1>
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
			height: 0
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

	render() {
		const width = this.state.width;
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
									    <Form.Control type='text' placeholder='Ohio' />
									  </Form.Group>
									</Col>
									<Col md={6} sm={12} xs={12}>
									  <Form.Group controlId='formBasicCity'>
									    <Form.Label>City</Form.Label>
									    <Form.Control type='text' placeholder='Oxford' />
									  </Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
									  <Form.Group controlId='formBasicAddress'>
									    <Form.Label>Address</Form.Label>
									    <Form.Control type='text' />
									  </Form.Group>
									</Col>
								</Row>

								<Row>
									<Col md={6} sm={12} xs={12}>
									  <Form.Group controlId='formBasicNumberOfRooms'>
									    <Form.Label>Number of rooms</Form.Label>
									    <Form.Control type='number'/>
									  </Form.Group>
									</Col>
									<Col md={6} sm={12} xs={12}>
									  <Form.Group controlId='formBasicNumberOfBathrooms'>
									    <Form.Label>Number of bathrooms</Form.Label>
									    <Form.Control type='number'/>
									  </Form.Group>
									</Col>
								</Row>
							 	<div className='d-flex justify-content-center'>
							  	<ButtonToolbar>
							      <Button variant="primary" onClick={() => this.setState({modalShow: true})} className='get-estimate-now-button'>
							        Get Estimate Now
							      </Button>

							      <MyVerticallyCenteredModal
							        show={this.state.modalShow}
							        onHide={() => this.setState({modalShow: false})}
							        goSchedulePage={() => this.props.history.push('/Schedule2')}
							      />
							    </ButtonToolbar>
							  </div>
							</Form>
						</div>
					</div>
				</div>
			</Row>
		)
	}
}

export default withRouter(AboveHeader);