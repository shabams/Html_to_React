import { CLEAN_USERS, ROOM_RATE, MANAGE_CALENDAR, FETCH_BOOKING } from '../Actions/Type';

const initialState = {
	Clean_Users: [],
  room_rate: [],
  manage_calendar: [],
  fetch_booking: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_USERS:
    	return {
    		...state,
    		Clean_Users: action.payload
    	};
    case ROOM_RATE:
      return {
        ...state,
        room_rate: action.payload
      };
    case MANAGE_CALENDAR:
      return {
        ...state,
        manage_calendar: action.payload
      };

    case FETCH_BOOKING:
      return {
        ...state,
        fetch_booking: action.payload
      };
    default:
      return state;
  }
}

