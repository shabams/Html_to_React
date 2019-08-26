import React from 'react';
import { Button } from 'react-bootstrap';

export const DarkButton = props => {
	return (
		<Button variant='primary' className='get-estimate-now-button' style={{ color: '#ffffff', backgroundColor: '#374354', border: 'none', padding: '10px 40px' }}>
	    	props.buttonName
	  	</Button>
	)
}

export const LightButton = props => {
	return (
		<Button variant='primary' className='get-estimate-now-button' style={{ color: '#ffffff', backgroundColor: '#374354', border: 'none', padding: '10px 40px' }}>
	    	props.buttonName
	  	</Button>
	)
}