import { SELECTED_DATE, SELECTED_TIME } from '../Actions/Type';

const initialState = {
	selected_date: new Date(),
  selected_time: '7 AM'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_DATE:
    	return {
    		...state,
    		selected_data: action.payload
    	};

    case SELECTED_TIME:
      return {
        ...state,
        selected_time: action.payload
      };
    default:
      return state;
  }
}

