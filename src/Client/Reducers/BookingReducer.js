import { BOOKING_INFORMATION, FIND_BOOKING } from '../Actions/Type';

const initialState = {
	addBooking: {},
  bookedInformation: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_INFORMATION:
    	return {
    		...state,
    		addBooking: action.payload
    	};
    case FIND_BOOKING:
      return {
        ...state,
        bookedInformation: action.payload
      };
    default:
      return state;
  }
}

