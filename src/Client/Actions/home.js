import {
	GET_ESTIMATION
} from './Type'

import axios from 'axios'
const url = 'http://127.0.0.1:8000'

export const getEstimation = (data) => async dispatch => {
	const Url = "http://127.0.0.1:8000/getestimates";
	const respond = await axios.post(Url, data);
	dispatch({
		type: GET_ESTIMATION,
		payload: respond.data.price
	})
}