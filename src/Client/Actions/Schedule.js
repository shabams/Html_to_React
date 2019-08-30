import {
	SELECTED_DATE,
	SELECTED_TIME
} from './Type'

import axios from 'axios'


export const selectDate = (selected_date) => async dispatch => {
	dispatch({
		type: SELECTED_DATE,
		payload: selected_date
	});
}

export const selectTime = (selected_time) => async dispatch => {
	dispatch({
		type: SELECTED_TIME,
		payload: selected_time
	});
}