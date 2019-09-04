import { GET_ESTIMATION, AVAILABLE_TIME } from '../Actions/Type';

const initialState = {
	available: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ESTIMATION:
    	return {
    		...state,
    		get_estimation_price: action.payload
    	};
   	case AVAILABLE_TIME:
   		return {
   			...state,
   			available: action.payload
   		}
    default:
      return state;
  }
}

