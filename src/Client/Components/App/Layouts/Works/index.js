import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './index.css';
import confirm from '../../../../Assets/Images/confirm.png';
import schedule from '../../../../Assets/Images/schedule.png';
import voila from '../../../../Assets/Images/voila.png';

class Works extends Component {
	render() {
		return(
			<>
				<h1 className='works-title'>How It Works</h1>
				<h4 className='works-sub-title'>Lorem ipsum dolor sit amet, consetetur.</h4>
				<Row className='works-body'>
					<Col className='schedule d-flex justify-content-center'>
						<Card className=' d-flex justify-content-center'>
						  <Card.Img variant="top" src={schedule} />					
						  <Card.Body>
						    <Card.Title>Schedule</Card.Title>
						    <Card.Text>
						      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
						    </Card.Text>
						  </Card.Body>
						</Card>
					</Col>
					<Col className='confirm d-flex justify-content-center'>
						<Card className=' d-flex justify-content-center'>
						  <Card.Img variant="top" src={confirm} />
						  <Card.Body>
						    <Card.Title>Confirm</Card.Title>
						    <Card.Text>
						      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
						    </Card.Text>
						  </Card.Body>
						</Card>
					</Col>
					<Col className='voila d-flex justify-content-center'>
						<Card className=' d-flex justify-content-center'>
						  <Card.Img variant="top" src={voila} />
						  <Card.Body>
						    <Card.Title>Voila</Card.Title>
						    <Card.Text>
						      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
						    </Card.Text>
						  </Card.Body>
						</Card>
					</Col>
				</Row>
			</>
		)
	}
}

export default Works