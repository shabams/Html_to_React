import { SELECTED_DATE, SELECTED_TIME, AVAILABLE_TIME_DURATION, BOOKED_TIME } from '../Actions/Type';

const initialState = {
	selected_date: new Date(),
  selected_time: '8 AM',
  available_time_duration: {},
  booked_time: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_DATE:
    	return {
    		...state,
    		selected_date: action.payload
    	};

    case SELECTED_TIME:
      console.log(action.payload);
      return {
        ...state,
        selected_time: action.payload
      };

    case AVAILABLE_TIME_DURATION:
      return {
        ...state,
        available_time_duration: action.payload
      };

    case AVAILABLE_TIME_DURATION:
      return {
        ...state,
        booked_time: action.payload
      };
    default:
      return state;
  }
}

