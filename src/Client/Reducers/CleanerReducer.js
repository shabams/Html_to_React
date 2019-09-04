import { GET_CLEANER_CALENDAR, NEW_BOOKING, FETCH_BOOKING_CLEANER } from '../Actions/Type';

const initialState = {
	cleaner_calendar: [],
  new_booking: [],
  fetch_booking: [],

};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLEANER_CALENDAR:
    	return {
    		...state,
    		cleaner_calendar: action.payload
    	};
    case NEW_BOOKING:
      return {
        ...state,
        new_booking: action.payload
      };
    case FETCH_BOOKING_CLEANER:
      return {
        ...state,
        fetch_booking: action.payload
      };
    default:
      return state;
  }
}

