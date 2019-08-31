import { SELECTED_DATE, SELECTED_TIME } from '../Actions/Type';

const initialState = {
	selected_date: new Date(),
  selected_time: '8 AM'
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
    default:
      return state;
  }
}

