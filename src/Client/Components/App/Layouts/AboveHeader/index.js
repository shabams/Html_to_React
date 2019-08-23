import React, { Component } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import './index.css';
import getEstimationForm from '../../../../Assets/Images/getEstimationForm.png';

class AboveHeader extends Component {
	render() {
		return(
			<Row className='above-header'>
				<Col className='above-header-left'>
					<h1 className='above-header-title'>We handle cleaning,</h1>
					<h1 className='above-header-sub-title'>So you focus on what matters.</h1>
				</Col>
				<Col className='above-header-right'>
					<div className='get-estimation'>
						<Image src={getEstimationForm} />
						<div className='get-estimation-form'>
							<h4 className='get-estimation-form-title'>Get your house cleaning estimate instantly!</h4>
							<Form className='get-estimation-form-inside'>
								<Row>
									<Col>
									  <Form.Group controlId='formBasicState'>
									    <Form.Label>State</Form.Label>
									    <Form.Control type='text' placeholder='Ohio' />
									  </Form.Group>
									</Col>
									<Col>
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
									<Col>
									  <Form.Group controlId='formBasicNumberOfRooms'>
									    <Form.Label>Number of rooms</Form.Label>
									    <Form.Control type='number'/>
									  </Form.Group>
									</Col>
									<Col>
									  <Form.Group controlId='formBasicNumberOfBathrooms'>
									    <Form.Label>Number of bathrooms</Form.Label>
									    <Form.Control type='number'/>
									  </Form.Group>
									</Col>
								</Row>
							 	<div className='d-flex justify-content-center'>
							  	<Button variant='primary' className='get-estimate-now-button'>
							    	Get Estimate Now
							  	</Button>
							  </div>
							</Form>
						</div>
					</div>
				</Col>
			</Row>
		)
	}
}

export default AboveHeader